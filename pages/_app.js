import React from "react";
import App, { Container as NextContainer } from "next/app";
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    if (ctx.req && ctx.req.session.passport) {
      pageProps.user = ctx.req.session.passport.user;
    }
    pageProps.loading = false;
    return { pageProps };
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.pageProps.user,
      loading: false
    };
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    const props = {
      ...pageProps,
      user: this.state.user,
      loading: false
    };

    return (
      <NextContainer>
        <Provider store={reduxStore}>
          <Component {...props} />
        </Provider>
      </NextContainer>
    );
  }
}

export default withReduxStore(MyApp);