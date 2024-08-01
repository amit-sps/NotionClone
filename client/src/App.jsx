import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider, useAuth } from "./context/auth";
import MarketingPage from "./pages/marketing/MarketingPage";
import MarketingLayout from "./Layout/MarketingLayout";
import Documents from "./pages/main/Documents";
import ProtectedRoutes from "./routes/PrivateRoute";
import { ThemeProvider } from "./context/themeProvider";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";
import PageNotFound from "./components/PageNotFound";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "@/axiosConfig";
import { useEffect } from "react";
import DashboardLayout from "./Layout/DashboardLayout";
import Authenticated from "./HOC/Authenticated";

const AppRoutes = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    //get user if he is login with google and if normal login then this one is not run
    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3851/api/v1/auth/login/success"
        );
        if (res && res.data.success) {
          toast.success(res.data && res.data.message);
          setAuth({
            ...auth,
            user: res.data.user,
          });
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          // navigate(location.state || "/documents");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };

    token && getUser();
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MarketingLayout>
            <MarketingPage />
          </MarketingLayout>
        }
      />
      <Route
        path="/documents"
        element={<Authenticated element={<DashboardLayout />} />}
      >
        <Route index element={<Documents />} />
        <Route path="/documents/:id" element={<Documents />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      <Route
        path="/reset_password/:id/:token"
        element={<ResetPassword />}
      ></Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 50000,
      },
    },
  });

  return (
    <div className="w-full h-screen" suppressHydrationWarning>
      {/* <Header /> */}
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="Notion-theme"
        >
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
