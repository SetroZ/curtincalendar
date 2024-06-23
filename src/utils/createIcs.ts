import { EventAttributes, createEvents } from 'ics';
import { getDates } from './format/getDates';
import scrapData from './scrapData';

/**  ICS frequency rule */
const RRULE = ({
  day,
  month,
  year,
}: {
  day: string;
  month: string;
  year: number;
}) =>
  `FREQ=WEEKLY;INTERVAL=1;UNTIL=${year}${
    month.length == 1 ? '0' + month : month
  }${day.length == 1 ? '0' + day : day}T160000Z`;

// const icsDays = ['MO', 'TU', 'WE', 'TH', 'FR'];
export const createICS = async (semester: 1 | 2) => {
  const dates = getDates(new Date().getFullYear());
  const events: EventAttributes[] = [];
  let index = -1;
  const semDates = dates[semester];
  const result = await scrapData();
  Object.keys(result).forEach((key) => {
    index++;
    const dayResult = result[key];
    if (dayResult.length == 0) return;
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
          dates.currentYear, //year
          semDates.start.month, //month
          semDates.start.day + index, //day
          event.time.start.hour, //hour
          event.time.start.minutes, // minute
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
          day: (semDates.end.day + index).toString(),
          month: semDates.end.month.toString(),
          year: dates.currentYear,
        }),
      };

      console.log(singleEvent);
      events.push(singleEvent);
    });
  });
  const { error, value } = createEvents(events);

  return value;
};
