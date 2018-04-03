import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


class TabBar extends Component {
	renderGamesList() {
		const selected = this.props.navigationState.index === 0;
		return (
			<TouchableOpacity 
				onPress={() => Actions.jump('Games')}
				style={styles.hitBox}
			>
				<Icon 
					name="cards"
					color={selected ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.3)'} 
					size={40} 
				/>
				<Text
					style={selected ? styles.selected : styles.inactive}
				>
					JUEGOS
				</Text>
			</TouchableOpacity>
		);
	}

	renderMatchesList() {
		const selected = this.props.navigationState.index === 1;
		return (
			<TouchableOpacity 
				onPress={() => Actions.jump('Matches')}
				style={styles.hitBox}
			>
				<Text
					style={selected ? styles.selected : styles.inactive}
				>
					PARTIDAS
				</Text>
				<Icon 
					name="account-multiple"
					color={selected ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.3)'} 
					size={40} 
				/>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				{this.renderGamesList()}
				{this.renderMatchesList()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#4ce0b3',
    height: '9%'
  },
  hitBox: {
  	flexDirection: 'row',
  	alignItems: 'center',
  	justifyContent: 'space-between',
  	alignSelf: 'flex-end',
  	paddingBottom: 5
  },
  selected: {
		color: 'rgba(255,255,255,1)',
		fontSize: 30,
		fontFamily: 'I-am-awake',
		paddingHorizontal: 5
  },
  inactive: {
		color: 'rgba(255,255,255,0.3)',
		fontSize: 30,
		fontFamily: 'I-am-awake',
		paddingHorizontal: 5
  },
});

export default TabBar;
