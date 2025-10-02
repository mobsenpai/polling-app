import React from "react";
import { useForm } from "react-hook-form";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { useNotification } from "../../contexts/NotificationContext.jsx";
import { useAuth } from '../../contexts/AuthContext.jsx';
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Key, Mail } from "lucide-react";
import { apiCall } from "../../utils/apiCaller.js";

export default function LoginForm() {
  const { showNotification } = useNotification();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Normal login
  const onSubmit = async (data) => {
    const response = await apiCall({
      url: "/auth/login",
      method: "POST",
      data,
      withCredentials: true,
    });

    if (response.success) {
      setUser(response.data.user);
      showNotification("success", "Login successful!");
      navigate('/dashboard');
    } else {
      showNotification("error", response.message || "Login failed");
    }
  };

  // Google login
  const handleGoogleSuccess = async (credentialResponse) => {
    const response = await apiCall({
      url: "/auth/google",
      method: "POST",
      data: { token: credentialResponse.credential },
      withCredentials: true,
    });

    if (response.success) {
      setUser(response.data.user);
      showNotification("success", "Logged in with Google!");
      navigate('/dashboard');
    } else {
        console.log(response)
      showNotification("error", response.message || "Google login failed");
    }
  };

  const handleGoogleError = () => {
    showNotification("error", "Google login was unsuccessful.");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto p-6 flex flex-col mt-30 gap-2 bg-white shadow-sm items-center rounded-lg space-y-4"
    >
      <h2 className="text-xl font-semibold text-center text-gray-800">
        Welcome Back!
      </h2>

      <Input
        icon={<Mail size={18}/>}
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        register={register}
        error={errors.email}
        className="w-full text-sm"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email",
          },
        })}
      />

      <Input
        icon={<Key size={18}/>}
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        register={register}
        error={errors.password}
        className="w-full text-sm"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        })}
      />

      <div className="flex justify-start w-full items-center">
        <Link
          to="/forgot-password"
          className="text-primary hover:underline text-sm"
        >
          Forgot Password?
        </Link>
      </div>

      <Button type="submit" loading={isSubmitting} text="Login" className="w-full" />

      <div className="w-full mt-2">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap
        />
      </div>

      <Link
        to="/register"
        className="text-sm text-center text-neutral-800 mt-2"
      >
        Don't have an account?{" "}
        <span className="text-primary hover:underline">Create New</span>
      </Link>
    </form>
  );
}
