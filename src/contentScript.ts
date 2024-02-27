'use strict';

const tableRootId = 'ctl00_Content_ctlTimetableMain_DayGrp';

import { createICS } from './utils/createIcs';

async function handleDownload() {
  const result = await createICS();
  const fileName = 'CurtintimeTable.ics';
  return { result, fileName };
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  handleDownload().then((res) => {
    console.log(res);

    sendResponse(res);
  });
  console.log('fired');
  return true;
});
console.log('intialized');
