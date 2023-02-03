import { Pollution } from './pollution';

export type AirData = {
  city: string;
  state: string;
  country: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  current: {
    pollution: Pollution;
    weather: {
      ts: Date;
      tp: number;
      pr: number;
      hu: number;
      ws: number;
      wd: number;
      ic: string;
    };
  };
};

export type AirDataResponse = {
  status: string;
  data: AirData;
};
