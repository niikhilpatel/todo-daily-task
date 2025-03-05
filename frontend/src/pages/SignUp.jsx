import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    fullName: isLogin ? Yup.string() : Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      toast.success(`${isLogin ? "Logged in" : "Signed up"} successfully!`);
      console.log("Form Submitted", values);
      setTimeout(() => {
        if (!isLogin) {
          setIsLogin(true);
        } else {
          navigate("/home"); 
        }
      }, 2000);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          {!isLogin && (
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
              )}
            </div>
          )}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"} 
          <button
            className="text-blue-500 ml-1 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </div>
  );
}