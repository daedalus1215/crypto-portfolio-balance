import { useSelector } from "react-redux";
import { createSelector } from "reselect";

export const selectAllActivity = createSelector(
    state => state?.allActivity.assets,
    assets => assets?.items || []
)

export const useSelectAllActivity = () => useSelector(selectAllActivity);