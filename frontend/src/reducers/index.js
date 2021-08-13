import {
    FETCH_ACTIVITY_BY_CODE_ERROR,
    FETCH_ACTIVITY_BY_CODE_RESPONSE,
    FETCH_ALL_ACTIVITY_ERROR,
    FETCH_ALL_ACTIVITY_RESPONSE,
    FETCH_INSTRUMENT_HISTORY_ERROR,
    FETCH_INSTRUMENT_HISTORY_RESPONSE,
    PORTFOLIO_LIST
} from "../actionCreators";

export const portfolioListReducer = (state = [], action) => {
    switch (action.type) {
        case PORTFOLIO_LIST:
            return {
                ...state,
                assets: action.payload
            };
        default:
            return state;
    }
};

export const cryptoHistoryReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_INSTRUMENT_HISTORY_RESPONSE:
        case FETCH_INSTRUMENT_HISTORY_ERROR:
            return {
                ...state,
                asset: action.payload,
            }
        default:
            return state
    }
}

export const getAllActivityReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_ALL_ACTIVITY_RESPONSE:
        case FETCH_ALL_ACTIVITY_ERROR:
            return {
                ...state,
                assets: action.payload,
            }
        default:
            return state
    }
}

export const getActivityByCodeReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_ACTIVITY_BY_CODE_RESPONSE:
        case FETCH_ACTIVITY_BY_CODE_ERROR:
            return {
                ...state,
                asset: action.payload,
            }
        default:
            return state
    }
}