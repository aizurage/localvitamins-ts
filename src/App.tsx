import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PAGES, createRoutes } from "./routes/routes";
import { Layout } from "./components/Layout";
import { Provider } from "react-redux";
import store from "./app/store"

export default function App() {
  return (
    <BrowserRouter>
      <MantineProvider>
        <Provider store={store}>
          <Routes>
            <Route element={<Layout />}>{createRoutes(PAGES)}</Route>
          </Routes>
        </Provider>
      </MantineProvider>
    </BrowserRouter>
  );
}
