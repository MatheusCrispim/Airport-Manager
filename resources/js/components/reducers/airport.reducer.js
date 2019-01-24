import  popFeedback  from '../components/pop-feedback.component';
import { AirportTypes } from '../actions/types';

const { GET_AIRPORTS,
        REGISTER_AIRPORT,
        UPDATE_AIRPORT,
        DELETE_AIRPORT,
        AIRPORT_FEEDBACK } = AirportTypes;

const INITIAL_STATE = {
  response : { statusCode : null, bodyText : ''},
  airportList : [],
}

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    
      case GET_AIRPORTS:
        return state;
      case REGISTER_AIRPORT:
        return state;
      case UPDATE_AIRPORT:
        return state;
      case DELETE_AIRPORT:
        return state;
      case AIRPORT_FEEDBACK:
        popFeedback(payload.response);
        return {...state, response: payload.response, airportList: [...payload.airportList]};
      default:
        return state;
    }

  }
  