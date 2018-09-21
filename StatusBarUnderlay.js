import { Constants } from 'expo';
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class StatusBarUnderlay extends React.Component {
  state = {};

  componentDidMount = () => {};

  render = () => {
    return <View style={styles.statusBar} />;
  };
}

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
  },
});
