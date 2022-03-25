import React, {useState} from 'react';
import {Card, CardItem, Thumbnail, Text, Left, Body} from 'native-base';
import * as PropTypes from 'prop-types';
import {
  TouchableOpacity,
  View,
  Animated,
  Alert,
  StyleSheet,
  Linking,
} from 'react-native';
import {API_BASE_URL} from 'react-native-dotenv';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {deleteArticle} from '../../store/reducers/articlesRedux';
import {isAdmin} from '../../Utils/Account';
import ParsedText from 'react-native-parsed-text';

const ANIM_INIT_OFFSET = 0;
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

const handleUrlPress = (url) => {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert('cannot open this link');
    }
  });
};

const handleEmailPress = (email, matchIndex /*: number*/) => {
  Linking.openURL(`mailto:${email}`);
};

const handlePhonePress = (phone, matchIndex /*: number*/) => {
  Linking.openURL(`tel:${phone}`);
};

const mapStateToProps = (state) => ({
  user: state.accountStore.user,
});

const mapDispatchToProps = (dispatch) => ({
  deleteArticleDispatch: (id) => dispatch(deleteArticle(id)),
});

const FeedCard = ({
  user,
  deleteArticleDispatch,
  backgroundColor,
  logo,
  associationName,
  id,
  title,
  date,
  description,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [animeY] = useState(new Animated.Value(ANIM_INIT_OFFSET));
  const [animeOpacity] = useState(new Animated.Value(0));

  const showMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.parallel([
      Animated.spring(animeY, {
        toValue: menuVisible ? ANIM_INIT_OFFSET : 10,
        useNativeDriver: true,
        bounciness: 25,
      }),
      Animated.timing(animeOpacity, {
        toValue: menuVisible ? 0 : 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleDeleteArticle = () => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer cet article ?',
      [
        {
          text: 'Confirmer',
          onPress: () => deleteArticleDispatch(id),
        },
        {
          text: 'Annuler',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const renderMenu = () => {
    return (
      <Animated.View
        style={[
          {
            flexDirection: 'column',
            opacity: animeOpacity,
          },
          {
            transform: [
              {
                translateY: animeY,
              },
            ],
          },
        ]}>
        <TouchableOpacity
          onPress={!menuVisible ? null : () => handleDeleteArticle()}
          style={{
            backgroundColor: 'white',
            borderRadius: 50,
            padding: 4,
            elevation: 5,
            width: 35,
            height: 35,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="delete" color="red" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Card style={{flex: 0, marginLeft: 10, marginRight: 10}}>
      <CardItem style={{backgroundColor}}>
        <Left>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <Thumbnail
              source={{
                uri: `${API_BASE_URL}/${logo}`,
              }}
            />
            <Text
              style={{fontSize: 10, marginRight: 'auto', marginLeft: 'auto'}}>
              {associationName}
            </Text>
          </View>

          <Body>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 9}}>
                <Text>{title}</Text>
                <Text note>{date}</Text>
              </View>
              {isAdmin(user) && (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{padding: 5}}
                    onPress={() => showMenu()}>
                    <Icon name="more-vert" type="material" />
                  </TouchableOpacity>
                  {renderMenu()}
                </View>
              )}
            </View>
          </Body>
        </Left>
      </CardItem>
      <CardItem style={{backgroundColor}}>
        <Body>
          <ParsedText
            selectable
            style={styles.text}
            parse={[
              {
                type: 'url',
                style: styles.url,
                onPress: (url) => handleUrlPress(url),
              },
              {
                type: 'phone',
                style: styles.phone,
                onPress: (phone) => handlePhonePress(phone),
              },
              {
                type: 'email',
                style: styles.email,
                onPress: (email) => handleEmailPress(email),
              },
            ]}
            childrenProps={{allowFontScaling: false}}>
            {description}
          </ParsedText>
        </Body>
      </CardItem>
    </Card>
  );
};

FeedCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  associationName: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  deleteArticleDispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedCard);
