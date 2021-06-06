let adInterceptorBlock = {
  settings: {
    ajaxInterceptor_switchOn: true,
    ajaxInterceptor_rules: [],
  },
  originalXHR: window.XMLHttpRequest,
  myXHR: function() {
    let pageScriptEventDispatched = false;
    const modifyResponse = () => {
      adInterceptorBlock.settings.ajaxInterceptor_rules.forEach(({switchOn = true, match, overrideTxt = ''}) => {
        if (switchOn && match && this.responseURL.indexOf(match) > -1) {
          this.responseText = overrideTxt;
          this.response = overrideTxt;

          if (!pageScriptEventDispatched) {
            window.dispatchEvent(new CustomEvent("pageScript", {
              detail: {url: this.responseURL, match}
            }));
            pageScriptEventDispatched = true;
          }
        }
      })
    }

    const xhr = new adInterceptorBlock.originalXHR;
    for (let attr in xhr) {
      if (attr === 'onreadystatechange') {
        xhr.onreadystatechange = (...args) => {
          if (this.readyState == 4) {
            // 请求成功
            if (adInterceptorBlock.settings.ajaxInterceptor_switchOn) {
              // 开启拦截
              modifyResponse();
            }
          }
          this.onreadystatechange && this.onreadystatechange.apply(this, args);
        }
        continue;
      } else if (attr === 'onload') {
        xhr.onload = (...args) => {
          // 请求成功
          if (adInterceptorBlock.settings.ajaxInterceptor_switchOn) {
            // 开启拦截
            modifyResponse();
          }
          this.onload && this.onload.apply(this, args);
        }
        continue;
      }

      if (typeof xhr[attr] === 'function') {
        this[attr] = xhr[attr].bind(xhr);
      } else {
        // responseText和response不是writeable的，但拦截时需要修改它，所以修改就存储在this[`_${attr}`]上
        if (attr === 'responseText' || attr === 'response') {
          Object.defineProperty(this, attr, {
            get: () => this[`_${attr}`] == undefined ? xhr[attr] : this[`_${attr}`],
            set: (val) => this[`_${attr}`] = val,
            enumerable: true
          });
        } else {
          Object.defineProperty(this, attr, {
            get: () => xhr[attr],
            set: (val) => xhr[attr] = val,
            enumerable: true
          });
        }
      }
    }
  },

  originalFetch: window.fetch.bind(window),
  myFetch: function(...args) {
    return adInterceptorBlock.originalFetch(...args).then((response) => {
      let txt = undefined;
      adInterceptorBlock.settings.ajaxInterceptor_rules.forEach(({match, overrideTxt = ''}) => {
        if (match && response.url.indexOf(match) > -1) {
          window.dispatchEvent(new CustomEvent("pageScript", {
            detail: {url: response.url, match}
          }));
          txt = overrideTxt;
        }
      });

      if (txt !== undefined) {
        const stream = new ReadableStream({
          start(controller) {
            const bufView = new Uint8Array(new ArrayBuffer(txt.length));
            for (var i = 0; i < txt.length; i++) {
              bufView[i] = txt.charCodeAt(i);
            }

            controller.enqueue(bufView);
            controller.close();
          }
        });

        const newResponse = new Response(stream, {
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        });
        const proxy = new Proxy(newResponse, {
          get: function(target, name){
            switch(name) {
              case 'ok':
              case 'redirected':
              case 'type':
              case 'url':
              case 'useFinalURL':
              case 'body':
              case 'bodyUsed':
                return response[name];
            }
            return target[name];
          }
        });

        for (let key in proxy) {
          if (typeof proxy[key] === 'function') {
            proxy[key] = proxy[key].bind(newResponse);
          }
        }

        return proxy;
      } else {
        return response;
      }
    });
  },
}



adInterceptorBlock.settings['ajaxInterceptor_switchOn'] = true;
let dtJson=
    {
        "message":"操作成功",
        "result":{
            "currentPage":1,
            "endRow":100,
            "list":[
                {
                    "agentName":"",
                    "billCode":"73220458354032",
                    "carSignCode":"",
                    "class":"2",
                    "disorsenManCode":"02100.02131",
                    "dispatchOrSendMan":"",
                    "fastType":"",
                    "goodsType":"物品",
                    "ownerBagNo":"",
                    "pdaCode":"XJ1908IN00218323",
                    "preOrNextStationId":0,
                    "preProvinceId":0,
                    "registerDate":1583956875000,
                    "scanDate":1583956823000,
                    "scanManCode":"02100.02131",
                    "scanManName":"危宛",
                    "scanSiteId":2743,
                    "scanSiteName":"上海",
                    "userName":"危宛",
                    "weight":0
                }

            ],
            "pageSize":100,
            "startRow":0,
            "totalPage":1,
            "totalRow":53
        },
        "status":true,
        "statusCode":"SYS000"
    }

// chrome.storage.local.get(['ajaxInterceptor_switchOn', 'ajaxInterceptor_rules'], (result) => {
//     // if (result.ajaxInterceptor_switchOn) {
//     if (result.ajaxInterceptor_rules) {
//         document.querySelector("#url").value=result.ajaxInterceptor_rules[0].match
//         document.querySelector("#reponseText").value=result.ajaxInterceptor_rules[0].overrideTxt
//     }
//     // }
//
// });

// adInterceptorBlock.settings['ajaxInterceptor_rules'] = [
//     {match:
//      overrideTxt: dtJson
//     },
// ];
window.XMLHttpRequest = adInterceptorBlock.myXHR;
window.fetch = adInterceptorBlock.myFetch;


window.addEventListener("message", function(event) {
    const data = event.data;
    console.log(data)
    // 匹配 85555555555555
    console.log('44444444444444444444')
    if (data.type === 'ajaxInterceptor' && data.to === 'background1') {
        adInterceptorBlock.settings[data.key]=data.value
    }
}, false);
// chrome.runtime.onMessage.addListener(msg => {
//     console.log(event)
//     console.log('1231312312312')
//     if (msg.type === 'ajaxInterceptor' && msg.to === 'background1') {
//
//             // postMessage({...msg, to: 'pageScript'});
//     }
// });
