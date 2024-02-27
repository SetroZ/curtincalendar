'use strict';

const tableRootId = 'ctl00_Content_ctlTimetableMain_DayGrp';

import { createICS } from './utils/createIcs';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const result = createICS().then((result) => {
    console.log(result);
  });
});
console.log('intialized');
