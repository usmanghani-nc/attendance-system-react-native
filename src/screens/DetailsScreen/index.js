import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { attendanceContext } from '../../context/AttendanceContext';

export default function DetailsScreen({ navigation }) {
  const { functions, state: contextState } = attendanceContext();

  useEffect(() => {
    functions.attendances();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {contextState.isLoading ? (
        <Text>Loading....</Text>
      ) : (
        <View>
          {contextState.attendances ? (
            <>
              <Text>First Check In {contextState.attendances?.firstChckIn}</Text>
              <Text>Last Check In {contextState.attendances?.lastCheckIn}</Text>
            </>
          ) : (
            <Text>Not Check In</Text>
          )}
        </View>
      )}
    </View>
  );
}
