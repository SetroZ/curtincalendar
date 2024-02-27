'use strict';

import './popup.css';
import { commands } from './utils/communication';

document.getElementById(commands.get)?.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const { result, fileName }: { result: string; fileName: string } =
    await chrome.tabs.sendMessage(tab.id, {
      command: commands.get,
    });
  const icsFile = new File([result as string], fileName, {
    type: 'text/calendar',
  });
  const url = URL.createObjectURL(icsFile);
  chrome.downloads.download({
    url: url,
    filename: fileName,
  });
});
