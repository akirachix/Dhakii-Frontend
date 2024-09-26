"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { userLogin } from "../utils/userLogin";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const LoginSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  Username: yup.string().required("Username is required"),
});

type LoginFormData = yup.InferType<typeof LoginSchema>;

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(LoginSchema),
  });
  const [apiError, setApiError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const formattedData = {
        email: data.email,
        password: data.password,
        Username: data.Username,
      };
      const response = await userLogin(formattedData);
      if (response.error) {
        setApiError(response.error);
      } else {
        // Removed cookie setting
        router.push("/dashboard");
      }
    } catch (error) {
      setApiError((error as Error).message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleGoogleSignIn = () => {
    // Implement your Google sign-in logic here
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 font-josefin">
      <div className="w-full h-full flex justify-center items-center px-12 md:px-16">
        <div className="w-1/2 h-full flex flex-col justify-center">
          <h2 className="text-[24px] font-semibold text-black mb-8 text-center">
            Login to Your Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-black font-bold font-nunito mb-1 text-[20px]">
                Email:
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="w-full px-4 py-2 rounded-lg text-black border-2 border-[#02A6A6] placeholder:text-[15px] focus:outline-none focus:border-[#F18721]"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="username" className="block text-black font-bold font-nunito mb-1 text-[20px]">
                Username:
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                {...register("Username")}
                className="w-full px-4 py-2 rounded-lg text-black border-2 border-[#02A6A6] placeholder:text-[15px] focus:outline-none focus:border-[#F18721]"
              />
              {errors.Username && (
                <p className="text-red-500 text-xs mt-1">{errors.Username.message}</p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-black font-bold font-nunito mb-1 text-[20px]">
                Password:
              </label>
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className="w-full px-4 py-2 rounded-lg text-black border-2 border-[#02A6A6] placeholder:text-[15px] focus:outline-none focus:border-[#F18721]"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-1 right-4 flex items-center text-sm leading-5"
              >
                {passwordVisible ? (
                  <FiEye size={24} className="text-gray-600" />
                ) : (
                  <FiEyeOff size={24} className="text-gray-600" />
                )}
              </button>
            </div>

            <div className="flex justify-center ">
              <button
                type="submit"
                className={`w-full md:w-1/2 mt-12 bg-[#F18721] text-white font-medium py-3 rounded-lg focus:outline-none text-base ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>

            {apiError && (
              <p className="text-red-500 text-center text-xs mt-1">{apiError}</p>
            )}
          </form>

          <div className="flex flex-col items-center mt-6">
            <button 
              onClick={handleGoogleSignIn}
              className="w-full md:w-1/2 mt-4 bg-[#F18721] border-2 border-[#F18721] text-white font-medium py-3 rounded-lg focus:outline-none text-base flex items-center justify-center"
            >
              <FontAwesomeIcon 
                icon={faGoogle} 
                className="mr-2" 
                style={{ color: "#4285F4" }} 
              />
              <span style={{ color: "#DB4437" }}>Sign in with Google</span> 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
