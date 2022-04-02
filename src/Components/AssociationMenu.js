import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Alert,
} from 'react-native';
import {API_BASE_URL} from 'react-native-dotenv';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  updateUserAssociation,
  receiveUserAssociationData,
  receiveAssociationData,
} from '../store/reducers/associationRedux';
import {
  white,
  black,
  backgroundColor,
  textColor1,
  mainColorButton,
  gray4,
} from '../Utils/colors';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 15,
  },
  activeAssociation: {
    height: 140,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mainColorButton,
    borderRadius: 10,
    marginRight: 14,
    borderWidth: 0.5,
    borderColor: gray4,
  },
  noActiveAssociation: {
    height: 140,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: gray4,
    borderRadius: 10,
    marginRight: 14,
    borderWidth: 0.5,
    borderColor: gray4,
  },
  selAllIconbg: {
    width: 70,
    height: 70,
    backgroundColor: white,
    borderRadius: 35,
    marginBottom: 10,
    justifyContent: 'center',
  },
  textNoActiveAssociation: {
    color: black,
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.6,
  },
  textActiveAssociation: {
    color: white,
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 0,
    color: textColor1,
    opacity: 1,
  },
  animatedView: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 14,
  },
  navicon1: {
    alignSelf: 'center',
    marginTop: 5,
    transform: [{rotate: '90deg'}],
  },
  navicon2: {
    alignSelf: 'center',
    marginTop: 5,
  },
});

class AssociationMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleAssociaiton: [],
      hideMenu: false,
      fadeAnim: new Animated.Value(0),
    };
  }

  hide = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 900,
    }).start();
    this.setState(() => ({hideMenu: false}));
  };

  show = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 155,
      duration: 900,
    }).start();
    this.setState(() => ({hideMenu: true}));
  };

  componentDidMount = () => {
    const {userAssociationList, dispatch} = this.props;
    dispatch(receiveAssociationData());
    dispatch(receiveUserAssociationData());
    this.setState({
      toggleAssociaiton: userAssociationList,
    });
  };

  handleToggleAssociation = (id) => {
    const {dispatch} = this.props;
    const {toggleAssociaiton} = this.state;
    const include = Object.values(toggleAssociaiton).includes(id);

    if (include && toggleAssociaiton.length === 1) {
      Alert.alert(
        'Opération non permise',
        'Vous devez selectionner au moins une association',
      );
    } else {
      const newUserAssociationList = include
        ? Object.values(toggleAssociaiton).filter((item) => item !== id)
        : [...toggleAssociaiton, id];

      this.setState({
        toggleAssociaiton: newUserAssociationList,
      });
      dispatch(updateUserAssociation(newUserAssociationList));
    }
  };

  handleHideMenu = () => {
    this.setState((prevState) => ({hideMenu: !prevState.hideMenu}));
  };

  render() {
    const {associationList, userAssociationList} = this.props;
    const {hideMenu} = this.state;
    return (
      <View style={{backgroundColor}}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Bienvenue</Text>
          </View>
          <View>
            {hideMenu ? (
              <TouchableOpacity onPress={() => this.hide()}>
                <Icon
                  name="navicon"
                  color={textColor1}
                  size={28}
                  style={styles.navicon1}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this.show()}>
                <Icon
                  name="navicon"
                  color={textColor1}
                  size={28}
                  style={styles.navicon2}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Animated.View style={{height: this.state.fadeAnim}}>
          <View style={styles.animatedView}>
            <FlatList
              data={associationList}
              keyExtractor={(item) => `${item.id}`}
              horizontal
              inverted
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.handleToggleAssociation(item.id)}
                    style={
                      Object.values(userAssociationList).includes(item.id)
                        ? styles.activeAssociation
                        : styles.noActiveAssociation
                    }>
                    <Image
                      style={styles.selAllIconbg}
                      source={{
                        uri: `${API_BASE_URL}${item.logo}`,
                      }}
                    />
                    <Text
                      style={
                        Object.values(userAssociationList).includes(item.id)
                          ? styles.textActiveAssociation
                          : styles.textNoActiveAssociation
                      }>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </Animated.View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {associationList, userAssociationList} = state.associationStore;

  return {
    associationList: associationList === undefined ? [] : associationList,
    userAssociationList:
      userAssociationList === undefined ? [] : userAssociationList,
  };
}

AssociationMenu.propTypes = {
  associationList: PropTypes.array,
  dispatch: PropTypes.func,
  screenerTitle: PropTypes.string,
  userAssociationList: PropTypes.array,
};

export default connect(mapStateToProps)(AssociationMenu);
