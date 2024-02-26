import { createEvent } from 'ics';
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
const sem1 = {
  start: 'Februray',
  end: 'June',
};
const sem2 = {
  start: 'July',
  end: 'October',
};
const createICS = async () => {
  const dates = getDates();
  const result = await scrapData();
  const icsResult = result.map((dayResult) => {
    let index = 1;
    const { start, end } = semdates[dates.currentSem];

    if (dayResult.length != 0) {
      dayResult.forEach((event) => {
        const difference =
          (event.time.start.hour - event.time.end.hour) * 60 +
          Math.abs(event.time.start.minutes - event.time.end.minutes);
        const { error, value } = createEvent({
          title: event.title,
          start: [
            dates.currentYear,
            start,
            dates[dates.currentSem].start,
            event.time.start.hour,
            event.time.start.minutes,
          ],
          duration: { minutes: difference },
          location:event.location.placeName[0]
        });
      });
    }
  });

  return result;
};
