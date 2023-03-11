import React, { useState } from "react";
import { Layout, Menu, MenuProps } from "antd";
import "./App.css";
import { Link } from "react-router-dom";
import Router from "./router";
const { Header, Content, Footer, Sider } = Layout;

export default () => (
  <Layout hasSider>
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
      theme="light"
    >
      <h1 className="logo">openFe-Test</h1>
      <Menu theme="light" mode="inline" defaultSelectedKeys={["4"]}>
        <Menu.Item key="TimeButton">
          <Link to="/TimeButton">时间按钮</Link>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout className="site-layout" style={{ marginLeft: 200 }}>
      <Header className="site-layout-background" style={{ padding: 0 }} />
      <Content
        style={{
          margin: "24px 16px 0",
          minHeight: `calc(100vh - 64px - 24px * 2)`,
          background: "#fff",
        }}
      >
        <Router></Router>
      </Content>
    </Layout>
  </Layout>
);
