import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './Layout'
import { PAGES, createRoutes } from './routes/routes'

export default function App() {
  
  return (
    <BrowserRouter>
      <MantineProvider>
        <Routes>
          <Route element={<Layout />}>
            {createRoutes(PAGES)}
          </Route>
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  )
}
