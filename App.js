// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { mainRoutes } from "./src/route";
import { parseRoutes } from "./src/parseRoute";

import { Provider } from "react-redux";
import store from "./src/store";

function App() {
	return (
		<NavigationContainer>
			<Provider store={store}>{parseRoutes(mainRoutes)}</Provider>
		</NavigationContainer>
	);
}

export default App;
