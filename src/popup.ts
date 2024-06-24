'use strict';

import './popup.css';
import { command } from './types';

// State
let loading = false;
const visible = 'inline-block';
const hidden = 'none';
const button = document.getElementById(command.download) as HTMLElement;
const loader = document.getElementById('loader') as HTMLElement;
const errorElement = document.getElementById('error') as HTMLElement;

function setLoading(isVisible: boolean) {
  if (!isVisible) {
    loading = false;
    button.style.display = visible;
    loader.style.display = hidden;
  } else {
    loading = true;
    button.style.display = hidden;
    loader.style.display = visible;
  }
}

function onError(errorMessage: string) {
  errorElement.style.display = visible;
  loader.style.display = hidden;
  const message = errorElement.innerText;
  errorElement.innerText = errorElement.innerText + ' \n ' + errorMessage;
  setTimeout(async () => {
    errorElement.style.display = hidden;
    errorElement.innerText = message;

    setLoading(false);
  }, 5000);
}

function onClick() {
  button.addEventListener('click', async () => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      const { result, fileName }: { result: string; fileName: string } =
        (await chrome.tabs.sendMessage(tab.id as number, {
          command: command.download,
          semester: getSelectedSemester(),
        })) as any;

      const icsFile = new File([result as string], fileName, {
        type: 'text/calendar',
      });
      const url = URL.createObjectURL(icsFile);
      chrome.downloads.download({
        url: url,
        filename: fileName,
      });
      setLoading(false);
    } catch (error) {
      onError(error as string);
    }
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
  } else if (yearMonths[1].includes(month)) {
    return 2;
  }
}
/** Approxmiates current semester and modifies radio button */
function setDefaultSemester() {
  const semesterId = `semester${currentSem()}`;
  document.getElementById(semesterId)?.setAttribute('checked', 'true');
}

/**Reads selected semester */
function getSelectedSemester(): 1 | 2 {
  const sem1 = document.getElementById('semester1')?.getAttribute('checked');
  const sem2 = document.getElementById('semester1')?.getAttribute('checked');
  if (sem1 == 'true') {
    return 1;
  } else {
    return 2;
  }
}

function main() {
  setDefaultSemester();
  onClick();
}
main();
