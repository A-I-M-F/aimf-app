import React, {useState, useEffect} from 'react';
import {View, FlatList, SafeAreaView, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Input, Item, Button} from 'native-base';
import * as PropTypes from 'prop-types';
import BookCard from './LibraryScreen/BookCard';
import {BOOK_GENRES, LIBRARY_STR} from '../Utils/Constants';
import {getBooks, getFavoriteList, showBook} from '../store/reducers/bookRedux';
import {dispatchErrorMessage} from '../store/reducers/errorMessageRedux';
import {getFavoriteListIds} from '../store/selectors/bookingSelector';
import FilterList from './LibraryScreen/FilterList';
import ErrorModal from '../Components/ErrorModal';
import Loader from '../Components/Loader';
import {canReserveBook} from '../Utils/Account';
import BookClosedIcon from '../Components/icons/book/BookClosedIcon';
import SearchIcon from '../Components/icons/SearchIcon';
import HeartIcon from '../Components/icons/HeartIcon';
import IconForms from '../Components/icons/IconForms';
import {OCalendarIcon} from '../Components/icons/CalendarIcon';
import {backgroundColor} from '../Utils/colors';
import MainHeader from '../Components/MainHeader';

const styles = StyleSheet.create({
  topButtonContainer: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row-reverse',
  },
  upperContainer: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
    shadowColor: '#383838',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    elevation: 2,
  },
  listContainer: {
    padding: 0,
  },
  coloredButton: {
    backgroundColor: '#CB8347',
    shadowOffset: {width: 4, height: 4},
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOpacity: 5,
    borderRadius: 3,
    elevation: 7,
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  colorButtonText: {
    marginHorizontal: 5,
    color: 'white',
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: 13,
  },
  searchInputStyle: {
    marginTop: 0,
    paddingHorizontal: 10,
    paddingLeft: 5,
    borderRadius: 5,
    height: 40,
    backgroundColor: '#FFF',
    fontSize: 12,
  },
  searchInputStyle_text: {
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  filterContainer: {
    marginTop: 0,
    opacity: 1,
    flex: 1,
    backgroundColor,
    paddingBottom: 75,
  },
  navigationBtn: {
    paddingHorizontal: 20,
  },
  navigationText: {fontSize: 16, marginLeft: 10},
});
const mapStateToProps = (state) => ({
  books: state.bookStore.books,
  loading: state.bookStore.loading,
  refreshing: state.bookStore.refreshing,
  handleMore: state.bookStore.handleMore,
  page: state.bookStore.page,
  lastPage: state.bookStore.lastPage,
  errorMessage: state.errorMessageStore.errorMessage,
  favoriteListIds: getFavoriteListIds(state),
  account: state.accountStore,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetBooks: (...args) => dispatch(getBooks(...args)),
  dispatchGetFavoriteList: (...args) => dispatch(getFavoriteList(...args)),
  showErrorMessage: (...args) => dispatch(dispatchErrorMessage(...args)),
  dispatchShowBook: (...args) => dispatch(showBook(...args)),
});

