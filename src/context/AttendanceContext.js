import React, { useContext, useState } from 'react';
import trackAPI from '../api';
import * as RootNavigation from '../../RootNavigation';
import moment from 'moment';

export const Context = React.createContext();

export const attendanceContext = () => useContext(Context);

export default function Attendance(props) {
  const [state, setState] = useState({
    err: null,
    attendances: {},
    isLoading: true,
  });

  const handleCheckIn = async ({ qrString, deviceId, location }) => {
    const { longitude, latitude } = location;

    if (!deviceId || !longitude || !latitude) return;

    const { data } = await trackAPI.post('/checkin', { qrString, deviceId, latitude, longitude });

    if (data.status === 'ok') {
      RootNavigation.navigate('Details');
    } else {
      setState({ ...state, err: data.err });
    }
  };

  const resetErr = () => {
    setState({ ...state, err: null });
  };

  const attendances = async () => {
    const { data } = await trackAPI.get('/checkin');

    if (!data.data.length) {
      setState({
        ...state,
        attendances: false,
        isLoading: false,
      });
      return;
    }

    const [firstChckIn, lastCheckIn] = data.data.map((d) => {
      return moment(d.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a');
    });

    setState({
      ...state,
      attendances: {
        firstChckIn,
        lastCheckIn,
      },
      isLoading: false,
    });
  };

  return (
    <Context.Provider
      value={{ state: { ...state }, functions: { handleCheckIn, resetErr, attendances } }}>
      {props.children}
    </Context.Provider>
  );
}
