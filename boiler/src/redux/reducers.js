import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import annotate from "./annotate";

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  annotate: annotate
});

export default createRootReducer;
