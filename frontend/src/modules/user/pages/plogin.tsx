import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../validations/plogin-validation";
import { doPlayerLogin } from "../api/player-api";

const PlayerLogin = () => {
  const [popup, setPopup] = useState({ show: false, message: "" });
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

  const submitForm = async (data: any) => {
    try {
      const result = await doPlayerLogin(data);

      if (result?.data?.message) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("role", "player");
        localStorage.setItem("email", data.email);

        navigate("/pd");
      } else {
        setPopup({ show: true, message: "Invalid email or password" });
      }
    } catch (error) {
      setPopup({ show: true, message: "Login failed. Try again." });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      
      {/* Popup */}
      {popup.show && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Card className="max-w-md w-full bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-center text-red-600">Login Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">{popup.message}</p>
              <div className="flex justify-center mt-4">
                <Button variant="outline" onClick={() => setPopup({ show: false, message: "" })}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Login UI */}
      <Card className="max-w-md w-full bg-white/80 backdrop-blur-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle>Player Login</CardTitle>
          <CardDescription>Enter your credentials</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(submitForm)} className="space-y-4">

            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input {...register("email")} placeholder="Email" />
              <span className="text-red-500 text-sm">{errors.email?.message}</span>
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>
              <Input type="password" {...register("password")} placeholder="Password" />
              <span className="text-red-500 text-sm">{errors.password?.message}</span>
            </div>

            <Button className="w-full">Login</Button>

            <p className="text-center mt-4 text-gray-700">
              Not registered?{" "}
              <Link to="/Pregister" className="text-blue-600 hover:underline">
                Create an account
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerLogin;
