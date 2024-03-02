'use strict';

import { command } from './types';
import { createICS } from './utils/createIcs';

async function handleDownload() {
  const result = await createICS();

  const fileName = 'CurtinCalendar.ics';
  return { result, fileName };
}

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
