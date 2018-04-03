import React from 'react';
import { 
	View, 
	Image, 
	Text, 
	StyleSheet, 
	TouchableOpacity 
} from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';
import 'moment/locale/es';

import Card from './Card';
import Button from './Button';
import { joinMatch, endMatch } from '../actions';

const Match = props => {
	const { id, start, game, players } = props.data;
	return (
		<Card>
			<View style={styles.container}>
				<Text style={styles.title}>{game.name}</Text>
				<Image 
					resizeMode="contain" 
					source={{ uri: game.picture_url }} 
					style={styles.image}
				/>
				<Text style={styles.age}>Creado por {players[0].nick} {Moment(start).fromNow()}</Text>
				<Button onButtonPress={() => props.joinMatch(id)} label='Unirse' />
				<Button onButtonPress={() => props.endMatch(id)} label='Terminar' />
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
	age: {
		flex: 1,
		marginHorizontal: 20,
		marginVertical: 10,
		fontSize: 14,
		color: 'rgb(180,180,180)',
		fontFamily: 'I-am-awake'
	},
	image: {
		height: 300,
		width: null
	}
});

export default connect(null, {
	joinMatch,
	endMatch
})(Match);
