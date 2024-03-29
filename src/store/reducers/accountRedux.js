import {batchActions} from 'redux-batched-actions';
import getAxiosInstance from '../../Utils/axios';
import {
  ACTIVATE_ACCOUNT_URI,
  PATCH_UPDATE_USER_URI,
  POST_REGISTER_USER_URI,
  POST_RESET_PASSWORD_URI,
} from '../../Utils/ApiUrl';
import {dispatchError} from './errorMessageRedux';
import {
  SHOW_ACCOUNT_ACTION,
  UPDATE_ACCOUNT_ACTION,
} from '../../Utils/Constants';

export const STORE_ACCOUNT = 'STORE_ACCOUNT';

export const PATCH_UPDATE_USER_REQUEST = 'PATCH_UPDATE_USER_REQUEST';
export const PATCH_UPDATE_USER_SUCCESS = 'PATCH_UPDATE_USER_SUCCESS';
export const PATCH_UPDATE_USER_ERROR = 'PATCH_UPDATE_USER_ERROR';
export const PATCH_BATCH_UPDATE_USER_ERROR = 'PATCH_BATCH_UPDATE_USER_ERROR';
export const CHANGE_ACTION = 'CHANGE_ACTION';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';

export const POST_REGISTER_USER_REQUEST = 'POST_REGISTER_USER_REQUEST';
export const POST_REGISTER_USER_SUCCESS = 'POST_REGISTER_USER_SUCCESS';
export const POST_REGISTER_USER_ERROR = 'POST_REGISTER_USER_ERROR';
export const POST_BATCH_REGISTER_USER_ERROR = 'POST_BATCH_REGISTER_USER_ERROR';

export const ACTIVATE_USER_ACCOUNT = 'ACTIVATE_USER_ACCOUNT';
export const ACTIVATE_USER_ACCOUNT_SUCCESS = 'ACTIVATE_USER_ACCOUNT_SUCCESS';
export const ACTIVATE_USER_ACCOUNT_ALREADY_ACTIVATED_ERROR =
  'ACTIVATE_USER_ACCOUNT_ALREADY_ACTIVATED_ERROR';
export const ACTIVATE_USER_ACCOUNT_ERROR = 'ACTIVATE_USER_ACCOUNT_ERROR';

export const DELETE_USER_ACCOUNT_REQUEST = 'DELETE_USER_ACCOUNT_REQUEST';
export const DELETE_USER_ACCOUNT_SUCCESS = 'DELETE_USER_ACCOUNT_SUCCESS';
export const DELETE_USER_ACCOUNT_ERROR = 'DELETE_USER_ACCOUNT_ERROR';
export const BATCH_DELETE_USER_ACCOUNT_ERROR =
  'BATCH_DELETE_USER_ACCOUNT_ERROR';

export const POST_BATCH_REGISTER_SUCCESS = 'POST_BATCH_REGISTER_SUCCESS';

