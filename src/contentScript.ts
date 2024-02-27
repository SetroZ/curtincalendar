'use strict';

const tableRootId = 'ctl00_Content_ctlTimetableMain_DayGrp';

import { createICS } from './utils/createIcs';
import { commands } from './utils/types';

async function handleDownload() {
  const result = await createICS();
  const fileName = 'CurtintimeTable.ics';
  return { result, fileName };
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command == commands.download) {
    handleDownload().then((res) => {
      sendResponse(res);
    });
  }

  return true;
});
