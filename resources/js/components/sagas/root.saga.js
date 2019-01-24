import { all } from 'redux-saga/effects';
import { rootAirportSaga } from './airport.saga';
import { rootAirlineSaga } from './airline.saga';
import { rootFlightSaga } from './flight.saga';
import { rootRunawaySaga } from './runaway.saga';

export function* rootSaga() {
    yield all([
        rootAirportSaga(),
        rootAirlineSaga(),
        rootFlightSaga(),
        rootRunawaySaga()
    ]);
}