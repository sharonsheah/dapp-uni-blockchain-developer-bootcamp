import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import App from "./components/App";
import configureStore from "./store/configureStore";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={configureStore()}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
