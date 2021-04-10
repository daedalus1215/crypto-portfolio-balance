import { useEffect } from "react";
import { fetchAssetHistory } from "../requests";

const useFetchAssetHistory = (code, setData) => {
    useEffect(() => {
        fetchAssetHistory(code, setData);
    }, [code]);
};

export default useFetchAssetHistory;