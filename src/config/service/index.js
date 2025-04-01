import axios from "axios";
import ApiConfig from "../APICongig";

export const apiRouterCall = async ({
  method,
  url,
  bodyData,
  paramsData,
  token,
}) => {
  try {
    return await axios({
      method: method,
      url: url,
      headers: {
        token: token ? token : window.sessionStorage.getItem("token"),
      },
      data: bodyData ? bodyData : null,
      params: paramsData ? paramsData : null,
    });
  } catch (error) {
    console.log(error?.response?.data);
    return error?.response;
  }
};

export const dataPostHandler = async (endPoint, dataToSend) => {
  try {
    const res = await axios({
      method: "POST",
      url: ApiConfig[endPoint],
      headers: {
        token: window.sessionStorage.getItem("token"),
      },
      data: dataToSend,
    });
    if (res) {
      return res;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
};

export const getParticularObjectDataHanndler = async (endPoint, _id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${ApiConfig[endPoint]}`,
      headers: {
        token: window.sessionStorage.getItem("token"),
      },
      params: _id,
    });
    if (res) {
      return res;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
};
export const putAPIHandler = async ({ endPoint, dataToSend, paramsData }) => {
  try {
    return await axios({
      method: "PUT",
      url: ApiConfig[endPoint],
      headers: {
        token: window.sessionStorage.getItem("token"),
      },
      data: dataToSend ? dataToSend : null,
      params: paramsData ? paramsData : null,
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const postAPIHandler = async ({ endPoint, dataToSend, paramsData }) => {
  try {
    return await axios({
      method: "POST",
      url: ApiConfig[endPoint],
      headers: {
        token: window.sessionStorage.getItem("token"),
      },
      data: dataToSend ? dataToSend : null,
      params: paramsData ? paramsData : null,
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const putAPIHandlerCall = async ({
  endPoint,
  dataToSend,
  paramsData,
}) => {
  try {
    return await axios({
      method: "PUT",
      url: ApiConfig[endPoint],
      headers: {
        token: window.sessionStorage.getItem("token"),
      },
      data: dataToSend ? dataToSend : null,
      params: paramsData ? paramsData : null,
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const getAPIHandler = async ({ endPoint, id, source, paramsData }) => {
  try {
    return await axios({
      method: "GET",
      url: id ? `${ApiConfig[endPoint]}/${id}` : ApiConfig[endPoint],
      params: paramsData ? paramsData : null,
      headers: {
        token: window.sessionStorage.getItem("token"),
      },
      cancelToken: source ? source.token : null,
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const patchAPIHandler = async ({ endPoint, dataToSend, paramsData }) => {
  try {
    return await axios({
      method: "PATCH",
      url: ApiConfig[endPoint],
      headers: {
        token: window.sessionStorage.getItem("token"),
      },
      data: dataToSend ? dataToSend : null,
      params: paramsData ? paramsData : null,
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const deleteAPIHandler = async ({
  endPoint,
  dataToSend,
  paramsData,
}) => {
  try {
    return await axios({
      method: "DELETE",
      url: ApiConfig[endPoint],
      headers: {
        token: window.sessionStorage.getItem("token"),
      },
      data: dataToSend ? dataToSend : null,
      params: paramsData ? paramsData : null,
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
