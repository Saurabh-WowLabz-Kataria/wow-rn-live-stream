import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { AnimatedEmoji } from 'react-native-animated-emoji';
import Dimens from '../utils/Dimens';

class AnimatedEmoticonsComp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      emojiArray: [],
      animationsObj: {},
      reactionsArr: [],
      currentTimeStamp: 0
    };

    this._emojis = {};
    this.emojiIndex = 0;
  }

  componentDidMount() {
    this.setState({
      animationsObj: this.props.deltaReactions,
      currentTimeStamp: this.props.timeStamp
    }, () => {
      this.updateEmojiArray()
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentTimeStamp < this.props.timeStamp) {
      this.setState({
        animationsObj: this.props.deltaReactions,
        currentTimeStamp: this.props.timeStamp
      }, () => {
        this.updateEmojiArray()
      })
    }

  }

  updateEmojiArray() {
    const { deltaReactions } = this.props
    let aTempArr = []
    for (const element of Object.keys(deltaReactions)) {
      if (deltaReactions[element] > 0) {
        for (let i = 0; i < deltaReactions[element]; i++) {
          aTempArr.push(element)
        }
      }
    }
    this.setState({
      reactionsArr: aTempArr
    }, () => {
      for (let i = 0; i < this.state.reactionsArr.length; i++) {
        this.generateEmoji();
      }
    })
  }

  /**
   * Function to generate emoji
   */
  generateEmoji = () => {
    const { emojiArray, reactionsArr } = this.state;
    const newEmojis = Object.assign(emojiArray, []);

    let index = Math.floor(Math.random() * Math.floor(reactionsArr.length));
    const emoji = {
      key: this.emojiIndex,
      name: reactionsArr[index],
      size: Math.floor(Math.random() * Math.floor(8)) + 10,
      duration: Math.floor(Math.random() * Math.floor(1500)) + 1500,
      yPosition: 300
    };
    newEmojis.push(emoji);
    this.emojiIndex += 1;

    this.setState({ emojiArray: newEmojis });
  };

  /**
   * Animation completion callback
   * @param index
   */
  onAnimationCompleted = (index) => {
  };

  render() {
    let emojiComponents = this.state.emojiArray.map((emoji) => {
      return (
        <AnimatedEmoji
          key={emoji.key}
          index={emoji.key}
          ref={ref => this._emojis[emoji.key] = ref}
          style={{ bottom: emoji.yPosition }}
          name={emoji.name}
          size={emoji.size}
          duration={emoji.duration}
          onAnimationCompleted={this.onAnimationCompleted}
        />
      )
    })

    return (
      <View style={styles.container}>
        {emojiComponents}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    marginEnd: Dimens.dimen_96,
  }
});

export default AnimatedEmoticonsComp;