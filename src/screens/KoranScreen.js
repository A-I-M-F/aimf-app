/* eslint-disable array-callback-return */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  RefreshControl,
  YellowBox,
} from 'react-native';
import {Container, Icon, Button} from 'native-base';
import PropTypes from 'prop-types';
import CostumHeader from '../Components/KoranScreen/CostumHeader';
import {formatDateWithDayAndMonthName} from '../Utils/Functions';
import KoranItem from '../Components/KoranScreen/KoranItem';
import {
  ayncReceiveKhatma,
  asyncReceiveUserKhatma,
} from '../store/reducers/khatmaRedux';
import {receiveKoran} from '../store/reducers/koranRedux';
import {gray3, black, gray, orange2} from '../Utils/colors';
import HistoryItem from '../Components/KoranScreen/HistoryItem';
import {isAdmin} from '../Utils/Account';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 24,
    fontWeight: '700',
    color: black,
  },
  textDetails: {
    fontSize: 15,
    fontWeight: '400',
    color: gray,
  },
});

class KoranScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {active: false};
  }

  onRefresh = () => {
    const {dispatch} = this.props;
    dispatch(ayncReceiveKhatma());
    dispatch(asyncReceiveUserKhatma());
  };

  componentDidMount = () => {
    const {dispatch} = this.props;
    dispatch(ayncReceiveKhatma());
    dispatch(asyncReceiveUserKhatma());
    dispatch(receiveKoran());
  };

  renderKoranItem = ({item}) => {
    const {navigation, loading} = this.props;
    const date = formatDateWithDayAndMonthName(item.beginAt);
    let numberofPartDispo = 0;

    // eslint-disable-next-line array-callback-return
    Object.values(item.takharoubts).map((takharoubt) => {
      if (takharoubt.pickedTimes === 0) {
        numberofPartDispo += 1;
      }
    });

    return (
      <KoranItem
        key={item.id.toString()}
        title={date}
        numberofPartDispo={numberofPartDispo}
        loading={loading}
        navigate={() => navigation.navigate('Khatma', {khatmaIdParam: item.id})}
      />
    );
  };

  renderHistoryItem = ({item}) => {
    const {navigation, loading} = this.props;
    const date = formatDateWithDayAndMonthName(item.beginAt);
    const numberOfPicks = item.userTakharoubts.length;
    let numberOfRead = 0;

    Object.values(item.userTakharoubts).map((takharoubt) => {
      if (takharoubt.isRead) {
        numberOfRead += 1;
      }
    });

    return (
      <HistoryItem
        key={item.id.toString()}
        title={date}
        numberOfPicks={numberOfPicks}
        numberOfRead={numberOfRead}
        loading={loading}
        navigate={() => navigation.navigate('Khatma', {khatmaIdParam: item.id})}
      />
    );
  };

  render() {
    const {khatmaHistory, openKhatma, loading, account} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: loading ? '#f7f7f7' : gray3}}>
        <Container>
          <CostumHeader title="Mon Espace Khatma" isHome />
          <ScrollView
            scrollEventThrottle={16}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={this.onRefresh}
                title="Chargement..."
              />
            }>
            <View style={{marginTop: 10, paddingHorizontal: 10}}>
              <Text style={styles.textHeader}>Mes Prochaines Khatma</Text>
            </View>
            <View style={{flex: 1}}>
              {openKhatma.length === 0 && (
                <View style={{marginTop: 10, paddingHorizontal: 15}}>
                  <Text style={styles.textDetails}>
                    Aucune Khatma n'est ouverte à ce jour.
                  </Text>
                </View>
              )}

              <FlatList
                data={Object.values(openKhatma).sort((a, b) => b.id - a.id)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={this.renderKoranItem}
              />
            </View>
            <View
              style={{marginTop: 20, marginBottom: 10, paddingHorizontal: 15}}>
              <Text style={styles.textHeader}>Mon Historique</Text>
            </View>
            <View style={{flex: 1}} accessible={!loading}>
              {khatmaHistory.length === 0 && (
                <View style={{marginBottom: 10, paddingHorizontal: 15}}>
                  <Text style={styles.textDetails}>
                    Vous n'avez à ce jour partcipé à aucune Khatma
                  </Text>
                </View>
              )}
              <FlatList
                data={Object.values(khatmaHistory).sort((a, b) => b.id - a.id)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={this.renderHistoryItem}
              />
            </View>
          </ScrollView>
          {isAdmin(account.user) && (
            <View
              style={{
                flexDirection: 'row-reverse',
              }}>
              <Button
                transparent
                style={{
                  borderRadius: 50,
                  marginRight: 20,
                  marginBottom: 10,
                  width: 46,
                  backgroundColor: orange2,
                }}
                onPress={() => this.props.navigation.navigate('AddKhatma')}>
                <Icon name="add" style={{color: '#FFF'}} />
              </Button>
            </View>
          )}
        </Container>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const openKhatma = Object.values(state.khatmaStore.khatma).filter(
    (khatma) => {
      return khatma.isOpen;
    },
  );

  const khatmaHistory = Object.values(state.khatmaStore.userKhatma).filter(
    (khatma) => {
      return !khatma.isOpen && khatma.userTakharoubts.length > 0;
    },
  );

  return {
    khatmaHistory,
    openKhatma,
    loading: state.khatmaStore.loading,
    account: state.accountStore,
  };
}

KoranScreen.propTypes = {
  khatmaHistory: PropTypes.array,
  openKhatma: PropTypes.array,
  loading: PropTypes.bool,
  navigation: PropTypes.object,
  dispatch: PropTypes.func,
  account: PropTypes.object,
};

export default connect(mapStateToProps)(KoranScreen);
