

"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { userSignup } from "../utils/userSignUp";
import { FiEye, FiEyeOff } from 'react-icons/fi';

const signupSchema = yup.object().shape({
  firstname: yup.string().required("Firstname is required"),
  lastname: yup.string().required("Lastname is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  phonenumber: yup.string().required("Phone number is required"),
  username: yup.string().required("Username is required"),
  role: yup.string().oneOf(["nurse", "chp", "admin"], "Role is required").required("Role is required"),
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
      const formattedData = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        role: data.role,
        phonenumber: data.phonenumber,
        username: data.username,
      };
      const response = await userSignup(formattedData);
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
        <div className="w-1/2 flex flex-col justify-start items-start px-12 md:px-16 ">
          <h2 className="text-[20px] font-semibold text-black ml-28">
            Create an account
          </h2>
          <img
            src="/images/logomamamind.png"
            alt="Logo"
            className="w-full h-auto mt-24 object-contain"
          />
        </div>

        <div className="w-1/2 h-full flex flex-col justify-center px-12 md:px-16">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {["firstname", "lastname", "username", "email", "phonenumber"].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-black font-bold font-nunito mb-1 text-[20px]">
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                <input
                  id={field}
                  type={field === "email" ? "email" : "text"}
                  placeholder={`Enter ${field}`}
                  {...register(field as keyof SignupFormData)}
                  className="w-full h-14 px-4 py-2 rounded-lg text-black border-2 border-[#02A6A6] placeholder:text-[15px] focus:outline-none focus:border-[#F18721]"
                />
                {errors[field as keyof SignupFormData] && (
                  <p className="text-red-500 text-xs mt-1">{errors[field as keyof SignupFormData]?.message}</p>
                )}
              </div>
            ))}

            <div>
              <label htmlFor="role" className="block text-black font-bold font-nunito mb-1 text-[20px]">
                Role:
              </label>
              <select
                id="role"
                {...register("role")}
                className="w-full h-14 px-4 py-2 rounded-lg text-black border-2 border-[#02A6A6] bg-white focus:outline-none focus:border-[#F18721]"
              >
                <option value="">Select role</option>
                <option value="nurse">Nurse</option>
                <option value="chp">CHP</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-black font-bold font-nunito mb-1 text-[20px]">
                Password:
              </label>
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
                className={`w-1/2 md:w-1/2 mt-12 bg-[#F18721] text-white font-medium py-3 rounded-lg hover:bg-[#02A6A6] focus:outline-none text-base ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing up..." : "Create Account"}
              </button>
            </div>

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
