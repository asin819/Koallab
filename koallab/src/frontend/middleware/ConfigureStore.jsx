import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import reducer from './Posts';
import Api from '.middleware/api';

export default function store(){
    return configureStore({
        reducer,
        middleware: [...getDefaultMiddleware(),Api]
    })
}