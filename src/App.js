import Login from "./components/Login/Login";
import Settings from "./components/Settings/Settings";
import { Route, Routes } from "react-router-dom";

function App() {
	return <div>
		<Routes>
			<Route path = "/login" element = {<Login/>}/> 	
			<Route path = "/settings" element = {<Settings/>}/> 	

			</Routes> 
	</div>;
}

export default App;
