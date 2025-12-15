import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store.jsx";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import 'remixicon/fonts/remixicon.css';


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <App />
      <Toaster />
    </StrictMode>
    ,
  </Provider>
);
