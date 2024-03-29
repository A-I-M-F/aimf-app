import React, {Component} from 'react';
import {Text, View, TextInput, ScrollView, Alert} from 'react-native';
import {Icon, Item, Label} from 'native-base';
import SpinnerButton from 'react-native-spinner-button';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import styles from '../css/PostScreen.css.js';
import ErrorModal from '../Components/ErrorModal';
import {dispatchErrorMessage} from '../store/reducers/errorMessageRedux';
import Loader from '../Components/Loader';
import {savePost, getDraftArticle} from '../store/reducers/articlesRedux';
import {
  AIMF_ASSOCIATION_ID,
  DRAFT_ARTICLE_STATUS,
  PUBLISHED_ARTICLE_STATUS,
} from '../Utils/Constants';
import RenderInput from '../Components/RenderInput';
import DatePicker from '../Components/DatePicker';
import SelectAssociation from '../Components/SelectAssociation';
import {isAdmin, isSuperAdmin} from '../Utils/Account';
import {mainColor2Button, mainColorButton} from '../Utils/colors';
import FormStyles from '../css/Form.css';
import MainHeader from '../Components/MainHeader';

class PostScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      expiredAt: null,
      associationId: AIMF_ASSOCIATION_ID,
    };
  }

  componentDidMount() {
    this.props.getDraftArticle();
    if (this.props.draftArticle && this.props.draftArticle.title) {
      const {
        title,
        description,
        expiredAt,
        association,
      } = this.props.draftArticle;
      this.setState({
        title,
        description,
        expiredAt,
        associationId: association.id,
      });
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps): void {
    if (this.props.loading && !nextProps.loading && !nextProps.errorMessage) {
      let title = null;
      let description = null;
      let expiredAt = null;
      let associationId = AIMF_ASSOCIATION_ID;
      if (nextProps.draftArticle && nextProps.draftArticle.title) {
        title = nextProps.draftArticle.title;
        description = nextProps.draftArticle.description;
        expiredAt = nextProps.draftArticle.expiredAt;
        associationId = nextProps.draftArticle.association.id;
      }

      this.setState({
        title,
        description,
        expiredAt,
        associationId,
      });
    }
  }

  setDate(expiredAt) {
    this.setState({expiredAt});
  }

  disabledButtons = () => {
    return !(this.state.title.trim() && this.state.description.trim());
  };

  savePost = (status) => {
    const {description, title, expiredAt} = this.state;
    // Vérifier la saisie du titre
    const entredTitle = title ? title.trim() : null;
    if (!entredTitle) {
      this.props.dispatchErrorMessage(
        "Merci de bien vouloir saisir le titre de l'annonce",
      );
      return;
    }

    // Vérifier la saisie de l'annonce
    const entredDescription = description ? description.trim() : null;
    if (!entredDescription) {
      this.props.dispatchErrorMessage(
        "Merci de bien vouloir saisir le corps l'annonce",
      );
      return;
    }

    const association =
      isSuperAdmin(this.props.user) || isAdmin(this.props.user)
        ? {associationId: this.state.associationId}
        : {};

    const action =
      status === DRAFT_ARTICLE_STATUS ? "d'enregistrer" : 'de publier';

    // Demander la confirmation du post/Enregistrement de l'annonce.
    Alert.alert(
      'Confirmation',
      // body
      `Vous êtes sur le point ${action} l'annonce ${title.trim()}`,
      [
        {
          text: 'Confirmer',
          onPress: () =>
            this.props.savePost({
              status,
              description: description.trim(),
              title: title.trim(),
              expiredAt: expiredAt && moment(expiredAt).format('YYYY-MM-DD'),
              ...association,
            }),
        },
        {
          text: 'Annuler',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      {cancelable: false},
      // clicking out side of alert will not cancel
    );
  };

  render() {
    const {description, title, expiredAt, associationId} = this.state;

    return (
      <>
        <MainHeader />
        <ScrollView
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.view,
            opacity: this.props.loading || this.props.errorMessage ? 0.6 : 1,
          }}>
          {(isSuperAdmin(this.props.user) || isAdmin(this.props.user)) &&
            associationId && (
              <SelectAssociation
                selectedAssociationId={associationId}
                onChangeItem={(item) => {
                  this.setState({
                    associationId: item.id,
                  });
                }}
              />
            )}
          <RenderInput
            label="Titre"
            onChange={(value) => this.setState({title: value})}
            required
            value={title}
          />
          <DatePicker
            minimumDate={new Date()}
            label="Date d'expiration"
            defaultDate={expiredAt && moment(expiredAt).toDate()}
            onCustomChange={(date) => this.setDate(date)}
          />
          <Label style={FormStyles.label}>Message*</Label>
          <Item rounded style={styles.textItem}>
            <TextInput
              selectable
              style={styles.textInput}
              textAlignVertical="top"
              autoCapitalize="sentences"
              multiline
              numberOfLines={10}
              onChangeText={(value) => this.setState({description: value})}
              value={description}
            />
          </Item>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 70,
            }}>
            <SpinnerButton
              // eslint-disable-next-line react-native/no-inline-styles
              buttonStyle={{
                ...styles.spinnerButton,
                marginRight: 20,
                backgroundColor: mainColorButton,
              }}
              onPress={() => this.savePost(DRAFT_ARTICLE_STATUS)}
              indicatorCount={10}
              spinnerType="SkypeIndicator"
              disabled={this.disabledButtons}>
              <Text style={styles.buttonText}>
                <Icon style={styles.buttonIcon} name="save" type="Foundation" />
                {'   '}Enregistrer
              </Text>
            </SpinnerButton>
            <SpinnerButton
              // eslint-disable-next-line react-native/no-inline-styles
              buttonStyle={{
                ...styles.spinnerButton,
                backgroundColor: mainColor2Button,
              }}
              onPress={() => this.savePost(PUBLISHED_ARTICLE_STATUS)}
              indicatorCount={10}
              spinnerType="SkypeIndicator"
              disabled={this.disabledButtons}>
              <Text style={styles.buttonText}>
                <Icon style={styles.buttonIcon} name="send" />
                {'   '}Poster
              </Text>
            </SpinnerButton>
          </View>
        </ScrollView>
        {this.props.errorMessage && (
          <ErrorModal visible message={this.props.errorMessage} />
        )}
        <Loader visible={!!this.props.loading} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {errorMessage} = state.errorMessageStore;
  const {loading, draftArticle} = state.articleStore;
  const {user} = state.accountStore;
  return {
    errorMessage,
    loading,
    user,
    draftArticle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchErrorMessage: (errorMessage) =>
      dispatch(dispatchErrorMessage(errorMessage)),
    savePost: (data) => dispatch(savePost(data)),
    getDraftArticle: () => dispatch(getDraftArticle()),
  };
};
PostScreen.propTypes = {
  errorMessage: PropTypes.string,
  dispatchErrorMessage: PropTypes.func,
  loading: PropTypes.bool,
  draftArticle: PropTypes.object,
  savePost: PropTypes.func,
  getDraftArticle: PropTypes.func,
  user: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);
