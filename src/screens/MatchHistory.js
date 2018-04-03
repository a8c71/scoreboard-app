import React, { Component } from 'react';
import { 
	View, 
	Text, 
	TouchableOpacity, 
	StyleSheet,
	FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import FinishedMatch from '../components/FinishedMatch';
import { refreshMatchHistory } from '../actions';

class MatchHistory extends Component{
	render() {
		const { matches } = this.props;
		return(
			<FlatList
				data={matches}
				keyExtractor={({ id }) => `match_${id}`}
				renderItem={({ item }) => (<FinishedMatch data={item}/>)}
				style={styles.container}
				ListEmptyComponent={<Text style={styles.empty}>No hay Partidas en el historial</Text>}
				onRefresh={() => this.props.refreshMatchHistory()}
				refreshing={!matches}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	empty: {
		flex: 1,
		fontSize: 20,
		textAlign: 'center',
		padding: 20,
		fontFamily: 'Vintage-avalanche',
	}
});

export default connect(({ matchHistory }) => ({ matches: matchHistory }), { refreshMatchHistory })(MatchHistory);
