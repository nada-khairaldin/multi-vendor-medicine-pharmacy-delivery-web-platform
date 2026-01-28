import axios, { AxiosRequestConfig } from "axios";
import { AxiosError } from "axios";
import type { ApiError } from "../types/apiError";

const api = axios.create({
  baseURL: "https://some-domain.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError<ApiError>) => {
    if (!error.response) {
      error.message = "Network error";
      return Promise.reject({ message: error.message });
    }

    const status = error.response.status;

    if (status === 401) {
      // logout + redirect
    }

    if (status >= 500) {
      error.message = "Server error";
    }

    return Promise.reject({
      message: error.response.data?.message || "Something went wrong",
      statusCode: status,
      errors: error.response.data?.errors,
    });
  },
);

export const getRequest = async <T>(
  url: string,
  config?: {
    params?: AxiosRequestConfig["params"];
    signal?: AbortSignal;
  },
): Promise<T> => {
  const res = await api.get<T>(url, config);
  return res.data;
};

export const postRequest = async <T, B>(url: string, body: B): Promise<T> => {
  const res = await api.post<T>(url, body);
  return res.data;
};

export const putRequest = async <T, B>(url: string, body: B): Promise<T> => {
  const res = await api.put<T>(url, body);
  return res.data;
};

export const patchRequest = async <T, B>(url: string, body: B): Promise<T> => {
  const res = await api.patch<T>(url, body);
  return res.data;
};

export const deleteRequest = async <T>(url: string): Promise<T> => {
  const response = await api.delete<T>(url);
  return response.data;
};
