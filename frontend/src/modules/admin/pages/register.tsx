import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validations/register-validation";
import { doAdminRegister } from "../api/admin-api.ts"; // <-- update api file
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Angry } from "lucide-react";
import { useState } from "react";

const Register = () => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  });

  const alertJSX = (
    <Alert variant="destructive">
      <Angry />
      <AlertTitle>Register Message</AlertTitle>
      <AlertDescription>
        Registration Failed!
      </AlertDescription>
    </Alert>
  );

  const registerSubmit = async (userData:any) => {
    try {
      const result = await doAdminRegister(userData);

      // success message from backend
      if (result.data.message) {
        setStatus(false);
        navigate("/login");
      } else {
        setStatus(true);
      }
    } catch (err) {
      setStatus(true);
      console.log("Register Failed", err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      

      {/* Register Card */}
      <Card className="relative z-10 w-full max-w-md mx-auto shadow-lg rounded-2xl bg-white/80 backdrop-blur-md border border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">Admin Registration</CardTitle>
          <CardDescription>Create your account to join battles</CardDescription>
        </CardHeader>

        <CardContent>
          {status && alertJSX}

          <form className="space-y-4" onSubmit={handleSubmit(registerSubmit)}>
            
            {/* Name */}
            <div className="grid w-full gap-2">
              <Label>Name</Label>
              <Input {...register("name")} placeholder="Your Name" />
              <span className="text-red-500">{errors.name?.message}</span>
            </div>

            {/* Email */}
            <div className="grid w-full gap-2">
              <Label>Email</Label>
              <Input {...register("email")} type="email" placeholder="Email Address" />
              <span className="text-red-500">{errors.email?.message}</span>
            </div>

            {/* Password */}
            <div className="grid w-full gap-2">
              <Label>Password</Label>
              <Input {...register("password")} type="password" placeholder="Password" />
              <span className="text-red-500">{errors.password?.message}</span>
            </div>

            <Button className="w-full">Register</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
