import React, { useState, useEffect } from "react";
import { Layout, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import MenuComponent from "./components/Menu";
import ContentComponent from "./components/Content";
import "./App.css";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [width, setWidth] = useState("300px");
  const [height, setHeight] = useState("300px");
  const [url, setUrl] = useState("https://picsum.photos/id/1/300/300");
  const [boxes, setBoxes] = useState([]);
  const [tool, setTool] = useState(false);
  const [item, setItem] = useState(false);
  const [text, setText] = useState("Hello from Meepshop!");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider>
        <div className="demo-logo-vertical" />
        <MenuComponent
          text={text}
          setText={setText}
          width={width}
          setWidth={setWidth}
          height={height}
          setHeight={setHeight}
          url={url}
          setUrl={setUrl}
          boxes={boxes}
          setBoxes={setBoxes}
          tool={tool}
          setTool={setTool}
          item={item}
          setItem={setItem}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <ContentComponent
          width={width}
          setWidth={setWidth}
          height={height}
          setHeight={setHeight}
          url={url}
          setUrl={setUrl}
          boxes={boxes}
          setBoxes={setBoxes}
          tool={tool}
          setTool={setTool}
          item={item}
          setItem={setItem}
        />
        <Footer />
      </Layout>
    </Layout>
  );
};

export default App;
