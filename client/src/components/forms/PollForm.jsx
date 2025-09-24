import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { Calendar, MessageSquare, User } from "lucide-react";
import axios from "axios";

export default function PollForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      multicasting: false,
      isResultPublic: false,
    },
  });

  const onSubmit = async (data) => {
    console.log("Poll Data:", data);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/polls/create`,
        data
      );

      if (response.status === 201) {
        // toast.success("Poll created successfully!");
        console.log("Poll created successfully!");
      }
    } catch (e) {
      console.error(e);
      // toast.error("Something went wrong!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 flex flex-col gap-4 bg-white shadow-sm rounded-lg"
    >
      <h2 className="text-xl font-semibold text-center text-gray-800">
        Create a New Poll
      </h2>

      {/* Poll Name */}
      <Input
        label="Poll Name"
        icon={<User size={18} />}
        name="name"
        placeholder="Enter poll name"
        register={register}
        error={errors.name}
        className="w-full text-sm"
        {...register("name", {
          required: "Poll name is required",
        })}
      />

      {/* Poll Question */}
      <Input
        label="Question"
        icon={<MessageSquare size={18} />}
        name="question"
        placeholder="Enter poll question"
        register={register}
        error={errors.question}
        className="w-full text-sm"
        {...register("question", {
          required: "Question is required",
          minLength: {
            value: 5,
            message: "Question must be at least 5 characters",
          },
        })}
      />

      {/* Options */}
      <Input
        label="Option 1"
        icon={<MessageSquare size={18} />}
        name="options[0]"
        placeholder="First option"
        register={register}
        error={errors.options?.[0]}
        className="w-full text-sm"
        {...register("options.0", { required: "Option 1 is required" })}
      />

      <Input
        label="Option 2"
        icon={<MessageSquare size={18} />}
        name="options[1]"
        placeholder="Second option"
        register={register}
        error={errors.options?.[1]}
        className="w-full text-sm"
        {...register("options.1", { required: "Option 2 is required" })}
      />

      <Input
        label="Option 3 (optional)"
        icon={<MessageSquare size={18} />}
        name="options[2]"
        placeholder="Third option"
        register={register}
        error={errors.options?.[2]}
        className="w-full text-sm"
        {...register("options.2")}
      />

      <Input
        label="Option 4 (optional)"
        icon={<MessageSquare size={18} />}
        name="options[3]"
        placeholder="Fourth option"
        register={register}
        error={errors.options?.[3]}
        className="w-full text-sm"
        {...register("options.3")}
      />

      {/* Start Date */}
      <Input
        label="Start Date & Time"
        icon={<Calendar size={18} />}
        name="start"
        type="datetime-local"
        register={register}
        error={errors.start}
        className="w-full text-sm"
        {...register("start", { required: "Start date is required" })}
      />

      {/* End Date */}
      <Input
        label="End Date & Time"
        icon={<Calendar size={18} />}
        name="end"
        type="datetime-local"
        register={register}
        error={errors.end}
        className="w-full text-sm"
        {...register("end", { required: "End date is required" })}
      />

      {/* Multicasting Switch */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-gray-700">Multicasting</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            {...register("multicasting")}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-primary transition-colors"></div>
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
        </label>
      </div>

      {/* isResultPublic Switch */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-gray-700">Results Public</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            {...register("isResultPublic")}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-primary transition-colors"></div>
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
        </label>
      </div>

      {/* Submit Button */}
      <Button type="submit" text="Create Poll" className="w-full mt-4" />
    </form>
  );
}
