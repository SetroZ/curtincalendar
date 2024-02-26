//example of a string
// 8:00 am-10:00 am<

import { locationResponseType } from '../data';

const timeHandler = (splitted: string[], n = 0) => {
  return { hour: Number(splitted[0]) + n, minutes: Number(splitted[1]) };
};
export function convertTime(timeString: string) {
  const times = timeString.replace(' ', '').replace(',', '').split('-');
  const formattedTimes = times.map((time) => {
    if (time.match('am')) {
      const splitted = time.split('am')[0].split(':');

      return timeHandler(splitted);
    } else if (time.match('pm')) {
      const splitted = time.split('pm')[0].split(':');
      return timeHandler(splitted, 12);
    }
  });
  return { start: formattedTimes[0], end: formattedTimes[1] };
}
//212 107
const splitAt = (index: number, array: string | []) => [
  array.slice(0, index),
  array.slice(index),
];

const getURL = (q: string) =>
  `https://search.mazemap.com/search/equery/?q=${q}&rows=1&start=0&withpois=true&withbuilding=true&withtype=true&withcampus=true&campusid=296&lng=115.89582570734012&lat=-32.00742307052456&boostbydistance=true`;
export async function getLocation(location: string) {
  try {
    const splitted = splitAt(3, location.replace(' ', ''));
    const formatted = splitted[0] + '.' + splitted[1];
    const res = await fetch(getURL(formatted));

    const datares = (await res.json()) as locationResponseType;
    const data = datares.result[0];
    return {
      floor: data.zValue,
      coordinates: {
        long: data.geometry.coordinates[1],
        lat: data.geometry.coordinates[0],
      },
      placeName: data.dispBldNames,
      room: splitted[1],
    };
  } catch (error) {
    return false;
  }
}
