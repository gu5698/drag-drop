import React, { useState, useEffect, useCallback } from "react";
import { Layout, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import MenuComponent from "./components/Menu";
import ContentComponent from "./components/Content";
import "./App.css";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const [selectedBoxId, setSelectedBoxId] = useState(null);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleBackToMenu = useCallback((e) => {
    // 檢查點擊是否發生在 Sider 內或者是 BoxComponent
    if (
      !e.target.closest(".ant-layout-sider") &&
      !e.target.closest(".box-component")
    ) {
      setSelectedBoxId(null);
    }
  }, []);

  const handleBoxClick = useCallback((boxId) => {
    setSelectedBoxId((prevId) => (prevId === boxId ? null : boxId));
  }, []);

  useEffect(() => {
    // 在整個 document 上添加點擊事件監聽器
    document.addEventListener("click", handleBackToMenu);

    // 清理函數
    return () => {
      document.removeEventListener("click", handleBackToMenu);
    };
  }, [handleBackToMenu]);

  return (
    <Layout hasSider>
      <Sider width={400} style={{ padding: "8px" }}>
        <div className="demo-logo-vertical" />
        <MenuComponent
          boxes={boxes}
          setBoxes={setBoxes}
          selectedBoxId={selectedBoxId}
          setSelectedBoxId={setSelectedBoxId}
        />
      </Sider>
      <Layout
        className="context-area"
        style={{ marginLeft: collapsed ? 80 : 400, position: "relative" }}
      >
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <ContentComponent
          boxes={boxes}
          setBoxes={setBoxes}
          selectedBoxId={selectedBoxId}
          setSelectedBoxId={setSelectedBoxId}
          onBoxClick={handleBoxClick}
        />
        <Footer />
      </Layout>
    </Layout>
  );
};

export default App;
