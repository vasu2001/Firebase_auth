import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {storeInterface} from '../redux/utils';
import DetailRowComponent from '../components/DetailRow';
import DialogComponent from '../components/Dialog';
import {_ChangeName} from '../redux/actions';

export interface HomeScreenProps {}

export interface HomeScreenState {
  dialogText: string;
  dialogVisible: boolean;
  dialogCallback: (text: string) => void;
}

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
}

const mapStateToProps = (state: storeInterface) => {
  return {...state};
};

const connector = connect(mapStateToProps);
export default connector(HomeScreen);
