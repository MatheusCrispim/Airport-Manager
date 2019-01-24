import { call, put, all, select, takeLatest } from 'redux-saga/effects';

import { airlineFeedback } from '../actions/airline.actions';
import { runawayFeedback } from "../actions/runaway.actions";
import { flightFeedback } from '../actions/flight.actions';
import { airportFeedback } from '../actions/airport.actions';

import { startLoading, finishLoading, finishRequest } from '../actions/components.actions';
import { AIRPORT } from '../actions/containers';

import { Service } from '../services/service';
import { AirportTypes } from '../actions/types';
import { unique } from '../utils/array.utils';

const { GET_AIRPORTS,
        REGISTER_AIRPORT,
        UPDATE_AIRPORT,
        DELETE_AIRPORT } = AirportTypes;

let pageNumber = 1;
const endpoint = '/api/airports/';
const { post, update, del, get } = new Service();


//Root airportsaga
export function* rootAirportSaga(){
    yield all([
        takeLatest(GET_AIRPORTS, getAirportsSaga),
        takeLatest(REGISTER_AIRPORT, registerAirportSaga),
        takeLatest(UPDATE_AIRPORT, updateAirportSaga),
        takeLatest(DELETE_AIRPORT, deleteAirportSaga),
    ]);
}


//Side effects of airport get
export function* getAirportsSaga(action){
    yield put(startLoading(AIRPORT));   
    let airportList = yield select(state => state.airport.airportList);
    let endpointGet = endpoint+'?page='+pageNumber;
    let statusCode, payload;

    try{
        let response = yield call(get, endpointGet);
        statusCode = response.status;
        let { data, meta } = response.responseBody;

        if( statusCode === 200 && pageNumber<=meta.last_page){
            airportList = airportList.concat(data).filter(unique);
            pageNumber++;
        }

    }catch(error){
        console.log(error);
    }

    payload = {response : {statusCode}, airportList};

    yield put(airportFeedback(payload));
    yield put(finishLoading(AIRPORT));
}


//Side effects of airport registration
export function* registerAirportSaga(action){
    yield put(startLoading(AIRPORT));   
    const { data } = action.payload;
    
    let airportList = yield select(state => state.airport.airportList);
    let statusCode, bodyText, payload;

    try{
        let response = yield call(post, endpoint, data);
        statusCode = response.status;
        
        if(statusCode === 201){
            airportList.unshift(response.body.data);
            bodyText = "Aeroporto cadastrado com sucesso!";
        }else{
            bodyText = response.body;
        }
        
    }catch(error){
        bodyText = "Erro desconhecido no servidor!";
    }

    payload = {response: {statusCode, bodyText}, airportList};

    yield put(airportFeedback(payload));
    yield put(finishLoading(AIRPORT));
    yield put(finishRequest(AIRPORT));
}


//Side effects of airport update
export function* updateAirportSaga(action){
    yield put(startLoading(AIRPORT));   

    const { id, data } = action.payload;
    
    let airportList = yield select(state => state.airport.airportList);
    let airportIndex =  airportList.findIndex(item => id === item.id);
    let airport = airportList[airportIndex];
    let airportCode = airport.code;


    let statusCode, bodyText, payload;

    try{
        let response = yield call(update, endpoint+id, data);
        statusCode = response.status;

        if(statusCode === 202){
            airportList.splice(airportIndex, 1, {
                ...airport,
                ...data,
            });

            let newAiportCode = airportList[airportIndex].code;

            if(airportCode !== newAiportCode){
                
                //This updates the airport code on runaways already loaded
                let runawayList = yield select(state => state.runaway.runawayList);
                yield runawayList.forEach((runaway, index) => {
                    if (runaway.airport_code === airportCode){
                        runaway.airport_code = newAiportCode;
                    };
                });
                let runawayPayload = {response: {statusCode:200}, runawayList};
                yield put(runawayFeedback(runawayPayload));


                //This updates the airport code on flights already loaded
                let flightList = yield select(state => state.flight.flightList);
                yield flightList.forEach((flight, index) => {
                    if (flight.airport_code === airportCode){
                        flight.airport_code = newAiportCode;
                    };
                });
                let flightPayload = {response: {statusCode:200}, flightList};
                yield put(flightFeedback(flightPayload));


                //This updates airpot code on airlines already loaded
                let airlineList = yield select(state => state.airline.airlineList);
                yield airlineList.forEach((airline, index) => {
                    if(airline.airport_code === airportCode){
                        airline.airport_code = newAiportCode;
                    } 
                });
                let airlinePayload = {response: {statusCode:200}, airlineList};
                yield put(airlineFeedback(airlinePayload));

            }

            bodyText = "Aeroporto atualizado com sucesso!";

        }else{
            bodyText = response.body;
        }
        
    }catch(error){
        bodyText = "Erro desconhecido no servidor!";
    }

    payload = {response : {statusCode, bodyText}, airportList};

    yield put(airportFeedback(payload));
    yield put(finishLoading(AIRPORT));
    yield put(finishRequest(AIRPORT));
}


//side effects for airport delete
export function* deleteAirportSaga(action){
    yield put(startLoading(AIRPORT));   

    const { id } = action.payload;

    let airportList = yield select(state => state.airport.airportList);
    let airportIndex =  airportList.findIndex(item => id === item.id);
    let airportCode = airportList[airportIndex].code;

    let statusCode, bodyText, payload;

    try{
        let response = yield call(del, endpoint+id);
        statusCode = response.status;

        if(statusCode === 204){
            airportList.splice(airportIndex, 1);

            /**
             * this removes the already loaded elements, which are related to the airport
             */

            let runawayList = yield select(state => state.runaway.runawayList);
            yield runawayList.forEach((runaway, index) => {
                if (runaway.airport_code === airportCode){
                    runawayList.splice(index);
                };
            });
            let runawayPayload = {response: {statusCode:200}, runawayList};
            yield put(runawayFeedback(runawayPayload));


            let flightList = yield select(state => state.flight.flightList);
            yield flightList.forEach((flight, index) => {
                if (flight.airport_code === airportCode){
                    flightList.splice(index);
                };
            });
            let flightPayload = {response: {statusCode:200}, flightList};
            yield put(flightFeedback(flightPayload));


            let airlineList = yield select(state => state.airline.airlineList);
            yield airlineList.forEach((airline, index) => {
                if(airline.airport_code === airportCode){
                    airlineList.splice(index);
                } 
            });
            let airlinePayload = {response: {statusCode:200}, airlineList};
            yield put(airlineFeedback(airlinePayload));

            bodyText = "Aeroporto removido com sucesso!";

        }else{
            bodyText = response.body;
        }
        
    }catch(error){
        bodyText = "Erro desconhecido no servidor!";
    }

    payload = {response : {statusCode, bodyText}, airportList};

    yield put(airportFeedback(payload));
    yield put(finishLoading(AIRPORT));
    yield put(finishRequest(AIRPORT));
}