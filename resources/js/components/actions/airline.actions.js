/*This file contains all action creators for AIRLINES*/
import { AirlineTypes } from '../actions/types';

const { GET_AIRLINES,
        REGISTER_AIRLINE,
        UPDATE_AIRLINE,
        DELETE_AIRLINE,
        AIRLINE_FEEDBACK } = AirlineTypes;


export const getAirlines= () => ({
    type:GET_AIRLINES,
});

export const registerAirline = (payload) => ({
    type:REGISTER_AIRLINE,
    payload
});

export const updateAirline= (payload) => ({
    type:UPDATE_AIRLINE,
    payload
});

export const deleteAirline = (payload) => ({
    type:DELETE_AIRLINE,
    payload
});

export const airlineFeedback = (payload) => ({
    type:AIRLINE_FEEDBACK,
    payload
});
