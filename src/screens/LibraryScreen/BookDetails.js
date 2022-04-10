import React, {useState, useEffect, Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardItem, Container, Content, Body, Row, Col} from 'native-base';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import CarouselImages from '../../Components/CaraouselImages';
import QrCodeModal from './QrCodeModal';
import {
  getQrCodeString,
  getFavoriteListIds,
} from '../../store/selectors/bookingSelector';
import {
  removeFromFavoritesRequest,
  addToFavoritesRequest,
  getBooks,
} from '../../store/reducers/bookRedux';
import {isoDateToFr} from '../../Utils/DateUtils';
import {
  backgroundColor,
  failColor,
  mainColor,
  placeholderTextColor,
  secondaryColor,
} from '../../Utils/colors';
import HeartIcon from '../../Components/icons/HeartIcon';
import IconForms from '../../Components/icons/IconForms';
import {
  FCalendarIcon,
  GCalendarIcon,
} from '../../Components/icons/CalendarIcon';
import {LIBRARY_STR} from '../../Utils/Constants';

const styles = {
  mainContainer: {
    backgroundColor,
  },
  upperContainer: {
    paddingBottom: 70,
  },
  dispoStatusInfo: {
    color: '#17986A',
    fontWeight: '700',
  },
  notDispoStatusInfo: {
    fontWeight: '600',
    color: failColor,
  },
  labelStyle: {
    color: placeholderTextColor,
    fontWeight: 'bold',
    fontSize: 14,
    flexWrap: 'wrap',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 5,
  },
  buttonWrapper: {
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: mainColor,
  },
  buttonStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  descriptionText: {
    fontSize: 13,
    paddingVertical: 0,
    paddingHorizontal: 8,
  },
  col1: {
    flex: 4,
  },
  col2: {
    flex: 2,
  },
};

const mapStateToProps = (state) => ({
  selectedBook: state.bookStore.selectedBook,
  qrCodeString: getQrCodeString(state),
  favoriteListIds: getFavoriteListIds(state),
});
const mapDispatchToProps = (dispatch) => ({
  getBooks: (...args) => dispatch(getBooks(...args)),
  dispatchRemoveFromFavoritesRequest: (...args) =>
    dispatch(removeFromFavoritesRequest(...args)),
  dispatchAddToFavoritesRequest: (...args) =>
    dispatch(addToFavoritesRequest(...args)),
});

