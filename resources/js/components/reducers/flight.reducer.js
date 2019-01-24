import  popFeedback  from '../components/pop-feedback.component';
import { FlightTypes } from '../actions/types';

const { GET_FLIGHTS,
        REGISTER_FLIGHT,
        UPDATE_FLIGHT,
        DELETE_FLIGHT,
        FLIGHT_FEEDBACK } = FlightTypes;

const INITIAL_STATE = {
  response : { statusCode : null, bodyText : ''},
  flightList : [],
}

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    
      case GET_FLIGHTS:
        return state;
      case REGISTER_FLIGHT:
        return state;
      case UPDATE_FLIGHT:
        return state;
      case DELETE_FLIGHT:
        return state;
      case FLIGHT_FEEDBACK:
        popFeedback(payload.response);
        return {...state, response: payload.response, flightList: [...payload.flightList]};
      default:
        return state;
    }

  }
  