import { call, put, all, select, takeLatest } from 'redux-saga/effects';

import { airlineFeedback } from '../actions/airline.actions';
import { flightFeedback } from '../actions/flight.actions';
import { startLoading, finishLoading, finishRequest } from '../actions/components.actions';

import { AIRLINE } from '../actions/containers';

import { Service } from '../services/service';
import { AirlineTypes } from '../actions/types';
import { unique } from '../utils/array.utils';

const { GET_AIRLINES,
        REGISTER_AIRLINE,
        UPDATE_AIRLINE,
        DELETE_AIRLINE } = AirlineTypes;

let pageNumber = 1;
const endpoint = '/api/airlines/';
const { post, update, del, get } = new Service();


//Root AirlineSaga
export function* rootAirlineSaga(){
    yield all([
        takeLatest(GET_AIRLINES, getAirlines),
        takeLatest(REGISTER_AIRLINE, registerAirlineSaga),
        takeLatest(UPDATE_AIRLINE, updateAirlineSaga),
        takeLatest(DELETE_AIRLINE, deleteAirlineSaga),
    ]);
}


//Side effects of airline get
export function* getAirlines(action){
    yield put(startLoading(AIRLINE));   
    let airlineList = yield select(state => state.airline.airlineList);
    let endpointGet = endpoint+'?page='+pageNumber;
    let statusCode, payload, bodyText;

    try{
        let response = yield call(get, endpointGet);
        statusCode = response.status;
        let { data, meta } = response.responseBody;

        if( statusCode === 200 && pageNumber<=meta.last_page){
            airlineList = airlineList.concat(data).filter(unique);
            pageNumber++;
        }

    }catch(error){
        bodyText = "Erro desconhecido no servidor!";
    }

    payload = {response : {statusCode, bodyText}, airlineList}
    yield put(airlineFeedback(payload));
    yield put(finishLoading(AIRLINE));
}


//Side effects of airline registration
export function* registerAirlineSaga(action){
    yield put(startLoading(AIRLINE));   
    const { data } = action.payload;
    
    let airlineList = yield select(state => state.airline.airlineList);
    let statusCode, bodyText, payload;

    try{
        let response = yield call(post, endpoint, data);
        statusCode = response.status;
        
        if(statusCode === 201){
            airlineList.unshift(response.body.data);
            bodyText = "Companhia aérea cadastrada com sucesso!";
        }else{
            bodyText = response.body;
        }
        
    }catch(error){
        bodyText = "Erro desconhecido no servidor!";
    }

    payload = {response: {statusCode, bodyText}, airlineList}

    yield put(airlineFeedback(payload));
    yield put(finishLoading(AIRLINE));
    yield put(finishRequest(AIRLINE));
}


//Side effects of airline update
export function* updateAirlineSaga(action){
    yield put(startLoading(AIRLINE));   

    const { id, data } = action.payload;
   
    let airlineList = yield select(state => state.airline.airlineList);
    let airlineIndex =  airlineList.findIndex(item => id === item.id);
    let airline = airlineList[airlineIndex];
    let airlineCode = airline.code;

    let statusCode, bodyText, payload;

    try{
        let response = yield call(update, endpoint+id, data);
        statusCode = response.status;

        if(statusCode === 202){
            airlineList.splice(airlineIndex, 1, {
                ...airline,
                ...data,
            });
            
            let newAirlineCode = airlineList[airlineIndex].code;

            if(airlineCode !== newAirlineCode){

                //This updates the airport code on flights already loaded
                let flightList = yield select(state => state.flight.flightList);
                yield flightList.forEach((flight, index) => {
                    if (flight.airline_code === airlineCode){
                        flight.airline_code  = newAirlineCode;
                    };
                });
                let flightPayload = {response: {statusCode:200}, flightList};
                yield put(flightFeedback(flightPayload));

            }


            bodyText = "Companhia aera atualizada com sucesso!";

        }else{
            bodyText = response.body;
        }

    }catch(error){
        bodyText = "Erro desconhecido no servidor!";
    }

    payload = {response : {statusCode, bodyText}, airlineList}

    yield put(airlineFeedback(payload));
    yield put(finishLoading(AIRLINE));
    yield put(finishRequest(AIRLINE));
}


//side effects for airline delete
export function* deleteAirlineSaga(action){
    yield put(startLoading(AIRLINE));   

    const { id } = action.payload;

    let airlineList = yield select(state => state.airline.airlineList);
    let airlineIndex =  airlineList.findIndex(item => id === item.id);
    let airlineCode = airlineList[airlineIndex].code;

    let statusCode, bodyText, payload;

    try{
        let response = yield call(del, endpoint+id);
        statusCode = response.status;

        if(statusCode === 204){
            airlineList.splice(airlineIndex, 1);
            
            /**
             * this removes the already loaded elements, which are related to the flight
             */
            let flightList = yield select(state => state.flight.flightList);
            yield flightList.forEach((flight, index) => {
                if (flight.airline_code === airlineCode){
                    flightList.splice(index);
                };
            });
            let flightPayload = {response: {statusCode:200}, flightList};
            yield put(flightFeedback(flightPayload));

            bodyText = "Companhia aera removida com sucesso!";

        }else{
            bodyText = response.body;
        }

    }catch(error){
        bodyText = "Erro desconhecido no servidor!";
    }

    payload = {response : {statusCode, bodyText}, airlineList}

    yield put(airlineFeedback(payload));
    yield put(finishLoading(AIRLINE));
    yield put(finishRequest(AIRLINE));
}