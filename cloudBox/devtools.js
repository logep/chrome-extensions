"use strict";
let panelWindow = null;
if ("panels" in chrome.devtools)
{
        chrome.devtools.panels.create(
            "cloudBox",
            "alarm-clock-8-48.png",
            "devtools-panel.html",
            function (panel) {
                panel.onShown.addListener(window =>
                {

                    panelWindow = window;
                    chrome.storage.onChanged.addListener(function(changes, namespace) {
                        console.log(changes)
                        console.log(namespace)
                        console.log("23432423432432432")
                        panelWindow.postMessage("234243224", "*");
                    });
                });

                panel.onHidden.addListener(window =>
                {
                    panelWindow = null;
                });

                if (panel.onSearch)
                {
                    panel.onSearch.addListener((eventName, queryString) =>
                    {
                        if (panelWindow)
                            panelWindow.postMessage({type: eventName, queryString}, "*");
                    });
                }
            }

        );

  // chrome.runtime.sendMessage(
  //   {
  //     type: "prefs.get",
  //     key: "show_devtools_panel"
  //   },function (enabled) {
  //         {
  //             if (enabled)
  //             {
  //                 chrome.devtools.panels.create(
  //                     "cloudBox",
  //                     "alarm-clock-8-48.png",
  //                     "devtools-panel.html",
  //                     function (panel) {
  //                             panel.onShown.addListener(window =>
  //                             {
  //                                 panelWindow = window;
  //                             });
  //
  //                             panel.onHidden.addListener(window =>
  //                             {
  //                                 panelWindow = null;
  //                             });
  //
  //                             if (panel.onSearch)
  //                             {
  //                                 panel.onSearch.addListener((eventName, queryString) =>
  //                                 {
  //                                     if (panelWindow)
  //                                         panelWindow.postMessage({type: eventName, queryString}, "*");
  //                                 });
  //                             }
  //                     }
  //
  //                 );
  //             }
  //         }
  //     }
  //     );
}
