import axios from "axios";
import { API } from "../actions/types";
import { apiError, apiStart, apiEnd } from "../actions/api";

const apiMiddleware = ({dispatch}) => next => action => {
    next (action)
  }