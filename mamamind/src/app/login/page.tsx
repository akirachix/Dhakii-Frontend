
"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { userLogin } from "../utils/userLogin";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import Image from "next/image";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters long"),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await userLogin(data.email, data.password);
      const { token, userId } = response;

      setCookie(null, 'authToken', token, { maxAge: 60 * 60 * 24 * 7, path: '/' });
      setCookie(null, 'userId', userId, { maxAge: 60 * 60 * 24 * 7, path: '/' });

      router.push('/dashboard');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleGoogleSignIn = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    window.location.href = `${baseUrl}/auth/login`;
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen font-sans">
      <div className="hidden sm:flex sm:w-1/2 items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 nest-hub:p-4 nest-hub-max:p-6">
        <Image
          src="/images/shield.png"
          alt="Login illustration"
          width={400} 
          height={400} 
          className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg nest-hub:max-w-xs nest-hub-max:max-w-sm"
        />
      </div>
  
    <div className="w-full sm:w-1/2 flex items-center justify-center bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10 nest-hub:p-6 nest-hub-max:p-8">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg nest-hub:max-w-sm nest-hub-max:max-w-md">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-start nest-hub:text-lg nest-hub-max:text-xl">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 nest-hub:space-y-2 nest-hub-max:space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm sm:text-base md:text-lg lg:text-xl font-medium mb-1 sm:mb-2 nest-hub:text-base nest-hub-max:text-lg">Email</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="w-full h-14 px-4 py-2 rounded-lg text-black border-2 border-[#02A6A6] placeholder:text-[15px] focus:outline-none focus:border-[#F18721] nest-hub:h-12 nest-hub-max:h-13"
              placeholder="Enter your email"
            />
            {errors.email && <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.email.message}</p>}
          </div>
  
          <div>
            <label htmlFor="password" className="block text-sm sm:text-base md:text-lg lg:text-xl font-medium mb-1 sm:mb-2 nest-hub:text-base nest-hub-max:text-lg">Password</label>
            <div className="relative">
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                {...register("password")}
                className="w-full h-14 px-4 py-2 rounded-lg text-black border-2 border-[#02A6A6] placeholder:text-[15px] focus:outline-none focus:border-[#F18721] nest-hub:h-12 nest-hub-max:h-13"
                placeholder="Enter your password"
              />
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
            {errors.password && <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.password.message}</p>}
          </div>
  
          <div className="flex justify-start">
            <button
              type="submit"
              className={`w-full md:w-1/2 mt-6 bg-[#F18721] text-white font-medium py-3 rounded-lg focus:outline-none text-base ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""} nest-hub:py-2 nest-hub-max:py-3`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
  
          {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
  
          <div className="flex items-center justify-start pt-6 nest-hub:pt-4 nest-hub-max:pt-6">
            <div className="h-[2px] w-[40px] bg-black rounded-lg mr-2"></div>
            <span className="text-black text-[12px] font-bold">OR</span>
            <div className="h-[2px] w-[40px] bg-black rounded-lg ml-2"></div>
          </div>
  
          <div className="flex items-center justify-start mt-4 nest-hub:mt-2 nest-hub-max:mt-4">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center w-full md:w-1/2 mt-6 bg-white text-black border-2 border-[#02A6A6] font-medium py-3 rounded-lg focus:outline-none text-base nest-hub:py-2 nest-hub-max:py-3"
            >
              <FontAwesomeIcon icon={faGoogle} className="mr-2" />
              Sign in with Google
            </button>
          </div>
          <p className="text-start mt-6 nest-hub:mt-4 nest-hub-max:mt-6" style={{ fontSize: "20px" }}>
            Do not have an account?{" "}
            <Link href="/signup" className="text-[#02A6A6] hover:underline font-semibold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  </div>
  
  );
};

export default LoginPage;



