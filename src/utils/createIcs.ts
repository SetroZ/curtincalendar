import { EventAttributes, createEvents } from 'ics';
import { getDates } from './format/getDates';
import scrapData from './scrapData';

const semdates = {
  sem1: {
    start: 2,
    end: 5,
  },
  sem2: {
    start: 7,
    end: 10,
  },
};

//frequency rule
const RRULE = ({
  day,
  month,
  year,
}: {
  day: string;
  month: string;
  year: number;
}) =>
  `FREQ=WEEKLY;INTERVAL=1;UNTIL=${2024}${
    month.length == 1 ? '0' + month : month
  }${day.length == 1 ? '0' + day : day}T160000Z`;



const icsDays = ['MO', 'TU', 'WE', 'TH', 'FR'];
export const createICS = async () => {
  const dates = getDates();
  const dataList: EventAttributes[] = [];
  let index = -1;
  const result = await scrapData();
  console.log(result);
  result.forEach((dayResult) => {
    index++;
    if (dayResult.length == 0) return;
    const { start, end } = semdates[dates.currentSem];
    dayResult.forEach((event) => {
      const ifLocation = event.location
        ? {
            location: `${event.location.placeName[0]}  Room:${event.location.room}  floor:${event.location.floor}`,
            geo: {
              lat: event.location.coordinates.lat,
              lon: event.location.coordinates.long,
            },
          }
        : { location: 'ONLINE' };
      const singleEvent: EventAttributes = {
        startOutputType: 'local',
        title: event.title + ' ' + event.type,
        start: [
          dates.currentYear,
          start,
          dates[dates.currentSem].start + index,
          event.time.start.hour,
          event.time.start.minutes,
        ],
        duration: { minutes: event.time.differenceInMinutes },
        ...ifLocation,
        status: 'CONFIRMED',
        busyStatus: 'BUSY',
        description:
          event.title +
          ' ' +
          event.type +
          '\n ' +
          (event.location ? event.location.url : ''),
        recurrenceRule: RRULE({
          day: (dates[dates.currentSem].end + index).toString(),
          month: end.toString(),
          year: dates.currentYear,
        }),
      };

      console.log(singleEvent);
      dataList.push(singleEvent);
    });
  });
  const { error, value } = createEvents(dataList);

  return value;
};
