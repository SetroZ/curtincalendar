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
  webDays.forEach(async (day) => {
    let count = 0;
    const ids = dataId(day, count++);
    const metDataElement = document.getElementById(ids.metaDataId);
    const nameIdElement = document.getElementById(ids.nameId);
    let debounce = false;
    while (metDataElement != null && nameIdElement != null) {
      if (debounce == false) {
        debounce = true;
        results[index] = [];
      }
      const data: metaDataType<string> = {
        type: '',
        location: '',
        time: '',
      };
      for (const [key, value] of Object.entries(metDataClassNames)) {
        const result = metDataElement.querySelector(value)!
          .textContent as string;

        data[key as keyof typeof any] =
          key == 'time'
            ? convertTime(result)
            : key == 'location'
            ? await getLocation(result)
            : result;
      }
      (results[index] as []).push(data);
    }
  });
  return results;
}
scrapData().then((res) => console.log(res));
