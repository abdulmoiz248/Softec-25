'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, User, Stethoscope } from "lucide-react";
import Link from 'next/link';

const DoctorSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual signup logic
 //   navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1A1F2C] to-[#2C3E50] p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-0 transform transition-all duration-500 hover:scale-[1.02] animate-fade-in">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2 animate-slide-in-right">
            <Stethoscope className="h-12 w-12 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-white animate-slide-in-right delay-100">
            Doctor Registration
          </CardTitle>
          <p className="text-sm text-gray-300 animate-slide-in-right delay-200">
            Create your medical professional account
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 animate-slide-in-right delay-300">
              <div className="relative transform transition-all duration-300 hover:-translate-y-1">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-white/5 border-gray-700 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#60a5fa] transition-all duration-300"
                  required
                />
              </div>
            </div>
            <div className="space-y-2 animate-slide-in-right delay-400">
              <div className="relative transform transition-all duration-300 hover:-translate-y-1">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Medical Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/5 border-gray-700 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#60a5fa] transition-all duration-300"
                  required
                />
              </div>
            </div>
            <div className="space-y-2 animate-slide-in-right delay-500">
              <div className="relative transform transition-all duration-300 hover:-translate-y-1">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Medical License Number"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="pl-10 bg-white/5 border-gray-700 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#60a5fa] transition-all duration-300"
                  required
                />
              </div>
            </div>
            <div className="space-y-2 animate-slide-in-right delay-600">
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
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white transform transition-all duration-300 hover:scale-[1.02] animate-slide-in-right delay-700"
            >
              Register
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-300 animate-slide-in-right delay-700">
            Already registered?{" "}
            <Link href="/doctor/login" className="text-[#60a5fa] hover:text-[#93c5fd] transition-colors duration-300">
              Sign in
            </Link>
          </div>
          <div className="mt-2 text-center text-sm text-gray-300 animate-slide-in-right delay-700">
            <Link href="/staff/roles" className="text-[#60a5fa] hover:text-[#93c5fd] transition-colors duration-300">
              ← Back to role selection
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorSignup;
