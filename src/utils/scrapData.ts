// ctl00_Content_ctlTimetableMain_TueDayCol_Body_2_BodyContentPanel seminar(6) 10am-120am 2022 122
// id="ctl00_Content_ctlTimetableMain_TueDayCol_Body_2_HeaderPanel" name

// <!-- MetaData -->
// <div
//   id="ctl00_Content_ctlTimetableMain_TueDayCol_Body_3_BodyContentPanel"
//   class="cssTtableBodyContentPanel"
// >
//   <br />
//   <span class="cssTtableClsSlotWhat">Workshop (15)</span>
//   <span class="cssTtableClsSlotWhen">, 8:00 am-10:00 am</span>
//   <span class="cssTtableClsSlotWhere">212 107</span>
// </div>

// <!-- Title -->
// <div
//   id="ctl00_Content_ctlTimetableMain_TueDayCol_Body_3_HeaderPanel"
//   class="cssTtableHeaderPanel"
// >
//   NPSC1003
// </div>

import { scrappedDataType } from '../types';
import { convertTime, getLocation } from './format/formatData';

/**Returns HTMl element id to be read. Check dataExample.html for an example*/
const generateElemtntId = (day: string, count: number) => ({
  metaDataId: `ctl00_Content_ctlTimetableMain_${day}DayCol_Body_${count}_BodyContentPanel`,
  nameId: `ctl00_Content_ctlTimetableMain_${day}DayCol_Body_${count}_HeaderPanel`,
});

// days in a format that matches the website element ids
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

/**  Reads data from webpage returns scrappedData */
export default async function scrapData() {
  let results: scrappedDataType[][] = [];
  let index = -1;
  for (const day of webDays) {
    index++;
    let count = 0;
    let debounce = false;
    while (true) {
      //keep reading until we cant find any more classes for the specific webDay
      const elementId = generateElemtntId(day, count);
      const metDataElement = document.getElementById(elementId.metaDataId);
      const nameIdElement = document.getElementById(elementId.nameId);
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
