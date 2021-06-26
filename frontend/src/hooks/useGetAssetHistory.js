import React from "react";
import { useDispatch } from "react-redux";
import { fetchInstrumentHistory } from "../actionCreators/instrumentActionCreators";

const useFetchAssetHistory = (code) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchInstrumentHistory(code));
    }, [code]);
};

export default useFetchAssetHistory;