import { useEffect } from "react";
import { fetchAssetHistory } from "../requests";

const useFetchActivityForAsset = (code, setData) => {
    useEffect(() => {
        fetchAssetHistory(code, setData);
    }, [code]);
};

export default useFetchActivityForAsset;