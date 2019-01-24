/*This file contains all action creators for airports*/
import { AirportTypes } from '../actions/types';

const { GET_AIRPORTS,
        REGISTER_AIRPORT,
        UPDATE_AIRPORT,
        DELETE_AIRPORT,
        AIRPORT_FEEDBACK } = AirportTypes;


export const getAirports = () => ({
    type:GET_AIRPORTS,
});

export const registerAirport = (payload) => ({
    type:REGISTER_AIRPORT,
    payload
});

export const updateAirport = (payload) => ({
    type:UPDATE_AIRPORT,
    payload
});

export const deleteAirport = (payload) => ({
    type:DELETE_AIRPORT,
    payload
});

export const airportFeedback = (payload) => ({
    type:AIRPORT_FEEDBACK,
    payload
});