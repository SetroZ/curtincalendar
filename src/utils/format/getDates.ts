import { MonthListType } from '../../types';
function getnthMonday(date: Date, n: number) {
  const newDate = new Date(date);
  while (newDate.getDay() !== 1) {
    newDate.setDate(newDate.getDate() + 1);
  }
  newDate.setDate(newDate.getDate() + 7 * (n - 1));
  return newDate;
}
function addnWeeks(date: Date, n: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 7 * n);
  return newDate;
}

const monthList = ['Februray', 'May', 'July', 'October'];

function getDatesofMonths(year: number) {
  const currentYear = year;
  let dates: any = {};
  monthList.forEach((month) => {
    dates[month] = new Date(`${month} 1, ${currentYear}`);
  });

  return { ...(dates as unknown as MonthListType), currentYear };
}

export function getDates(year: number) {
  const { Februray } = getDatesofMonths(year);
  const startSem1: Date = getnthMonday(Februray, 4);
  const endSem1: Date = addnWeeks(startSem1, 13);
  const startSem2: Date = addnWeeks(endSem1, 8);
  const endSem2: Date = addnWeeks(startSem2, 13);
  return {
    1: {
      start: {
        month: 2,
        day: startSem1.getDate(),
      },
      end: {
        month: 5,
        day: endSem1.getDate() - 1,
      },
    },
    2: {
      start: {
        month: 7,
        day: startSem2.getDate(),
      },
      end: {
        month: 10,
        day: endSem2.getDate() - 1,
      },
    },
    currentYear: year,
  };
}

// quick Test
function testGetDates() {
  for (let i = 2022; i < 2028; i++) {
    console.log(getDates(i));
  }
}
