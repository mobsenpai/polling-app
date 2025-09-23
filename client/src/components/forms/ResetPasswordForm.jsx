import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { Key } from "lucide-react";
import axios from "axios";

export default function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setError("");
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        token,
        userId,
        newPassword: password,
      });
      if (response.status === 200) {
        // Success feedback, then navigate to login page
        navigate("/login");
      } else {
        setError("Failed to reset password");
      }
    } catch (err) {
      setError("Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-6 flex flex-col gap-4 bg-white shadow-sm rounded-lg"
    >
      <h2 className="text-xl font-semibold text-center">Reset Password</h2>

      <Input
        label="New Password"
        icon={<Key size={18} />}
        name="newPassword"
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Input
        label="Confirm Password"
        icon={<Key size={18} />}
        name="confirmPassword"
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {error && <p className="text-red-600 text-sm text-center">{error}</p>}

      <Button type="submit" text={loading ? "Resetting..." : "Reset Password"} className="w-full" />
    </form>
  );
}
