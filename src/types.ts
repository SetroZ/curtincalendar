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
  time: {
    start: {
      hour: number;
      minutes: number;
    };
    end: {
      hour: number;
      minutes: number;
    };
    differenceInMinutes: number;
  };
  title: string;
}

export interface MonthListType {
  Februray: Date;
  May: Date;

  July: Date;
  October: Date;
}
