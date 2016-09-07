import {Directive, ElementRef, Input, OnInit} from '@angular/core'
import {FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms'
import createTextMaskInputElement from '../../core/src/createTextMaskInputElement'

@Directive({
  host: {
    '(input)': 'onInput()'
  },
  selector: '[textMask]',
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: MaskedInputDirective, multi: true}
  ]
})
export default class MaskedInputDirective implements OnInit, ControlValueAccessor{
  private textMaskInputElement: any
  private inputElement:HTMLInputElement

  @Input('textMask')
  textMaskConfig = {
    mask: '',
    guide: false,
    placeholderChar: '_',
    pipe: undefined,
    keepCharPositions: false,
    onReject: undefined,
    onAccept: undefined
  }

  formControl: FormControl = new FormControl()

  constructor(private element: ElementRef) {}

  ngOnInit() {
    if (this.element.nativeElement.tagName.toUpperCase() === 'INPUT') {
      // `textMask` directive is used directly on an input element
      this.inputElement = this.element.nativeElement
    } else {
      // `textMask` directive is used on an abstracted input element, `ion-input`, `md-input`, etc
      if (typeof this.element.nativeElement.getElementsByTagName === 'function')
        this.inputElement = this.element.nativeElement.getElementsByTagName('INPUT')[0]
    }
    setTimeout(() => {
      this.textMaskInputElement = createTextMaskInputElement(
        Object.assign({inputElement: this.inputElement}, this.textMaskConfig)
      )
      this.onInput()
    }, 3000)
  }

  writeValue(value: any) {
    if (this.textMaskInputElement !== undefined) {
      this.textMaskInputElement.update(value)
    }
    this.formControl.updateValue(value)
  }

  registerOnChange(fn: (value: any) => void) {
    this.formControl.valueChanges.subscribe(fn)
  }

  registerOnTouched() {}

  onInput() {
    this.textMaskInputElement.update()
    this.writeValue(this.inputElement.value)
  }
}

export { MaskedInputDirective as Directive }