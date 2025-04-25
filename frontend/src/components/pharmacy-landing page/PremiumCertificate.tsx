import React from "react";
import { Award, CheckCircle } from "lucide-react";

const PremiumCertificate = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-gradient-to-r from-gray-50 via-white to-gray-50 shadow-2xl rounded-lg overflow-hidden">
        <div className="relative p-8 border-8 border-double border-[#1b03a3] m-4">
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-gold"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-gold"></div>

          <div className="text-center space-y-6">
            <Award className="mx-auto text-[#1b03a3] w-16 h-16" />
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Certified Premium Pharmaceuticals
            </h1>
            <p className="text-lg text-gray-700 font-medium leading-relaxed">
              Our medicines are manufactured under <strong>WHO-GMP certified</strong> facilities, ensuring strict quality control, purity, and efficacy.
            </p>

            <div className="flex justify-center space-x-3 text-[#1b03a3]">
              <span>✦</span>
              <span>✦</span>
              <span>✦</span>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-300">
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="text-[#1b03a3] w-5 h-5" />
                <span className="text-sm font-semibold text-gray-700">
                  Hygieia Pharmacy Verified
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Trusted by Doctors. Backed by Science.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumCertificate;
