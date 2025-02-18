'use strict';

import './popup.css';
import { command } from './types';

// State

const visible = 'inline-block';
const hidden = 'none';
const button = document.getElementById(command.download) as HTMLElement;
const loader = document.getElementById('loader') as HTMLElement;
const errorElement = document.getElementById('error') as HTMLElement;

async function isLoading() {
  const loading =
    (await chrome.storage.local.get('forward')).forward == 0 ? true : false;

  if (loading) {
    button.style.display = hidden;
    loader.style.display = visible;
  } else {
    button.style.display = visible;
    loader.style.display = hidden;
  }
  return loading;
}

function onError(errorMessage: string) {
  errorElement.style.display = visible;
  loader.style.display = hidden;
  const message = errorElement.innerText;
  errorElement.innerText = errorElement.innerText + ' \n ' + errorMessage;
  setTimeout(async () => {
    errorElement.style.display = hidden;
    errorElement.innerText = message;

    isLoading();
  }, 5000);
}

async function onClick() {
  button.addEventListener('click', async () => {
    try {
      await isLoading();
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      (await chrome.tabs.sendMessage(tab.id as number, {
        command: command.click,
        semester: getSelectedSemester(),
      })) as any;
      await isLoading();
    } catch (error) {
      // onError(error as string);
    }
  });
}

async function OnMessage() {
  chrome.runtime.onMessage.addListener(async function (
    request,
    sender,
    sendResponse
  ) {
    switch (request.command) {
      case command.download: {
        await isLoading();
        const icsFile = new File(
          [request.value as string],
          'CurtinCalendar.ics',
          {
            type: 'text/calendar',
          }
        );
        const url = URL.createObjectURL(icsFile);
        chrome.downloads.download({
          url: url,
          filename: 'CurtinCalendar.ics',
        });
        break;
      }
      case command.forward: {
        sendResponse(true);
      }
    }

    return true;
  });
}
// approximate semesters by month
const yearMonths = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11],
];
// set Radio
function currentSem() {
  const month = new Date().getMonth() + 1;
  if (yearMonths[0].includes(month)) {
    return 1;
  } else {
    return 2;
  }
}
/** Approxmiates current semester and modifies radio button */
function setDefaultSemester() {
  const semesterId = `semester${currentSem()}`;
  (document.getElementById(semesterId) as HTMLInputElement).checked = true;
}

/**Reads selected semester */
function getSelectedSemester(): 1 | 2 {
  const sem1 = (document.getElementById('semester1') as HTMLInputElement)
    .checked;
  const sem2 = (document.getElementById('semester2') as HTMLInputElement)
    .checked;
  if (sem1 == true) {
    return 1;
  } else if (sem2 == true) {
    return 2;
  } else {
    console.log("ERROR: can't find a selected semester");
    return currentSem();
  }
}

function main() {
  setDefaultSemester();
  onClick();
  OnMessage();
}
window.addEventListener('unload', async () => {
  await chrome.storage.local.clear();
});
main();
