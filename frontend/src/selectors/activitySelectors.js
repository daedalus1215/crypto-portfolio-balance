import { useSelector } from "react-redux";
import { createSelector } from "reselect";

export const selectAllActivity = createSelector(
    state => state?.allActivity.assets,
    assets => assets?.items || []
);

export const selectActivityByCode = state => state?.activityByCode?.asset || [];

export const useSelectAllActivity = () => useSelector(selectAllActivity);

export const useSelectActivityByCode = () => useSelector(selectActivityByCode);