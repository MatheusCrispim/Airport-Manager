import { ComponentsTypes } from '../actions/types';

const { SHOW_DRAWER, 
        CLOSE_DRAWER,
        START_LOADING, 
        FINISH_LOADING, 
        START_REQUEST, 
        FINISH_REQUEST } = ComponentsTypes;


const INITIAL_STATE = {
    visible: false,
    loading: false,
    requested: false,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SHOW_DRAWER:
            return {...state, visible: true};
        case CLOSE_DRAWER:
            return {...state, visible: false};
        case START_LOADING:
            return {...state, loading: true};
        case FINISH_LOADING:
            return {...state, loading: false};
        case START_REQUEST:
            return {...state, requested: false};
        case FINISH_REQUEST:
            return {...state, requested: true};
        default:
            return state;
    }
}