export const STORE_TOKEN_DEVICE = 'STORE_TOKEN_DEVICE';

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
    .then((response) => {
      dispatch(patchUpdateSuccess({user: response.data.data}));
    })
    .catch((error) => {
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

const activateAccountRequest = () => {
  return {
    type: ACTIVATE_USER_ACCOUNT,
    payload: {
      loading: true,
    },
  };
};

const activateAccountError = () => {
  return {
    type: ACTIVATE_USER_ACCOUNT_ERROR,
    payload: {
      loading: false,
      accountActivationSentMailActivation: false,
      accountActivationMessage: null,
    },
  };
};

const activateAccountAlreadyActivatedError = (data = null) => {
  return {
    type: ACTIVATE_USER_ACCOUNT_ALREADY_ACTIVATED_ERROR,
    payload: {
      loading: false,
      accountActivationSentMailActivation: true,
      accountActivationMessage: data.message,
    },
  };
};

const activateAccountSuccess = (data) => {
  return {
    type: ACTIVATE_USER_ACCOUNT_SUCCESS,
    payload: {
      loading: false,
      accountActivationSentMailActivation: true,
      accountActivationMessage: data.message,
    },
  };
};

export const activateAccount = () => {
  return (dispatch) => {
    dispatch(activateAccountRequest());

    getAxiosInstance()
      .get(ACTIVATE_ACCOUNT_URI)
      .then((response) => {
        if (response.data.status === 'success') {
          dispatch(activateAccountSuccess(response.data));
        } else {
          dispatch(activateAccountAlreadyActivatedError(response.data));
        }
      })
      .catch((error) => {
        dispatch(
          batchActions(
            [dispatchError(error), activateAccountError()],
            ACTIVATE_USER_ACCOUNT_ERROR,
          ),
        );
      });
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
    .then(() => {
      updateUser(id, data, dispatch);
    })
    .catch((error) => {
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

export const storeAccount = (data) => {
  return {
    type: STORE_ACCOUNT,
    payload: data,
  };
};

export const register = (data) => {
  return (dispatch) => {
    dispatch(postRegisterRequest());

    getAxiosInstance()
      .post(POST_REGISTER_USER_URI, data)
      .then((response) => {
        dispatch(
          batchActions(
            [storeAccount(response.data), postRegisterSuccess()],
            POST_BATCH_REGISTER_SUCCESS,
          ),
        );
      })
      .catch((error) => {
        dispatch(
          batchActions(
            [dispatchError(error), postRegisterError()],
            POST_BATCH_REGISTER_USER_ERROR,
          ),
        );
      });
  };
};

export const deleteUserAccountRequest = () => {
  return {
    type: DELETE_USER_ACCOUNT_REQUEST,
    payload: {
      loading: true,
    },
  };
};

export const deleteUserAccountSuccess = () => {
  return {
    type: DELETE_USER_ACCOUNT_SUCCESS,
    payload: {loading: false, user: null},
  };
};

export const deleteUserAccountError = () => {
  return {
    type: DELETE_USER_ACCOUNT_ERROR,
    payload: {loading: false},
  };
};

export const storeTokenDevice = (fcmToken) => {
  return {
    type: STORE_TOKEN_DEVICE,
    payload: {fcmToken},
  };
};

export const deleteUserAccount = (id) => {
  return (dispatch) => {
    dispatch(deleteUserAccountRequest);

    getAxiosInstance()
      .delete(`${PATCH_UPDATE_USER_URI + id}`)
      .then(() => {
        dispatch(deleteUserAccountSuccess());
      })
      .catch((error) => {
        dispatch(
          batchActions(
            [dispatchError(error), deleteUserAccountError()],
            BATCH_DELETE_USER_ACCOUNT_ERROR,
          ),
        );
      });
  };
};

const initialState = {
  loading: false,
  accountActivationSentMailActivation: false,
  accountActivationMessage: null,
};

export const accountReducer = (state = initialState, data) => {
  switch (data.type) {
    case PATCH_UPDATE_USER_SUCCESS:
    case POST_REGISTER_USER_REQUEST:
    case POST_REGISTER_USER_SUCCESS:
    case POST_REGISTER_USER_ERROR:
    case STORE_TOKEN_DEVICE:
    case STORE_ACCOUNT:
      return {...state, action: SHOW_ACCOUNT_ACTION, ...data.payload};
    case PATCH_UPDATE_USER_REQUEST:
    case PATCH_UPDATE_USER_ERROR:
      return {...state, action: UPDATE_ACCOUNT_ACTION, ...data.payload};
    case CHANGE_ACTION: {
      return {...state, action: data.payload};
    }
    case DELETE_USER_ACCOUNT_SUCCESS: {
      return {...initialState};
    }
    case ACTIVATE_USER_ACCOUNT:
    case ACTIVATE_USER_ACCOUNT_ERROR:
    case ACTIVATE_USER_ACCOUNT_ALREADY_ACTIVATED_ERROR:
    case ACTIVATE_USER_ACCOUNT_SUCCESS: {
      return {...state, ...data.payload};
    }
    default: {
      return state;
    }
  }
};
