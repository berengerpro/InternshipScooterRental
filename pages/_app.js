import App, { Container } from 'next/app'
import { APP_CONFIG } from '@app/constants'
import { AppRedux } from '@app/redux/reducers'
import { config } from '@fortawesome/fontawesome-svg-core'
import createStore from '@app/redux/createStore'
import css from 'styled-jsx/css'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import React from 'react'
import styles from './appStyle'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

// import fontawesome css manually
import '@fortawesome/fontawesome/styles.css'

// import bootstrap css
import 'bootstrap/dist/css/bootstrap.css'

// import react-table css
import 'react-table/react-table.css'

config.autoAddCss = false

const html = css.global`
html {
  height: 100%;
}
body {
  height: 100%;
}
#__next {
  height: 100%;
}`

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx })
    }

    return { pageProps }
  }

  componentDidMount () {
    this.props.store.dispatch(AppRedux.Creators.initializeApp())
  }

  render () {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <PersistGate loading={null} persistor={store.__persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
        <style global jsx>{styles}</style>
        <style global jsx>{html}</style>
        <script src={APP_CONFIG.MAPS_URL} />
      </Container>
    )
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp))
