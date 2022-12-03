import { request } from "./setup";

/**
 * 登录
 * @param params
 * @returns
 */
export const loginApi = (params: { username: string; password: string }) =>
  request<{ user: Record<string, any>; auth: { token: string } }>({
    url: "/auth/login",
    method: "POST",
    data: params,
  });

/**
 * 注册
 * @param params
 * @returns
 */
export const registerApi = (params: { username: string; password: string }) =>
  request<{ user: Record<string, any> }>({
    url: "/auth/register",
    method: "POST",
    data: params,
  });

/**
 * 获取用户信息
 * @param params
 * @returns
 */
export const userApi = (username?: string) =>
  request<{ user: Record<string, any> }>({
    url: "/user/detail",
    method: "GET",
    params: {
      username,
    },
  });
