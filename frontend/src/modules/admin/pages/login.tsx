import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginSchema } from "../validations/login-validation";
import { doAdminLogin } from "../api/admin-api";

const Login = () => {
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mysubmit = async (data: any) => {
    try {
      const result = await doAdminLogin(data);

      // ✔ FIX: Check only when token exists
      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("role", result.data.role || "admin");
        localStorage.setItem("email", result.data.email);

        setError("");

        navigate("/ad"); // Admin dashboard
      } else {
        setError("Invalid email or password.");
        setShowPopup(true);
      }
    } catch (err) {
      console.log("Admin Login Error:", err);
      setError("Login failed. Please try again.");
      setShowPopup(true);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">

      {/* ❗ Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <Card className="bg-white w-full max-w-md shadow-xl">
            <CardHeader>
              <CardTitle className="text-center text-lg text-red-600">
                Login Error
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-center">{error}</p>
              <div className="flex justify-center mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowPopup(false)}
                  className="border-red-400 text-red-600 hover:bg-red-100"
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Login Card */}
      <Card className="relative z-10 w-full max-w-md mx-auto shadow-lg rounded-2xl bg-white/80 backdrop-blur-md border border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">Admin Login</CardTitle>
          <CardDescription>Enter your admin credentials</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(mysubmit)} className="space-y-4">
            {/* Email */}
            <div className="grid w-full gap-2">
              <Label>Email</Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="Email"
              />
              <span className="text-red-500 text-sm">{errors.email?.message}</span>
            </div>

            {/* Password */}
            <div className="grid w-full gap-2">
              <Label>Password</Label>
              <Input
                {...register("password")}
                type="password"
                placeholder="Password"
              />
              <span className="text-red-500 text-sm">{errors.password?.message}</span>
            </div>

            <div className="pt-2">
              <Button className="w-full">Login</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
