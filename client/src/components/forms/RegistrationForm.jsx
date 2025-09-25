import React from "react";
import { useForm } from "react-hook-form";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { User, Mail, Key } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, data);
      if (response.status === 201) {
        // Registration logic here
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto p-6 flex flex-col mt-30 gap-2 bg-white shadow-sm items-center rounded-lg"
    >
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Create Account</h2>

      <div className="w-full flex flex-col gap-1">
        <Input
          label="Name"
          icon={<User size={18} />}
          name="name"
          type="text"
          placeholder="Enter your full name"
          register={register}
          className="text-sm w-full"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-600 text-xs w-full text-left">{errors.name.message}</p>
        )}
      </div>

      <div className="w-full flex flex-col gap-1">
        <Input
          label="Email"
          icon={<Mail size={18} />}
          name="email"
          type="email"
          placeholder="Enter your email"
          register={register}
          className="text-sm w-full"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email"
            }
          })}
        />
        {errors.email && (
          <p className="text-red-600 text-xs w-full text-left">{errors.email.message}</p>
        )}
      </div>

      <div className="w-full flex flex-col gap-1">
        <Input
          label="Password"
          icon={<Key size={18} />}
          name="password"
          type="password"
          placeholder="Create a password"
          register={register}
          className="text-sm w-full"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters"
            }
          })}
        />
        {errors.password && (
          <p className="text-red-600 text-xs w-full text-left">{errors.password.message}</p>
        )}
      </div>

      <div className="w-full flex flex-col gap-1">
        <Input
          label="Confirm Password"
          icon={<Key size={18} />}
          name="confirmPassword"
          type="password"
          placeholder="Repeat your password"
          register={register}
          className="text-sm w-full"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "Passwords do not match"
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-600 text-xs w-full text-left">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" text="Register" className="w-full" />
      <Link to="/login" className="text-sm text-center text-neutral-800 mt-4">
        Already have an account? <span className="text-primary hover:underline">Login</span>
      </Link>
    </form>
  );
}

export default RegisterForm;
