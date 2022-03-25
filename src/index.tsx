import "./wdyr";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from "./features/Auth/authReducer";
import { DefaultOptions, QueryClient, QueryClientProvider } from "react-query";
import { createStandaloneToast } from "@chakra-ui/react";
import { getApiError } from "./apis/api";

const reducers = combineReducers({
  auth: authReducer,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const errorHandling = (error: any) => {
  const toast = createStandaloneToast();
  const errorMessage = getApiError(error);

  if (!toast.isActive(errorMessage)) {
    toast({
      id: errorMessage,
      title: "An error occurred.",
      description: errorMessage,
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  }
};

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    onError: errorHandling,
  },
  mutations: {
    onError: errorHandling,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
