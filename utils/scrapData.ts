// ctl00_Content_ctlTimetableMain_TueDayCol_Body_2_BodyContentPanel seminar(6) 10am-120am 2022 122
// id="ctl00_Content_ctlTimetableMain_TueDayCol_Body_2_HeaderPanel" name

import convertTime from "./formatData";


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

export default function scrapData(tableRootId: string) {
  webDays.forEach((day) => {
    let count = 0;
    const ids = dataId(day, count++);
    const metDataElement = document.getElementById(ids.metaDataId);
    const nameIdElement = document.getElementById(ids.nameId);
    while (metDataElement != null && nameIdElement != null) {
      const data:metaDataType<string> = {
        type: '',
        location: '',
        time: '',
      };
      for (const [key, value] of Object.entries(metDataClassNames)) {
        const result = metDataElement.querySelector(
          value
        )!.textContent as string;

        textData[key as keyof typeof textData] = key=='time'? convertTime(result)
      }
      const formattedData:metaDataType<{start:number , end:number}> = {
        time: convertTime(textData.time)
      };
     
    }
  });
}
