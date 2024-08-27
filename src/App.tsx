import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './Layout'
import Eventlist from './eventlist'

export default function App() {
  
  return (
    <BrowserRouter>
      <MantineProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Eventlist/>}/>
            <Route path='/eventmaker' element={<Eventmaker />} />
            <Route path='/eventdetail/:eventNumber' element={<Eventdetail />}/>
            <Route path='/eventedit/:eventNumber' element={<Eventedit/>}/>
            <Route path='/eventmemberslist/:eventNumber' element={<EventMembersList/>}/>
            <Route path='/serviceTerms' element={<ServiceTerms agree={false}/>}/>
          </Route>
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  )
}
