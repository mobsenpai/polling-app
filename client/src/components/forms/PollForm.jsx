import React from "react";
import { useForm } from "react-hook-form";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { Calendar, MessageSquare, User } from "lucide-react";
import axios from "axios";

export default function PollForm() {
  const {
    register,
    handleSubmit,
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
      if (response.status === 201) console.log("Poll created successfully!");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mt-20 mx-auto p-6 bg-white shadow-sm rounded-lg"
    >
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
        Create a New Poll
      </h2>

      <div className="flex flex-col md:flex-row md:divide-x md:divide-gray-200 gap-4">
        {/* Left Column */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <div className="flex flex-col">
            <Input
              label="Poll Name"
              icon={<User size={18} />}
              placeholder="Enter poll name"
              {...register("name", { required: "Poll name is required" })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <Input
              label="Question"
              icon={<MessageSquare size={18} />}
              placeholder="Enter poll question"
              {...register("question", {
                required: "Question is required",
                minLength: { value: 5, message: "At least 5 characters" },
              })}
            />
            {errors.question && (
              <span className="text-red-500 text-sm mt-1">{errors.question.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <Input
              label="Option 1"
              icon={<MessageSquare size={18} />}
              placeholder="First option"
              {...register("options.0", { required: "Option 1 is required" })}
            />
            {errors.options?.[0] && (
              <span className="text-red-500 text-sm mt-1">{errors.options[0].message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <Input
              label="Option 2"
              icon={<MessageSquare size={18} />}
              placeholder="Second option"
              {...register("options.1", { required: "Option 2 is required" })}
            />
            {errors.options?.[1] && (
              <span className="text-red-500 text-sm mt-1">{errors.options[1].message}</span>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="md:w-1/2 flex flex-col gap-4 md:pl-6">
          <div className="flex flex-col">
            <Input
              label="Option 3 (optional)"
              icon={<MessageSquare size={18} />}
              placeholder="Third option"
              {...register("options.2")}
            />
            {errors.options?.[2] && (
              <span className="text-red-500 text-sm mt-1">{errors.options[2].message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <Input
              label="Option 4 (optional)"
              icon={<MessageSquare size={18} />}
              placeholder="Fourth option"
              {...register("options.3")}
            />
            {errors.options?.[3] && (
              <span className="text-red-500 text-sm mt-1">{errors.options[3].message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <Input
              label="Start Date & Time"
              icon={<Calendar size={18} />}
              type="datetime-local"
              {...register("start", { required: "Start date is required" })}
            />
            {errors.start && (
              <span className="text-red-500 text-sm mt-1">{errors.start.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <Input
              label="End Date & Time"
              icon={<Calendar size={18} />}
              type="datetime-local"
              {...register("end", { required: "End date is required" })}
            />
            {errors.end && (
              <span className="text-red-500 text-sm mt-1">{errors.end.message}</span>
            )}
          </div>
        </div>
      </div>

      {/* Switches Below Both Columns */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mt-6">
        <div className="flex items-center justify-between md:w-1/2">
          <span className="text-gray-700">Multicasting</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              {...register("multicasting")}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-primary transition-colors"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
          </label>
        </div>

        <div className="flex items-center justify-between md:w-1/2">
          <span className="text-gray-700">Results Public</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              {...register("isResultPublic")}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-primary transition-colors"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
          </label>
        </div>
      </div>

      <Button type="submit" text="Create Poll" className="w-full mt-6" />
    </form>
  );
}
