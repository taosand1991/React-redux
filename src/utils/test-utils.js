import { Provider } from "react-redux";
import theme from "./chakraHelper";
import { configureStore } from "@reduxjs/toolkit";
import { ChakraProvider } from "@chakra-ui/react";
import todoReducer from "../features/todo/todoSlice";
import { render as CustomRender } from "@testing-library/react";

const store = configureStore({ reducer: { todos: todoReducer } });

const ProviderWrapper = ({ children }) => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </Provider>
  );
};

const render = (ui, options) => {
  CustomRender(ui, { wrapper: ProviderWrapper, ...options });
};

export * from "@testing-library/react";
export { render };
