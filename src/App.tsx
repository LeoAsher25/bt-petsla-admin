import { BrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import MainRouters from "./components/navigation/MainRouters";

function App() {
  return (
    <BrowserRouter>
      <MainRouters />
    </BrowserRouter>
  );
}

export default App;
