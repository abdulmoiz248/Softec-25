import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { User, UserCog, Stethoscope } from "lucide-react";
import Link from "next/link";
import Navbar from '@/components/layouts/navbar';
const SelectRole = () => {
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1A1F2C] to-[#2C3E50] p-4">
       <Navbar/>
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-0 transform transition-all duration-500 hover:scale-[1.02] animate-fade-in">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-white animate-slide-in-right">
            Select Your Role
          </CardTitle>
          <p className="text-sm text-gray-300 animate-slide-in-right delay-100">
            Choose your role to proceed with login
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/doctor/login" className="block">
            <Button 
              className="w-full bg-white/5 hover:bg-white/10 text-white transform transition-all duration-300 hover:scale-[1.02] animate-slide-in-right delay-200 flex items-center justify-center gap-2"
            >
              <Stethoscope className="h-5 w-5" />
              Doctor
            </Button>
          </Link>
          <Link href="/admin/login" className="block">
            <Button 
              className="w-full bg-white/5 hover:bg-white/10 text-white transform transition-all duration-300 hover:scale-[1.02] animate-slide-in-right delay-300 flex items-center justify-center gap-2"
            >
              <UserCog className="h-5 w-5" />
              Admin Staff
            </Button>
          </Link>
          <Link href="/pharmacist/login" className="block">
            <Button 
              className="w-full bg-white/5 hover:bg-white/10 text-white transform transition-all duration-300 hover:scale-[1.02] animate-slide-in-right delay-400 flex items-center justify-center gap-2"
            >
              <User className="h-5 w-5" />
              Pharmacist
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelectRole;
