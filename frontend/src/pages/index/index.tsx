import React, { useRef } from "react";
import reactLogo from "../../assets/react.svg";
import styles from "./index.module.less";
import { Button, Space, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { default as CountUp } from "react-countup";
import { useSelector } from "react-redux";
import { RootState, orderSlice } from "../../store";

function Index() {
  const navigate = useNavigate();

  const { detail } = useSelector((state: RootState) => state.order);
  return (
    <React.Fragment>
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
      <div className={styles.counter}>
        <div className={styles.container}>
          <Row justify={"center"} align={"middle"}>
            <Col span={12}>
              <span className={styles.label}>销售量 :</span>
            </Col>
            <Col span={12}>
              <CountUp
                className={styles.num}
                start={detail.preNums}
                end={detail.nums}
              />
            </Col>
          </Row>
          <Row justify={"center"} align={"middle"} style={{ marginTop: 40 }}>
            <Col span={12}>
              <span className={styles.label}>销售额 :</span>
            </Col>
            <Col span={12}>
              <CountUp
                className={styles.num}
                start={detail.preTurnover}
                end={detail.turnover}
              />
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}

export { Index };
