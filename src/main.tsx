import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@arco-design/web-react/dist/css/arco.css";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/page.css";
import { App } from "./App";
import { AppProviders } from "./app/providers";

const container = document.getElementById("root");
if (!container) throw new Error("未找到 #root 挂载节点");

createRoot(container).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
);
