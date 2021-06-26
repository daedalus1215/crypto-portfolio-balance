import { useEffect } from 'react';
import { fetchSpecificActivity } from '../requests';

const useFetchActivityWithTotal = (code, setActivity) => {
    useEffect(() => {
        fetchSpecificActivity(code, setActivity);
    }, [code]);
};

export default useFetchActivityWithTotal;