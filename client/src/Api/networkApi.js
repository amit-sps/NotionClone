// import axios from "axios";
import axios from "@/axiosConfig";
import { toast } from "react-toastify";
import { get } from "lodash";

const NetworkApi = {
  requestTimeout: 30000,
  getDefaultHeaders: () => ({
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  }),

  getHeaders: () => {
    const headers = {
      ...NetworkApi.getDefaultHeaders(),
    };
    return headers;
  },

  get: (route, headers) =>
    new Promise((resolve, reject) => {
      NetworkApi.prepareConfig(route, null, "get", headers, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    }),
  post: (route, params, headers, hidePopError) =>
    new Promise((resolve, reject) => {
      NetworkApi.prepareConfig(
        route,
        params,
        "post",
        headers,
        (err, res) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(res);
        },
        hidePopError
      );
    }),
  put: (route, params, headers) =>
    new Promise((resolve, reject) => {
      NetworkApi.prepareConfig(route, params, "put", headers, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    }),
  patch: (route, params, headers) =>
    new Promise((resolve, reject) => {
      NetworkApi.prepareConfig(route, params, "patch", headers, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    }),
  delete: (route, headers) =>
    new Promise((resolve, reject) => {
      NetworkApi.prepareConfig(route, null, "delete", headers, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    }),
  prepareConfig: async (
    url,
    data,
    methodType,
    headers,
    callback,
    hidePopError
  ) => {
    const config = {
      method: methodType,
      url,
      data,
      headers: headers || NetworkApi.getDefaultHeaders(),
      // timeout: NetworkApi.requestTimeout
    };
    NetworkApi.call(config, callback, hidePopError);
  },
  call: (config, callback, hidePopError) => {
    axios(config)
      .then((response) => {
        callback(null, response.data);
      })
      .catch((error) => {
        callback(error, null);
        if (error?.response) {
          const errMsg =
            get(error, "response.data.errorMessage", "") ||
            get(error, "response.data", "");
          // if (errMsg?.includes('Your session is expired')) {
          //   toast.error( {
          //     autoClose: false,
          //   })
          // }
        }
      });
  },
};
export default NetworkApi;
