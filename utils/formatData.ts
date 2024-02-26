//example of a string
// 8:00 am-10:00 am<

const timeHandler = (splitted: string[], n = 0) => {
  return { hour: Number(splitted[0]) + n, minutes: Number(splitted[1]) };
};
export default function convertTime(timeString: string) {
  const times = timeString.replace(' ', '').replace(',', '').split('-');
  const formattedTimes = times.map((time) => {
    if (time.match('am')) {
      const splitted = time.split('am')[0].split(':');
      console.log(splitted);
      return timeHandler(splitted);
    } else if (time.match('pm')) {
      const splitted = time.split('pm')[0].split(':');
      return timeHandler(splitted, 12);
    }
  });
  return { start: formattedTimes[0], end: formattedTimes[1] };
}
