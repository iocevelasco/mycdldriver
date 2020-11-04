import React from "react";
import App, { Container as NextContainer } from "next/app";
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux';


class MyApp extends App {
  render() {
    const { Component, reduxStore } = this.props;

    return (
      <NextContainer>
        <Provider store={reduxStore}>
          <Component />
        </Provider>
      </NextContainer>
    );
  }
}

export default withReduxStore(MyApp);