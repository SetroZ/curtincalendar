'use strict';

const sem1 = {
  start: 'Februray',
  end: 'June',
};
const sem2 = {
  start: 'July',
  end: 'October',
};
import scrapData from './utils/scrapData';
const tableRootId = 'ctl00_Content_ctlTimetableMain_DayGrp';

import { commands } from './utils/communication';
import { getDates } from './utils/getDates';
const createICS = async () => {
  const { sem1, sem2, currentYear, currentSem } = getDates();
  const result = await scrapData();
  return result;
};

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  console.log('injected');
  if (request.command === commands.get) {
    const response = await createICS();
    sendResponse(response);
  }
});
