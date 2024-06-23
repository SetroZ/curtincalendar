'use strict';

import './popup.css';
import { command } from './types';

// approximate semester
const yearMonths = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11],
];
function currentSem() {
  const month = new Date().getMonth() + 1;
  console.log(month);
  if (yearMonths[0].includes(month)) {
    return 1;
  } else if (yearMonths[1].includes(month)) {
    return 2;
  }
}
const semesterId = `semester${currentSem()}`;
console.log(semesterId);
document.getElementById(semesterId)?.setAttribute('checked', 'true');
console.log(document.getElementById(semesterId));

function getSelectedSemester(): 1 | 2 {
  const sem1 = document.getElementById('semester1')?.getAttribute('checked');
  const sem2 = document.getElementById('semester1')?.getAttribute('checked');
  if (sem1 == 'true') {
    return 1;
  } else {
    return 2;
  }
}

document
  .getElementById(command.download)
  ?.addEventListener('click', async () => {
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
  });
