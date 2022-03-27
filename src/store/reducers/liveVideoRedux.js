import getAxiosInstance from '../../Utils/axios';
import {
  GET_LIVE_VIDEO_URI,
  REFRESH_LIVE_VIDEO_INFO_URI,
} from '../../Utils/ApiUrl';

const GET_LIVE_VIDEO_REQUEST = 'GET_LIVE_VIDEO_REQUEST';
const GET_LIVE_VIDEO_SUCCESS = 'GET_LIVE_VIDEO_SUCCESS';
const GET_LIVE_VIDEO_ERROR = 'GET_LIVE_VIDEO_ERROR';

const GET_REFRESH_LIVE_VIDEO_INFO_REQUEST =
  'GET_REFRESH_LIVE_VIDEO_INFO_REQUEST';
const GET_REFRESH_LIVE_VIDEO_INFO_REQUEST_SUCCESS =
  'GET_REFRESH_LIVE_VIDEO_INFO_REQUEST_SUCCESS';
const GET_REFRESH_LIVE_VIDEO_INFO_REQUEST_ERROR =
  'GET_REFRESH_LIVE_VIDEO_INFO_REQUEST_ERROR';

const getLiveVideoRequest = () => {
  return {
    type: GET_LIVE_VIDEO_REQUEST,
    data: {
      loading: true,
    },
  };
};

const getLiveVideoSuccess = (data) => {
  return {
    type: GET_LIVE_VIDEO_SUCCESS,
    data: {video: data, loading: false},
  };
};

const getLiveVideoError = () => {
  return {
    type: GET_LIVE_VIDEO_ERROR,
    loading: false,
  };
};

const refreshLiveVideoInfoRequest = () => {
  return {
    type: GET_REFRESH_LIVE_VIDEO_INFO_REQUEST,
    data: {
      loading: true,
    },
  };
};

const refreshLiveVideoInfoRequestSuccess = (data) => {
  return {
    type: GET_REFRESH_LIVE_VIDEO_INFO_REQUEST_SUCCESS,
    data: {
      liveStarted: data.is_live,
      liveStartedMessage: data.message,
      loading: false,
    },
  };
};

const refreshLiveVideoInfoRequestError = () => {
  return {
    type: GET_REFRESH_LIVE_VIDEO_INFO_REQUEST_SUCCESS,
    data: {loading: false},
  };
};

export const getLiveVideo = () => {
  return (dispatch) => {
    dispatch(getLiveVideoRequest());
    getAxiosInstance()
      .get(GET_LIVE_VIDEO_URI)
      .then((response) => {
        dispatch(getLiveVideoSuccess(response.data.data));
      })
      .catch(() => {
        dispatch(getLiveVideoError());
      });
  };
};

export const refreshLiveVideoInfo = () => {
  return (dispatch) => {
    dispatch(refreshLiveVideoInfoRequest());
    getAxiosInstance()
      .get(REFRESH_LIVE_VIDEO_INFO_URI)
      .then((response) => {
        dispatch(refreshLiveVideoInfoRequestSuccess(response.data));
      })
      .catch(() => {
        dispatch(refreshLiveVideoInfoRequestError());
      });
  };
};

const initialState = {
  liveStarted: false,
};

export const liveVideoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIVE_VIDEO_REQUEST:
    case GET_LIVE_VIDEO_SUCCESS:
    case GET_LIVE_VIDEO_ERROR:
      return {...state, ...action.data};
    case GET_REFRESH_LIVE_VIDEO_INFO_REQUEST:
    case GET_REFRESH_LIVE_VIDEO_INFO_REQUEST_SUCCESS:
    case GET_REFRESH_LIVE_VIDEO_INFO_REQUEST_ERROR:
      return {...state, ...action.data};
    default: {
      return state;
    }
  }
};
