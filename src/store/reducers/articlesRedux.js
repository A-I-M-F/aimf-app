import {batchActions} from 'redux-batched-actions';
import getAxiosInstance from '../../Utils/axios';
import {
  DELETE_ARTICLE_URI,
  GET_ARTICLES_URI,
  GET_DRAFT_ARTICLE_URI,
} from '../../Utils/ApiUrl';
import {dispatchError} from './errorMessageRedux';
import {
  DRAFT_ARTICLE_STATUS,
  PUBLISHED_ARTICLE_STATUS,
} from '../../Utils/Constants';

const GET_ARTICLES_REQUEST = 'GET_ARTICLES_REQUEST';
const GET_ARTICLES_SUCCESS = 'GET_ARTICLES_SUCCESS';
const GET_ARTICLES_ERROR = 'GET_ARTICLES_ERROR';

const GET_DRAFT_ARTICLE_REQUEST = 'GET_DRAFT_ARTICLE_REQUEST';
const GET_DRAFT_ARTICLE_SUCCESS = 'GET_DRAFT_ARTICLE_SUCCESS';
const GET_DRAFT_ARTICLE_ERROR = 'GET_DRAFT_ARTICLE_ERROR';

const POST_ARTICLES_REQUEST = 'POST_ARTICLES_REQUEST';
const POST_ARTICLES_SUCCESS = 'POST_ARTICLES_SUCCESS';
const POST_ARTICLES_ERROR = 'POST_ARTICLES_ERROR';

const DELETE_ARTICLE_REQUEST = 'DELETE_ARTICLE_REQUEST';

const BATCH_ARTICLES_ERROR = 'BATCH_ARTICLES_ERROR';

const getArticlesRequest = (refreshing, handleMore) => ({
  type: GET_ARTICLES_REQUEST,
  data: {
    loading: true,
    refreshing,
    handleMore,
  },
});

const getArticlesSuccess = data => ({
  type: GET_ARTICLES_SUCCESS,
  data,
});

const getArticlesError = () => ({
  type: GET_ARTICLES_ERROR,
});

const getDraftArticleRequest = () => ({
  type: GET_DRAFT_ARTICLE_REQUEST,
  data: {
    loading: true,
  },
});

const getDraftArticleSuccess = data => ({
  type: GET_DRAFT_ARTICLE_SUCCESS,
  data,
});

const getDraftArticleError = () => ({
  type: GET_DRAFT_ARTICLE_ERROR,
});

const saveArticleRequest = () => ({
  type: POST_ARTICLES_REQUEST,
  data: {
    loading: true,
  },
});

const postArticleSuccess = data => ({
  type: POST_ARTICLES_SUCCESS,
  payload: data,
});

const postArticleError = () => ({
  type: POST_ARTICLES_ERROR,
});

const deleteArticleRequest = () => ({
  type: DELETE_ARTICLE_REQUEST,
  data: {
    loading: true,
  },
});

export const getArticles =
  (currentArticles, page, refreshing = false, handleMore = false) =>
  dispatch => {
    dispatch(getArticlesRequest(refreshing, handleMore));
    getAxiosInstance()
      .get(GET_ARTICLES_URI, {
        params: {
          page,
          with_association: 1,
        },
      })
      .then(response => {
        dispatch(
          getArticlesSuccess({
            articles:
              page === 1
                ? response.data.data
                : [...currentArticles, ...response.data.data],
            page,
            lastPage:
              response.data.meta.last_page === response.data.meta.current_page,
          }),
        );
      })
      .catch(error => {
        dispatch(
          batchActions(
            [dispatchError(error), getArticlesError()],
            BATCH_ARTICLES_ERROR,
          ),
        );
      });
  };

export const savePost = data => dispatch => {
  dispatch(saveArticleRequest());
  getAxiosInstance()
    .post(`${GET_ARTICLES_URI}?with_association=1`, data)
    .then(response => {
      if (response.data.data.status === PUBLISHED_ARTICLE_STATUS) {
        dispatch(getArticles([], 1, true));
      }
      dispatch(postArticleSuccess(response.data.data));
    })
    .catch(error => {
      dispatch(
        batchActions(
          [dispatchError(error), postArticleError()],
          BATCH_ARTICLES_ERROR,
        ),
      );
    });
};

export const getDraftArticle = () => dispatch => {
  dispatch(getDraftArticleRequest());
  getAxiosInstance()
    .get(GET_DRAFT_ARTICLE_URI, {params: {with_association: 1}})
    .then(response => {
      dispatch(getDraftArticleSuccess(response.data.data));
    })
    .catch(error => {
      dispatch(
        batchActions(
          [dispatchError(error), getDraftArticleError()],
          BATCH_ARTICLES_ERROR,
        ),
      );
    });
};

export const deleteArticle = id => dispatch => {
  dispatch(deleteArticleRequest());
  getAxiosInstance()
    .delete(`${DELETE_ARTICLE_URI}/${id}`)
    // eslint-disable-next-line no-unused-vars
    .then(response => {
      dispatch(getArticles([], 1, true));
    })
    .catch(error => {
      dispatch(
        batchActions(
          [dispatchError(error), getDraftArticleError()],
          BATCH_ARTICLES_ERROR,
        ),
      );
    });
};

const initialState = [];

export const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES_REQUEST:
    case GET_DRAFT_ARTICLE_REQUEST:
    case POST_ARTICLES_REQUEST:
    case DELETE_ARTICLE_REQUEST:
      return {...state, ...action.data};
    case GET_ARTICLES_SUCCESS: {
      return {
        ...state,
        ...action.data,
        loading: false,
        refreshing: false,
        handleMore: false,
      };
    }
    case GET_DRAFT_ARTICLE_SUCCESS: {
      return {
        ...state,
        draftArticle: {...action.data},
        loading: false,
      };
    }
    case GET_ARTICLES_ERROR: {
      return {
        ...state,
        loading: false,
        refreshing: false,
        handleMore: false,
      };
    }
    case GET_DRAFT_ARTICLE_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case POST_ARTICLES_SUCCESS: {
      let draftArticle = null;
      if (action.payload.status === DRAFT_ARTICLE_STATUS) {
        draftArticle = action.payload;
      }

      return {
        ...state,
        loading: false,
        draftArticle,
      };
    }
    case POST_ARTICLES_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
