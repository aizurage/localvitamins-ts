import "@mantine/core/styles.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MantineProvider } from "@mantine/core"
import { Provider } from "react-redux"
import store from "./app/store"
import { Layout } from "./components/Layout"
import { PAGES, createRoutes } from "./routes"

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
  )
}
