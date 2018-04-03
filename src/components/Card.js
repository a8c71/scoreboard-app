import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children }) => (
	<View style={styles.container}>
		{children}
	</View>
);

const styles = StyleSheet.create({
	container: {
		margin: 10,
		borderRadius: 5,
		borderColor: 'gray',
		flex: 1,
		backgroundColor: 'white'
	}
});

export default Card;