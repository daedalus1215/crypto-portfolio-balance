import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectFinancialInstrumentHistory = createSelector(
    state => state.state?.cryptoHistory,
    items => items?.asset || [],
);

export const useSelectInstrumentHistory = () => useSelector(selectFinancialInstrumentHistory);