const LibraryScreen = ({
  books,
  page,
  lastPage,
  loading,
  refreshing,
  handleMore,
  dispatchGetBooks,
  dispatchShowBook,
  errorMessage,
  navigation,
  showErrorMessage,
  favoriteListIds,
  dispatchGetFavoriteList,
  account,
}) => {
  const [searchValue, setSearchValue] = useState(null);
  const [filterValue, setFilterValue] = useState(null);
  const [lanceSearch, setLanceSearch] = useState(false);

  const {coloredButton, searchInputStyle} = styles;
  const handleRefresh = () => {
    if (!refreshing && !handleMore && !loading) {
      dispatchGetBooks([], 1, searchValue, filterValue, true);
    }
  };

  useEffect(() => {
    dispatchGetFavoriteList();
    handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (lanceSearch) {
      handleRefresh();
      setLanceSearch(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lanceSearch]);

  const handleLoadMore = () => {
    if (!refreshing && !handleMore && !loading && !lastPage) {
      dispatchGetBooks(books, page + 1, searchValue, filterValue, false, true);
    }
  };

  const handleShowBook = (item) => {
    dispatchShowBook(item.id);
    navigation.navigate('BookDetails', {
      bookId: item.id,
      bookTitle: item.title,
    });
  };

  const renderItem = ({item}) => {
    const isFavorited = () => {
      return favoriteListIds.includes(item.id);
    };

    return (
      <BookCard
        data={{...item, isFavorited: isFavorited()}}
        showBook={handleShowBook}
      />
    );
  };

  const search = () => {
    if (!searchValue || searchValue.length > 2) {
      handleRefresh();
    } else {
      showErrorMessage('Le mot recherché doit avoir au minimum 3 caractères');
    }
  };

  const updaterFilterValue = (value) => {
    setFilterValue(value);
    setLanceSearch(true);
  };

  const getFilterLabel = () => {
    if (!filterValue) {
      return 'Sélectionner un genre...';
    }
    const bookGenre = BOOK_GENRES.find((element) => element.id === filterValue);
    if (bookGenre) {
      return bookGenre.label;
    }
    return '';
  };

  return (
    <>
      <MainHeader />
      {canReserveBook(account.user) && (
        <View
          style={{
            ...styles.topButtonContainer,
          }}>
          <Button
            transparent
            style={{...coloredButton}}
            onPress={() => navigation.navigate('BookReservation')}>
            <BookClosedIcon color="#fff" />
            <Text style={styles.colorButtonText}>
              {LIBRARY_STR.borrow_book}
            </Text>
          </Button>
        </View>
      )}
      <SafeAreaView style={{...styles.filterContainer}}>
        <View style={styles.upperContainer}>
          <Item rounded style={searchInputStyle}>
            <SearchIcon color={searchValue ? '#000' : '#C4C4C4'} />
            <Input
              onChangeText={setSearchValue}
              onBlur={search}
              style={styles.searchInputStyle_text}
              keyboardType="default"
              placeholder={LIBRARY_STR.search_book}
              placeholderTextColor="#C4C4C4"
              value={searchValue}
            />
          </Item>
          <View style={{flexDirection: 'row-reverse', marginBottom: 3}}>
            <FilterList
              isEmpty={!filterValue}
              selectedValue={getFilterLabel()}
              updateValue={updaterFilterValue}
            />
          </View>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={books}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            onRefresh={handleRefresh}
            refreshing={false}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
          />
        </View>
      </SafeAreaView>

      <Loader visible={!!loading} />
      {errorMessage && <ErrorModal visible message={errorMessage} />}
    </>
  );
};

LibraryScreen.navigationOptions = ({navigation}) => {
  return {
    headerLeft: (
      <SafeAreaView>
        <Button
          transparent
          onPress={() => {
            navigation.navigate('MyReservations');
          }}
          style={styles.navigationBtn}>
          <OCalendarIcon color="black" size={22} />
          <Text style={styles.navigationText}>
            {LIBRARY_STR.my_reservations}
          </Text>
        </Button>
      </SafeAreaView>
    ),
    headerRight: (
      <SafeAreaView>
        <Button
          transparent
          onPress={() => navigation.navigate('BookFavoriteList')}
          style={styles.navigationBtn}>
          <HeartIcon iconForm={IconForms.outline()} color1="black" size={22} />
          <Text style={styles.navigationText}>Favoris</Text>
        </Button>
      </SafeAreaView>
    ),
  };
};

LibraryScreen.propTypes = {
  books: PropTypes.array,
  page: PropTypes.number,
  errorMessage: PropTypes.string,
  showErrorMessage: PropTypes.func,
  loading: PropTypes.bool,
  refreshing: PropTypes.bool,
  handleMore: PropTypes.bool,
  lastPage: PropTypes.bool,
  dispatchGetBooks: PropTypes.func,
  dispatchShowBook: PropTypes.func,
  dispatchGetFavoriteList: PropTypes.func,
  account: PropTypes.object,
  favoriteListIds: PropTypes.array,
  navigation: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(LibraryScreen);
