import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

import { registerSchema } from "../validations/pregister-validation";
import { doPlayerRegister } from "../api/player-api";

const PlayerRegister = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const submitForm = async (data: any) => {
    try {
      const result = await doPlayerRegister(data);

      if (result.data.message) {
        setError("");
        navigate("/plogin");
      } else {
        setError("Registration failed. Try again.");
      }
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">

      <Card className="max-w-md w-full bg-white/80 backdrop-blur-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle>Player Registration</CardTitle>
          <CardDescription>Create your player account</CardDescription>
        </CardHeader>

        <CardContent>
          {error && <p className="text-red-600 text-center mb-3">{error}</p>}

          <form onSubmit={handleSubmit(submitForm)} className="space-y-4">

            {/* Name */}
            <div>
              <Label>Name</Label>
              <Input {...register("name")} placeholder="Your Name" />
              <span className="text-red-500 text-sm">{errors.name?.message}</span>
            </div>

            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input {...register("email")} placeholder="Email Address" />
              <span className="text-red-500 text-sm">{errors.email?.message}</span>
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>
              <Input type="password" {...register("password")} placeholder="Password" />
              <span className="text-red-500 text-sm">{errors.password?.message}</span>
            </div>

            <Button className="w-full">Register</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerRegister;
