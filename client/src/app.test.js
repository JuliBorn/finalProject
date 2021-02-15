const testUtils = require("react-dom/test-utils");

console.log("Testing");

import App from "./app";

import axios from "./axios";

import { render, waitFor, fireEvent } from "@testing-library/react";

jest.mock("./axios");

axios.get.mockResolvedValue({
    data: {
        first: "Theodor",
        last: "Test",
        profilePicUrl: "https://www.fillmurray.com/g/100/100",
    },
});

// test("Doing Tests with App", async () => {
//     const test = render(<App />);
//     console.log(test);
// });
