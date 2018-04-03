import React from 'react';
import { 
	View, 
	Image, 
	Text, 
	StyleSheet, 
	TouchableOpacity 
} from 'react-native';
import { connect } from 'react-redux';

import Card from './Card';
import Button from './Button';
import { goToNewGame, goToMatchHistory } from '../actions';

const Game = props => {
	const { name, description, picture_url, id } = props.data;
	return (
		<Card>
			<View style={styles.container}>
				<Text style={styles.title}>{name}</Text>
				<Image 
					resizeMode="contain" 
					source={{ uri: picture_url }} 
					style={styles.image}
				/>
				<Text style={styles.description}>{description}</Text>
				<Button onButtonPress={() => props.goToNewGame(id)} label='Nueva Partida' />
				<Button onButtonPress={() => props.goToMatchHistory(props.data)} label='Historial de Partidas' />
			</View>
		</Card>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
		overflow: 'hidden',
	},
	title: {
		flex: 1,
		fontSize: 20,
		textAlign: 'center',
		paddingBottom: 5,
		fontFamily: 'I-am-awake'
	},
	description: {
		flex: 1,
		marginHorizontal: 20,
		marginVertical: 10,
		fontSize: 14,
		color: 'rgb(180,180,180)',
		fontFamily: 'I-am-awake'
		// fontFamily: 'Existence-light',

	},
	image: {
		height: 300,
		width: null,
	}
});

export default connect(null, {
	goToNewGame,
	goToMatchHistory
})(Game);
