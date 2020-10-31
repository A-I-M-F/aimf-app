import {batchActions} from 'redux-batched-actions';
import getAxiosInstance from '../../Utils/axios';
export const STORE_ACCOUNT = 'STORE_ACCOUNT';
import {
  PATCH_UPDATE_USER_URI,
  POST_REGISTER_USER_URI,
  POST_RESET_PASSWORD_URI,
} from '../../Utils/ApiUrl';
import {dispatchError} from './errorMessageRedux';
import {SHOW_ACCOUNT_ACTION} from '../../Utils/Constants';

export const PATCH_UPDATE_USER_REQUEST = 'PATCH_UPDATE_USER_REQUEST';
export const PATCH_UPDATE_USER_SUCCESS = 'PATCH_UPDATE_USER_SUCCESS';
export const PATCH_UPDATE_USER_ERROR = 'PATCH_UPDATE_USER_ERROR';
export const PATCH_BATCH_UPDATE_USER_ERROR = 'PATCH_BATCH_UPDATE_USER_ERROR';
export const CHANGE_ACTION = 'CHANGE_ACTION';

export const POST_REGISTER_USER_REQUEST = 'POST_REGISTER_USER_REQUEST';
export const POST_REGISTER_USER_SUCCESS = 'POST_REGISTER_USER_SUCCESS';
export const POST_REGISTER_USER_ERROR = 'POST_REGISTER_USER_ERROR';
export const POST_BATCH_REGISTER_USER_ERROR = 'POST_BATCH_REGISTER_USER_ERROR';

const POST_BATCH_REGISTER_SUCCESS = 'POST_BATCH_REGISTER_SUCCESS';

const patchUpdateRequest = () => {
  return {
    type: PATCH_UPDATE_USER_REQUEST,
    payload: {
      loading: true,
    },
  };
};

const patchUpdateError = () => {
  return {
    type: PATCH_UPDATE_USER_ERROR,
    payload: {loading: false},
  };
};

const patchUpdateSuccess = (data) => {
  return {
    type: PATCH_UPDATE_USER_SUCCESS,
    payload: {loading: false, action: SHOW_ACCOUNT_ACTION, ...data},
  };
};

const postRegisterRequest = () => {
  return {
    type: POST_REGISTER_USER_REQUEST,
    payload: {
      loading: true,
    },
  };
};

const postRegisterError = () => {
  return {
    type: POST_REGISTER_USER_ERROR,
    payload: {loading: false},
  };
};

const postRegisterSuccess = () => {
  return {
    type: POST_REGISTER_USER_SUCCESS,
    payload: {loading: false},
  };
};

const updateUser = (id, data, dispatch) => {
  getAxiosInstance()
    .patch(`${PATCH_UPDATE_USER_URI + id}?with_roles=1&with_children=1`, data, {
      with_roles: 1,
      with_children: 1,
    })
    .then(function (response) {
      dispatch(patchUpdateSuccess({user: response.data.data}));
    })
    .catch(function (error) {
      dispatch(
        batchActions(
          [dispatchError(error), patchUpdateError()],
          PATCH_BATCH_UPDATE_USER_ERROR,
        ),
      );
    });
};

export const updateAction = (action) => {
  return {
    type: CHANGE_ACTION,
    payload: action,
  };
};

const resetPassword = (id, data, dispatch) => {
  const {oldPassword, newPassword, passwordConfirmation} = data;
  getAxiosInstance()
    .post(POST_RESET_PASSWORD_URI, {
      oldPassword,
      newPassword,
      passwordConfirmation,
    })
    .then(function (response) {
      updateUser(id, data, dispatch);
    })
    .catch(function (error) {
      setTimeout(() => {
        dispatch(
          batchActions(
            [dispatchError(error), patchUpdateError()],
            PATCH_BATCH_UPDATE_USER_ERROR,
          ),
        );
      }, 500);
    });
};

export const updateCurrentUser = (id, data) => {
  return (dispatch) => {
    dispatch(patchUpdateRequest());
    if (data.oldPassword) {
      resetPassword(id, data, dispatch);
    } else {
      updateUser(id, data, dispatch);
    }
  };
};

export const register = (data) => {
  return (dispatch) => {
    dispatch(postRegisterRequest());

    getAxiosInstance()
      .post(POST_REGISTER_USER_URI, data)
      .then(function (response) {
        dispatch(
          batchActions(
            [storeAccount(response.data), postRegisterSuccess()],
            POST_BATCH_REGISTER_SUCCESS,
          ),
        );
      })
      .catch(function (error) {
        dispatch(
          batchActions(
            [dispatchError(error), postRegisterError()],
            POST_BATCH_REGISTER_USER_ERROR,
          ),
        );
      });
  };
};

export const storeAccount = (data) => {
  return {
    type: STORE_ACCOUNT,
    payload: data,
  };
};

const initialState = {action: SHOW_ACCOUNT_ACTION};

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case PATCH_UPDATE_USER_REQUEST:
    case PATCH_UPDATE_USER_SUCCESS:
    case PATCH_UPDATE_USER_ERROR:
    case POST_REGISTER_USER_REQUEST:
    case POST_REGISTER_USER_SUCCESS:
    case POST_REGISTER_USER_ERROR:
    case STORE_ACCOUNT:
      return {...state, ...action.payload};
    case CHANGE_ACTION: {
      return {...state, action: action.payload};
    }
    default: {
      return state;
    }
  }
};
