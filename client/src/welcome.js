// import Greetee from "./greetee";
// import Counter from "./counter";
// import Registration from "./registration";

import Registration from "./registration";
import Header from "./header";
import Footer from "./footer";

export default function Welcome() {
    const name = "Julius";
    return (
        <div className="adobo">
            <Header />
            <Registration />
            <Footer />
        </div>
    );
}
