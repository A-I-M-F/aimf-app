// just for admin
// read QR code to retreive book and user
// Request Un new reseravation from back end
// Date de disponibilite
// saisir le numero d'examplaire s'il y a plusiur
// valider.
// send reservation to backend
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {requestBooking, validateBooking} from '../../store/reducers/bookRedux';
import {dispatchErrorMessage} from '../../store/reducers/errorMessageRedux';
import {Button, Container, Icon, Item, View, Label, Content} from 'native-base';
import DatePicker from '../../Components/DatePicker';
import moment from 'moment';
import {Text, ActivityIndicator} from 'react-native';
import RenderInput from '../../Components/RenderInput';

import {isCorrectPhoneNumber} from '../../Utils/Functions';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const mapStateToProps = (state) => ({
  booking: state.bookStore.booking,
});
const mapDispatchToProps = (dispatch) => ({
  requestBooking: (...args) => dispatch(requestBooking(...args)),
  validateBooking: (...args) => dispatch(validateBooking(...args)),
  dispatchErrorMessage: (...args) => dispatch(dispatchErrorMessage(...args)),
});
const getQrCodeBooking = (qrCodeBooking) => {
  if (qrCodeBooking) {
    try {
      const objRequestBooking = JSON.parse(qrCodeBooking);
      const bookId = objRequestBooking.bookId;
      const userId = objRequestBooking.userId;
      const hash = objRequestBooking.hash;
      if (bookId && userId && hash) {
        return objRequestBooking;
      }
    } catch (e) {
      alert(e); // error in the above string (in this case, yes)!
    }
    return null;
  }
};
const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
const BookReservation = ({
  booking,
  requestBooking,
  validateBooking,
  navigation,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [returnDate, setReturnDate] = useState(addDays(new Date(), 15));
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [copyNumber, setCopyNumber] = useState(null);

  useEffect(() => {
    if (booking && booking.isLoading == false) {
      setPhoneNumber(booking.user.phoneNumber);
      setReturnDate(booking.user.returnDate);
      setAddress1(booking.user.address1);
      setAddress2(booking.user.address2);
      setZipCode(booking.user.zipCode);
      setCity(booking.user.city);
    }
  }, [booking]);

  const onSuccess = (e) => {
    //{"userId":58,"bookId":596,"hash":"DEFR569871548IJHU"}
    const qrCodeBooking = getQrCodeBooking(e.data);
    if (qrCodeBooking) {
      requestBooking(qrCodeBooking);
    }
  };
  const checkBookingValues = () => {
    if (!returnDate) {
      return 'Veuillez renseigner la date de retour de livre.';
    }
    if (!phoneNumber) {
      return 'Veuillez renseigner le numéro de téléphone.';
    }
    if ((!address1 && !address2) || !zipCode || !city) {
      return "Veuillez renseigner l'addresse personnelle de celui qui va reserver le livre.";
    }
    if (!isCorrectPhoneNumber(phoneNumber)) {
      return 'Veuillez corriger le numéro de téléphone';
    }
    return null;
  };
  if (!booking) {
    return (
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text>
            scanner le QrCode de réservation à partir de téléphone du membre
          </Text>
        }
      />
    );
  } else {
    if (booking.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator animating size="large" />
        </View>
      );
    } else {
      return (
        <Container>
          <Content>
            <Item regular>
              <Label>Titre:{booking.book.title}</Label>
            </Item>
            <Item regular>
              <Label>
                Pour : {booking.user.firstName} {booking.user.lastName}
              </Label>
            </Item>

            <Item regular>
              <Label>Genre: {booking.book.genre.name}</Label>
            </Item>
            <Item regular>
              <Label>Rayon: {booking.book.rayon}</Label>
            </Item>

            <RenderInput
              checkFunction={isCorrectPhoneNumber}
              label="Téléphone"
              maxLength={10}
              keyboardType="numeric"
              onChange={setPhoneNumber}
              required
              value={phoneNumber}
            />
            <RenderInput
              label="Adresse 1"
              keyboardType="default"
              onChange={setAddress1}
              required
              value={address1}
            />
            <RenderInput
              label="Adresse 2"
              keyboardType="default"
              onChange={setAddress1}
              value={address2}
            />
            <RenderInput
              label="Code postal"
              keyboardType="numeric"
              onChange={setZipCode}
              required
              value={zipCode}
            />
            <RenderInput
              label="Ville"
              keyboardType="default"
              onChange={setCity}
              required
              value={city}
            />
            <RenderInput
              label="Copie"
              keyboardType="numeric"
              onChange={setCopyNumber}
              value={copyNumber}
            />
            <DatePicker
              minimumDate={new Date()}
              label="Date de retour prévu"
              defaultDate={returnDate && moment(returnDate).toDate()}
              onCustomChange={(date) => setReturnDate(date)}
            />
            <Button
              rounded
              success
              onPress={() => {
                const error = checkBookingValues();
                if (error) {
                  dispatchErrorMessage(error);
                  return;
                }
                validateBooking({
                  bookId: booking.book.id,
                  userId: booking.user.id,
                  address1,
                  address2,
                  zipCode: zipCode,
                  city,
                  phoneNumber,
                  copyNumber,
                  returnDate,
                });

                navigation.goBack();
              }}>
              <Icon name="home" />
              <Text>Confirmer la réservation</Text>
            </Button>
          </Content>
        </Container>
      );
    }
  }
};
BookReservation.navigationOptions = (navigationData) => {
  return {
    headerTitle: 'Validation de la réservation',
    headerTitleStyle: {
      textAlign: 'center',
      flex: 1,
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookReservation);