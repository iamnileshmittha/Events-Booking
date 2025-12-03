import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import DestinationDetail from "./pages/DestinationDetail";
import BookingForm from "./pages/BookingForm";
import PaymentPage from "./pages/PaymentPage";
import InvoicePage from "./pages/InvoicePage";
import AskQuestionPage from "./pages/AskQuestionPage";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AboutUs from "./pages/AboutUs";
import EventsPage from "./pages/Events";
import EventDetail from "./pages/EventDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Admin Login */}
        <Route path="/administrator" element={<AdminLogin />} />
        
        {/* Protected Admin Routes */}
        <Route 
          path="/administrator/dashboard" 
          element={
            <ProtectedAdminRoute>
              <Dashboard />
            </ProtectedAdminRoute>
          } 
        />
        <Route 
          path="/administrator/events" 
          element={
            <ProtectedAdminRoute>
              <AdminPage />
            </ProtectedAdminRoute>
          } 
        />
        <Route 
          path="/administrator/users" 
          element={
            <ProtectedAdminRoute>
              <UserManagement />
            </ProtectedAdminRoute>
          } 
        />
        <Route 
          path="/administrator/orders" 
          element={
            <ProtectedAdminRoute>
              <AdminPage />
            </ProtectedAdminRoute>
          } 
        />
        <Route 
          path="/administrator/reports" 
          element={
            <ProtectedAdminRoute>
              <AdminPage />
            </ProtectedAdminRoute>
          } 
        />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/events" element={<EventsPage/>} />
        <Route path="/consent" element={<AskQuestionPage />} />
        <Route path="/destination/:id" element={<DestinationDetail />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/ask-question" element={<AskQuestionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
