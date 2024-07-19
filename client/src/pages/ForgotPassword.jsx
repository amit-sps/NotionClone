import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import axios from "@/axiosConfig";

function ForgotPassword() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    axios.post("http://localhost:3851/api/v1/auth/forgot-password", { email });
    //   .then((res) => {
    //     if (res.data.Status === "Success") {
    //       navigate("/login");
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center  h-screen">
      <div className="w-1/2 forgot-password bg-gray-100 p-5 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Forgot Password?</h1>
        <p className="mb-2 text-md">
          Enter your email address below and we'll send you a link to reset your
          password.
        </p>
        <form onSubmit={handleSubmit} className="mb-2">
          <div className="mb-4 text-md">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 mb-4 text-md rounded-lg"
          >
            Reset Password
          </button>
        </form>
        <p className="text-center text-gray-600 text-md">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
