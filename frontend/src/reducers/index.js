export const portfolioListReducer = (state, action) => {
    console.log('reducer!', action.payload);
    switch (action.type) {
        case "PORTFOLIO_LIST":
            return {
                portfolioList: action.payload
            };
        default:
            return state;
    }
}