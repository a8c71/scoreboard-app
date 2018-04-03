import React, { Component } from 'react';
import { 
	View, 
	Text, 
	TouchableOpacity, 
	StyleSheet ,
	TextInput,
	Linking
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Button from '../components/Button';
import { requestAccessToken } from '../actions';

class Login extends Component{
	state = {
		email: '',
		password: ''
	}

	render() {
		const {
			email,
			password
		} = this.state;
		return(
			<View style={styles.container}>
				<TextInput 
					style={styles.input} 
					placeholder='Email'
					value={email}
					onChangeText={email => this.setState({ email })}
					underlineColorAndroid='rgba(255,255,255,0)'
					autoCorrect={false} 
					autoCapitalize='none' 
					keyboardType='email-address'
				/> 
				<TextInput 
					style={styles.input} 
					placeholder='Password'
					value={password}
					onChangeText={password => this.setState({ password })}
					underlineColorAndroid='rgba(255,255,255,0)'
					autoCorrect={false} 
					autoCapitalize='none'
					secureTextEntry
				/> 
				<Button 
					label='Ingresar' 
					onButtonPress={() => this.props.requestAccessToken(email, password)}
				/>
				<Button 
					label='Crear Cuenta'
					onButtonPress={() => Linking.openURL('http://scoreboard.afinitat.xyz/register')} 
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	input: {
		width: '90%',
		marginHorizontal: 7,
		marginVertical: 4,
		backgroundColor: 'white',
		borderRadius: 5,
		padding: 5,
		color: 'black',
		textAlign: 'center',
	},
});

export default connect(null, {
	requestAccessToken
})(Login);
