"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { userSignup } from "../utils/userSignUp";  
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Image from "next/image"; 

type UserData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  user_role: string;
  phone_number: string;
  username: string;
};

const signupSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  phone_number: yup.string().required("Phone number is required"),
  username: yup.string().required("Username is required"),
  user_role: yup.string().oneOf(["nurse", "chp", "admin"], "Role is required").required("Role is required"),
});

type SignupFormData = yup.InferType<typeof signupSchema>;

const Signup = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
  });
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = async (data: SignupFormData) => {
    try {
      const formattedData: UserData = {
        first_name: data.first_name, 
        last_name: data.last_name, 
        email: data.email,
        password: data.password,
        user_role: data.user_role,
        phone_number: data.phone_number, 
        username: data.username,
      };

      const response = await userSignup(formattedData);  // Call the API function
      if (response.error) {
        setApiError(response.error);
      } else {
        setSuccessMessage("Account created successfully! Taking you to login...");
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch (error) {
      setApiError((error as Error).message || 'Something went wrong. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 font-josefin">
      <div className="flex w-full h-full">
      <div className="w-1/2 flex flex-col justify-start items-start px-12 md:px-16">
          <h2 className="text-[20px] font-semibold text-black ml-28">Create an account</h2>
          <Image 
            src="/images/logomamamind.png" 
            alt="Logo" 
            width={800} 
            height={600} 
            className="mt-36 object-contain"
          />
        </div>
        <div className="w-1/2 h-full flex flex-col justify-center px-12 md:px-16">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {["first_name", "last_name", "username", "email", "phone_number"].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-black font-bold font-nunito mb-1 text-[20px]">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ")}:
                </label>
                <input
                  id={field}
                  type={field === "email" ? "email" : "text"}
                  placeholder={`Enter ${field}`}
                  {...register(field as keyof SignupFormData)}
                  className="w-full h-14 px-4 py-2 rounded-lg text-black border-2 border-[#02A6A6] placeholder:text-[15px] focus:outline-none focus:border-[#F18721]"
                />
                {errors[field as keyof SignupFormData] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[field as keyof SignupFormData]?.message}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label htmlFor="user_role" className="block text-black font-bold font-nunito mb-1 text-[20px]">Role:</label>
              <select
                id="user_role"
                {...register("user_role")}
                className="w-full h-14 px-4 py-2 rounded-lg text-black border-2 border-[#02A6A6] bg-white focus:outline-none focus:border-[#F18721]"
              >
                <option value="">Select role</option>
                <option value="nurse">Nurse</option>
                <option value="chp">CHP</option>
                <option value="admin">Admin</option>
              </select>
              {errors.user_role && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.user_role.message}
                </p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-black font-bold font-nunito mb-1 text-[20px]">Password:</label>
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter password"
                {...register("password")}
                className="w-full h-14 px-4 py-2 rounded-lg text-black border-2 border-[#02A6A6] placeholder:text-[15px] focus:outline-none focus:border-[#F18721]"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-12 right-4 flex text-sm leading-5"
              >
                {passwordVisible ? (
                  <FiEye size={24} className="text-gray-600" />
                ) : (
                  <FiEyeOff size={24} className="text-gray-600 " />
                )}
              </button>
            </div>

            <div className="flex justify-start">
              <button
                type="submit"
                className={`w-1/2 md:w-1/2 mt-4 bg-[#F18721] text-white font-medium py-3 rounded-lg hover:bg-[#02A6A6] focus:outline-none text-base ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing up..." : "Create Account"}
              </button>
            </div>

            <p className="text-start">
              Already have an account?{" "}
              <Link href="/login" className="text-[#02A6A6] hover:underline font-semibold">Sign In</Link>
            </p>

            {apiError && (
              <p className="text-red-500 text-center text-xs">{apiError}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-center text-xs">{successMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

