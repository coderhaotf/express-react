import React, { useState, useContext, useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Space } from "antd";
import styles from "./index.module.less";
import { loginApi } from "../../services";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../Auth";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const auth = useContext(authContext);

  const onFinish = (values: { username: string; password: string }) => {
    setloading(true);
    loginApi(values)
      .then((data) => {
        if (data.success) {
          localStorage.setItem("auth_token", data.data.auth.token);
          message.success(data.message || "登录成功!", 2, () => {
            if (auth.signin) {
              auth.signin({ username: data.data.user.name }, () =>
                navigate("/", { replace: true })
              );
            } else {
              navigate("/", { replace: true });
            }
          });
        } else {
          message.warning(data.message || "登录异常!");
        }
      })
      .catch((error) => {
        if (error instanceof Error) {
          message.error(error.message);
        } else {
          message.error(new String(error || "登录报错!").toString());
        }
      })
      .finally(() => {
        setloading(false);
      });
  };

  return (
    <div className={styles.login}>
      <Form name="normal_login" className={styles.form} onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Login
          </Button>
        </Form.Item>
        <div>
          <Space>
            <Button type={"link"} onClick={() => navigate("/")}>
              Back
            </Button>
            <Button type={"link"} onClick={() => navigate("/register")}>
              Register
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export { Login };
