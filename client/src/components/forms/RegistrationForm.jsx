import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { User, Mail, Key, Image as ImageIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useNotification } from "../../contexts/NotificationContext";
import { getImageURL } from "../../utils/imageUrl";
import { apiCall } from "../../utils/apiCaller";
function RegisterForm() {
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm();

  const [pfp, setPfp] = useState(null);
  const [preview, setPreview] = useState(null);
  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);

      if (pfp) {
        formData.append("pfp", pfp);
      }
      // API call
      const response = await apiCall({
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/auth/register`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.success && response.status == 201) {
        showNotification("success", "Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed. Please try again.";
      showNotification("error", message);
      console.error(error);
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPfp(file);
      setPreview(URL.createObjectURL(file)); // preview image
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto p-6 flex flex-col mt-30 gap-2 bg-white shadow-sm items-center rounded-lg"
    >


      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
        Create Account
      </h2>
      {/* Profile Picture Upload */}
      <div className="relative mb-4">
        <label htmlFor="pfp-upload" className="cursor-pointer">
          <img
            src={
              preview ||
              getImageURL()
            }
            alt="Profile Preview"
            className="w-24 h-24 text-sm rounded-full object-cover border-2 border-gray-300 shadow-sm"
          />
          <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow">
            <ImageIcon size={18} className="text-gray-600" />
          </div>
        </label>
        <input
          id="pfp-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"

        />
      </div>

      {/* Name */}
      <div className="w-full flex flex-col gap-1">
        <Input
          label="Name"
          icon={<User size={18} />}
          name="name"
          type="text"
          className="w-full"
          placeholder="Enter your full name"
          register={register}
          error={errors.name}
          {...register("name", { required: "Name is required" })}
        />
        
      </div>

      {/* Email */}
      <div className="w-full flex flex-col gap-1">
        <Input
          className="w-full"

          label="Email"
          icon={<Mail size={18} />}
          name="email"
          type="email"
          error={errors.email}
          placeholder="Enter your email"
          register={register}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
      
          })}
        />
       
      </div>

      {/* Password */}
      <div className="w-full flex flex-col gap-1">
        <Input
          label="Password"
          className="w-full"

          icon={<Key size={18} />}
          name="password"
          error={errors.password}
          type="password"
          placeholder="Enter Password"
          register={register}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
      </div>

      {/* Confirm Password */}
      <div className="w-full flex flex-col gap-1">
        <Input
          label="Confirm Password"
          icon={<Key size={18} />}
          className="w-full"

          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          register={register}
          error={errors.confirmPassword}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
   
      </div>

      <Button type="submit" loading={isSubmitting} text="Register" className="w-full mt-2" />

      <Link to="/login" className="text-sm text-center text-neutral-800 mt-4">
        Already have an account?{" "}
        <span className="text-primary hover:underline">Login</span>
      </Link>
    </form>
  );
}

export default RegisterForm;
