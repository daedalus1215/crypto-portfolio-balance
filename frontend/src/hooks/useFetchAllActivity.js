import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllActivity } from '../actionCreators/activityActionCreators';

const useFetchAllActivity = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchAllActivity());
    }, []);
};

export default useFetchAllActivity; 