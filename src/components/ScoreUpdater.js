import React, { Component } from 'react';
import { 
	View, 
	Image, 
	Text, 
	StyleSheet, 
	TouchableOpacity,
	Picker
} from 'react-native';
import { connect } from 'react-redux';

import Card from './Card';
import Button from './Button';
import { addPoints, removeLastPoint } from '../actions';

class ScoreUpdater extends Component {
	state = { 
		points: '1'
	};

	render() {
		const { points } = this.state;
		return (
			<View style={styles.container}>
				<Picker
					selectedValue={points}
					onValueChange={value => this.setState({ points: value })}
					style={styles.picker}
				>
					<Picker.Item label="1 Punto" value="1" />
					<Picker.Item label="2 Puntos" value="2" />
					<Picker.Item label="3 Puntos" value="3" />
					<Picker.Item label="4 Puntos" value="4" />
					<Picker.Item label="5 Puntos" value="5" />
					<Picker.Item label="6 Puntos" value="6" />
					<Picker.Item label="7 Puntos" value="7" />
					<Picker.Item label="8 Puntos" value="8" />
					<Picker.Item label="9 Puntos" value="9" />
					<Picker.Item label="10 Puntos" value="10" />
				</Picker>
				<View>
					<Button 
						onButtonPress={() => this.props.addPoints(points)} 
						label='Gane!'
						fill
					/>
					<Button 
						label='Deshacer' 
						onButtonPress={() => this.props.removeLastPoint()}
						fill
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 200
	},
	picker: {
		flex: 1,
		height: 100
	},
	description: {
		flex: 1
	},
	image: {
		height: 200,
		width: null
	}
});

export default connect(null, {
	addPoints,
	removeLastPoint
})(ScoreUpdater);
