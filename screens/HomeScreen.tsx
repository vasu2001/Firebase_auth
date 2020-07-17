import * as React from 'react';
import {View, StyleSheet, Text, Image, ProgressBarAndroid} from 'react-native';
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
  photoLoading: boolean;
}

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: false,
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
      photoLoading: false,
    };
  }

  componentDidUpdate() {
    console.log('component did update');
  }

  render() {
    const imgSource = this.props.user?.profilePhoto
      ? {uri: this.props.user?.profilePhoto}
      : require('../assets/profile_placeholder.jpg');

    return (
      <View style={{flex: 1}}>
        <DialogComponent
          fieldName={this.state.dialogText}
          visible={this.state.dialogVisible}
          callback={this.state.dialogCallback}
          cancel={this.cancelDialog}
        />
        {this.state.photoLoading ? (
          <View
            style={{
              margin: 30,
              alignSelf: 'center',
              borderWidth: 2,
              height: 200,
              width: 200,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ProgressBarAndroid />
          </View>
        ) : (
          <TouchableOpacity
            style={{
              margin: 30,
              alignSelf: 'center',
              borderWidth: 2,
              borderRadius: 105,
            }}
            onPress={this.selectImage}>
            <Image
              source={imgSource}
              style={{
                height: 200,
                width: 200,
                borderRadius: 100,
              }}
            />
          </TouchableOpacity>
        )}
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
      // console.log('Response = ', response);
      this.setState({photoLoading: true});

      if (response.didCancel) {
        console.log('User cancelled image picker');
        this.setState({photoLoading: false});
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        this.setState({photoLoading: false});
      } else {
        _UploadProfile(this.props.dispatch)(
          response?.path ?? '',
          this.props.user?.userId ?? '',
          () => {
            this.setState({photoLoading: false});
          },
        );
      }
    });
  };
}

const mapStateToProps = (state: storeInterface) => {
  return state;
};

const connector = connect(mapStateToProps);
export default connector(HomeScreen);
