import React, { useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { RankingContext } from "./Context";

import { Home, Ranking } from "@pages";
import { Header, Footer } from "@components";
import { Layout } from "antd";

const { Content } = Layout;
function App() {
  const [ranking, setRanking] = useState({});
  return (
    <RankingContext.Provider value={{ ranking, setRanking }}>
      <BrowserRouter>
        <Header />

        <Content style={{ padding: "50px", minHeight: "calc(100vh - 184px)" }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/rankings" component={Ranking} />
          </Switch>
        </Content>
        <Footer />
      </BrowserRouter>
    </RankingContext.Provider>
  );
}

export default App;
