// import Greetee from "./greetee";
// import Counter from "./counter";
// import Registration from "./registration";
import { HashRouter, Route } from "react-router-dom";

import Registration from "./registration";
import Login from "./login";

import Header from "./header";
import Footer from "./footer";

export default function Welcome() {
    return (
        <>
            <Header />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
            <Footer />
        </>
    );
}
