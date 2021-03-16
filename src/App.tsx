import React, { useState } from "react"
import { Switch, Route, BrowserRouter } from "react-router-dom"
import styled from "styled-components"

import { AppContext } from "./Context"

import { Home, Ranking, Predictions, About, NotFound } from "@pages"
import { Header, Footer, Container } from "@components"
import { Layout } from "antd"

const { Content: AntdContent } = Layout
function App() {
  const [ranking, setRanking] = useState({})
  const [predictions, setPredictions] = useState({})
  const [lastUpdate, setLastUpdate] = useState({})
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
        <Content>
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/predictions" component={Predictions} />
              <Route exact path="/rankings" component={Ranking} />
              <Route exact path="/about" component={About} />
              <Route path="" component={NotFound} />
            </Switch>
          </Container>
        </Content>
        <Footer />
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App

const Content = styled(AntdContent)`
  padding: 50px;
  min-height: calc(100vh - 184px);
  @media screen and (max-width: 767px) {
    padding: 10px;
  }
`
