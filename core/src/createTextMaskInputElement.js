import adjustCaretPosition from './adjustCaretPosition.js'
import conformToMask from './conformToMask.js'
import {convertMaskToPlaceholder, isString, isNumber, processCaretTraps} from './utilities.js'
import {placeholderChar as defaultPlaceholderChar} from './constants.js'

const strFunction = 'function'
const emptyString = ''
const strNone = 'none'

export default function createTextMaskInputElement({
  inputElement,
  mask: providedMask,
  guide,
  pipe,
  placeholderChar = defaultPlaceholderChar,
  onAccept,
  onReject,
  keepCharPositions = false
}) {
  // Text Mask accepts masks that are a combination of a `mask` and a `pipe` that work together. If such a `mask` is
  // passed, we destructure it below, so the rest of the code can work normally as if a separate `mask` and a `pipe`
  // were passed.
  if (typeof providedMask === 'object' && providedMask.pipe !== undefined && providedMask.mask !== undefined) {
    pipe = providedMask.pipe
    providedMask = providedMask.mask
  }

  // Anything that we will need to keep between `update` calls, we will store in this `state` object.
  const state = {previousConformedValue: emptyString}

  // The `placeholder` is an essential piece of how Text Mask works. For a mask like `(111)`, the placeholder would be
  // `(___)` if the `placeholderChar` is set to `_`.
  let placeholder

  // We don't know what the mask would be yet. If it is an array, we take it as is, but if it's a function, we will
  // have to call that function to get the mask array.
  let mask

  // If the provided mask is an array, we can call `convertMaskToPlaceholder` here once and we'll always have the
  // correct `placeholder`.
  if (providedMask instanceof Array) {
    placeholder = convertMaskToPlaceholder(providedMask, placeholderChar)
  }

  return {
    state,

    // `update` is called by framework components whenever they want to update the `value` of the input element.
    // The caller can send a `rawValue` to be conformed and set on the input element. However, the default use-case
    // is for this to be read from the `inputElement` directly.
    update(rawValue = inputElement.value) {
      // If `rawValue` equals `state.previousConformedValue`, we don't need to change anything. So, we return.
      // This check is here to handle controlled framework components that repeat the `update` call on every render.
      if (rawValue === state.previousConformedValue) { return }

      // We check the provided `rawValue` before moving further.
      // If it's something we can't work with `getSafeRawValue` will throw.
      const safeRawValue = getSafeRawValue(rawValue)

      // `selectionStart` indicates to us where the caret position is after the user has typed into the input
      const {selectionStart: currentCaretPosition} = inputElement

      // We need to know what the `previousConformedValue` is from the previous `update` call
      const {previousConformedValue} = state

      let caretTrapIndexes

      // If the `providedMask` is a function. We need to call it at every `update` to get the `mask` array.
      // Then we also need to get the `placeholder`
      if (typeof providedMask === strFunction) {
        mask = providedMask(safeRawValue, {currentCaretPosition, previousConformedValue, placeholderChar})

        // mask functions can setup caret traps to have some control over how the caret moves. We need to process
        // the mask for any caret traps. `processCaretTraps` will remove the caret traps from the mask and return
        // the indexes of the caret traps.
        const {maskWithoutCaretTraps, indexes} = processCaretTraps(mask)

        mask = maskWithoutCaretTraps // The processed mask is what we're interested in
        caretTrapIndexes = indexes // And we need to store these indexes because they're needed by `adjustCaretPosition`

        placeholder = convertMaskToPlaceholder(mask, placeholderChar)

      // If the `providedMask` is not a function, we just use it as-is.
      } else {
        mask = providedMask
      }

      // The following object will be passed to `conformToMask` to determine how the `rawValue` will be conformed
      const conformToMaskConfig = {
        previousConformedValue,
        guide,
        placeholderChar,
        pipe,
        placeholder,
        currentCaretPosition,
        keepCharPositions
      }

      // `conformToMask` returns the information below: we need the `conformedValue` and we need to know whether
      // some characters were rejected. We'll use `someCharsRejected` to know whether we should call the `onReject`
      // callback
      const {conformedValue, meta: {someCharsRejected}} = conformToMask(safeRawValue, mask, conformToMaskConfig)

      // The following few lines are to support the `pipe` feature.
      const piped = typeof pipe === strFunction

      let pipeResults = {}

      // If `pipe` is a function, we call it.
      if (piped) {
        // `pipe` receives the `conformedValue` and the configurations with which `conformToMask` was called.
        pipeResults = pipe(conformedValue, {rawValue: safeRawValue, ...conformToMaskConfig})

        // `pipeResults` should be an object. But as a convenience, we allow the pipe author to just return `false` to
        // indicate rejection. Or return just a string when there are no piped characters.
        // If the `pipe` returns `false` or a string, the block below turns it into an object that the rest
        // of the code can work with.
        if (pipeResults === false) {
          // If the `pipe` rejects `conformedValue`, we use the `previousConformedValue`, and set `rejected` to `true`.
          pipeResults = {value: previousConformedValue, rejected: true}
        } else if (isString(pipeResults)) {
          pipeResults = {value: pipeResults}
        }
      }

      // Before we proceed, we need to know which conformed value to use, the one returned by the pipe or the one
      // returned by `conformToMask`.
      const finalConformedValue = (piped) ? pipeResults.value : conformedValue

      // After setting the `finalConformedValue` as the value of the `inputElement`, we will need to know where to set
      // the caret position. `adjustCaretPosition` will tell us.
      const adjustedCaretPosition = adjustCaretPosition({
        previousConformedValue,
        conformedValue: finalConformedValue,
        placeholder,
        rawValue: safeRawValue,
        currentCaretPosition,
        placeholderChar,
        indexesOfPipedChars: pipeResults.indexesOfPipedChars,
        caretTrapIndexes
      })

      // Text Mask sets the input value to an empty string when the condition below is set. It provides a better UX.
      const inputValueShouldBeEmpty = finalConformedValue === placeholder && adjustedCaretPosition === 0
      const inputElementValue = (inputValueShouldBeEmpty) ? emptyString : finalConformedValue

      inputElement.value = inputElementValue // set the input value
      safeSetSelection(inputElement, adjustedCaretPosition) // adjust caret position
      state.previousConformedValue = inputElementValue // store value for access for next time

      // If we set a value to the input element that's different form `previousConformedValue`, it means user input
      // was accepted, and we call the `onAccept` callback if it's a function.
      if (typeof onAccept === strFunction && inputElementValue !== previousConformedValue) {
        onAccept()
      }

      // Now we need to figure out if user input was rejected to decide whether to call `onReject` callback or not.
      // We need to know if the operation is deletion, because if it is, then we definitely don't need to call
      // `onReject` in that case.
      const isDeletion = safeRawValue.length < previousConformedValue.length

      // To call `onReject`
      if (
        // `onReject` has to be a function
        typeof onReject === strFunction &&

        // `someCharsRejected` or `pipeResults.rejected` has to be true
        (someCharsRejected || pipeResults.rejected) &&

        // the operation needs to be addition, not deletion
        isDeletion === false
      ) {
        // `onReject` receives the `finalConformedValue` and booleans for `pipeRejection` and `maskRejection`
        // so know whether the user input was rejected by the mask pattern or by the pipe.
        onReject({
          conformedValue: finalConformedValue,
          pipeRejection: pipeResults.rejected,
          maskRejection: someCharsRejected
        })
      }
    }
  }
}

function safeSetSelection(element, selectionPosition) {
  if (typeof document !== 'undefined' && document.activeElement === element) {
    element.setSelectionRange(selectionPosition, selectionPosition, strNone)
  }
}

function getSafeRawValue(inputValue) {
  if (isString(inputValue)) {
    return inputValue
  } else if (isNumber(inputValue)) {
    return String(inputValue)
  } else if (inputValue === undefined || inputValue === null) {
    return emptyString
  } else {
    throw new Error(
      "The 'value' provided to Text Mask needs to be a string or a number. The value " +
      `received was:\n\n ${JSON.stringify(inputValue)}`
    )
  }
}
