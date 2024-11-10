import { ReactNode } from "react"
import { Route } from "react-router-dom"
import { EventDetailPage } from "../features/EventDetailPage"
import { EventEditPage } from "../features/EventEditPage"
import { EventListPage } from "../features/EventListPage"
import { EventMakingPage } from "../features/EventMakingPage"
import { EventParticipantsListPage }
  from "../features/EventParticipantsListPage"
import { ServiceTermsPage } from "../features/ServiceTermsPage"
import { LoginPage } from "../features/LoginPage"
import { RegisterAccountPage } from "../features/RegisterAccountPage"

const PAGES = [
  {
    path: "/",
    element: <EventListPage />,
  },
  {
    path: "/eventMaking",
    element: <EventMakingPage />,
  },
  {
    path: "/eventDetail/:eventNumber",
    element: <EventDetailPage />,
  },
  {
    path: "/eventEdit/:eventNumber",
    element: <EventEditPage />,
  },
  {
    path: "/eventParticipantsList/:eventNumber",
    element: <EventParticipantsListPage />,
  },
  {
    path: "/serviceTerms",
    element: <ServiceTermsPage isAgreementNecessary={false} />,
  },
  {
    path: "/signUp",
    element: <ServiceTermsPage isAgreementNecessary={true} />,
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterAccountPage />
  },
]

const createRoutes = (
  pages: readonly {
    readonly path: string
    readonly element: ReactNode
  }[]
) => {
  return pages.map((page, i) => (
    <Route key={i} path={page.path} element={page.element} />
  ))
}

export { PAGES, createRoutes }
