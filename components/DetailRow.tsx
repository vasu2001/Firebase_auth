import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native-gesture-handler';

export interface DetailRowProps {
  labelText: string;
  detailText: string;
  editable?: boolean;
  editCallback?: () => void;
}

export interface DetailRowState {}

export default class DetailRowComponent extends React.Component<
  DetailRowProps,
  DetailRowState
> {
  constructor(props: DetailRowProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.labelText}>{this.props.labelText}</Text>
        <Text style={styles.detailText}>{this.props.detailText}</Text>
        {this.props.editable ? (
          <TouchableOpacity onPress={this.props.editCallback}>
            <Icon name="edit" size={20} />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    marginVertical: 7,
  },
  labelText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
  detailText: {
    fontSize: 20,
    padding: 5,
    flex: 1,
  },
});
