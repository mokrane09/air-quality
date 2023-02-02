import { Test, TestingModule } from '@nestjs/testing';
import { PollutionService } from './pollution.service';
import { AirQualityApiService } from './air-quality-api.service';

describe('PollutionService', () => {
  let pollutionService: PollutionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PollutionService,
        {
          provide: AirQualityApiService,
          useValue: {
            getAirDataInNearestCity: function () {
              return {
                city: 'Blida',
                state: 'Blida',
                country: 'Algeria',
                locationn: {
                  type: 'Point',
                  coordinates: [2.8277, 36.47004],
                },
                current: {
                  pollution: {
                    ts: '2023-02-01T12:00:00.000Z',
                    aqius: 29,
                    mainus: 'p2',
                    aqicn: 10,
                    maincn: 'p2',
                  },
                  weather: {
                    ts: '2023-02-01T14:00:00.000Z',
                    tp: 13,
                    pr: 1026,
                    hu: 45,
                    ws: 2.45,
                    wd: 349,
                    ic: '01d',
                  },
                },
              };
            },
          },
        },
      ],
    }).compile();

    pollutionService = module.get<PollutionService>(PollutionService);
  });

  it('should be defined', () => {
    expect(pollutionService).toBeDefined();
  });

  it('should be defined', async () => {
    expect(
      await pollutionService.getPollutionInNearestCityToCoordinates(
        36.475792,
        2.829758,
      ),
    ).toEqual({
      Pollution: {
        ts: '2023-02-01T12:00:00.000Z',
        aqius: 29,
        mainus: 'p2',
        aqicn: 10,
        maincn: 'p2',
      },
    });
  });
});
