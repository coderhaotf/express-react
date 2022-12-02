import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Space } from "antd";
import styles from "./index.module.less";
import { registerApi } from "../../services";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const onFinish = (values: { username: string; password: string }) => {
    setloading(true);
    registerApi(values)
      .then((data) => {
        if (data.success) {
          message.success(data.message || "注册成功!", 1, () => {
            navigate("/", { replace: true });
          });
        } else {
          message.warning(data.message || "注册异常!");
        }
      })
      .catch((error) => {
        if (error instanceof Error) {
          message.error(error.message);
        } else {
          message.error(new String(error || "注册报错!").toString());
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
            Sign Up
          </Button>
        </Form.Item>
        <div>
          <Space>
            <Button type={"link"} onClick={() => navigate("/")}>
              Back
            </Button>
            <Button type={"link"} onClick={() => navigate("/login")}>
              Login
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export { Register };
