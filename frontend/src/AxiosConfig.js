import axios from "axios";
// import { useNavigate } from "react-router-dom";

let isTokenRefreshing = false;
let refreshSubscribers = [];

const BASE_URL = process.env.REACT_APP_BASE_URL;

const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken));
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;
    if (response && response.status === 400) {
      return Promise.resolve();
    }
    if (response && response.status === 401) {
      if (!isTokenRefreshing) {
        // isTokenRefreshing이 false인 경우에만 token refresh 요청
        isTokenRefreshing = true;
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          // refresh token이 없을 경우 로그아웃 또는 다른 조치 수행
          window.reload();
        }
        try {
          const { data } = await axios.post(`${BASE_URL}/user/refresh-token`, {
            refreshToken
          });
          // 새로운 토큰 저장
          console.log(data);
          localStorage.setItem("refreshToken", data.refreshToken);
          sessionStorage.setItem("accessToken", data.accessToken);
          const accessToken = sessionStorage.getItem("accessToken");
          isTokenRefreshing = false;
          // 새로운 토큰으로 지연되었던 요청 진행
          onTokenRefreshed(accessToken);
          // refreshSubscribers에 저장된 요청들을 모두 처리
          refreshSubscribers.forEach((callback) => callback(accessToken));
          refreshSubscribers = [];
        } catch (refreshError) {
          // 토큰 새로고침 요청이 실패한 경우 로그아웃 또는 다른 조치 수행
          return Promise.reject(refreshError);
        }
      }
      // token이 재발급 되는 동안의 요청은 refreshSubscribers에 저장
      return new Promise((resolve, reject) => {
        addRefreshSubscriber((accessToken) => {
          originalRequest.headers.Authorization = "Bearer " + accessToken;
          resolve(axios(originalRequest));
        });
      });
    }
    return Promise.reject(error);
  }
);

export default axios;
