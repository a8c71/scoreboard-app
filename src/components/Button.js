import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';


export const styles = StyleSheet.create({
	defaultText: {
		textAlign: 'center',
		padding: 10,
		color: 'white',
		fontSize: 16,
		fontFamily: 'I-am-awake'
	},
	defaultContainer: {
		backgroundColor: '#3fb893',
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: '#524954',
		flex: 1,
		borderRadius: 10,
		borderWidth: 0,
		marginHorizontal: 4,
		marginVertical: 4,
		maxHeight: 40
	}
});

const Button = ({ onButtonPress, label, accept, cancel, fill }) => {
	let defaultLabel;
	let customStyleText;
	let customStyleContainer;

	if (accept) defaultLabel = 'Aceptar';
	else if (cancel) {
		defaultLabel = 'Cancelar';
		customStyleText = {
			color: '#493843',
		};
		customStyleContainer = {
			backgroundColor: '#f8f1ff',
			borderColor: '#493843',
			borderWidth: 1
		};
	}
	if (fill) {
		customStyleContainer = {
			maxHeight: '100%'
		};
	}

	return (
		<TouchableOpacity 
			onPress={onButtonPress} 
			style={StyleSheet.flatten([styles.defaultContainer, customStyleContainer])}
		>
			<Text style={[styles.defaultText, customStyleText]}>
				{_.toUpper(label || defaultLabel)}
			</Text>
		</TouchableOpacity>
	);
};

Button.propTypes = {
	label: PropTypes.string,
	onButtonPress: PropTypes.func.isRequired,
	accept: PropTypes.bool,
	cancel: PropTypes.bool,
	fill: PropTypes.bool,
};

export default Button;
