'use strict';

import './popup.css';
import { command } from './utils/types';

document
  .getElementById(command.download)
  ?.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    const { result, fileName }: { result: string; fileName: string } =
      chrome.tabs.sendMessage(tab.id as number, {
        command: command.download,
      }) as any;
    const icsFile = new File([result as string], fileName, {
      type: 'text/calendar',
    });
    const url = URL.createObjectURL(icsFile);
    chrome.downloads.download({
      url: url,
      filename: fileName,
    });
  });
