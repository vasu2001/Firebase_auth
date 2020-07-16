import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {TouchableOpacity} from 'react-native-gesture-handler';

export interface SigninScreenProps {}

export interface SigninScreenState {
  email: string;
  password: string;
  emailValidated: boolean;
  passwordValidated: boolean;
}

export default class SigninScreenComponent extends React.Component<
  SigninScreenProps,
  SigninScreenState
> {
  constructor(props: SigninScreenProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailValidated: true,
      passwordValidated: true,
    };
  }

  public render() {
    return (
      <View style={styles.mianContainer}>
        <CustomInput
          labelText="Email"
          value={this.state.email}
          onChangeText={this.handleEmail}
          validated={this.state.emailValidated}
        />
        <CustomInput
          labelText="Password"
          value={this.state.password}
          onChangeText={this.handlePassword}
          validated={this.state.passwordValidated}
          isPassword
        />

        <CustomButton
          text="SignIn"
          callback={this.handleSignIn}
          active={this.state.emailValidated && this.state.passwordValidated}
        />

        <View style={styles.forgetPassConatiner}>
          <TouchableOpacity onPress={this.forgetPassword}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupContainer}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={this.signup}>
            <Text style={styles.linkText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  handleSignIn = (): void => {
    if (this.state.email.length > 0 && this.state.password.length > 0) {
      //signin req
    } else {
      console.log('enter all details');
    }
  };

  handleEmail = (text: string): void => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({email: text, emailValidated: re.test(text)});
  };

  handlePassword = (text: string): void => {
    this.setState({password: text, passwordValidated: text.length >= 8});
  };

  forgetPassword = (): void => {};

  signup = (): void => {};
}

const styles = StyleSheet.create({
  mianContainer: {
    justifyContent: 'center',
    padding: 10,
    flex: 1,
    backgroundColor: 'white',
  },
  forgetPassConatiner: {
    alignItems: 'flex-end',
  },
  signupContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'flex-end',
    // alignSelf: 'center',
  },
  linkText: {
    color: 'blue',
    textDecorationColor: 'blue',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    fontSize: 17,
  },
});
