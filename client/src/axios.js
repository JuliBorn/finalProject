import axios from "axios";

var instance = axios.create({
    xsrfCookieName: "geheimestoken",
    xsrfHeaderName: "csrf-token",
});

export default instance;
