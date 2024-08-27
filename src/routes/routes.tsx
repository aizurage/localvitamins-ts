import { Route } from "react-router-dom";
import Eventlist from "../eventlist";
import { ReactNode } from "react";

const PAGES = [
    {
        path: "/",
        element: <Eventlist/>,
    },
    {
        path: "/eventMaker",
        element: <Eventmaker />,
    },
    {
        path: "/eventDetail/:eventNumber",
        element: <Eventdetail />,
    },
    {
        path: "/eventEdit/:eventNumber",
        element: <Eventedit/>,
    },
    {
        path: "/eventMembersList/:eventNumber",
        element: <EventMembersList/>,
    },
    {
        path: "/serviceTerms",
        element: <ServiceTerms agree={false}/>,
    },
]

const createRoutes = (
    pages: readonly {
        readonly path: string,
        readonly element: ReactNode
}[]) => {
    return(
        pages.map((page, i) => (
            <Route key={i} path={page.path} element={page.element} />
        ))
    )
}

export {PAGES, createRoutes}