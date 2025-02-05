'use strict';

import { command } from './types';

import { setDate } from './utils/buttons';

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  switch (request.command) {
    case command.click: {
      chrome.storage.local.set({ events: [], forward: 0 });
      setDate(request.semester);
      break;
    }
  }

  return true;
});
