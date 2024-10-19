import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { Layout, theme } from "antd";
const { Header, Sider } = Layout;
import MenuComponent from "./components/Menu";
import ContentComponent from "./components/Content";
import "./App.css";

const App = () => {
  const [boxes, setBoxes] = useState([]);
  const [selectedBoxId, setSelectedBoxId] = useState(null);
  const siderRef = useRef(null);
  const memoizedBoxes = useMemo(() => boxes, [boxes]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleBackToMenu = useCallback(
    (e) => {
      if (selectedBoxId !== null && !siderRef.current?.contains(e.target)) {
        setSelectedBoxId(null);
      }
    },
    [selectedBoxId]
  );

  const handleBoxClick = (boxId) => {
    setSelectedBoxId((prevId) => (prevId === boxId ? null : boxId));
  };

  useEffect(() => {
    // 在整個 document 上添加點擊事件監聽器
    document.addEventListener("mousedown", handleBackToMenu);

    // 清理函數
    return () => {
      document.removeEventListener("mousedown", handleBackToMenu);
    };
  }, [handleBackToMenu]);

  return (
    <Layout hasSider>
      <Sider ref={siderRef} width={400} style={{ padding: "8px" }}>
        <div className="demo-logo-vertical" />
        <MenuComponent
          boxes={memoizedBoxes}
          setBoxes={setBoxes}
          selectedBoxId={selectedBoxId}
          setSelectedBoxId={setSelectedBoxId}
        />
      </Sider>
      <Layout
        className="context-area"
        style={{ marginLeft: 400, position: "relative" }}
      >
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <ContentComponent
          boxes={memoizedBoxes}
          setBoxes={setBoxes}
          selectedBoxId={selectedBoxId}
          setSelectedBoxId={setSelectedBoxId}
          onBoxClick={handleBoxClick}
        />
      </Layout>
    </Layout>
  );
};

export default App;
