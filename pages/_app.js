import React from "react";
import App, { Container as NextContainer } from "next/app";
import Head from "next/head";

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
    const { Component, pageProps } = this.props;

    const props = {
      ...pageProps,
      user: this.state.user,
      loading: false
    };

    return (
      <NextContainer>
        <Component {...props} />
      </NextContainer>
    );
  }
}

export default MyApp;