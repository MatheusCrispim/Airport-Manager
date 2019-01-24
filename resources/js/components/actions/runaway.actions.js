/*This file contains all action creators for Runawys*/
import { RunawayTypes } from '../actions/types';

const { GET_RUNAWAYS,
        REGISTER_RUNAWAY,
        UPDATE_RUNAWAY,
        DELETE_RUNAWAY,
        RUNAWAY_FEEDBACK } = RunawayTypes;


export const getRunaways= () => ({
    type:GET_RUNAWAYS,
});

export const registerRunaway = (payload) => ({
    type:REGISTER_RUNAWAY,
    payload
});

export const updateRunaway = (payload) => ({
    type:UPDATE_RUNAWAY,
    payload
});

export const deleteRunaway = (payload) => ({
    type:DELETE_RUNAWAY,
    payload
});

export const runawayFeedback = (payload) => ({
    type:RUNAWAY_FEEDBACK,
    payload
});
