'use strict';

import { createICS } from './utils/createIcs';
import { command } from './utils/types';

async function handleDownload() {
  const result = await createICS();
  const fileName = 'CurtintimeTable.ics';
  return { result, fileName };
}
console.log('intialized');
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.command) {
    case command.download: {
      handleDownload().then((res) => {
        sendResponse(res);
      });
      break;
    }
  }
  return true;
});
