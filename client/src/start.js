import ReactDOM from "react-dom";

import Welcome from "./welcome";

// let elem;
// if (location.pathname === "/welcome") {
//     elem = <Welcome />;
// } else {
//     elem = <p>not allowed</p>;
// }

ReactDOM.render(<Welcome />, document.querySelector("main"));
