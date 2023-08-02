import ReactDOM from 'react-dom' 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'

import Eventlist from './eventlist'
import Eventdetail from './eventdetail'
import Eventmaker from './eventmaker'
import EventMembersList from './eventmemberslist'
import Eventedit from './eventedit'

import Register from './register'
import Login from './login'
import { ServiceTerms } from './serviceTerms'
import EmailResetPassword from './email_resetpw'
import ResetPassword from './resetpassword'
import { Header } from './header'


ReactDOM.render(
    <MantineProvider
      theme={{
        // Override any other properties from default theme
        fontFamily: 'Open Sans, sans serif',
        spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
        colorScheme: 'light',
      }}
    >
      <BrowserRouter>
        <Header/>
        <main>
          <Routes>
            <Route path="/" element={<Eventlist />} />
            <Route path='/eventmaker' element={<Eventmaker />} />
            <Route path='/eventdetail/:eventNumber' element={<Eventdetail />}/>
            <Route path='/eventedit/:eventNumber' element={<Eventedit/>}/>
            <Route path='/eventmemberslist/:eventNumber' element={<EventMembersList/>}/>
            <Route path='/serviceTerms' element={<ServiceTerms agree={false}/>}/>

            <Route path="/login" element={<Login />} />
            <Route path="/email_resetpw" element={<EmailResetPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/serviceTerms_agree" element={ <ServiceTerms agree={true}/>}/>

            <Route
              path="*"
              element={
                <main style={{padding: "1rem"}}>
                  <p>ページが見つかりません。</p>
                </main>
              }
            />
          </Routes>
          </main>
        </BrowserRouter>
    </MantineProvider>,
    document.getElementById('root')
)