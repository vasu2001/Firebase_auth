import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {ScrollView} from 'react-native-gesture-handler';
import {_SignUp} from '../redux/actions';
import {connect, ConnectedProps} from 'react-redux';

export interface SignupScreenProps {}

export interface SignupScreenState {
  email: string;
  password1: string;
  password2: string;
  name: string;
  emailValidated: boolean;
  passwordValidated1: boolean;
  passwordValidated2: boolean;
  loading: boolean;
}

class SignupScreenComponent extends React.Component<
  SignupScreenProps & ConnectedProps<typeof connector>,
  SignupScreenState
> {
  constructor(props: SignupScreenProps & ConnectedProps<typeof connector>) {
    super(props);
    this.state = {
      email: '',
      password1: '',
      password2: '',
      name: '',
      emailValidated: true,
      passwordValidated1: true,
      passwordValidated2: true,
      loading: false,
    };
  }

  public render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={styles.mianContainer}>
          <CustomInput
            labelText="Name"
            value={this.state.name}
            onChangeText={this.handleName}
            validated={true}
          />
          <CustomInput
            labelText="Email"
            value={this.state.email}
            onChangeText={this.handleEmail}
            validated={this.state.emailValidated}
          />
          <CustomInput
            labelText="Password"
            value={this.state.password1}
            onChangeText={this.handlePassword1}
            validated={this.state.passwordValidated1}
            isPassword
          />

          <CustomInput
            labelText="Repeat Password"
            value={this.state.password2}
            onChangeText={this.handlePassword2}
            validated={this.state.passwordValidated2}
            isPassword
          />

          <CustomButton
            text="SignUp"
            callback={this.handleSignup}
            active={
              this.state.emailValidated &&
              this.state.passwordValidated1 &&
              this.state.passwordValidated2 &&
              !this.state.loading
            }
          />
        </View>
      </ScrollView>
    );
  }

  handleName = (text: string): void => {
    this.setState({name: text});
  };

  handleEmail = (text: string): void => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({email: text, emailValidated: re.test(text)});
  };

  handlePassword1 = (text: string): void => {
    this.setState({password1: text, passwordValidated1: text.length >= 8});
  };

  handlePassword2 = (text: string): void => {
    this.setState({
      password2: text,
      passwordValidated2: this.state.password1 === text,
    });
  };

  handleSignup = (): void => {
    const {name, email, password1, password2} = this.state;
    if (
      name.length > 0 &&
      email.length > 0 &&
      password1.length > 0 &&
      password2.length > 0
    ) {
      this.setState({loading: true});
      _SignUp(this.props.dispatch)(email, password1, name, () => {
        this.setState({loading: false});
      });
    } else {
      console.log('enter all details');
    }
  };
}

const connector = connect();
export default connector(SignupScreenComponent);

const styles = StyleSheet.create({
  mianContainer: {
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
    height: 600,
  },
});
