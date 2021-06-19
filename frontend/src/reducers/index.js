import { FETCH_CRYPTO_HISTORY_ERROR, FETCH_CRYPTO_HISTORY_RESPONSE, PORTFOLIO_LIST } from "../actionCreators";

export const portfolioListReducer = (state, action) => {
    switch (action.type) {
        case "PORTFOLIO_LIST":
            return {
                ...state,
                portfolioList: action.payload
            };
        default:
            return state;
    }
};

export const cryptoHistoryReducer = (state, action) => {
    switch (action.type) {
        case FETCH_CRYPTO_HISTORY_ERROR:
        case FETCH_CRYPTO_HISTORY_RESPONSE:
            return {
                ...state,
                cryptoHistory: action.payload,
            }
        default:
            return state
    }
}