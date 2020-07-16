import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export interface IntroScreenProps {
  callback: () => void;
}

export interface IntroScreenState {}

interface itemInterface {
  text: string;
  color: string;
}

const {width, height} = Dimensions.get('window');

export default class IntroScreenComponent extends React.Component<
  IntroScreenProps,
  IntroScreenState
> {
  constructor(props: IntroScreenProps) {
    super(props);
    this.state = {};

    this.scrollRef = null;

    this.data = [
      {text: 'Hey there! Welcome to the app tour', color: 'grey'},
      {
        text: 'Now you have completed the tour press get started below',
        color: 'red',
      },
    ];
  }

  data: itemInterface[];
  scrollRef: FlatList | null;

  public render() {
    console.log('width ' + width);
    return (
      <FlatList
        horizontal
        style={{flex: 1}}
        snapToInterval={width}
        data={this.data}
        bounces={false}
        ref={(ref) => (this.scrollRef = ref)}
        renderItem={({item, index}) => this.introPage(item, index)}
      />
    );
  }

  introPage = (item: itemInterface, index: number) => {
    return (
      <View style={[styles.introPageContainer, {backgroundColor: item.color}]}>
        <Text style={{fontSize: 25, color: 'white', margin: 20}}>
          {item.text}
        </Text>
        {index + 1 < this.data.length ? (
          <TouchableOpacity onPress={() => this.nextPress(index)}>
            <View style={styles.buttonContainer}>
              <Text style={{fontSize: 20}}>Next</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.getStarted()}>
            <View style={styles.buttonContainer}>
              <Text style={{fontSize: 20}}>Get Started</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  nextPress = (index: number): void => {
    this.scrollRef?.scrollToIndex({index: index + 1, animated: true});
  };

  getStarted = (): void => {
    AsyncStorage.setItem('hasOpened', 'true', this.props.callback);
  };
}

const styles = StyleSheet.create({
  introPageContainer: {
    width: width,
    justifyContent: 'space-between',
    padding: 30,
  },
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignSelf: 'center',
  },
});
