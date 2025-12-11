"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Redux Hooks
import { useNavigate } from "react-router-dom"; // Navigation
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Briefcase,
  Globe,
  Phone,
} from "lucide-react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { apiClient } from "@/services/config";
import { toast } from "sonner";

// Import Redux Actions and Types
import { loginStart, loginSuccess, loginFailure } from "@/store/authSlice"; 
import { RootState } from "@/store"; 

export default function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Access Global Auth State
  const { isLoading, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    country: "USA",
    password: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
       handleRedirect();
    }
  }, [isAuthenticated]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Helper: Handle Redirect after Login
  const handleRedirect = () => {
      // Check if user was trying to access a service wizard
      const pendingRequest = localStorage.getItem("pendingServiceRequest");
      
      if (pendingRequest) {
          toast.success("Welcome back! Resuming your application...");
          navigate("/support"); // Redirect back to ServicesHub
      } else {
          navigate("/"); // Default to Dashboard
      }
  };

  // ===================================================================
  // STANDARD LOGIN / REGISTER
  // ===================================================================
  const handleSubmit = async (
    e: React.FormEvent,
    type: "login" | "register"
  ) => {
    e.preventDefault();
    
    // 1. Dispatch Start Action
    dispatch(loginStart());

    const endpoint = type === "login" ? "/login" : "/register";

    try {
      const res = await apiClient.post(`/api/user${endpoint}`, formData);
      const data = res.data;

      toast.success(data.message || "Operation successful!");

      // 2. Dispatch Success Action (Updates Redux Store + Cookies)
      if (data.token) {
        dispatch(loginSuccess({ user: data.user, token: data.token }));
        // Navigation happens in useEffect or handleRedirect helper
        handleRedirect();
      } else if (type === "register") {
         // If register doesn't auto-login, allow them to switch tabs
         setFormData({ ...formData, password: "" });
         // Optional: You might want to stop loading state here manually if not redirecting
         dispatch(loginFailure()); // Reset loading state, strictly speaking not a failure but stops spinner
      }

    } catch (err: any) {
      const errorMessage = 
        err.response?.data?.message || 
        err.response?.data?.error || 
        err.message || 
        "Something went wrong";

      toast.error(errorMessage);
      
      // 3. Dispatch Failure Action
      dispatch(loginFailure());
    }
  };

  // ===================================================================
  // GOOGLE LOGIN
  // ===================================================================
  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    const token = credentialResponse.credential;

    if (!token) {
      toast.error("Google authentication failed. No token received.");
      return;
    }

    try {
      dispatch(loginStart());

      const res = await apiClient.post("/api/user/google-login", { token });
      const data = res.data;

      toast.success(data.message || "Google login successful!");

      // Dispatch Success
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      handleRedirect();

    } catch (err: any) {
      const errorMessage = 
        err.response?.data?.message || 
        "Google login failed";
        
      toast.error(errorMessage);
      dispatch(loginFailure());
    }
  };

  const handleGoogleError = () => {
    toast.error("Google Sign-In failed. Please try again.");
  };

  // ===================================================================
  // UI
  // ===================================================================
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-900 tracking-tight">
           CrossVentura
          </h1>
          <p className="text-slate-500">Professional Business Management</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>

          {/* LOGIN */}
          <TabsContent value="login">
            <Card className="border-t-4 border-t-blue-600 shadow-lg">
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Sign in to your dashboard</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <form
                  onSubmit={(e) => handleSubmit(e, "login")}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>

                <div className="relative mt-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="flex justify-center w-full">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    theme="outline"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* REGISTER */}
          <TabsContent value="register">
            <Card className="border-t-4 border-t-blue-600 shadow-lg">
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  Join USA CV Dash today.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                
                <form
                  onSubmit={(e) => handleSubmit(e, "register")}
                  className="space-y-3"
                >
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      name="fullName"
                      placeholder="Ravi Kumar"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="ravi@work.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          name="phone"
                          className="pl-9"
                          placeholder="+91 987..."
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          name="company"
                          className="pl-9"
                          placeholder="Your Company"
                          value={formData.company}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Country</Label>
                      <div className="relative">
                        <Globe className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          name="country"
                          className="pl-9"
                          placeholder="USA"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Strong password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>

                <div className="relative mt-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">
                      Or
                    </span>
                  </div>
                </div>

                <div className="flex justify-center w-full mt-2">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    theme="outline"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-6 text-sm text-slate-400">
          &copy; {new Date().getFullYear()} USA CV Dash. All rights reserved.
        </div>
      </div>
    </div>
  );
}