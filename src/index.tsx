import ReactDOM from 'react-dom';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

import Register from './routes/register';
import Login from './routes/login';
import Eventlist from './routes/eventlist';
import Eventdetail from './routes/eventdetail';
import Eventmaker from './routes/eventmaker';
import { EventMembersList } from './routes/eventmemberslist';


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
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="eventlist" element={<Eventlist />} />
          <Route path="eventmaker" element={<Eventmaker />} />
          <Route path="eventdetail/:eventNumber" element={<Eventdetail />}/>
          <Route path="eventmemberslist/:eventNumber" element={ <EventMembersList/>}/>
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
