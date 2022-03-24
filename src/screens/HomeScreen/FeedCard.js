import React, {Component} from 'react';
import {Card, CardItem, Thumbnail, Text, Left, Body} from 'native-base';
import * as PropTypes from 'prop-types';
import {View, Linking, Alert, StyleSheet} from 'react-native';
import {API_BASE_URL} from 'react-native-dotenv';
import ParsedText from 'react-native-parsed-text';

const url1 = 'https://google.com';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  url: {
    color: 'red',
    textDecorationLine: 'underline',
  },
  email: {
    textDecorationLine: 'underline',
  },
  text: {
    color: 'black',
    fontSize: 15,
  },
  phone: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  name: {
    color: 'red',
  },
  username: {
    color: 'green',
    fontWeight: 'bold',
  },
  magicNumber: {
    fontSize: 42,
    color: 'pink',
  },
  hashTag: {
    fontStyle: 'italic',
  },
});

class FeedCard extends Component {
  handleUrlPress = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('cannot open this link');
      }
    });
  };

  handleEmailPress = (email, matchIndex /*: number*/) => {
    Linking.openURL(`mailto:${email}`);
  };

  handlePhonePress = (phone, matchIndex /*: number*/) => {
    Linking.openURL(`tel:${phone}`);
  };

  render() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <Card style={{flex: 0, marginLeft: 10, marginRight: 10}}>
        <CardItem style={{backgroundColor: this.props.backgroundColor}}>
          <Left>
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <Thumbnail
                source={{
                  uri: `${API_BASE_URL}/${this.props.logo}`,
                }}
              />
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{fontSize: 10, marginRight: 'auto', marginLeft: 'auto'}}>
                {this.props.associationName}
              </Text>
            </View>

            <Body>
              <Text>{this.props.title}</Text>
              <Text note>{this.props.date}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem style={{backgroundColor: this.props.backgroundColor}}>
          <Body>
            <ParsedText
              selectable
              style={styles.text}
              parse={[
                {type: 'url', style: styles.url, onPress: this.handleUrlPress},
                {
                  type: 'phone',
                  style: styles.phone,
                  onPress: this.handlePhonePress,
                },
                {
                  type: 'email',
                  style: styles.email,
                  onPress: this.handleEmailPress,
                },
              ]}
              childrenProps={{allowFontScaling: false}}>
              {this.props.description}
            </ParsedText>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

FeedCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  associationName: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
};

export default FeedCard;
