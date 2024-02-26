'use strict';


import scrapData from './utils/scrapData';
const tableRootId = 'ctl00_Content_ctlTimetableMain_DayGrp';

import { getDates } from './utils/getDates';
const createICS = async () => {
  const { sem1, sem2, currentYear, currentSem } = getDates();
  const result = await scrapData();

  return result;
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const result = createICS().then((result) => {
    console.log(result);
  });
});
console.log('intialized');
