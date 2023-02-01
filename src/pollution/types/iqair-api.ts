export type NearestCityAirQualityResponseSuccessData = {
    city: string,
    state: string,
    country: string,
    location: {
        type: string,
        coordinates: [
            number,
            number
        ]
    },
    current: {
        pollution: {
            ts: Date,
            aqius: number,
            mainus: string,
            aqicn: number,
            maincn: string
        },
        weather: {
            ts: Date,
            tp: number,
            pr: number,
            hu: number,
            ws: number,
            wd: number,
            ic: string
        }
    }
}

export type NearestCityAirQualitySuccessRespons = {
    status: string,
    date: NearestCityAirQualityResponseSuccessData
}
