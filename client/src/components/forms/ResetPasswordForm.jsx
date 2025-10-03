import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { Key } from "lucide-react";
import { apiCall } from "../../utils/apiCaller";

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const response = await apiCall({
        url: "/auth/reset-password",
        method: "POST",
        data: {
          token,
          newPassword: data.password,
        },
      });

      if (response.success) {
        toast.success(response?.data.message)
        navigate("/login");
      } else {
        toast.error(response.message)
      }
    } catch (err) {
      toast.error("Something went wrong!")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm w-full p-6 flex flex-col gap-4 bg-white shadow-sm rounded-lg"
      >
        <h2 className="text-xl font-semibold text-center">Reset Password</h2>

        <Input
          label="New Password"
          icon={<Key size={18} />}
          name="password"
          type="password"
          placeholder="Enter new password"
          register={register}
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          })}
          error={errors.password}
        />

        <Input
          label="Confirm Password"
          icon={<Key size={18} />}
          name="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          register={register}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          error={errors.confirmPassword}
        />

        <Button type="submit" loading={isSubmitting} text="Reset Password" className="w-full" />
      </form>
    </div>
  );
}
