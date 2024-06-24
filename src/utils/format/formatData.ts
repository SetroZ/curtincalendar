import { classTimeType, locationResponseType, timeStamp } from '../../types';

/**takes "Xam/pm"  and returns timeStamp{hours,minutes} */
const Format24 = (time: string): timeStamp => {
  let splitted;
  let n = 0;
  if (time.match('am')) {
    splitted = time.split('am')[0].split(':'); // gets hour and minutes [8,00]
  } else {
    // PM
    if (time[0] == '1' && time[1] == '2') {
      splitted = time.split('pm')[0].split(':'); // 12 pm case
    } else {
      splitted = time.split('pm')[0].split(':');
      n = 12;
    }
  }
  return { hour: Number(splitted[0]) + n, minutes: Number(splitted[1]) };
};

// ,8:00 am-10:00 am
/** remove any spaces & remove comma & splits into [Xam/pm, Yam/pm] */
const splitToStartEnd = (timeString: string) => {
  const res = timeString.replace(' ', '').replace(',', '').split('-');
  return { start: res[0], end: res[1] };
};

/**Converts time read  ",8:00 am-10:00 am" to classTime object */
export function convertTime(timeString: string): classTimeType {
  const time = splitToStartEnd(timeString);
  const start = Format24(time.start);
  const end = Format24(time.end);

  const differenceInMinutes =
    (end.hour - start.hour) * 60 + Math.abs(start.minutes - end.minutes);
  return { start, end, differenceInMinutes };
}

console.log(convertTime(',8:00 am-12:00 pm'));

//212 107
const splitAt = (index: number, array: string) => [
  array.slice(0, index),
  array.slice(index),
];

const getMazeMapURL = (q: string) =>
  `https://search.mazemap.com/search/equery/?q=${q}&rows=1&start=0&withpois=true&withbuilding=true&withtype=true&withcampus=true&campusid=296&lng=115.89582570734012&lat=-32.00742307052456&boostbydistance=true`;

const googleMapsURL = ({ long, lat }: { long: number; lat: number }) =>
  `https://www.google.com/maps/search/?api=1&query=${long}%2C${lat}`;

export async function getLocation(location: string) {
  try {
    const splitted = splitAt(3, location.replace(' ', ''));
    const formatted = splitted[0] + '.' + splitted[1];

    const res = await fetch(getMazeMapURL(formatted));

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
      url: googleMapsURL({
        long: data.geometry.coordinates[1],
        lat: data.geometry.coordinates[0],
      }),
    };
  } catch (error) {
    return false;
  }
}
