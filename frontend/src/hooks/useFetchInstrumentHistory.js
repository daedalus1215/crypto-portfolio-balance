import React from "react";
import { useDispatch } from "react-redux";
import { fetchInstrumentHistory } from "../actionCreators/instrumentActionCreators";

const useFetchInstrumentHistory = (code) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchInstrumentHistory(code));
    }, [code]);
};

export default useFetchInstrumentHistory;