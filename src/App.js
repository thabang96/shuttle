import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import AdminPage from "./components/pages/AdminPage";
import DriverPage from "./components/pages/DriverPage";
import PassengerPage from "./components/pages/PassengerPaages";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import DriverDashboard from "./components/Driver/DriverDashboard";
import QRCodeGenerator from "./components/passenger/QRCodeGenerator";
import RouterForm from "./components/Admin/RoutesForm";
import StopForm from "./components/Admin/StopForm";
import AdminPanel from "./components/Admin/AdminPanel"
import RoutesForm from "./components/Admin/RoutesForm";
import ViewReports from "./components/Admin/ViewReports";
import ViewLogs from "./components/Admin/ViewLogs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/driver" element={<DriverPage />} />
        <Route path="/passenger" element={<PassengerPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/driver-dashboard" element={<DriverDashboard />} />
        <Route path="/qrcode-generator" element={<QRCodeGenerator />} />
        <Route path="/router-form" element={<RouterForm />} />
        <Route path="/Admin-Panel" element={<AdminPanel />} />
        <Route path="/admin/routes" element={<RoutesForm />} />
        <Route path="/admin/stops" element={<StopForm />} />
        <Route path="/admin/reports" element={<ViewReports />} />
        <Route path="/admin/logs" element={<ViewLogs />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
