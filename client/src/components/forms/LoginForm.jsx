import React from "react";
import { useForm } from "react-hook-form";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { useNotification } from "../../contexts/NotificationContext.jsx";
import { useAuth } from '../../contexts/AuthContext.jsx'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginForm() {
    const { showNotification } = useNotification();

    const { setUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate()
    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/login`,
                data,
                { withCredentials: true }
            );

            if (response.status === 200) {
                const userData = response.data.user;
                setUser(userData);
                showNotification("success", "Login successful!");
                navigate('/dashboard')
            }
        } catch (e) {
            const message =
                e.response?.data?.message || "Login failed. Please try again.";
            showNotification("error", message);
            console.error(e);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/google`,
                { token: credentialResponse.credential },
                { withCredentials: true }
            );

            if (response.status === 200) {
                const userData = response.data.user;
                setUser(userData);
                showNotification("success", "Logged in with Google!");
            }
        } catch (e) {
            const message =
                e.response?.data?.message || "Google login failed.";
            showNotification("error", message);
            console.error(e);
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

            <Button type="submit" text="Login" className="w-full" />

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
