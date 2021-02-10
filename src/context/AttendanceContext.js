import React, { useContext, useState } from 'react';
import trackAPI from '../api';
import * as RootNavigation from '../../RootNavigation';

export const Context = React.createContext();

export const attendanceContext = () => useContext(Context);

export default function Attendance(props) {
  const [state, setState] = useState({});

  const handleCheckIn = async (data) => {
    // const { data } = await trackAPI.get('checkin');

    console.log(data, '??');

    if (data) RootNavigation.navigate('Details');
  };

  return (
    <Context.Provider value={{ state: { ...state }, functions: { handleCheckIn } }}>
      {props.children}
    </Context.Provider>
  );
}
