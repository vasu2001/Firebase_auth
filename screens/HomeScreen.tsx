import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {storeInterface} from '../redux/utils';
import DetailRowComponent from '../components/DetailRow';
import DialogComponent from '../components/Dialog';

export interface HomeScreenProps {}

export interface HomeScreenState {}

class HomeScreen extends React.Component<
  HomeScreenProps & ConnectedProps<typeof connector>,
  HomeScreenState
> {
  constructor(props: HomeScreenProps & ConnectedProps<typeof connector>) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <DialogComponent fieldName="Name" callback={(Text) => {}} />
        <Text>HomeScreen</Text>
        <DetailRowComponent
          labelText="Name"
          detailText={this.props.user?.name ?? ''}
          editable
          editCallback={() => {}}
        />
        <DetailRowComponent
          labelText="Email"
          detailText={this.props.user?.email ?? ''}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: storeInterface) => {
  return {...state};
};

const connector = connect(mapStateToProps);
export default connector(HomeScreen);
