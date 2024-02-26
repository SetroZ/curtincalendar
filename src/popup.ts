'use strict';

import './popup.css';
import { commands } from './utils/communication';
document.getElementById(commands.get)?.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({
    currentWindow: true,
  });
  const response = await chrome.tabs.sendMessage(tab.id as number, {
    command: commands.get,
  });
  // do something with response here, not outside the function
  console.log(response);
});
