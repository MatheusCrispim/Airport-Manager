import  popFeedback  from '../components/pop-feedback.component';
import { AirlineTypes } from '../actions/types';

const { GET_AIRLINES,
        REGISTER_AIRLINE,
        UPDATE_AIRLINE,
        DELETE_AIRLINE,
        AIRLINE_FEEDBACK } = AirlineTypes;

const INITIAL_STATE = {
  response : { statusCode : null, bodyText : ''},
  airlineList : [],
}

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    
      case GET_AIRLINES:
        return state;
      case REGISTER_AIRLINE:
        return state;
      case UPDATE_AIRLINE:
        return state;
      case DELETE_AIRLINE:
        return state;
      case AIRLINE_FEEDBACK:
        popFeedback(payload.response);
        return {...state, response: payload.response, airlineList: [...payload.airlineList]};
      default:
        return state;
    }

  }
  