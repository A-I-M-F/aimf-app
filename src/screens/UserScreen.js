import React, {Component} from 'react';
import {View, FlatList, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import UserCard from './UserScreen/UserCard';
import {SHOW_USER_ACTION} from '../Utils/Constants';
import ShowUser from './UserScreen/ShowUser';
import {
  getUsers,
  showUser,
  updateAction,
  updateUserRole,
} from '../store/reducers/userRedux';
import ErrorModal from '../Components/ErrorModal';
import {isAdmin, isSuperAdmin} from '../Utils/Account';
import Loader from '../Components/Loader';
import {receiveRoleData} from '../store/reducers/roleRedux';
import MainHeader from '../Components/MainHeader';

class UserScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.props.getUsers([], 1, true);
    this.props.receiveRoleData();
  }

  handleRefresh = () => {
    if (
      !this.props.refreshing &&
      !this.props.handleMore &&
      !this.props.loading
    ) {
      this.props.getUsers([], 1, true);
    }
  };

  handleLoadMore = () => {
    if (
      !this.props.refreshing &&
      !this.props.handleMore &&
      !this.props.loading &&
      !this.props.lastPage
    ) {
      this.props.getUsers(this.props.users, this.props.page + 1, false, true);
    }
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  renderItem = (item, currentUserIndex) => {
    return (
      <UserCard
        showUser={this.props.showUser}
        data={item}
        backgroundColor="#ffffff"
        currentUserIndex={currentUserIndex}
      />
    );
  };

  render() {
    return (
      <>
        <MainHeader />
        {this.props.action === SHOW_USER_ACTION ? (
          <ShowUser
            style={{
              opacity: this.props.loading || this.props.errorMessage ? 0.6 : 1,
            }}
            data={this.props.userToShow || {}}
            updateAction={(action) => this.props.updateAction(action)}
            updateState={(data) => this.setState(data)}
            updateUserRole={(id, roles) => this.props.updateUserRole(id, roles)}
            isSuperAdmin={isSuperAdmin(this.props.currentUser)}
            isAdmin={isAdmin(this.props.currentUser)}
            currentUserId={this.props.currentUser.id}
            roleList={this.props.roleList}
          />
        ) : (
          <SafeAreaView
            style={{
              opacity: this.props.loading || this.props.errorMessage ? 0.6 : 1,
              paddingBottom: 50,
            }}>
            <FlatList
              data={this.props.users}
              renderItem={({item, index}) => this.renderItem(item, index)}
              keyExtractor={(item) => `${item.id}`}
              ItemSeparatorComponent={this.renderSeparator}
              onRefresh={this.handleRefresh}
              refreshing={false}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.5}
            />
          </SafeAreaView>
        )}
        <Loader visible={!!this.props.loading} />
        {this.props.errorMessage && (
          <ErrorModal visible message={this.props.errorMessage} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {errorMessage} = state.errorMessageStore;
  const {
    users,
    loading: userStoreLoader,
    refreshing,
    handleMore,
    page,
    action,
    userToShow,
    lastPage,
  } = state.userStore;

  const {loading: roleListLoader, roleList} = state.roleStore;
  return {
    users,
    loading: userStoreLoader || roleListLoader,
    refreshing,
    handleMore,
    page,
    errorMessage,
    action,
    userToShow,
    lastPage,
    currentUser: state.accountStore.user,
    roleList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (users, page, refreshing = false, handleMore = false) =>
      dispatch(getUsers(users, page, refreshing, handleMore)),
    showUser: (data, currentUserIndex) =>
      dispatch(showUser(data, currentUserIndex)),
    updateAction: (action) => dispatch(updateAction(action)),
    updateUserRole: (id, roles) => dispatch(updateUserRole(id, roles)),
    receiveRoleData: () => dispatch(receiveRoleData(true)),
  };
};

UserScreen.propTypes = {
  currentUser: PropTypes.object,
  page: PropTypes.number,
  users: PropTypes.array,
  getUsers: PropTypes.func,
  loading: PropTypes.bool,
  refreshing: PropTypes.bool,
  handleMore: PropTypes.bool,
  action: PropTypes.string,
  showUser: PropTypes.func,
  updateAction: PropTypes.func,
  updateUserRole: PropTypes.func,
  userToShow: PropTypes.object,
  errorMessage: PropTypes.string,
  lastPage: PropTypes.bool,
  receiveRoleData: PropTypes.func,
  roleList: PropTypes.array,
  associationId: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
