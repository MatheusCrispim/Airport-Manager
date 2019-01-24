import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers/index.reducer';

import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas/root.saga';
import { MainLayout } from  './layouts/main.layout';



const sagaMiddleware = createSagaMiddleware();

export default class App extends Component{
	
	
	render(){	
		const store = createStore(reducer,
			compose(
				applyMiddleware(sagaMiddleware)
			),
		) ;

		return (
			<Provider store={store}>
				<MainLayout />
			</Provider>
		);
	}
		
	
}


if(document.getElementById('root')){
	
	ReactDOM.render(<App />, document.getElementById('root'));
	
	sagaMiddleware.run(rootSaga);

	// If you want your app to work offline and load faster, you can change
	// unregister() to register() below. Note this comes with some pitfalls.
	// Learn more about service workers: http://bit.ly/CRA-PWA
	serviceWorker.unregister();	
}
