import { ComponentsTypes } from '../actions/types';


const { SHOW_DRAWER, 
        CLOSE_DRAWER,
        START_LOADING, 
        FINISH_LOADING, 
        START_REQUEST, 
        FINISH_REQUEST } = ComponentsTypes;


/**
 * @container containers.js

 */
export const showDrawer = (container) => ({
    type: SHOW_DRAWER,
    container: container,
});

export const closeDrawer = (container) => ({
    type: CLOSE_DRAWER,
    container: container,
});

export const startLoading = (container) => ({
    type: START_LOADING,
    container: container,
});

export const finishLoading = (container) => ({
    type: FINISH_LOADING,
    container: container,
});

export const startRequest = (container) => ({
    type: START_REQUEST,
    container: container,
})

export const finishRequest = (container) => ({
    type: FINISH_REQUEST,
    container: container,
})