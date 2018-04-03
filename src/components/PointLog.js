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
import Moment from 'moment';
import 'moment/locale/es';

import Card from './Card';
import Button from './Button';
import { goToNewGame } from '../actions';

class PointLog extends Component {
	render() {
		const { points } = this.props.match;
		if (points) return (
			<FlatList
				data={points}
				keyExtractor={({ id }) => `point_${id}`}
				renderItem={({ item }) => (<Point data={item} />)}
				style={styles.container}
				inverted
			/>
		);
				// ItemSeparatorComponent={() => (<View style={styles.separator}/>)}
		else return (<View />);
	}
}

class Point extends Component {
	componentWillUpdate() {
		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.easeInEaseOut();
  }
  renderEvent() {
  	const { data } = this.props;
  	
  	if (data.value === 0) return(
  		<Text style={styles.point}>{data.player.nick} se ha unido a la partida</Text>
  	);
  	return(
  		<Text style={styles.point}>{data.player.nick} ha ganado {data.value} punto{data.value > 1 ? 's' : ''}</Text>
  	);
  }
  render() {
  	const { data } = this.props;
  	
		return (
			<View style={styles.pointConatiner}>
				<Text style={styles.timestamps}>{Moment(data.created_at).fromNow()}</Text>
				{this.renderEvent()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 5,
		overflow: 'hidden',
		borderTopWidth: 1,
		paddingTop: 10,
		borderColor: '#5e3023'
	},
	timestamps: {
		fontSize: 11,
		textAlign: 'right',
		paddingBottom: 5,
		fontStyle: 'italic',
		color: 'rgb(180,180,180)'
	},
	separator: {
		flex: 1,
		width: '70%',
		height: 1,
		backgroundColor: 'rgb(200,200,200)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	point: {
		fontFamily: 'Vintage-avalanche',
		fontSize: 18
	},
	pointConatiner: {
		paddingTop: 5,
	}
});

export default connect(({ match }) => ({ match }))(PointLog);
