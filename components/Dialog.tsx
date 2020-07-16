import * as React from 'react';
import {View, StyleSheet, Text, Modal} from 'react-native';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';

export interface DialogProps {
  fieldName: string;
  callback: (text: string) => void;
  cancel: () => void;
  visible: boolean;
}

export interface DialogState {
  fieldValue: string;
  laoding: boolean;
}

export default class DialogComponent extends React.Component<
  DialogProps,
  DialogState
> {
  constructor(props: DialogProps) {
    super(props);
    this.state = {
      fieldValue: '',
      laoding: false,
    };
  }

  public render() {
    return (
      <Modal
        transparent
        presentationStyle="overFullScreen"
        visible={this.props.visible}>
        <View style={styles.mainContainer}>
          <View style={styles.dialogContainer}>
            <CustomInput
              value={this.state.fieldValue}
              labelText={this.props.fieldName}
              onChangeText={(text: string) => {
                this.setState({fieldValue: text});
              }}
              validated={this.state.fieldValue.length > 0}
            />
            <View style={styles.buttonRow}>
              <CustomButton
                text="Submit"
                callback={() => {
                  this.setState({laoding: true});
                  this.props.callback(this.state.fieldValue);
                }}
                active={!this.state.laoding}
              />
              <CustomButton
                text="Cancel"
                callback={this.props.cancel}
                active={!this.state.laoding}
              />
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
