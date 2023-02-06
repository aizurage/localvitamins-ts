import { Routes, Route } from 'react-router-dom'
import Eventlist from './eventlist'
import Eventdetail from './eventdetail'
import Eventmaker from './eventmaker'
import EventMembersList from './eventmemberslist'
import Eventedit from './eventedit'
import { Header } from './header'
import { ServiceTerms } from './serviceTerms'

export default function Home(){
    return(
        <>
            <Header/>
            <main>
                <Routes>
                    <Route path='/' element={<Eventlist/>}/>
                    <Route path='/eventmaker' element={<Eventmaker />} />
                    <Route path='/eventdetail/:eventNumber' element={<Eventdetail />}/>
                    <Route path='/eventedit/:eventNumber' element={<Eventedit/>}/>
                    <Route path='/eventmemberslist/:eventNumber' element={<EventMembersList/>}/>
                    <Route path='/serviceTerms' element={<ServiceTerms agree={false}/>}/>
                </Routes>
            </main>
        </>
    )
}
