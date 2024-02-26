// ctl00_Content_ctlTimetableMain_TueDayCol_Body_2_BodyContentPanel seminar(6) 10am-120am 2022 122
// id="ctl00_Content_ctlTimetableMain_TueDayCol_Body_2_HeaderPanel" name

import { convertTime, getLocation } from './formatData';

const dataId = (day: string, count: number) => ({
  metaDataId: `ctl00_Content_ctlTimetableMain_${day}DayCol_Body_${count}_BodyContentPanel`,
  nameId: `ctl00_Content_ctlTimetableMain_${day}DayCol_Body_${count}_HeaderPanel`,
});

const webDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const icsDays = ['MO', 'TU', 'WE', 'TH', 'FR'];
const metDataClassNames = {
  type: 'cssTtableClsSlotWhat',
  location: 'cssTtableClsSlotWhere',
  time: 'cssTtableClsSlotWhen',
};
interface metaDataType<TimeType> {
  type: string;
  location: string;
  time: TimeType;
}

export default async function scrapData() {
  let results: any[] = [];
  let index = 0;
  for (const day of webDays) {
    let count = 0;
    let debounce = false;
    index++;
    while (true) {
      const ids = dataId(day, count);
      const metDataElement = document.getElementById(ids.metaDataId);
      const nameIdElement = document.getElementById(ids.nameId);
      if (metDataElement == null || nameIdElement == null) {
        break;
      }

      if (debounce == false) {
        debounce = true;
        results[index] = [];
      }

      const data: any = {
        type: '',
        location: '',
        time: '',
      };
      for (const [key, value] of Object.entries(metDataClassNames)) {
        const result = metDataElement.querySelector('.' + value)!
          .textContent as string;
        console.log(result);
        data[key] =
          key == 'time'
            ? convertTime(result)
            : key == 'location'
            ? await getLocation(result)
            : result;
      }
      (results[index] as [any]).push(data);
      count++;
    }
    debounce = false;
  }
  return results;
}
