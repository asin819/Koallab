import { legacy_createStore as createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import apiMiddleware from "../middleware/api";

const store = createStore(rootReducer, applyMiddleware(apiMiddleware));
window.store = store;
export default store;