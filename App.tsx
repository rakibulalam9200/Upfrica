import { STRIPE_PUBLISH_KEY } from "@env";
import { StripeProvider } from "@stripe/stripe-react-native";
import React from "react";
import { Provider } from "react-redux";
import Routes from "./app/Navigations/Route";
import { store } from "./Store/store";


function App() {
  return (
    <>
      <StripeProvider publishableKey={STRIPE_PUBLISH_KEY}>
        <Provider store={store}>
          <Routes />
        </Provider>
      </StripeProvider>
     
    </>
  );
}

export default App;
