import {batchActions} from 'redux-batched-actions';
import {GET_LIST_ROLE_URI} from '../../Utils/ApiUrl';
import getAxiosInstance from '../../Utils/axios';
import {dispatchError} from './errorMessageRedux';

//
// Action types
//
const RECEIVE_ROLE_DATA = 'RECEIVE_ROLE_DATA';
const LOADING_ROLE_DATA = 'LOADING_ROLE_DATA';
const LOADING_ROLE_DATA_ERROR = 'LOADING_ROLE_DATA_ERROR';
const GET_BATCH_ROLE_DATA_ERROR = 'GET_BATCH_ROLE_DATA_ERROR';

//
// Actions creator
//
const loadingRoleData = () => {
  return {
    type: LOADING_ROLE_DATA,
    payload: {
      loading: true,
    },
  };
};

const getRoleError = () => {
  return {
    type: LOADING_ROLE_DATA_ERROR,
    payload: {loading: false},
  };
};

const getRoleData = (roleList) => {
  return {
    type: RECEIVE_ROLE_DATA,
    payload: {
      loading: false,
      roleList,
    },
  };
};

export const receiveRoleData = (associationRoles = false) => {
  return (dispatch) => {
    dispatch(loadingRoleData());
    getAxiosInstance()
      .get(
        GET_LIST_ROLE_URI,

        {
          params: {
            associationRoles: associationRoles ? '1' : '0',
          },
        },
      )
      .then((response) => {
        dispatch(getRoleData(response.data.data));
      })
      .catch((error) => {
        dispatch(
          batchActions(
            [dispatchError(error), getRoleError()],
            GET_BATCH_ROLE_DATA_ERROR,
          ),
        );
      });
  };
};

//
// Reducer
//
const initState = {
  loading: false,
  roleList: [],
};

export const roleReducer = (state = initState, action) => {
  switch (action.type) {
    case LOADING_ROLE_DATA:
    case LOADING_ROLE_DATA_ERROR:
      return {...state, loading: action.payload.loading};
    case RECEIVE_ROLE_DATA: {
      return {
        ...state,
        loading: action.payload.loading,
        roleList: action.payload.roleList,
      };
    }
    default: {
      return state;
    }
  }
};
