import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchActivityByCode } from '../actionCreators/activityActionCreators';

const useFetchActivityByCode = code => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchActivityByCode(code));
    }, []);
};

export default useFetchActivityByCode;