'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page

// ctl00_Content_ctlTimetableMain_TueDayCol_Body_2_BodyContentPanel seminar(6) 10am-120am 2022 122
// id="ctl00_Content_ctlTimetableMain_TueDayCol_Body_2_HeaderPanel" name
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

import { getDates } from './utils/getDates';
const createICS = async () => {
  const { sem1, sem2, currentYear, currentSem } = getDates();
  const result = await scrapData();
  console.log(scrapData);
};

createICS().then((res) => res);
