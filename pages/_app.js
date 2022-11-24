import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { PageHead, Layout, OnboardingHeader, BottomNavigation } from "../components";
// import { NextIntlProvider } from "next-intl";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { useRouter } from "next/router";

let persistor = persistStore(store);

// TODO: Error messages
// TODO: Loaders
function App({ 
  Component,
  pageProps: { session, ...pageProps }}) 
{
  const router = useRouter();

  return (
    // <NextIntlProvider messages={pageProps.messages}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SessionProvider session={session}>
            <PageHead />
            <Layout padding={router.pathname !== "/dashboard"}>
              {router.pathname.startsWith("/onboarding") && <OnboardingHeader />}
              <Component {...pageProps} />
            </Layout>
            {router.pathname.startsWith("/dashboard") && <BottomNavigation activeTab={router.pathname.split("/").pop()} />}
          </SessionProvider>
        </PersistGate>
      </Provider>
    // </NextIntlProvider>
  );
}

export default App;