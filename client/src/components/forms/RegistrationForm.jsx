// import React from 'react'

// function RegistrationForm() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default RegistrationForm

//just to test (created by mobsenpai)
import React from "react";
import { useForm } from "react-hook-form";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { User, Mail, Key } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, data);
      if (response.status === 201) {
        // Registration success logic here
        // For example, redirect to login or show success message
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto p-6 flex flex-col mt-30 gap-2 bg-white shadow-sm items-center rounded-lg space-y-4"
    >
      <h2 className="text-xl font-semibold text-center text-gray-800">Create Account</h2>

      <Input
        label="Name"
        icon={<User size={18} />}
        name="name"
        type="text"
        placeholder="Enter your full name"
        register={register}
        error={errors.name}
        className="w-full text-sm"
        {...register("name", { required: "Name is required" })}
      />

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
            message: "Enter a valid email"
          }
        })}
      />

      <Input
        label="Password"
        icon={<Key size={18} />}
        name="password"
        type="password"
        placeholder="Create a password"
        register={register}
        error={errors.password}
        className="w-full text-sm"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters"
          }
        })}
      />

      <Button type="submit" text="Register" className="w-full" />
      <Link to="/login" className="text-sm text-center text-neutral-800">
        Already have an account? <span className="text-primary hover:underline">Login</span>
      </Link>
    </form>
  );
}

