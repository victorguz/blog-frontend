(()=>{var e={213:function(e,t,r){var n,o,i,a,u,s,c,p,d,f,l,y,m,v,h;i=function e(t,r,n){if(!d(r)||l(r)||y(r)||m(r)||p(r))return r;var o,i=0,a=0;if(f(r))for(o=[],a=r.length;i<a;i++)o.push(e(t,r[i],n));else for(var u in o={},r)Object.prototype.hasOwnProperty.call(r,u)&&(o[t(u,n)]=e(t,r[u],n));return o},a=function(e){return v(e)?e:(e=e.replace(/[\-_\s]+(.)?/g,(function(e,t){return t?t.toUpperCase():""}))).substr(0,1).toLowerCase()+e.substr(1)},u=function(e){var t=a(e);return t.substr(0,1).toUpperCase()+t.substr(1)},s=function(e,t){return function(e,t){var r=(t=t||{}).separator||"_",n=t.split||/(?=[A-Z])/;return e.split(n).join(r)}(e,t).toLowerCase()},c=Object.prototype.toString,p=function(e){return"function"==typeof e},d=function(e){return e===Object(e)},f=function(e){return"[object Array]"==c.call(e)},l=function(e){return"[object Date]"==c.call(e)},y=function(e){return"[object RegExp]"==c.call(e)},m=function(e){return"[object Boolean]"==c.call(e)},v=function(e){return(e-=0)==e},h=function(e,t){var r=t&&"process"in t?t.process:t;return"function"!=typeof r?e:function(t,n){return r(t,e,n)}},void 0===(o="function"==typeof(n={camelize:a,decamelize:s,pascalize:u,depascalize:s,camelizeKeys:function(e,t){return i(h(a,t),e)},decamelizeKeys:function(e,t){return i(h(s,t),e,t)},pascalizeKeys:function(e,t){return i(h(u,t),e)},depascalizeKeys:function(){return this.decamelizeKeys.apply(this,arguments)}})?n.call(t,r,t,e):n)||(e.exports=o)}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,r),i.exports}r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{"use strict";var e={};r.r(e),r.d(e,{ERRORS_MESSAGES:()=>n,REQUIRED_PARAMS:()=>o});var t={};r.r(t),r.d(t,{throwGeneralError:()=>i});var n={requiredParam:function(e){return"El siguiente parámetro es necesario: ".concat(e)},unexpectedError:"Ocurrió un error inesperado, intenta nuevamente más tarde",invalidKey:"Llave pública inválida"},o={publicKey:"Llave pública"};function i(e){throw new Error(e)}function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var u,s,c,p,d,f=function(e){var t=e.AntifraudLibBuilder,r=e.ServicesBuilder;return function(e){var o=r(e);return{initialize:function(r){new Promise((function(e){o.postSessionId().then((function(t){var r=t.id;e(r)})).catch((function(){i(n.unexpectedError)}))})).then((function(a){r({sessionId:a},null),function(r){return o.getMerchantByPublicKey(e).then((function(e){var n={userId:void 0,sessionId:r,fraudJavascriptKey:"string"==typeof e.fraudJavascriptKey?e.fraudJavascriptKey:void 0,fraudGroups:e.fraudGroups};return t(n)})).catch((function(e){"Formato inválido"===e.json.error.messages.publicKey[0]?i(n.invalidKey):i(n.unexpectedError)}))}(a).then((function(e){e.startAntifraud()}))})).catch((function(e){return r(null,e)}))},exposeValues:function(e){e.forEach((function(e){var t=e.name,r=e.value;window.$wompi||(window.$wompi={}),window.$wompi[t]||(window.$wompi[t]=r)}))}}}}({ServicesBuilder:(s={api:function(e){var t=e.humps,r=e.constants,n=e.errorsHandler.throwGeneralError,o=r.ERRORS_MESSAGES,i=r.REQUIRED_PARAMS,u=t.camelizeKeys,s=t.decamelizeKeys;return{__getBaseUrl:function(e){var t=e.key,r=e.productDomainName;t||n(o.requiredParam(i.publicKey));var a=t.split("_"),u=a.length>=2?a[1]:void 0,s="production";return"test"===u?s="sandbox":"prod"===u?s="production":"stagint"===u?s="integrations.staging":"stagtest"===u?s="sandbox.staging":"devint"===u?s="integrations.dev":"devtest"===u&&(s="sandbox.dev"),"https://".concat(s,".").concat(r,"/v1")},__parseResponse:function(e){return new Promise((function(t,r){if(e.ok)e.text().then((function(e){return t(e?u(JSON.parse(e).data):{})}));else{var n=e.status,o=e.statusText;n>=400?e.json().then((function(e){r({status:n,statusText:o,json:u(e)})})).catch((function(e){r({status:n,statusText:o,errorString:e})})):r({status:n,statusText:o})}}))},__buildHeaders:function(e){var t={"Content-Type":"application/json"};return"string"==typeof e&&(t.Authorization="Bearer ".concat(e)),t},__makeApiHttpRequest:function(e){var t=e.method,r=e.path,n=e.data,o=void 0===n?null:n,i=e.key,u={method:t,headers:this.__buildHeaders(i)};return null!=o&&"object"===a(o)&&(u.body=JSON.stringify(s(o))),window.fetch("".concat(this.__getBaseUrl({key:i,productDomainName:"wompi.co"})).concat(r),u).then(this.__parseResponse)},post:function(e){var t=e.key,r=e.path,n=e.data,o=void 0===n?null:n;return this.__makeApiHttpRequest({method:"POST",path:r,data:o,key:t})},get:function(e){var t=e.key,r=e.path;return this.__makeApiHttpRequest({method:"GET",path:r,key:t})}}}({humps:r(213),constants:e,errorsHandler:t})},c=s.api,function(e){return{postSessionId:function(){return c.post({key:e,path:"/sessions"})},getMerchantByPublicKey:function(t){return c.get({key:e,path:"/merchants/".concat(t)})}}}),AntifraudLibBuilder:(u={CS:{name:"ClearSale",injectFraudChecker:function(e){var t,r,n,o,i,a,u=e.fraudData,s=e.fg;document.getElementById("csScript")||(t=window,r=document,n="script",o="csdp",t.CsdmObject=o,t[o]=t[o]||function(){(t[o].q=t[o].q||[]).push(arguments)},t[o].l=1*new Date,i=r.createElement(n),a=r.getElementsByTagName(n)[0],i.async=1,i.src="//device.clearsale.com.br/p/fp.js",i.id="csScript",a.parentNode.insertBefore(i,a)),window.csdp("app",s.publicData.clientId),window.csdp("sessionid",u.sessionId)}},SS:{name:"Sift",injectFraudChecker:function(e){var t=e.fraudData,r=e.fg,n=window._sift=window._sift||[];n.push(["_setAccount",r.publicData.javascriptKey]),n.push(["_setSessionId",t.sessionId]),n.push(["_trackPageview"]),"string"==typeof t.userId?n.push(["_setUserId",t.userId]):n.push(["_setUserId",""]);var o=document.createElement("script");o.src="https://cdn.siftscience.com/s.js",o.id="sScript",document.getElementById("sScript")||document.body.appendChild(o)}}},function(e){return{startAntifraud:function(){e.fraudGroups&&Array.isArray(e.fraudGroups)?e.fraudGroups.forEach((function(t){u[t.provider]&&u[t.provider].injectFraudChecker({fraudData:e,fg:t})})):i(n.unexpectedError)}}})});p=function(){var e=document.currentScript.dataset.publicKey;return e||i(n.requiredParam(o.publicKey)),e}(),(d=f(p)).exposeValues([{name:"initialize",value:d.initialize}])})()})();