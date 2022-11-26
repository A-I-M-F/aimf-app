import React, {useState} from 'react';
import {Card, CardItem, Thumbnail, Text, Left, Body} from 'native-base';
import * as PropTypes from 'prop-types';
import {
  TouchableOpacity,
  View,
  Animated,
  Alert,
  StyleSheet,
} from 'react-native';
import {API_BASE_URL} from 'react-native-dotenv';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import ParsedText from 'react-native-parsed-text';
import {deleteArticle} from '../../store/reducers/articlesRedux';
import {isAdmin} from '../../Utils/Account';
import {textColor1, textColor2} from '../../Utils/colors';
import RenderHtml from 'react-native-render-html';

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
  aritcleTitle: {
    marginTop: -18,
    marginBottom: 9,
    fontWeight: 'bold',
    color: '#777676',
    fontSize: 18,
  },
  associationName: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#777676',
  },
  date: {
    color: '#777676',
    fontSize: 15,
  },
  description: {
    color: '#777676',
    fontSize: 18,
    flexDirection: 'column',
  },
  readFlow: {fontWeight: 'bold', color: '#777676', fontSize: 17},

  deleteArticleMenu: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 4,
    elevation: 5,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '74%',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 17,
    borderRadius: 9,
    paddingEnd: 5,
    paddingBottom: 6,
    elevation: 5,
  },
  cardItem: {
    borderRadius: 15,
    backgroundColor: '#FAFAFA',
  },
  cardItemLeftView: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  adminView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bodyView: {flexDirection: 'row'},
  adminButton: {padding: 5},
  header: {flex: 9},
});

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
  const renderDescription = (value) => {
    return (
      <>
        <RenderHtml
          baseStyle={{color: textColor2}}
          source={{
            html: value,
          }}
        />
      </>
    );
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
          style={styles.deleteArticleMenu}>
          <Icon name="delete" color="red" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Card
      style={{
        ...styles.card,
        backgroundColor,
      }}>
      <CardItem style={styles.cardItem}>
        <Left>
          <View style={styles.cardItemLeftView}>
            <Thumbnail
              source={{
                uri: `${API_BASE_URL}/${logo}`,
              }}
            />
          </View>
          <Body>
            <View style={styles.bodyView}>
              <View style={styles.header}>
                <Text selectable style={styles.associationName}>
                  {associationName}
                </Text>
                <Text note selectable style={styles.date}>
                  {date}
                </Text>
              </View>
              {isAdmin(user) && (
                <View style={styles.adminView}>
                  <TouchableOpacity
                    style={styles.adminButton}
                    onPress={() => showMenu()}>
                    <Icon color={textColor1} name="more-vert" type="material" />
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
          <ParsedText selectable style={styles.aritcleTitle}>
            {title}
          </ParsedText>
          {renderDescription(description)}
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
