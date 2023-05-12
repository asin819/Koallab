import axios from "axios";
import { API } from "../actions/types";
import { apiError, apiStart, apiEnd } from "../actions/api";

const apiMiddleware = ({dispatch}) => next => action => {
    next (action);

    if (action.type !== API) return;

    const {
        url,
        method,
        data,
        onSuccess,
        onFailure,
        label,
      } = action.payload;
    
    // axios default configs
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "";
    axios.defaults.headers.common["Content-Type"]="application/json";
    axios.defaults.headers.common["Authorization"] = `Bearer${token}`;

    if (label) {
        dispatch(apiStart(label));
    }

    axios
    .request({
      url,
      method,
      headers,
      [dataOrParams]: data
    })
    .then(({ data }) => {
      dispatch(onSuccess(data));
    })
    .catch(error => {
      dispatch(apiError(error));
      dispatch(onFailure(error));
    })
    .finally(() => {
      if (label) {
        dispatch(apiEnd(label));
      }
    });
  }

  export default apiMiddleware;