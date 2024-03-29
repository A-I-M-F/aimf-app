import {API_VERSION} from 'react-native-dotenv';

const API_URL = `/api/${API_VERSION ? `${API_VERSION}/` : ''}`;
export const POST_LOGIN_URI = `${API_URL}auth/login`;
export const POST_LOGOUT_URI = `${API_URL}auth/logout`;
export const PATCH_UPDATE_USER_URI = `${API_URL}user/`;
export const POST_REGISTER_USER_URI = `${API_URL}auth/register`;
export const POST_RESET_PASSWORD_URI = `${API_URL}auth/reset-password`;
export const ACTIVATE_ACCOUNT_URI = `${API_URL}auth/resend-activation-link`;
export const POST_FORGET_PASSWORD_URI = `${API_URL}auth/forget-password`;
export const GET_SECURITY_QUESTIONS_URI = `${API_URL}auth/security-questions`;
export const GET_BOOK_LIST_URI = `${API_URL}book?with_image=1`;
export const GET_BOOK_URI = `${API_URL}book/`;
export const GET_BOOK_FAVORITE_LIST_URI = `${API_URL}user-bookmark?with_image=1`;
export const POST_BOOK_FAVORITE_LIST_URI = `${API_URL}user-bookmark`;
export const GET_BOOK_RESERVATION_REQUEST_URI = `${API_URL}user-booking/request`;
export const POST_BOOK_RESERVATION_URI = `${API_URL}user-booking`;
export const GET_BOOK_RESERVATION_URI = `${API_URL}user-booking?with_image=1`;
export const GET_LIST_TIKHEROUBINS_URI = `${API_URL}takharoubt`;
export const POST_ADD_KHATMA_URI = `${API_URL}khatma`;
export const PATCH_KHATMA_URI = `${API_URL}khatma`;
export const PATCH_USER_TAKHAROUBT_URI = `${API_URL}user-takharoubt/`;
export const GET_LIST_KHATMA_URI = `${API_URL}khatma`;
export const GET_KHATMA_URI = `${API_URL}khatma/`;
export const GET_USER_KHATMA_URI = `${API_URL}user-takharoubt`;
export const GET_USERS_URI = `${API_URL}user`;
export const GET_ARTICLES_URI = `${API_URL}article`;
export const GET_DRAFT_ARTICLE_URI = `${API_URL}article/draft`;
export const GET_LIVE_VIDEO_URI = `${API_URL}youtube/live-video`;
export const REFRESH_LIVE_VIDEO_INFO_URI = `${API_URL}youtube/refresh-live-video`;
export const STOP_LIVE_VIDEO_URI = `${API_URL}youtube/force-stop-video-live`;
export const GET_LIST_ASSOCIAITION_URI = `${API_URL}association`;
export const GET_USER_ASSOCIAITION_URI = `${API_URL}user-association`;
export const PATCH_USER_ASSOCIAITION_URI = `${API_URL}user-association`;
export const TERMS_OF_USE_URI = `${API_URL}terms-of-use/latest`;
export const DELETE_ARTICLE_URI = `${API_URL}article`;
export const GET_LIST_ROLE_URI = `${API_URL}role`;
