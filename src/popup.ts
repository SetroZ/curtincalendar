'use strict';

import './popup.css';
import { commands } from './utils/communication';

document.getElementById(commands.get)?.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id as number,
      { type: commands.get },
      function (response) {
        alert(response);
      }
    );
  });
});

// setTimeout(() => {
//   chrome.runtime.sendMessage({
//     greeting: 'hello',
//   });
// }, 5000);
