import { call, put, all, select, takeLatest } from 'redux-saga/effects';

import { flightFeedback } from '../actions/flight.actions';
import { startLoading, finishLoading, finishRequest } from '../actions/components.actions';
import { FLIGHT } from '../actions/containers';

import { Service } from '../services/service';
import { FlightTypes } from '../actions/types';

import { unique } from '../utils/array.utils';

const { GET_FLIGHTS,
        REGISTER_FLIGHT,
        UPDATE_FLIGHT,
        DELETE_FLIGHT } = FlightTypes;
        
let pageNumber = 1;
const endpoint = '/api/flights/';
const { post, update, del, get } = new Service();

//Root flightSaga
export function* rootFlightSaga(){
    yield all([
        takeLatest(GET_FLIGHTS, getFlights),
        takeLatest(REGISTER_FLIGHT, registerflightSaga),
        takeLatest(UPDATE_FLIGHT, updateflightSaga),
        takeLatest(DELETE_FLIGHT, deleteflightSaga),
    ]);
}


//Side effects of flight get
export function* getFlights(action){
    yield put(startLoading(FLIGHT));   
    let flightList = yield select(state => state.flight.flightList);
    let endpointGet = endpoint+'?page='+pageNumber;
    let statusCode, payload, bodyText;

    try{
        let response = yield call(get, endpointGet);
        statusCode = response.status;
        let { data, meta } = response.responseBody;

        if( statusCode === 200 && pageNumber<=meta.last_page){
            flightList = flightList.concat(data).filter(unique);
            pageNumber++;
        }

    }catch(error){
        bodyText = "Erro desconhecido no servidor!";
    }


    payload = {response : {statusCode, bodyText}, flightList}
    yield put(flightFeedback(payload));
    yield put(finishLoading(FLIGHT));
}


//Side effects of flight registration
export function* registerflightSaga(action){
    yield put(startLoading(FLIGHT));   
    const { data } = action.payload;

    let flightList = yield select(state => state.flight.flightList);
    let statusCode, bodyText, payload;

    try{
        let response = yield call(post, endpoint, data);
        statusCode = response.status;
        
        if(statusCode === 201){
            flightList.unshift(response.body.data);
            bodyText = "Vôo cadastrado com sucesso!";
        }else{
            bodyText = response.body;
        }
        
    }catch(error){
        bodyText = "Erro desconhecido no servidor!";
    }

    payload = {response: {statusCode, bodyText}, flightList}

    yield put(flightFeedback(payload));
    yield put(finishLoading(FLIGHT));
    yield put(finishRequest(FLIGHT));
}


//Side effects of flight update
export function* updateflightSaga(action){
    yield put(startLoading(FLIGHT));   

    const { id, data } = action.payload;

    let flightList = yield select(state => state.flight.flightList);
    let index =  flightList.findIndex(item => id === item.id);
    let flight = flightList[index];

    let statusCode, bodyText, payload;

    try{
        let response = yield call(update, endpoint+id, data);
        statusCode = response.status;

        if(statusCode === 202){
            flightList.splice(index, 1, {
                ...flight,
                ...data,
            });

            bodyText = "Vôo cadastrado com sucesso!";

        }else{
            bodyText = response.body;
        }
        
    }catch(error){
        bodyText = "Erro desconhecido no servidor!";
    }

    payload = {response : {statusCode, bodyText}, flightList}

    yield put(flightFeedback(payload));
    yield put(finishLoading(FLIGHT));
    yield put(finishRequest(FLIGHT));
}


//side effects for flight delete
export function* deleteflightSaga(action){
    yield put(startLoading(FLIGHT));   

    const { id } = action.payload;

    let flightList = yield select(state => state.flight.flightList);
    let index =  flightList.findIndex(item => id === item.id);

    let statusCode, bodyText, payload;

    try{
        let response = yield call(del, endpoint+id);
        statusCode = response.status;

        if(statusCode === 204){
            flightList.splice(index, 1);
            bodyText = "Vôo removido com sucesso!";
        }else{
            bodyText = response.body;
        }
        
    }catch(error){
        bodyText = "Erro desconhecido no servidor!";
    }

    payload = {response : {statusCode, bodyText}, flightList};

    yield put(flightFeedback(payload));
    yield put(finishLoading(FLIGHT));
    yield put(finishRequest(FLIGHT));
}