import { useState } from "react";
import reactLogo from "../../assets/react.svg";
import styles from "./index.module.less";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();
  return (
    <div className={styles.root}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className={styles.logo} alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className={styles.logo} alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Space>
        <Button
          type={"primary"}
          onClick={() => navigate("/login", { replace: false })}
        >
          登录
        </Button>
        <Button
          type={"primary"}
          onClick={() => navigate("/private", { replace: false })}
        >
          go to private page
        </Button>
      </Space>
    </div>
  );
}

export { Index };
