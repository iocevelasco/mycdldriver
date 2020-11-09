import React from "react";
import App, { Container as NextContainer } from "next/app";
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux';


class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = { 
      deviceType : 'desktop'
    }
   }

   componentWillMount() {
    if (typeof window !== "undefined") {
      if(window.innerWidth < 480) this.setState({deviceType:'phone'})
      else this.setState({deviceType:'desktop'})
    }
   }

  render() {
    const { Component, reduxStore } = this.props;
    return (
      <NextContainer>
        <Provider store={reduxStore}>
          <Component {...this.state} />
        </Provider>
      </NextContainer>
    );
  }
}

export default withReduxStore(MyApp);