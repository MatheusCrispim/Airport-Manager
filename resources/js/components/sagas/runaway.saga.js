import { call, put, all, select, takeLatest } from 'redux-saga/effects';

import { runawayFeedback } from '../actions/runaway.actions';
import { flightFeedback } from '../actions/flight.actions';
import { startLoading, finishLoading, finishRequest } from '../actions/components.actions';

import { Service } from '../services/service';
import { RunawayTypes } from '../actions/types';
import { RUNAWAY } from '../actions/containers';
import { unique } from '../utils/array.utils';


const { GET_RUNAWAYS,
        REGISTER_RUNAWAY,
        UPDATE_RUNAWAY,
        DELETE_RUNAWAY } = RunawayTypes;

let pageNumber = 1;
const endpoint = '/api/runaways/';
const { post, update, del, get } = new Service();

//Root RunawaySaga
export function* rootRunawaySaga(){
    yield all([
        takeLatest(GET_RUNAWAYS, getRunaways),
        takeLatest(REGISTER_RUNAWAY, registerRunawaySaga),
        takeLatest(UPDATE_RUNAWAY, updateRunawaySaga),
        takeLatest(DELETE_RUNAWAY, deleteRunawaySaga),
    ]);
}


//Side effects of Runaway get
export function* getRunaways(action){
    yield put(startLoading(RUNAWAY));   
    let runawayList = yield select(state => state.runaway.runawayList);
    let endpointGet = endpoint+'?page='+pageNumber;
    let statusCode, payload, bodyText;

    try{
        let response = yield call(get, endpointGet);
        statusCode = response.status;
        let { data, meta } = response.responseBody;

        if( statusCode === 200 && pageNumber<=meta.last_page){
            runawayList = runawayList.concat(data).filter(unique);
            pageNumber++;
        }

    }catch(error){
        bodyText = "Erro desconhecido no servidor!";
    }

    payload = {response: {statusCode, bodyText}, runawayList};

    yield put(runawayFeedback(payload));
    yield put(finishLoading(RUNAWAY));
}


//Side effects of Runaway registration
export function* registerRunawaySaga(action){
    yield put(startLoading(RUNAWAY));   
    const { data } = action.payload;
    
    let runawayList = yield select(state => state.runaway.runawayList);
    let statusCode, bodyText, payload;

    try{
        let response = yield call(post, endpoint, data);
        statusCode = response.status;
        
        if(statusCode === 201){
            runawayList.unshift(response.body.data);
            bodyText = "Pista cadastrada com sucesso!";
        }else{
            bodyText = response.body;
        }
        
    }catch(error){
        bodyText = "Erro desconhecido no servidor!";
    }

    payload = {response: {statusCode, bodyText}, runawayList};

    yield put(runawayFeedback(payload));
    yield put(finishLoading(RUNAWAY));
    yield put(finishRequest(RUNAWAY));
}


//Side effects of Runaway update
export function* updateRunawaySaga(action){
    yield put(startLoading(RUNAWAY));   

    const { id, data } = action.payload;
   
    let runawayList = yield select(state => state.runaway.runawayList);
    let runawayIndex =  runawayList.findIndex(item => id === item.id);
    let runaway = runawayList[runawayIndex];
    let runawayCode = runaway.code;

    let statusCode, bodyText, payload;

    try{
        let response = yield call(update, endpoint+id, data);
        statusCode = response.status;

        if(statusCode === 202){
            runawayList.splice(runawayIndex, 1, {
                ...runaway,
                ...data,
            });

            let newRunawayCode = runawayList[runawayIndex].code;

            if(runawayCode !== newRunawayCode){

                //This updates the airport code on flights already loaded
                let flightList = yield select(state => state.flight.flightList);
                yield flightList.forEach((flight, index) => {
                    if (flight.runaway_code === runawayCode){
                        flight.runaway_code = newRunawayCode;
                    };
                });
                let flightPayload = {response: {statusCode:200}, flightList};
                yield put(flightFeedback(flightPayload));
            }

            bodyText = "Pista atualizada com sucesso!";

        }else{
            bodyText = response.body;
        }
        
    }catch(error){
        bodyText = "Erro desconhecido no servidor!";
    }

    payload = {response : {statusCode, bodyText}, runawayList}

    yield put(runawayFeedback(payload));
    yield put(finishLoading(RUNAWAY));
    yield put(finishRequest(RUNAWAY));
}


//side effects for Runaway delete
export function* deleteRunawaySaga(action){
    yield put(startLoading(RUNAWAY));   

    const { id } = action.payload;

    let runawayList = yield select(state => state.runaway.runawayList);
    let runawayIndex =  runawayList.findIndex(item => id === item.id);
    let runawayCode = runawayList[runawayIndex].code;

    let statusCode, bodyText, payload;

    try{
        let response = yield call(del, endpoint+id);
        statusCode = response.status;

        if(statusCode === 204){
            runawayList.splice(runawayIndex, 1);

            /**
             * this removes the already loaded elements, which are related to the runaway
             */

            let flightList = yield select(state => state.flight.flightList);
            yield flightList.forEach((flight, index) => {
                if (flight.runaway_code === runawayCode){
                    flightList.splice(index);
                };
            });
            let flightPayload = {response: {statusCode:200}, flightList};
            yield put(flightFeedback(flightPayload));

            bodyText = "Pista removida com sucesso!";
        }else{
            bodyText = response.body;
        }
        
    }catch(error){
        bodyText = "Erro desconhecido no servidor!";
    }

    payload = {response : {statusCode, bodyText}, runawayList}

    yield put(runawayFeedback(payload));
    yield put(finishLoading(RUNAWAY));
    yield put(finishRequest(RUNAWAY));
}