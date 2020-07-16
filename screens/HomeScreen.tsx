import * as React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {storeInterface} from '../redux/utils';
import DetailRowComponent from '../components/DetailRow';
import DialogComponent from '../components/Dialog';
import {_ChangeName, _LogOut, _UploadProfile} from '../redux/actions';
import CustomButton from '../components/CustomButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';

export interface HomeScreenProps {}

export interface HomeScreenState {
  dialogText: string;
  dialogVisible: boolean;
  dialogCallback: (text: string) => void;
  logOutLoading: boolean;
}

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class HomeScreen extends React.Component<
  HomeScreenProps & ConnectedProps<typeof connector>,
  HomeScreenState
> {
  constructor(props: HomeScreenProps & ConnectedProps<typeof connector>) {
    super(props);

    this.state = {
      dialogCallback: (text) => {},
      dialogText: '',
      dialogVisible: false,
      logOutLoading: false,
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <DialogComponent
          fieldName={this.state.dialogText}
          visible={this.state.dialogVisible}
          callback={this.state.dialogCallback}
          cancel={this.cancelDialog}
        />
        <TouchableOpacity
          style={{
            margin: 30,
            alignSelf: 'center',
            borderWidth: 2,
            borderRadius: 150,
          }}
          onPress={this.selectImage}>
          <Image
            source={
              true || this.props.user?.profilePhoto
                ? {
                    uri:
                      'https://firebasestorage.googleapis.com/v0/b/react-native-auth-aba3a.appspot.com/o/2067228385?alt=media&token=dfbf7971-93d1-4f8b-bae1-788110de12db',
                  }
                : require('../assets/profile_placeholder.jpg')
            }
            style={{
              height: 200,
              width: 200,
              borderRadius: 100,
            }}
          />
        </TouchableOpacity>
        <DetailRowComponent
          labelText="Name"
          detailText={this.props.user?.name ?? ''}
          editable
          editCallback={this.showChangeName}
        />
        <DetailRowComponent
          labelText="Email"
          detailText={this.props.user?.email ?? ''}
        />
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <CustomButton
            text="Logout"
            callback={this.logOut}
            active={!this.state.logOutLoading}
          />
        </View>
      </View>
    );
  }

  cancelDialog = (): void => {
    this.setState({
      dialogCallback: (text) => {},
      dialogText: '',
      dialogVisible: false,
    });
  };

  changeName = (newName: string): void => {
    _ChangeName(this.props.dispatch)(
      newName,
      this.cancelDialog,
      this.props.user?.userId ?? '',
    );
  };

  showChangeName = (): void => {
    this.setState({
      dialogCallback: this.changeName,
      dialogText: 'Name',
      dialogVisible: true,
    });
  };

  logOut = (): void => {
    this.setState({logOutLoading: true});
    _LogOut(this.props.dispatch)(() => {
      this.setState({logOutLoading: false});
    });
  };

  selectImage = (): void => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response.uri);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        // this.setState({
        //   avatarSource: source,
        // });
        _UploadProfile(this.props.dispatch)(response, () => {});
      }
    });
  };
}

const mapStateToProps = (state: storeInterface) => {
  return {...state};
};

const connector = connect(mapStateToProps);
export default connector(HomeScreen);
