import { useState } from "react";

export default function useStatefulFields() {
    console.log("Hook");
    const { values, setValues } = useState({});
}
