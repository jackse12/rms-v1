import React, { useReducer } from 'react';

export const initialReducerState = {
    count: 0,
};

export function reducerRms(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, count: state.count + 1 };
        case 'DECREMENT':
            return { ...state, count: state.count - 1 };
        default:
            throw new Error();
    }
}