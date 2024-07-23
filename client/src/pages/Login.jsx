import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography } from "antd";
import { GoogleOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";
import { useCookies } from "react-cookie";
import axios from "@/axiosConfig";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";

const { Title, Text } = Typography;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();

  const loginWithGoogle = () => {
    window.open("http://localhost:3851/auth/google/callback", "_self");
  };

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post("http://localhost:3851/api/v1/auth/login", {
        email: values.email,
        password: values.password,
      });
      if (res && res.data.success) {
        toast.success(res.data.message, { autoClose: 1000 });
        setAuth({
          ...auth,
          user: res.data.user,
          accessToken: res.data.token,
        });
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        navigate(location.state || "/documents");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user && Object.keys(user).length > 0) {
      navigate("/documents");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-lg">
        <Title level={2} className="text-center mb-6 text-white">
          Login
        </Title>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label={<span className="text-white">Email</span>}
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Email"
              style={{
                backgroundColor: '#1f2937', // Gray 800
                borderColor: '#374151', // Gray 700
                color: '#ffffff', // White
                borderRadius: '0.375rem', // Rounded-md
                padding: '0.5rem 0.75rem', // py-2 px-3
                fontSize: '0.875rem', // text-sm
                outline: 'none',
                transition: 'background-color 0.2s ease, border-color 0.2s ease',
              }}
              className="focus:outline-none focus:bg-gray-800 focus:border-gray-700"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Password</span>}
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Password"
              style={{
                backgroundColor: '#1f2937', // Gray 800
                borderColor: '#374151', // Gray 700
                color: '#ffffff', // White
                borderRadius: '0.375rem', // Rounded-md
                padding: '0.5rem 0.75rem', // py-2 px-3
                fontSize: '0.875rem', // text-sm
                outline: 'none',
                transition: 'background-color 0.2s ease, border-color 0.2s ease',
              }}
              className="focus:outline-none focus:bg-gray-800 focus:border-gray-700"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors duration-200"
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        {/* <Button
          type="default"
          icon={<GoogleOutlined />}
          className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition-colors duration-200"
          onClick={loginWithGoogle}
        >
          Sign In with Google
        </Button> */}

        <div className="text-center mt-4">
          <Text className="text-white">
            Not registered?{" "}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-500 underline"
            >
              Create an account
            </Link>
          </Text>
        </div>

        <div className="text-center mt-2">
          <Link
            to="/forgot-password"
            className="text-blue-400 hover:text-blue-500 underline"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
