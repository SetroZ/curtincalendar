// ctl00_Content_ctlTimetableMain_TueDayCol_Body_2_BodyContentPanel seminar(6) 10am-120am 2022 122
// id="ctl00_Content_ctlTimetableMain_TueDayCol_Body_2_HeaderPanel" name

import { scrappedDataType } from '../types';
import { convertTime, getLocation } from './format/formatData';

const dataId = (day: string, count: number) => ({
  metaDataId: `ctl00_Content_ctlTimetableMain_${day}DayCol_Body_${count}_BodyContentPanel`,
  nameId: `ctl00_Content_ctlTimetableMain_${day}DayCol_Body_${count}_HeaderPanel`,
});

const webDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const metDataClassNames = {
  type: 'cssTtableClsSlotWhat',
  location: 'cssTtableClsSlotWhere',
  time: 'cssTtableClsSlotWhen',
};
interface metaDataType {
  type: string;
  location: string;
  time: Date | false;
  title: string;
}

export default async function scrapData() {
  let results: scrappedDataType[][] = [];
  let index = -1;
  for (const day of webDays) {
    index++;
    let count = 0;
    let debounce = false;
    while (true) {
      const ids = dataId(day, count);
      const metDataElement = document.getElementById(ids.metaDataId);
      const nameIdElement = document.getElementById(ids.nameId);
      if (debounce == false) {
        debounce = true;
        results[index] = [] as scrappedDataType[];
      }
      if (metDataElement == null || nameIdElement == null) {
        break;
      }

      const data: any = {
        type: '',
        location: '',
        time: '',
        title: '',
      };
      for (const [key, value] of Object.entries(metDataClassNames)) {
        const result = metDataElement.querySelector('.' + value)!
          .textContent as string;
        data[key] =
          key == 'time'
            ? convertTime(result)
            : key == 'location'
            ? await getLocation(result)
            : result;
      }
      data['title'] = (nameIdElement.textContent as string).replace(/\s+/g, '');

      (results[index] as [any]).push(data);
      count++;
    }
    debounce = false;
  }
  return results;
}
