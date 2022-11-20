import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { PageHead } from "../components";
import { Layout } from "../components";
// import { NextIntlProvider } from "next-intl";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

// TODO: Error messages
// TODO: Loaders
function App({ 
  Component,
  pageProps: { session, ...pageProps }}) 
{
  return (
    // TODO: Layout depending on path
    // if (router.pathname.startsWith('/account/')) {
    // <NextIntlProvider messages={pageProps.messages}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SessionProvider session={session}>
            <PageHead />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </PersistGate>
      </Provider>
    // </NextIntlProvider>
  );
}

export default App;