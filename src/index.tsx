import ReactDOM from 'react-dom'; 
import App from './App';
//import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

import Register from './register';
import Login from './login';
import { ServiceTerms } from './serviceTerms';
import Home from './home';
import Email_ResetPassword from './email_resetpw';
import ResetPassword from './resetpassword';


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
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/email_resetpw" element={<Email_ResetPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home/*" element={<Home/>}/>
          <Route path="/serviceTerms" element={ <ServiceTerms agree={true}/>}/>
          <Route
            path="*"
            element={
              <main style={{padding: "1rem"}}>
                <p>ページが見つかりません。</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </MantineProvider>,
    document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
