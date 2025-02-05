// chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
//   if (changeInfo.status === 'complete') {
//     const forward = (await chrome.storage.local.get('forward'))
//       .forward as number;
//     if (forward < 12) {
//       (await chrome.tabs.sendMessage(tabId as number, {
//         command: command.forward,
//       })) as any;
//     }
//   }
// });

chrome.runtime.onConnect.addListener(async (externalPort) => {
  externalPort.onDisconnect.addListener(async () => {
    console.log('onDisconnect');
    await chrome.storage.local.clear();
    // Do stuff that should happen when popup window closes here
  });
});
chrome.runtime.onConnect.addListener((port) => {
  port.onDisconnect.addListener(() => {
    console.log('onDisconnect23');
    //Your event will be fired in here
  });
});

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status === 'complete') {
//     chrome.storage.local.get(['pendingCommands'], (data) => {
//       if (data.pendingCommands) {
//         chrome.tabs.sendMessage(tabId, {
//           command: 'continueExecution',
//           commands: data.pendingCommands,
//         });
//         chrome.storage.local.remove('pendingCommands');
//       }
//     });
//   }
// });
