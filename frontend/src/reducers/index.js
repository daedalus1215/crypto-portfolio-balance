import { FETCH_ALL_ACTIVITY_ERROR, FETCH_ALL_ACTIVITY_RESPONSE, FETCH_CRYPTO_HISTORY_ERROR, FETCH_CRYPTO_HISTORY_RESPONSE, PORTFOLIO_LIST } from "../actionCreators";

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
        case FETCH_CRYPTO_HISTORY_RESPONSE:
        case FETCH_CRYPTO_HISTORY_ERROR:
            return {
                ...state,
                asset: action.payload,
            }
        default:
            return state
    }
}

export const getAllAssetReducer = (state = [], action) => {
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