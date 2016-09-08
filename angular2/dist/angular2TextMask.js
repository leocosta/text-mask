!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("@angular/core"),require("@angular/forms")):"function"==typeof define&&define.amd?define(["@angular/core","@angular/forms"],t):"object"==typeof exports?exports.angular2TextMask=t(require("@angular/core"),require("@angular/forms")):e.angular2TextMask=t(e.ng.core,e.ng.forms)}(this,function(e,t){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var o,i=arguments.length,a=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var u=e.length-1;u>=0;u--)(o=e[u])&&(a=(i<3?o(a):i>3?o(t,r,a):o(t,r))||a);return i>3&&a&&Object.defineProperty(t,r,a),a},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},i=r(6),a=r(7),u=r(5),s=function(){function e(e){this.element=e,this.textMaskConfig={mask:"",guide:!1,placeholderChar:"_",pipe:void 0,keepCharPositions:!1,onReject:void 0,onAccept:void 0},this.formControl=new a.FormControl}return e.prototype.ngOnInit=function(){var e=this;"INPUT"===this.element.nativeElement.tagName.toUpperCase()?this.inputElement=this.element.nativeElement:"function"==typeof this.element.nativeElement.getElementsByTagName&&(this.inputElement=this.element.nativeElement.getElementsByTagName("INPUT")[0]),setTimeout(function(){e.textMaskInputElement=u["default"](Object.assign({inputElement:e.inputElement},e.textMaskConfig)),e.onInput()})},e.prototype.writeValue=function(e){void 0!==this.textMaskInputElement&&this.textMaskInputElement.update(e),this.formControl.updateValue(e)},e.prototype.registerOnChange=function(e){this.formControl.valueChanges.subscribe(e)},e.prototype.registerOnTouched=function(){},e.prototype.onInput=function(){this.textMaskInputElement.update(),this.writeValue(this.inputElement.value)},n([i.Input("textMask"),o("design:type",Object)],e.prototype,"textMaskConfig",void 0),e=n([i.Directive({host:{"(input)":"onInput()"},selector:"[textMask]",providers:[{provide:a.NG_VALUE_ACCESSOR,useExisting:e,multi:!0}]}),o("design:paramtypes",[i.ElementRef])],e)}();Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=s,t.Directive=s},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.placeholderChar="_"},function(e,t,r){"use strict";function n(){var e=arguments.length<=0||void 0===arguments[0]?s:arguments[0],t=arguments.length<=1||void 0===arguments[1]?u.placeholderChar:arguments[1];if(e.indexOf(t)!==-1)throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\n"+("The placeholder character that was received is: "+JSON.stringify(t)+"\n\n")+("The mask that was received is: "+JSON.stringify(e)));return e.map(function(e){return e instanceof RegExp?t:e}).join("")}function o(e){return"string"==typeof e||e instanceof String}function i(e){return e&&void 0===e.length&&!isNaN(e)}function a(e){for(var t=[],r=void 0;r=e.indexOf(l),r!==-1;)t.push(r),e.splice(r,1);return{maskWithoutCaretTraps:e,indexes:t}}Object.defineProperty(t,"__esModule",{value:!0}),t.convertMaskToPlaceholder=n,t.isString=o,t.isNumber=i,t.processCaretTraps=a;var u=r(1),s=[],l="[]"},function(e,t){"use strict";function r(e){var t=e.previousConformedValue,r=void 0===t?o:t,i=e.currentCaretPosition,a=void 0===i?0:i,u=e.conformedValue,s=e.rawValue,l=e.placeholderChar,f=e.placeholder,c=e.indexesOfPipedChars,d=void 0===c?n:c,p=e.caretTrapIndexes,h=void 0===p?n:p;if(0===a)return 0;var v=s.length,m=r.length,g=f.length,y=u.length,C=v-m,b=C>0,x=0===m,k=C>1&&!b&&!x;if(k)return a;var O=b&&(r===u||u===f),P=0;if(O?P=a-C:!function(){for(var e=u.toLowerCase(),t=s.toLowerCase(),r=t.substr(0,a).split(o),n=r.filter(function(t){return e.indexOf(t)!==-1}),i=n[n.length-1],c=d.map(function(t){return e[t]}),p=c.filter(function(e){return e===i}).length,h=n.filter(function(e){return e===i}).length,v=f.substr(0,f.indexOf(l)).split(o).filter(function(e,t){return e===i&&s[t]!==e}).length,m=v+h+p,g=0,C=0;C<y;C++){var b=e[C];if(P=C+1,b===i&&g++,g>=m)break}}(),b){for(var j=P,E=P;E<=g;E++)if(f[E]===l&&(j=E),f[E]===l||h.indexOf(E)!==-1||E===g)return j}else for(var M=P;M>=0;M--)if(f[M-1]===l||h.indexOf(M)!==-1||0===M)return M}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=r;var n=[],o=""},function(e,t,r){"use strict";function n(){var e=arguments.length<=0||void 0===arguments[0]?a:arguments[0],t=arguments.length<=1||void 0===arguments[1]?a:arguments[1],r=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],n=r.guide,u=void 0===n||n,s=r.previousConformedValue,l=void 0===s?a:s,f=r.placeholderChar,c=void 0===f?i.placeholderChar:f,d=r.placeholder,p=void 0===d?(0,o.convertMaskToPlaceholder)(t,c):d,h=r.currentCaretPosition,v=r.keepCharPositions,m=u===!1&&void 0!==l,g=e.length,y=l.length,C=p.length,b=t.length,x=g-y,k=x>0,O=h+(k?-x:0),P=O+Math.abs(x);if(v===!0&&!k){for(var j=a,E=O;E<P;E++)p[E]===c&&(j+=c);e=e.slice(0,O)+j+e.slice(O,g)}for(var M=e.split(a).map(function(e,t){return{"char":e,isNew:t>=O&&t<P}}),T=g-1;T>=0;T--){var _=M[T]["char"];if(_!==c){var V=T>=O&&y===b;_===p[V?T-x:T]&&M.splice(T,1)}}var w=a,N=!1;e:for(var R=0;R<C;R++){var S=p[R];if(S===c){if(M.length>0)for(;M.length>0;){var I=M.shift(),A=I["char"],q=I.isNew;if(A===c&&m!==!0){w+=c;continue e}if(t[R].test(A)){if(v===!0&&q!==!1&&l!==a&&u!==!1&&k){for(var U=M.length,D=null,J=0;J<U;J++){var L=M[J];if(L["char"]!==c&&L.isNew===!1)break;if(L["char"]===c){D=J;break}}null!==D?(w+=A,M.splice(D,1)):R--}else w+=A;continue e}N=!0}m===!1&&(w+=p.substr(R,C));break}w+=S}if(m&&k===!1){for(var B=null,W=0;W<w.length;W++)p[W]===c&&(B=W);w=null!==B?w.substr(0,B+1):a}return{conformedValue:w,meta:{someCharsRejected:N}}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=n;var o=r(2),i=r(1),a=""},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=e.inputElement,r=e.mask,n=e.guide,o=e.pipe,l=e.placeholderChar,c=void 0===l?h.placeholderChar:l,g=e.onAccept,y=e.onReject,C=e.keepCharPositions,b=void 0!==C&&C;"object"===("undefined"==typeof r?"undefined":s(r))&&void 0!==r.pipe&&void 0!==r.mask&&(o=r.pipe,r=r.mask);var x={previousConformedValue:m},k=void 0,O=void 0;return r instanceof Array&&(k=(0,p.convertMaskToPlaceholder)(r,c)),{state:x,update:function(){var e=arguments.length<=0||void 0===arguments[0]?t.value:arguments[0];if(e!==x.previousConformedValue){var l=a(e),h=t.selectionStart,C=x.previousConformedValue,P=void 0;if(("undefined"==typeof r?"undefined":s(r))===v){O=r(l,{currentCaretPosition:h,previousConformedValue:C,placeholderChar:c});var j=(0,p.processCaretTraps)(O),E=j.maskWithoutCaretTraps,M=j.indexes;O=E,P=M,k=(0,p.convertMaskToPlaceholder)(O,c)}else O=r;var T={previousConformedValue:C,guide:n,placeholderChar:c,pipe:o,placeholder:k,currentCaretPosition:h,keepCharPositions:b},_=(0,d["default"])(l,O,T),V=_.conformedValue,w=_.meta.someCharsRejected,N=("undefined"==typeof o?"undefined":s(o))===v,R={};N&&(R=o(V,u({rawValue:l},T)),R===!1?R={value:C,rejected:!0}:(0,p.isString)(R)&&(R={value:R}));var S=N?R.value:V,I=(0,f["default"])({previousConformedValue:C,conformedValue:S,placeholder:k,rawValue:l,currentCaretPosition:h,placeholderChar:c,indexesOfPipedChars:R.indexesOfPipedChars,caretTrapIndexes:P}),A=S===k&&0===I,q=A?m:S;t.value=q,i(t,I),x.previousConformedValue=q,("undefined"==typeof g?"undefined":s(g))===v&&q!==C&&g();var U=l.length<C.length;("undefined"==typeof y?"undefined":s(y))===v&&(w||R.rejected)&&U===!1&&y({conformedValue:S,pipeRejection:R.rejected,maskRejection:w})}}}}function i(e,t){"undefined"!=typeof document&&document.activeElement===e&&e.setSelectionRange(t,t,g)}function a(e){if((0,p.isString)(e))return e;if((0,p.isNumber)(e))return String(e);if(void 0===e||null===e)return m;throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n "+JSON.stringify(e))}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};t["default"]=o;var l=r(3),f=n(l),c=r(4),d=n(c),p=r(2),h=r(1),v="function",m="",g="none"},function(t,r){t.exports=e},function(e,r){e.exports=t}])});