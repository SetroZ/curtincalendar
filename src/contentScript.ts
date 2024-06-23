'use strict';

import { command } from './types';
import { createICS } from './utils/createIcs';

async function handleDownload(semseter: 1 | 2) {
  const result = await createICS(semseter);

  const fileName = 'CurtinCalendar.ics';
  return { result, fileName };
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.command) {
    case command.download: {
      handleDownload(request.semester).then((res) => {
        sendResponse(res);
      });
      break;
    }
  }
  return true;
});
