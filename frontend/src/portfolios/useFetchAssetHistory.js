import { useEffect } from "react";
import { fetchCryptoHistory } from "../actionCreators";

const useFetchAssetHistory = (dispatch, code) => {
    useEffect(() => {
        fetchCryptoHistory(dispatch, code)
    }, [code]);
};

export default useFetchAssetHistory;