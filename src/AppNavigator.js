import React, { Component } from 'react';
import { 
	View, 
	Text, 
	Image, 
	Platform, 
	TouchableOpacity, 
	StatusBar, 
	NetInfo,
	StyleSheet,
	Keyboard,
	AppState
} from 'react-native';
import { 
	Router, 
	Scene, 
	Stack, 
	Tabs,
	Lightbox,
	Actions,
	Modal
} from 'react-native-router-flux';
import { connect } from 'react-redux';

import TabBar from './components/TabBar';
import Games from './screens/Games';
import Matches from './screens/Matches';
import Match from './screens/Match';
import MatchHistory from './screens/MatchHistory';
import Login from './screens/Login';

import { 
	stopUpdatingMatch
} from './actions';

class AppNavigator extends Component {
	componentWillMount() {
		StatusBar.setBarStyle('light-content', true);
	}

 	onBackPress = () => {
		return Actions.pop();
	}

	render() {
		return (
			<Router backAndroidHandler={this.onBackPress} hideNavBar>
				<Modal key="modal">
					<Lightbox key="lightbox">
						<Stack key="screens" hideNavBar>
							<Scene 
								key="root" 
								initial
							>
								<Tabs
									key="tabbar"
									showLabel={false}
									tabBarStyle={styles.tabBar}
									tabBarComponent={({ navigationState }) => <TabBar navigationState={navigationState}/>}
									tabBarPosition="top"
									swipeEnabled={false}
								>
									<Scene 
										key="Games"
										component={Games}
										hideNavBar
									/>
									<Scene 
										key="Matches"
										component={Matches}
										hideNavBar
									/>
								</Tabs>
							</Scene>
							<Scene
								key="Match"
								component={Match}
								hideNavBar={false}
								title={this.props.app.matchTitle}
								onExit={() => this.props.stopUpdatingMatch()}
								navigationBarStyle={styles.navBar}
								titleStyle={styles.titleStyle}
								navBarButtonColor='white'
							/>							
							<Scene
								key="MatchHistory"
								component={MatchHistory}
								hideNavBar={false}
								title={this.props.app.gameHistory.name}
								navigationBarStyle={styles.navBar}
								titleStyle={styles.titleStyle}
								navBarButtonColor='white'
							/>
						</Stack>
					</Lightbox>

					<Scene 
						key="Login"
						component={Login}
						hideNavBar
					/>
				</Modal>
			</Router>
		);
	}
}

const styles = StyleSheet.create({
	tabBar: {
		height: 40,
	},
	navBar: {
		backgroundColor: '#4ce0b3'
	},
	title: {
		color: 'white',
		fontFamily: 'I-am-awake'
	}
}); 

export default connect(({ app }) => ({ app }), { stopUpdatingMatch })(AppNavigator);
