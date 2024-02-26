function getnthMonday(date: Date, n: number) {
  while (date.getDay() !== 1) {
    date.setDate(date.getDate() + 1);
  }
  date.setDate(date.getDate() + 7 * (n - 1));
  return date.getDate();
}
const monthList = ['Februray', 'June', 'July', 'October'];
interface datesType {
  Februray: Date;
  June: Date;

  July: Date;
  October: Date;
}
function getMonth() {
  const currentYear = new Date().getFullYear();
  let dates = {};
  monthList.forEach((month) => {
    dates[month] = new Date(`${month} 1, ${currentYear}`);
  });

  return { ...(dates as unknown as datesType), currentYear };
}
const yearMonths = [
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11],
];
function currentSem() {
  const month = new Date().getMonth();
  if (yearMonths[0].includes(month)) {
    return 1;
  } else if (yearMonths[1].includes(month)) {
    return 2;
  }
}

export function getDates() {
  const { Februray, June, July, October, currentYear } = getMonth();
  return {
    sem1: {
      start: getnthMonday(Februray, 4),
      end: getnthMonday(June, 1) - 1,
    },
    sem2: {
      start: getnthMonday(July, 4),
      end: getnthMonday(October, 4) - 1,
    },
    currentYear,
    currentSem: currentSem(),
  };
}

console.log(getDates());
