import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux';
import { downlodeDataReducer } from '../userDataSlice/userDataSlice';
import { downloadTasksReducer } from '../tasksDataSlice/tasksDataSlice';

const store = createStore(combineReducers({
    userData: downlodeDataReducer,
    tasksData: downloadTasksReducer
}), {
    userData: [],
    tasksData: []
}, applyMiddleware(thunk));

export default store;