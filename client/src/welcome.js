import { Link } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";

import Registration from "./registration";
import Login from "./login";

import Header from "./header";
import Footer from "./footer";
import Recorder from "./recorder";

export default function Welcome() {
    return (
        <div className="body">
            <div className="body_content">
                <div className="inside_content">
                    <div className="welcome_left">
                        <h5>Hello Left</h5>
                    </div>
                    <div className="welcome_right">
                        <h5>Hello Right</h5>
                    </div>

                    <Recorder />
                </div>
            </div>
            <Footer />
        </div>
    );
}
