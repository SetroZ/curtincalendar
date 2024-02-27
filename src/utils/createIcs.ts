import { createEvents } from 'ics';
import { getDates } from './getDates';
import scrapData from './scrapData';

const semdates = {
  sem1: {
    start: 2,
    end: 6,
  },
  sem2: {
    start: 7,
    end: 10,
  },
};
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
  const dataList = [];
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
        : {};
      const value = {
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
        categories: ['Classes'],
        busyStatus: 'BUSY',
        description:
          event.title + ' ' + event.type + '\n ' + event.location.url,
        recurrenceRule: RRULE({
          day: (dates[dates.currentSem].end + index).toString(),
          month: end.toString(),
          year: dates.currentYear,
        }),
      };
      dataList.push(value);
    });
  });
  const { error, value } = createEvents(dataList);
  if (error) {
    return error;
  }
  return value;
};
