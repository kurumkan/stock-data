import { combineReducers } from 'redux';
import StockDataReducer from 'reducers/StockDataReducer';
import ErrorReducer from 'reducers/ErrorReducer';

const RootReducer = combineReducers({
	stocks: StockDataReducer,
	error: ErrorReducer
});

export default RootReducer;
