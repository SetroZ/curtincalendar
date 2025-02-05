import { EventAttributes } from 'ics';
import { webDays } from '../types';
import { getDates } from './format/getDates';
import { readDate } from './loop';
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

export const addEvents = async (events: EventAttributes[]) => {
  const dates = getDates(new Date().getFullYear());

  const date = readDate();
  const result = await scrapData(date);

  Object.keys(result).forEach((key) => {
    const dayIndex = webDays.indexOf(key);
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
          event.date.getFullYear(),
          event.date.getMonth() + 1,
          event.date.getDate(),
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
      };

      events.push(singleEvent);
    });
  });
};
