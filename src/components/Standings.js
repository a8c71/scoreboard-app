import React, { Component } from 'react';
import { 
	View, 
	Image, 
	Text, 
	StyleSheet, 
	TouchableOpacity,
	FlatList,
	UIManager,
	LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';

const gold = '#e0be45';
const silver = '#d0dfe5';
const copper = '#f17f29';

const Standings = ({ match, data }) => {
	if (data) return (
		<FlatList
			data={data.standings}
			keyExtractor={({ player_id }) => `podium_${player_id}`}
			renderItem={({ item, index }) => (<Position data={item} index={index}/>)}
			style={styles.container}
			contentContainerStyle={{alignItems: 'center'}}
			horizontal
		/>
	);
	if (match.standings) return (
		<FlatList
			data={match.standings}
			keyExtractor={({ player_id }) => `podium_${player_id}`}
			renderItem={({ item, index }) => (<Position data={item} index={index}/>)}
			style={styles.container}
			contentContainerStyle={{alignItems: 'center'}}
			horizontal
		/>
	);
	else return (<View/>);
}

class Position extends Component {
	componentWillUpdate() {
		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.easeInEaseOut();
  }
	render() {
		const { data, index } = this.props;
		const placeStyle = 
		(index === 0 && StyleSheet.flatten([styles.place, { color: gold }])) ||
		(index === 1 && StyleSheet.flatten([styles.place, { color: silver }])) ||
		(index === 2 && StyleSheet.flatten([styles.place, { color: copper }]));

		return(
			<View style={styles.positionContainer}>
				<View style={styles.imageFrame}>
			    <Text style={placeStyle ? placeStyle : styles.place}>
			      {index+1}° lugar
			    </Text>
			  </View>

				<View style={styles.playerContainer}>
					<Text style={styles.player}>{data.player.nick}</Text>
					<Text style={styles.score}>{data.points} punto{(data.points > 1 || data.points == 0) ? 's' : ''}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		maxHeight: 140,
		backgroundColor: '#50be9c',
	},
  positionContainer: {
  	margin: 10,
  	alignItems: 'center',
  	justifyContent: 'center',
  },
	playerContainer: {
		marginTop: 5
	},
	title: {
		flex: 1,
		fontSize: 20,
		textAlign: 'center',
		paddingBottom: 5
	},
	description: {
		flex: 1
	},
	place: {
		fontFamily: 'I-am-awake',
		color: '#4ce0b3',
		fontSize: 15,
		backgroundColor: 'transparent'
	},
	player: {
		fontFamily: 'I-am-awake',
		textAlign: 'center',
		color: 'white',
		fontSize: 18
	},	
	score: {
		fontFamily: 'I-am-awake',
		textAlign: 'center',
		color: 'white',
		fontSize: 12
	},
	imageFrame: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default connect(({ match }) => ({ match }))(Standings);
