import { EventAttributes } from 'ics';
import { getDates } from './format/getDates';

export const dateInput = document.getElementById(
  'ctl00_Content_ctlFilter_TxtStartDt'
) as HTMLInputElement;

export const forwardButton = document.getElementById(
  'ctl00_Content_ctlActionBarBottom_WkNext'
) as HTMLButtonElement;

export const refreshButton = document.getElementById(
  'ctl00_Content_ctlFilter_BtnSearch'
) as HTMLButtonElement;

export function setDate(sem: number) {
  const dates = getDates(new Date().getFullYear());
  const events: EventAttributes[] = [];
  const start = dates[sem as 1 | 2].start;
  dateInput.value = `${start.day}-${start.month}-${new Date().getFullYear()}`;
  refreshButton.click();
}

export function readDate() {
  return new Date(dateInput.value);
}
export function ClickForward() {
  forwardButton.click();
}

function setDate2() {
  // const enterKeyEvent = new KeyboardEvent('keydown', {
  //   key: 'Enter',
  //   code: 'Enter',
  //   which: 13,
  //   keyCode: 13,
  // });
  // focus();
  // dateInput.focus();
  // dateInput.dispatchEvent(enterKeyEvent);
  // setTimeout(() => {
  //   dateInput.dispatchEvent(enterKeyEvent);
  //   refreshButton.click();
  // }, 1000);
}
