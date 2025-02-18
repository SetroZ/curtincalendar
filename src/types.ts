export enum command {
  download = 'download',
  click = 'click',
  forward = 'forward',
}
export enum responses {
  fail = 'fail',
  success = 'success',
}

export enum errors {
  fetchLocation = 'fetchLocation',
  formatData = 'formatData',
  format = 'format',
}
export interface locationResponseType {
  result: [
    {
      geometry: {
        coordinates: [number, number];
      };
      zValue: number;
      dispBldNames: [string];
    }
  ];
}

export interface classTimeType {
  start: timeStamp;
  end: timeStamp;
  differenceInMinutes: number;
}
export type timeStamp = {
  hour: number;
  minutes: number;
};
export interface scrappedDataType {
  type: string;
  location: {
    placeName: [string];
    room: string;
    url: string;
    floor: number;
    coordinates: {
      long: number;
      lat: number;
    };
  };
  time: classTimeType;
  title: string;
  date: Date;
}

export interface monthListType {
  Februray: Date;
  May: Date;

  July: Date;
  October: Date;
}

export const webMonths = [
  '0',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export const webDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
export interface semesterDatesType {
  1: {
    start: {
      month: number;
      day: number;
    };
    end: {
      month: number;
      day: number;
    };
  };
  2: {
    start: {
      month: number;
      day: number;
    };
    end: {
      month: number;
      day: number;
    };
  };
}
