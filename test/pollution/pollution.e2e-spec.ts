import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { AirQualityApiService } from '../../src/pollution/services/air-quality-api.service';

describe('Pollution endpoint', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AirQualityApiService)
      // mocking getAirDataInNearestCity function because it depends on a third party API
      .useValue({
        getAirDataInNearestCity: jest.fn().mockResolvedValue({
          city: "Blida",
          state: "Blida",
          country: "Algeria",
          locationn: {
            type: "Point",
            coordinates: [
              2.8277,
              36.47004
            ]
          },
          current: {
            pollution: {
              ts: "2023-02-01T12:00:00.000Z",
              aqius: 29,
              mainus: "p2",
              aqicn: 10,
              maincn: "p2"
            },
            weather: {
              ts: "2023-02-01T14:00:00.000Z",
              tp: 13,
              pr: 1026,
              hu: 45,
              ws: 2.45,
              wd: 349,
              ic: "01d"
            }
          }
        }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return the pollution data of the nearest city to the given coordinates /pollution (GET)', () => {
    return request(app.getHttpServer())
      .get('/pollution')
      .send({ longitude: 2.829758, latitude: 36.475792 })
      .expect(200)
      .expect({
        Result: {
          Pollution: {
            ts: "2023-02-01T12:00:00.000Z",
            aqius: 29,
            mainus: "p2",
            aqicn: 10,
            maincn: "p2"
          }
        }
      });
  });

  it('should return an error if longitude is missing from the body of the request /pollution (GET)', () => {
    return request(app.getHttpServer())
      .get('/pollution')
      .send({ latitude: 36.475792 })
      .expect(400)
  });

  it('should return an error if latitude is missing from the body of the request /pollution (GET)', () => {
    return request(app.getHttpServer())
      .get('/pollution')
      .send({ longitude: 2.829758 })
      .expect(400)
  });

  afterAll(async () => {
    await app.close();
  });
});