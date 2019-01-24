import { combineReducers } from 'redux';

import componentsReducer from './components.reducer';

import airportReducer from './airport.reducer';
import airlineReducer from './airline.reducer';
import flightReducer from './flight.reducer';
import runawayReducer from './runaway.reducer';



import { AIRPORT, AIRLINE, FLIGHT, RUNAWAY } from '../actions/containers';


function createNamedWrapperReducer(reducerFunction, reducerName) {
    return (state, action) => {
        const { container } = action;
        const isInitializationCall = state === undefined;
        if (container !== reducerName && !isInitializationCall){
            return state
        }
      return reducerFunction(state, action)
    }
  }
  


export default combineReducers({
    airport : airportReducer,
    airportComponents : createNamedWrapperReducer(componentsReducer, AIRPORT),
    airline : airlineReducer,
    airlineComponents : createNamedWrapperReducer(componentsReducer, AIRLINE),
    flight: flightReducer,
    flightComponents : createNamedWrapperReducer(componentsReducer, FLIGHT),
    runaway: runawayReducer,
    runawayComponents : createNamedWrapperReducer(componentsReducer, RUNAWAY),

});