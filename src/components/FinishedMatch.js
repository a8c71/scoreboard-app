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
import Standings from './Standings';
import { joinMatch, deleteMatch } from '../actions';

const FinishedMatch = props => {
	const { id, start, end, players, standings } = props.data;
	return (
		<Card>
			<View style={styles.container}>
				<Text style={styles.title}>Creado por {players[0].nick} {Moment(start).fromNow()}</Text>
				<Text style={styles.age}>INICIO: {Moment(start).format('YYYY-MM-DD H:mm')}</Text>
				<Text style={styles.age}>FIN: {Moment(end).format('YYYY-MM-DD H:mm')}</Text>
				<Standings data={props.data} rounded/>
				<Button onButtonPress={() => props.joinMatch(id)} label='Detalles' />
				<Button onButtonPress={() => props.deleteMatch(id)} label='ELIMINAR' cancel />
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
	deleteMatch
})(FinishedMatch);
