import React from "react";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Private Page! only Authorized people can see it</h2>
      <Space>
        <Button type={"link"} onClick={() => navigate("/")}>
          Back
        </Button>
      </Space>
    </div>
  );
};
