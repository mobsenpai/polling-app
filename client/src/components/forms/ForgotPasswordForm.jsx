import React from "react";
import { useForm } from "react-hook-form";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { apiCall } from "../../utils/apiCaller.js";
import { toast } from "react-toastify";

export default function ForgotPasswordForm() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data)
    const response = await apiCall({
      url: "/auth/forgot-password",
      method: "POST",
      data,

    });

    if (response.success) {
      toast.success("Password reset email sent!");
    } else {
      console.error(response)
      toast.error(response.message || "Failed to send reset email")
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto p-6 flex flex-col mt-30 gap-2 bg-white shadow-sm items-center rounded-lg space-y-4"
    >
      <h2 className="text-xl font-semibold text-center text-gray-800">
        Forgot Password
      </h2>

      <Input
        label="Email"
        icon={<Mail size={18} />}
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

      <Button type="submit" loading={isSubmitting} text="Send Reset Link" className="w-full" />

      <Link to="/login" className="text-sm text-center text-neutral-800 mt-4">
        Remember password?{" "}
        <span className="text-primary hover:underline">Login</span>
      </Link>
    </form>
  );
}
