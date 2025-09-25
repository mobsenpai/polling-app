import React from "react";
import { useForm } from 'react-hook-form'
import Input from "../elements/Input";
import Button from "../elements/Button";
import { Key, Mail } from 'lucide-react'
import { Link } from "react-router-dom";
import axios from 'axios'
export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    // context user {}
    const onSubmit = async (data) => {
        console.log(data);

        try {

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data);
            if (response.status === 200) {
                // user = {name: , email: , pfp: }
                // setUser(response.data.user)

                // toast("success", response.data.)


            }

        } catch (e) {
            console.error(e)
        }
    };


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-sm mx-auto p-6 flex flex-col mt-30 gap-2 bg-white shadow-sm items-center rounded-lg space-y-4"
        >
            <h2 className="text-xl font-semibold text-center text-gray-800">Welcome Back!</h2>
            {/* Email */}
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

            {/* Password */}
            <Input
                label="Password"
                icon={<Key size={18} />}
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
            {/* Forgot Password */}
            <div className="flex justify-start w-full items-center">
                <Link to={'/forgot-password'} className="text-primary hover:underline text-sm">Forgot Password?</Link>

            </div>
            {/* Submit Button */}
            <Button type={"submit"} text={"Login"} className={'w-full'} />
            <Link to={'/register'} className="text-sm text-center text-neutral-800">Don't have Have Account? <span className="text-primary hover:underline">Create New</span></Link>
        </form>
    );
}
