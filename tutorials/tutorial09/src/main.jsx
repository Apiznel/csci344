import React from "react";
import "antd/dist/reset.css";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

function main() {
	const rootEl = document.getElementById("app");
	const root = createRoot(rootEl);
	root.render(<App />);
}

main();
