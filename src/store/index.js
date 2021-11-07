import { applyMiddleware, combineReducers, createStore } from 'redux';
import { cashReducer } from './cashReducer';
import { customerReducer } from './customerReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers( {
	cashReducer,
	customerReducer,
} );

export const store = createStore( rootReducer, composeWithDevTools( applyMiddleware( thunk ) ) );
