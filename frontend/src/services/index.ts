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
  request<string>({
    url: "/auth/register",
    method: "POST",
    data: params,
  });
