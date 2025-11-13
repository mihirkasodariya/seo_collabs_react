import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { REJECT_ROUTES, REQUIRED_ROUTES, ROUTES } from "./routes";
import { Toaster } from "react-hot-toast";
import RejectAuth from "./routes/RejectAuth";
import RequireAuth from "./routes/RequireAuth";
import AppLayout from "./components/layout/AppLayout";
import { SidebarProvider } from "./components/ui/sidebar";

function AppContent() {
  return (
    <SidebarProvider>
      <Routes>
        {/* Public routes */}
        {REJECT_ROUTES.map(({ path, component }, i) => (
          <Route key={i} path={path} element={component} />
        ))}

        {/* Protected + With Sidebar Layout */}
        <Route element={<RequireAuth />}>
          <Route element={<AppLayout />}>
            {ROUTES.map(({ path, component }, i) => (
              <Route key={i} path={path} element={component} />
            ))}
            {REQUIRED_ROUTES.map(({ path, component }, i) => (
              <Route key={i} path={path} element={component} />
            ))}
          </Route>
        </Route>
      </Routes>
    </SidebarProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
