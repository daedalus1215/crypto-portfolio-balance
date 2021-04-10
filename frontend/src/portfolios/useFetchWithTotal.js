import { useEffect } from 'react';
import { fetchAssetActivity } from '../requests';

const useFetchActivityWithTotal = (code, setActivity) => {
    useEffect(() => {
        fetchAssetActivity(code, setActivity);
    }, [code]);
};

export default useFetchActivityWithTotal;