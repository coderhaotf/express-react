import { request } from "./setup";

/**
 * 登录
 * @param params
 * @returns
 */
export const loginApi = (params: { username: string; password: string }) =>
  request<string>({
    url: "/user/login",
    method: "POST",
    data: params,
  });
