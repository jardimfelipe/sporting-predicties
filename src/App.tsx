import React, { useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { AppContext } from "./Context";

import { Home, Ranking, Predictions } from "@pages";
import { Header, Footer, Container } from "@components";
import { Layout } from "antd";

const { Content } = Layout;
function App() {
  const [ranking, setRanking] = useState({});
  const [predictions, setPredictions] = useState({});
  const [lastUpdate, setLastUpdate] = useState({});
  return (
    <AppContext.Provider
      value={{
        ranking,
        predictions,
        lastUpdate,
        setRanking,
        setPredictions,
        setLastUpdate,
      }}
    >
      <BrowserRouter>
        <Header />
        <Content style={{ padding: "50px", minHeight: "calc(100vh - 184px)" }}>
          <Switch>
            <Container>
              <Route exact path="/" component={Home} />
              <Route exact path="/predictions" component={Predictions} />
              <Route exact path="/rankings" component={Ranking} />
            </Container>
          </Switch>
        </Content>
        <Footer />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
