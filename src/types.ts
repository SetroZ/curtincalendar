export enum command {
  download = 'download',
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
}

export interface MonthListType {
  Februray: Date;
  May: Date;

  July: Date;
  October: Date;
}

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
