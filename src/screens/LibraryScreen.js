import React, { useState, useEffect } from "react";
import { View, FlatList, SafeAreaView, Text } from "react-native";
import { connect } from "react-redux";
import { Icon, Input, Item, Button } from "native-base";
import * as PropTypes from "prop-types";
import BookCard from "./LibraryScreen/BookCard";
import { BOOK_GENRES, LIST_ACTION, SHOW_ACTION } from "../Utils/Constants";
import ShowBook from "./LibraryScreen/ShowBook";
import { getBooks, getFavoriteList, showBook } from "../store/reducers/bookRedux";
import { dispatchErrorMessage } from "../store/reducers/errorMessageRedux";
import { getFavoriteListIds } from "../store/selectors/bookingSelector";
import FilterList from "./LibraryScreen/FilterList";
import ErrorModal from "../Components/ErrorModal";
import Loader from "../Components/Loader";

const mapStateToProps = state => ({
  books: state.bookStore.books,
  loading: state.bookStore.loading,
  refreshing: state.bookStore.refreshing,
  handleMore: state.bookStore.handleMore,
  page: state.bookStore.page,
  lastPage: state.bookStore.lastPage,
  errorMessage: state.errorMessageStore.errorMessage,
  getFavoriteListIds: getFavoriteListIds(state),

});

const mapDispatchToProps = dispatch => ({
  getBooks: (...args) => dispatch(getBooks(...args)),
  getFavoriteList: (...args) => dispatch(getFavoriteList(...args)),
  dispatchErrorMessage: (...args) => dispatch(dispatchErrorMessage(...args)),
  showBook: (...args) => dispatch(showBook(...args)),

});

const LibraryScreen = ({ books, page, lastPage, loading, refreshing, handleMore, getBooks, showBook, errorMessage, navigation, dispatchErrorMessage, getFavoriteListIds }) => {

  const [action, setAction] = useState(LIST_ACTION);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState(null);
  const [lanceSearch, setLanceSearch] = useState(false);

  useEffect(() => {
    getFavoriteList();
    handleRefresh();
  }, []);

  useEffect(() => {
    if (lanceSearch) {
      handleRefresh();
      setLanceSearch(false);
    }
  }, [lanceSearch]);


  const handleRefresh = () => {
    if (!refreshing && !handleMore && !loading) {
      getBooks(
        [],
        1,
        searchValue,
        filterValue,
        true
      );

    }
  };

  const handleLoadMore = () => {
    if (!refreshing && !handleMore && !loading && !lastPage) {
      getBooks(
        books,
        page + 1,
        searchValue,
        filterValue,
        false,
        true
      );
    }
  };

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%",
        }}
      />
    );
  };



  const updateCard = (data) => {
    books = books.map((book) => {
      if (book.id === data.id) {
        return data;
      }
      return book;
    });

    setBooks(books);
  };
  const handleShowBook = (item) => {
    showBook(item.id);
    navigation.navigate("BookDetails", { bookId: item.id, bookTitle: item.title });
  };

  const renderItem = ({ item }) => {
    const isFavorited = () => {
      return getFavoriteListIds.includes(item.id);

    }

    return (
      <BookCard
        data={{ ...item, isFavorited: isFavorited() }}
        showBook={handleShowBook}

      />
    );
  };

  const search = () => {
    if (!searchValue || searchValue.length > 2) {
      handleRefresh();
    } else {
      dispatchErrorMessage("Le mot recherché doit avoir au minimum 3 caractères");
    }
  };

  const updaterFilterValue = (filterValue) => {
    setFilterValue(filterValue);
    setLanceSearch(true);
  };

  const getFilterLabel = () => {
    if (!filterValue) {
      return "Sélectionner un genre...";
    }
    const bookGenre = BOOK_GENRES.find(
      (element) => element.id === filterValue
    );
    if (bookGenre) {
      return bookGenre.label;
    }
    return "";
  };

  return (
    <>
      {action === SHOW_ACTION ? (
        <ShowBook
          data={books}
          updateCard={(data) => updateCard(data)}
          updateState={(state) => this.setState(state)}
        />
      ) : (
          <SafeAreaView style={{ marginTop: 0, opacity: 1 }}>
            <Item
              rounded
              style={{
                margin: 10,
                marginLeft: 15,
                paddingHorizontal: 10,
                paddingLeft: 5,
                borderRadius: 5,
                height: 40,
                backgroundColor: "#FFF",
                fontSize: 12,
              }}
            >
              <Icon type="AntDesign" name="search1" />
              <Input
                onChangeText={setSearchValue}
                onBlur={search}
                style={{
                  fontSize: 15,
                  paddingLeft: 10,
                }}
                keyboardType="default"
                placeholder="Rechercher un livre"
                value={searchValue}
              />
            </Item>
            <View style={{ flexDirection: "row-reverse" }}>
              <FilterList
                selectedValue={getFilterLabel()}
                updateValue={updaterFilterValue}
              />
            </View>
            <FlatList
              data={books}
              renderItem={renderItem}
              keyExtractor={(item) => `${item.id}`}
              ItemSeparatorComponent={renderSeparator}
              onRefresh={handleRefresh}
              refreshing={
                refreshing !== undefined
                  ? refreshing
                  : false
              }
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
            />
          </SafeAreaView>
        )}
      <Loader visible={!!loading} />
      {errorMessage && (
        <ErrorModal visible message={errorMessage} />
      )}
    </>
  );

}

LibraryScreen.propTypes = {
  books: PropTypes.array,
  page: PropTypes.number,
  errorMessage: PropTypes.string,
  dispatchErrorMessage: PropTypes.func,
  loading: PropTypes.bool,
  refreshing: PropTypes.bool,
  handleMore: PropTypes.bool,
  lastPage: PropTypes.bool,
  getBooks: PropTypes.func,
  showBook: PropTypes.func,

};

LibraryScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: (
      <SafeAreaView>
        <View style={{ flexDirection: "row" }}>
          <Button transparent onPress={() => navigation.navigate("BookReservation")}
            style={{
              marginTop: 20, marginBottom: 20
            }}>
            <Icon type="FontAwesome"
              name="book" />
            <Text>Réserver</Text>
          </Button>
          <Button transparent onPress={() => {
            navigation.navigate("MyReservations");

          }
          }
            style={{
              marginTop: 20, marginBottom: 20
            }}>
            <Icon type="FontAwesome"
              name="book" />
            <Text>Mes Réservation</Text>
          </Button>
          <Button transparent onPress={() => navigation.navigate("BookFavoriteList")}
            style={{
              marginTop: 20, marginBottom: 20, marginRight: 20
            }}

          >
            <Icon type="FontAwesome"
              name="star" />
            <Text>Favoris</Text>
          </Button>
        </View>

      </SafeAreaView>
    ),
  };

}
export default connect(mapStateToProps, mapDispatchToProps)(LibraryScreen);
