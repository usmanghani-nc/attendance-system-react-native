import React, { useContext, useState } from 'react';
import trackAPI from '../api';
import * as RootNavigation from '../../RootNavigation';
import moment from 'moment';

export const Context = React.createContext();

export const attendanceContext = () => useContext(Context);

export default function Attendance(props) {
  const [state, setState] = useState({
    err: null,
    attendances: false,
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
        isLoading: false,
      });
      return;
    }

    const [firstChckIn, lastCheckIn] = data.data.map((d) => {
      return moment(d.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a');
    });

    const snitzie = (timeStr) => {
      const [, , time] = timeStr.split(',');
      return moment(time, 'h:mm:ss a');
    };

    const startTime = snitzie(firstChckIn);
    const endTime = snitzie(lastCheckIn ? lastCheckIn : firstChckIn);

    const timeDiff = moment.duration(endTime.diff(startTime));

    const timeRemaining = {
      hour: 9 - timeDiff.hours(),
      min: 60 - timeDiff.minutes(),
    };

    setState({
      ...state,
      attendances: {
        firstChckIn,
        lastCheckIn,
        timeRemaining,
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
