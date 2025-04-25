'use client'
import React, { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Navbar from '@/components/layouts/navbar';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router=useRouter();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    router.push('/patient/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1A1F2C] to-[#2C3E50] p-4">
      <Navbar/>
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-0 transform transition-all duration-500 hover:scale-[1.02] animate-fade-in">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-white animate-slide-in-right">
            Welcome Back
          </CardTitle>
          <p className="text-sm text-gray-300 animate-slide-in-right delay-100">
            Sign in to access your health dashboard
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 animate-slide-in-right delay-200">
              <div className="relative transform transition-all duration-300 hover:-translate-y-1">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/5 border-gray-700 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#60a5fa] transition-all duration-300"
                  required
                />
              </div>
            </div>
            <div className="space-y-2 animate-slide-in-right delay-300">
              <div className="relative transform transition-all duration-300 hover:-translate-y-1">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-white/5 border-gray-700 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#60a5fa] transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-300 transition-colors duration-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white transform transition-all duration-300 hover:scale-[1.02] animate-slide-in-right delay-400"
            >
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-300 animate-slide-in-right delay-500">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#60a5fa] hover:text-[#93c5fd] transition-colors duration-300">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

