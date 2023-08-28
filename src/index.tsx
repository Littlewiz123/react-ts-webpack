import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import "devextreme/dist/css/dx.light.compact.css";

const root = createRoot(document.getElementById("root"));

root.render(<App num={1234} />);
