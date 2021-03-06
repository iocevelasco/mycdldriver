import React from 'react'
import { initializeStore } from '../store'
import { types } from '../store/reducers/user_reducer';
const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'


function getOrCreateStore(initialState) {

  if (isServer) {
    return initializeStore(initialState)
  }

  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}


export default App => {
  return class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {
      const reduxStore = getOrCreateStore()

      appContext.ctx.reduxStore = reduxStore

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }

      if (appContext.ctx.req && appContext.ctx.req.session.passport) {
        const { user } = appContext.ctx.req.session.passport;
        reduxStore.dispatch({
          type: types.LOGIN_SUCCESS, payload: user
        });
      };

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      };
    };

    constructor(props) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />
    }
  }
}