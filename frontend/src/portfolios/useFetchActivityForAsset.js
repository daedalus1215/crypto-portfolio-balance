import { useEffect } from "react";
import { fetchAssetActivity } from "../requests";

const useFetchActivityForAsset = (code, setData) => {
    useEffect(() => {
        fetchAssetActivity(code, setData);
    }, [code]);
};

export default useFetchActivityForAsset;