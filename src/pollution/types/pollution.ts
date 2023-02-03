export type Pollution = {
  ts: Date;
  aqius: number;
  mainus: string;
  aqicn: number;
  maincn: string;
};

export type PollutionData = {
  Pollution: Pollution;
};

export type PollutionDatetime = {
  maxPollutionDateTime: Date;
  city: string;
};
