// import Greetee from "./greetee";
// import Counter from "./counter";
// import Registration from "./registration";
import { HashRouter, Route } from "react-router-dom";

import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./reset_password";

import Header from "./header";
import Footer from "./footer";

export default function Welcome() {
    return (
        <>
            <div className="body">
                <Header />
                <div className="body_container">
                    <HashRouter>
                        <div>
                            <Route exact path="/" component={Registration} />
                            <Route path="/login" component={Login} />
                            <Route
                                path="/password-reset"
                                component={ResetPassword}
                            />
                        </div>
                    </HashRouter>
                </div>
                <Footer />
            </div>
        </>
    );
}
