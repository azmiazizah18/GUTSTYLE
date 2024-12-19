import { Fragment } from "react"
import { Helmet } from "react-helmet"
import Header from "../components/Header"
import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"

const MainLayout = () => {
    return (
        <Fragment>
            <Helmet>
                <title>GUTSYLE</title>
                <meta name="description" content="Welcome to GUTSYLE, your one-stop shop for the latest fashion trends." />
            </Helmet>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </Fragment>
    )
}

export default MainLayout