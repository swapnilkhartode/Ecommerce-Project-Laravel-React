import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

// Layout Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Context
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
     <BrowserRouter>
    <AuthProvider>
     
        {/* Header - visible on all pages */}
        <Header />

        {/* Main content area where all routes render */}
        <main className="flex-grow-1">
          <AppRoutes />
        </main>

        {/* Footer - visible on all pages */}
        <Footer />
      
    </AuthProvider>
    </BrowserRouter>
  );
}
