import { Login } from "../../components/login"
import { Navbar } from "../../components/navbar"
import './authlogin.css'

export const AuthLogin = () => {
    return (
        <div>
            <Navbar />
            <main className="login-page">
                <Login />
            </main>
        </div>
    )
}