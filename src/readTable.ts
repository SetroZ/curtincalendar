'use strict';

import { createEvents, EventAttributes } from 'ics';
import { command } from './types';
import { ClickForward, dateInput, refreshButton } from './utils/buttons';
import { addEvents } from './utils/scrapEvents';
async function readTable() {
  const data = await chrome.storage.local.get(['forward', 'events']);
  const events: EventAttributes[] = data.events;
  const forward: number = data.forward;
  if (forward < 13) {
    ClickForward();
    await chrome.storage.local.set({ forward: forward + 1 });
    await addEvents(events);
    await chrome.storage.local.set({ events: events });
    try {
      const res = await chrome.runtime.sendMessage({
        command: command.forward,
      });
      if (!res) {
        await chrome.storage.local.clear();
      }
    } catch (error) {
      await chrome.storage.local.clear();
    }
  } else if (forward == 13) {
    chrome.storage.local.clear();
    const { value, error } = createEvents(events);
    (await chrome.runtime.sendMessage({
      command: command.download,
      value: value,
    })) as any;
    dateInput.value = '';
    refreshButton.click();
  }
}

readTable();
