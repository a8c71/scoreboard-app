import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Game from '../components/Game';

class Games extends Component{
	renderGames() {
		const { games } = this.props;
		return (
			<FlatList
				data={games}
				keyExtractor={({ id }) => `game_${id}`}
				renderItem={({ item }) => (<Game data={item} />)}
			/>
		);
	}
	render() {
		return(
			<View style={styles.container}>
				{this.renderGames()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fcfbf8'
	}
});

const mapStateToProps = ({ games }) => ({ games });

export default connect(mapStateToProps)(Games);
