import  popFeedback  from '../components/pop-feedback.component';
import { RunawayTypes } from '../actions/types';

const { GET_RUNAWAYS,
        REGISTER_RUNAWAY,
        UPDATE_RUNAWAY,
        DELETE_RUNAWAY,
        RUNAWAY_FEEDBACK } = RunawayTypes;

const INITIAL_STATE = {
  response : { statusCode : null, bodyText : ''},
  runawayList : [],
}

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    
      case GET_RUNAWAYS:
        return state;
      case REGISTER_RUNAWAY:
        return state;
      case UPDATE_RUNAWAY:
        return state;
      case DELETE_RUNAWAY:
        return state;
      case RUNAWAY_FEEDBACK:
        popFeedback(payload.response);
        return {...state, response: payload.response, runawayList: [...payload.runawayList]};
      default:
        return state;
    }

  }
  