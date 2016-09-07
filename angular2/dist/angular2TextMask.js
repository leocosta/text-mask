!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("@angular/core"),require("@angular/forms")):"function"==typeof define&&define.amd?define(["@angular/core","@angular/forms"],t):"object"==typeof exports?exports.angular2TextMask=t(require("@angular/core"),require("@angular/forms")):e.angular2TextMask=t(e.ng.core,e.ng.forms)}(this,function(e,t){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var o,i=arguments.length,a=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var u=e.length-1;u>=0;u--)(o=e[u])&&(a=(i<3?o(a):i>3?o(t,r,a):o(t,r))||a);return i>3&&a&&Object.defineProperty(t,r,a),a},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},i=r(6),a=r(7),u=r(5),l=function(){function e(e){this.element=e,this.textMaskConfig={mask:"",guide:!1,placeholderChar:"_",pipe:void 0,keepCharPositions:!1,onReject:void 0,onAccept:void 0},this.formControl=new a.FormControl}return e.prototype.ngOnInit=function(){var e=this;"INPUT"===this.element.nativeElement.tagName?this.inputElement=this.element.nativeElement:setTimeout(function(){e.inputElement=e.element.nativeElement.getElementsByTagName("INPUT")[0]},0),this.textMaskInputElement=u["default"](Object.assign({inputElement:this.inputElement},this.textMaskConfig))},e.prototype.writeValue=function(e){void 0!==this.textMaskInputElement&&this.textMaskInputElement.update(e),this.formControl.updateValue(e)},e.prototype.registerOnChange=function(e){this.formControl.valueChanges.subscribe(e)},e.prototype.registerOnTouched=function(){},e.prototype.onInput=function(){this.textMaskInputElement.update(),this.writeValue(this.inputElement.value)},n([i.Input("textMask"),o("design:type",Object)],e.prototype,"textMaskConfig",void 0),e=n([i.Directive({host:{"(input)":"onInput()"},selector:"[textMask]",providers:[{provide:a.NG_VALUE_ACCESSOR,useExisting:e,multi:!0}]}),o("design:paramtypes",[i.ElementRef])],e)}();Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=l,t.Directive=l},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.placeholderChar="_"},function(e,t,r){"use strict";function n(){var e=arguments.length<=0||void 0===arguments[0]?l:arguments[0],t=arguments.length<=1||void 0===arguments[1]?u.placeholderChar:arguments[1];if(e.indexOf(t)!==-1)throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\n"+("The placeholder character that was received is: "+JSON.stringify(t)+"\n\n")+("The mask that was received is: "+JSON.stringify(e)));return e.map(function(e){return e instanceof RegExp?t:e}).join("")}function o(e){return"string"==typeof e||e instanceof String}function i(e){return e&&void 0===e.length&&!isNaN(e)}function a(e){for(var t=[],r=void 0;r=e.indexOf(s),r!==-1;)t.push(r),e.splice(r,1);return{maskWithoutCaretTraps:e,indexes:t}}Object.defineProperty(t,"__esModule",{value:!0}),t.convertMaskToPlaceholder=n,t.isString=o,t.isNumber=i,t.processCaretTraps=a;var u=r(1),l=[],s="[]"},function(e,t){"use strict";function r(e){var t=e.previousConformedValue,r=void 0===t?o:t,i=e.currentCaretPosition,a=void 0===i?0:i,u=e.conformedValue,l=e.rawValue,s=e.placeholderChar,f=e.placeholder,c=e.indexesOfPipedChars,d=void 0===c?n:c,p=e.caretTrapIndexes,h=void 0===p?n:p;if(0===a)return 0;var v=l.length,m=r.length,g=f.length,y=u.length,C=v-m,b=C>0,x=0===m,k=C>1&&!b&&!x;if(k)return a;var O=b&&(r===u||u===f),P=0;if(O?P=a-C:!function(){for(var e=u.toLowerCase(),t=l.toLowerCase(),r=t.substr(0,a).split(o),n=r.filter(function(t){return e.indexOf(t)!==-1}),i=n[n.length-1],c=d.map(function(t){return e[t]}),p=c.filter(function(e){return e===i}).length,h=n.filter(function(e){return e===i}).length,v=f.substr(0,f.indexOf(s)).split(o).filter(function(e,t){return e===i&&l[t]!==e}).length,m=v+h+p,g=0,C=0;C<y;C++){var b=e[C];if(P=C+1,b===i&&g++,g>=m)break}}(),b){for(var j=P,M=P;M<=g;M++)if(f[M]===s&&(j=M),f[M]===s||h.indexOf(M)!==-1||M===g)return j}else for(var E=P;E>=0;E--)if(f[E-1]===s||h.indexOf(E)!==-1||0===E)return E}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=r;var n=[],o=""},function(e,t,r){"use strict";function n(){var e=arguments.length<=0||void 0===arguments[0]?a:arguments[0],t=arguments.length<=1||void 0===arguments[1]?a:arguments[1],r=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],n=r.guide,u=void 0===n||n,l=r.previousConformedValue,s=void 0===l?a:l,f=r.placeholderChar,c=void 0===f?i.placeholderChar:f,d=r.placeholder,p=void 0===d?(0,o.convertMaskToPlaceholder)(t,c):d,h=r.currentCaretPosition,v=r.keepCharPositions,m=u===!1&&void 0!==s,g=e.length,y=s.length,C=p.length,b=t.length,x=g-y,k=x>0,O=h+(k?-x:0),P=O+Math.abs(x);if(v===!0&&!k){for(var j=a,M=O;M<P;M++)p[M]===c&&(j+=c);e=e.slice(0,O)+j+e.slice(O,g)}for(var E=e.split(a).map(function(e,t){return{"char":e,isNew:t>=O&&t<P}}),T=g-1;T>=0;T--){var _=E[T]["char"];if(_!==c){var V=T>=O&&y===b;_===p[V?T-x:T]&&E.splice(T,1)}}var w=a,R=!1;e:for(var S=0;S<C;S++){var N=p[S];if(N===c){if(E.length>0)for(;E.length>0;){var I=E.shift(),A=I["char"],q=I.isNew;if(A===c&&m!==!0){w+=c;continue e}if(t[S].test(A)){if(v===!0&&q!==!1&&s!==a&&u!==!1&&k){for(var D=E.length,J=null,L=0;L<D;L++){var U=E[L];if(U["char"]!==c&&U.isNew===!1)break;if(U["char"]===c){J=L;break}}null!==J?(w+=A,E.splice(J,1)):S--}else w+=A;continue e}R=!0}m===!1&&(w+=p.substr(S,C));break}w+=N}if(m&&k===!1){for(var W=null,B=0;B<w.length;B++)p[B]===c&&(W=B);w=null!==W?w.substr(0,W+1):a}return{conformedValue:w,meta:{someCharsRejected:R}}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=n;var o=r(2),i=r(1),a=""},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=e.inputElement,r=e.mask,n=e.guide,o=e.pipe,s=e.placeholderChar,c=void 0===s?h.placeholderChar:s,y=e.onAccept,C=e.onReject,b=e.keepCharPositions,x=void 0!==b&&b;"object"===("undefined"==typeof r?"undefined":l(r))&&void 0!==r.pipe&&void 0!==r.mask&&(o=r.pipe,r=r.mask);var k={previousConformedValue:g},O=void 0,P=void 0;return r instanceof Array&&(O=(0,p.convertMaskToPlaceholder)(r,c)),t.placeholder===g&&t.setAttribute(v,O),{state:k,update:function(){var e=arguments.length<=0||void 0===arguments[0]?t.value:arguments[0];if(e!==k.previousConformedValue){var s=a(e),h=t.selectionStart,v=k.previousConformedValue,b=void 0;if(("undefined"==typeof r?"undefined":l(r))===m){P=r(s,{currentCaretPosition:h,previousConformedValue:v,placeholderChar:c});var j=(0,p.processCaretTraps)(P),M=j.maskWithoutCaretTraps,E=j.indexes;P=M,b=E,O=(0,p.convertMaskToPlaceholder)(P,c)}else P=r;var T={previousConformedValue:v,guide:n,placeholderChar:c,pipe:o,placeholder:O,currentCaretPosition:h,keepCharPositions:x},_=(0,d["default"])(s,P,T),V=_.conformedValue,w=_.meta.someCharsRejected,R=("undefined"==typeof o?"undefined":l(o))===m,S={};R&&(S=o(V,u({rawValue:s},T)),S===!1?S={value:v,rejected:!0}:(0,p.isString)(S)&&(S={value:S}));var N=R?S.value:V,I=(0,f["default"])({previousConformedValue:v,conformedValue:N,placeholder:O,rawValue:s,currentCaretPosition:h,placeholderChar:c,indexesOfPipedChars:S.indexesOfPipedChars,caretTrapIndexes:b}),A=N===O&&0===I,q=A?g:N;t.value=q,i(t,I),k.previousConformedValue=q,("undefined"==typeof y?"undefined":l(y))===m&&q!==v&&y();var D=s.length<v.length;("undefined"==typeof C?"undefined":l(C))===m&&(w||S.rejected)&&D===!1&&C({conformedValue:N,pipeRejection:S.rejected,maskRejection:w})}}}}function i(e,t){document.activeElement===e&&e.setSelectionRange(t,t,y)}function a(e){if((0,p.isString)(e))return e;if((0,p.isNumber)(e))return String(e);if(void 0===e||null===e)return g;throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n "+JSON.stringify(e))}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};t["default"]=o;var s=r(3),f=n(s),c=r(4),d=n(c),p=r(2),h=r(1),v="placeholder",m="function",g="",y="none"},function(t,r){t.exports=e},function(e,r){e.exports=t}])});