const renderButton: Component = (callback, title, {disabled, icon}) => {
  const color = callback && !disabled ? 'black' : placeholderTextColor;
  return (
    <TouchableOpacity
      style={styles.buttonStyle}
      hitSlop={{x: 10, y: 10}}
      onPress={callback}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {icon}
        <Text style={{...styles.buttonText, color}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const BookDetails = ({
  selectedBook,
  qrCodeString,
  dispatchRemoveFromFavoritesRequest,
  dispatchAddToFavoritesRequest,
  favoriteListIds,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const [showQrCodeForBooking, setShowQrCodeForBooking] = useState(false);

  useEffect(() => {
    if (selectedBook) {
      if (!selectedBook.isLoading) {
        setIsFavorited(favoriteListIds.includes(selectedBook.id));
      }
    }
  }, [selectedBook, favoriteListIds]);

  useEffect(() => {
    setIsFavorited(favoriteListIds.includes(selectedBook.id));
  }, [selectedBook, setIsFavorited, favoriteListIds]);

  const handleShowQrCode = () => {
    setShowQrCodeForBooking(true);
  };

  const handleFavorites = () => {
    if (isFavorited) {
      return dispatchRemoveFromFavoritesRequest(selectedBook, favoriteListIds);
    }
    return dispatchAddToFavoritesRequest(selectedBook, favoriteListIds);
  };

  const renderInfoLine = (label, value) => {
    return (
      <Row>
        <Text style={styles.labelStyle}>{label} </Text>
        {value && (
          <Text style={{fontWeight: '600', marginRight: 3}}>{value}</Text>
        )}
      </Row>
    );
  };

  if (selectedBook.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  return (
    selectedBook && (
      <Container style={styles.mainContainer}>
        <ScrollView style={{flex: 1}}>
          <CarouselImages
            isLocal={!selectedBook.images?.length}
            images={selectedBook.images}
          />
          <Content>
            <Card
              style={{
                ...styles.upperContainer,
                justifyContent: 'flex-start',
              }}>
              <CardItem style={{paddingBottom: 0}}>
                {renderInfoLine('Titre', selectedBook.title)}
              </CardItem>
              <CardItem style={{paddingBottom: 0}}>
                <View style={styles.col1}>
                  {renderInfoLine('Auteur', selectedBook.author)}
                  {renderInfoLine('genre', selectedBook.genre.name)}
                </View>
                <View style={styles.col2}>
                  {renderInfoLine('Langue', selectedBook.language)}
                  {renderInfoLine('Pages', selectedBook.pages)}
                </View>
              </CardItem>
              <CardItem style={{paddingBottom: 0}}>
                <Col>
                  {renderInfoLine('Biblio', selectedBook.location.name)}
                  <Row>
                    <Text style={styles.labelStyle}>Statut </Text>
                    {selectedBook.isAvailable && (
                      <Text style={styles.dispoStatusInfo}>
                        {LIBRARY_STR.available}
                      </Text>
                    )}
                    {!selectedBook.isAvailable &&
                      selectedBook.availabilityDate && (
                        <Text style={styles.notDispoStatusInfo}>
                          {`${LIBRARY_STR.available_starting_from} `}
                          {isoDateToFr(
                            selectedBook?.availabilityDate.toString(),
                            false,
                          )}
                        </Text>
                      )}
                  </Row>
                </Col>
              </CardItem>
              <CardItem>
                <Col style={{...styles.buttonWrapper, borderLeftWidth: 0}}>
                  <Row>
                    {!isFavorited
                      ? renderButton(
                          handleFavorites,
                          LIBRARY_STR.add_to_bookmarked,
                          {
                            icon: (
                              <HeartIcon
                                iconForm={IconForms.gradient()}
                                color1={mainColor}
                                color2={secondaryColor}
                              />
                            ),
                          },
                        )
                      : renderButton(
                          handleFavorites,
                          LIBRARY_STR.remove_from_bookmarked,
                          {
                            disabled: true,
                            icon: (
                              <HeartIcon
                                iconForm={IconForms.filled()}
                                color1={placeholderTextColor}
                              />
                            ),
                          },
                        )}
                  </Row>
                </Col>
                <Col style={{...styles.buttonWrapper, borderRightWidth: 0}}>
                  <Row>
                    {selectedBook.canReserveBook && selectedBook.isAvailable
                      ? renderButton(
                          handleShowQrCode,
                          LIBRARY_STR.i_want_to_borrow,
                          {
                            icon: (
                              <GCalendarIcon
                                color1={mainColor}
                                color2={secondaryColor}
                              />
                            ),
                          },
                        )
                      : renderButton(null, LIBRARY_STR.i_want_to_borrow, {
                          icon: <FCalendarIcon color={placeholderTextColor} />,
                        })}
                  </Row>
                </Col>
              </CardItem>
              <CardItem>
                <Body>
                  <Text style={styles.descriptionText}>
                    {selectedBook.description}
                  </Text>
                </Body>
              </CardItem>
            </Card>
            <QrCodeModal
              label={LIBRARY_STR.please_show_the_qrcode_at_the_library}
              qrCodeString={qrCodeString}
              visible={showQrCodeForBooking}
              onClose={() => {
                setShowQrCodeForBooking(false);
              }}
            />
          </Content>
        </ScrollView>
      </Container>
    )
  );
};
BookDetails.navigationOptions = (navigationData) => {
  const bookTitle = navigationData.navigation.getParam('bookTitle');
  return {
    headerTitle: bookTitle,
    headerTitleStyle: {
      textAlign: 'center',
      flex: 1,
    },
  };
};

BookDetails.propTypes = {
  selectedBook: PropTypes.object.isRequired,
  qrCodeString: PropTypes.string.isRequired,
  dispatchRemoveFromFavoritesRequest: PropTypes.func.isRequired,
  dispatchAddToFavoritesRequest: PropTypes.func.isRequired,
  favoriteListIds: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetails);
