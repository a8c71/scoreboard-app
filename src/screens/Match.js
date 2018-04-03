import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

import PointLog from '../components/PointLog';
import Standings from '../components/Standings';
import ScoreUpdater from '../components/ScoreUpdater';


class Matches extends Component{
	render() {
		return(
			<View style={styles.container}>
				<Standings />
				<PointLog />
				<ScoreUpdater />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
});

export default Matches;
