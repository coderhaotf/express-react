export const ResponseGenerator = {
  success: (response: { data?: any; message?: string; [key: string]: any }) => {
    return { success: true, message: "请求成功!", ...response };
  },
  fail: (response: { data?: any; message?: string; [key: string]: any }) => {
    return { success: false, message: "请求失败!", ...response };
  },
};
