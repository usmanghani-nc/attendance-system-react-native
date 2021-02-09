import React from 'react';

export const navigationRef = React.createContext();

export function navigate(name, params) {
  navigationRef.current && navigationRef.current.navigate(name, params);
}
