import axios from "axios";

const imgApi = axios.create({
  baseURL: " http://15.165.160.107/",
  headers: {
    "content-type": "multipart/form-data",
  },
});
const api = axios.create({
  baseURL: "http://15.165.160.107/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = `${localStorage.getItem("token")}`;

  //  {
  //   authorization: `Bearer ${localStorage.getItem("token")}`,
  // };

  if (accessToken !== undefined) {
    config.headers.common["authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

imgApi.interceptors.request.use(function (config) {
  const accessToken = `${localStorage.getItem("token")}`;
  if (accessToken !== undefined) {
    config.headers.common["authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

//apis body
export const apis = {
  // article
  // add: (contents) => api.post("/api/articles", contents),
  // user
  login: (userEmail, password) =>
    api
      .post("/api/users/login", { userEmail: userEmail, password: password })
      .then((user) => {
        localStorage.setItem("token", user.data.token);
      }),

  signup: (frm) => imgApi.post("/api/users/signup", frm),

  load: () => api.get("/api/recommends"),
};
