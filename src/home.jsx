import { Routes, Route } from 'react-router-dom';
import Eventlist from './eventlist';
import Eventdetail from './eventdetail';
import Eventmaker from './eventmaker';
import EventMembersList from './eventmemberslist';
import { Header } from './header';
import { ServiceTerms } from './serviceTerms';
import { Withdrawal } from './withdrawal';
import { Guide } from './guide';

export default function Home(){
    return(
        <>
            <Header/>
            <main>
                <Routes>
                    <Route path="/" element={<Eventlist/>}/>
                    <Route path='/eventmaker' element={<Eventmaker />} />
                    <Route path="/eventdetail/:eventNumber" element={<Eventdetail />}/>
                    <Route path="/eventmemberslist/:eventNumber" element={<EventMembersList/>}/>
                    <Route path="/serviceTerms" element={<ServiceTerms agree={false}/>}/>
                    <Route path='/guide' element={<Guide/>}/>
                    <Route path='/withdrawal' element={<Withdrawal/>}/>
                </Routes>
            </main>
        </>
    );
}
