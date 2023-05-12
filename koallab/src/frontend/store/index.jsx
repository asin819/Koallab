import { legacy_createStore as createStore, applyMiddleware} from 'redux';
import rootReducer from "../reducer/index";
import apiMiddleware from "../middleware/index";

const store = createStore(rootReducer, applyMiddleware(apiMiddleware));
window.store = store;
export default store;