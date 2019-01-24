/*This file contains all action creators for FLIGHTs*/
import { FlightTypes } from '../actions/types';

const { GET_FLIGHTS,
        REGISTER_FLIGHT,
        UPDATE_FLIGHT,
        DELETE_FLIGHT,
        FLIGHT_FEEDBACK } = FlightTypes;


export const getFlights = () => ({
    type:GET_FLIGHTS,
});

export const registerFlight= (payload) => ({
    type:REGISTER_FLIGHT,
    payload
});

export const updateFlight= (payload) => ({
    type:UPDATE_FLIGHT,
    payload
});

export const deleteFlight = (payload) => ({
    type:DELETE_FLIGHT,
    payload
});

export const flightFeedback = (payload) => ({
    type:FLIGHT_FEEDBACK,
    payload
});