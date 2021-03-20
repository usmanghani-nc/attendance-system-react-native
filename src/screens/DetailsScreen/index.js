import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { attendanceContext } from '../../context/AttendanceContext';
import { Spinner, Card, Icon } from 'native-base';

export default function DetailsScreen({ navigation }) {
  const { functions, state: contextState } = attendanceContext();

  useEffect(() => {
    functions.attendances();
  }, []);

  const hours = contextState.attendances?.timeRemaining?.hour < 1 ? true : false;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {contextState.isLoading ? (
        <Spinner color="blue" />
      ) : (
        <View>
          {contextState.attendances ? (
            <>
              <Card style={styles.box}>
                <Text style={styles.remainingTitle}>Time Remaining</Text>
                <View style={styles.remaining}>
                  <Text style={{ marginRight: 5 }}>
                    <Icon
                      type="FontAwesome"
                      name={hours ? 'plus' : 'minus'}
                      style={{
                        ...styles.remainingTitle,

                        color: hours ? '#0083ff' : 'red',
                      }}
                    />
                  </Text>

                  <Text
                    style={{
                      ...styles.remainingTitle,
                      color: hours ? '#0083ff' : 'red',
                    }}>
                    {contextState.attendances?.timeRemaining?.hour}:
                    {contextState.attendances?.timeRemaining?.min}
                  </Text>
                </View>
              </Card>

              <Card style={styles.box}>
                <Text style={styles.title}>First Check In</Text>
                <Text>{contextState.attendances?.firstChckIn}</Text>
              </Card>
              <Card style={styles.box}>
                <Text style={styles.title}>Last Check In</Text>
                <Text>{contextState.attendances?.lastCheckIn}</Text>
              </Card>
            </>
          ) : (
            <Text>Not Check In</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    fontSize: 17,
    lineHeight: 30,
  },
  remaining: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  remainingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
