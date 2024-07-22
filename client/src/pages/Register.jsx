import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Form, Typography } from "antd";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";

const { Text } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(
        "http://localhost:3851/api/v1/auth/register",
        values
      );
      if (res && res.data.success) {
        toast.success(res.data.message || "Registration successful!", {
          autoClose: 1000,
        });
        navigate("/login");
      }
    } catch (error) {
      const responseData = error?.response?.data;

      if (responseData?.errors?.length) {
        responseData.errors.forEach((err) =>
          toast.error(err.msg, { autoClose: 1000 })
        );
      } else {
        const errorMessage = responseData
          ? responseData.message
          : "Something went wrong.";
        toast.error(errorMessage, { autoClose: 1000 });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-white">
          Register
        </h2>
        <Form
          form={form}
          name="register"
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label={<span className="text-white">Name</span>}
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              placeholder="Enter your name"
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
              className="hover:bg-gray-900 active:bg-gray-900"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Email</span>}
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
                type: "email",
              },
            ]}
          >
            <Input
              placeholder="Enter your email"
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
              className="hover:bg-gray-900 active:bg-gray-900"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Password</span>}
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              placeholder="Enter your password"
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
              className="hover:bg-gray-900 active:bg-gray-900"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Phone</span>}
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input
              placeholder="Enter your phone number"
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
              className="hover:bg-gray-900 active:bg-gray-900"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Address</span>}
            name="address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input
              placeholder="Enter your address"
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
              className="hover:bg-gray-900 active:bg-gray-900"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
            >
              REGISTER
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <Text className="text-white">
            Already registered?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-500 underline">
              Login
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Register;
