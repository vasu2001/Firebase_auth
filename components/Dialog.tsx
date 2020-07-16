import * as React from 'react';
import {View, StyleSheet, Text, Modal} from 'react-native';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';

export interface DialogProps {
  fieldName: string;
  callback: (text: string) => void;
}

export interface DialogState {
  fieldValue: string;
}

export default class DialogComponent extends React.Component<
  DialogProps,
  DialogState
> {
  constructor(props: DialogProps) {
    super(props);
    this.state = {
      fieldValue: '',
    };
  }

  public render() {
    return (
      <Modal transparent presentationStyle="overFullScreen">
        <View style={styles.mainContainer}>
          <View style={styles.dialogContainer}>
            <CustomInput
              value={this.state.fieldValue}
              labelText={this.props.fieldName}
              onChangeText={(text: string) => {
                this.setState({fieldValue: text});
              }}
              validated={true}
            />
            <View style={styles.buttonRow}>
              <CustomButton text="Submit" callback={() => {}} />
              <CustomButton text="Cancel" callback={() => {}} />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  dialogContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 35,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
