import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectFinancialInstrumentHistory = createSelector(
    state => state?.cryptoHistory,
    asset => asset?.asset || []
);

export const useSelectInstrumentHistory = () => useSelector(selectFinancialInstrumentHistory);