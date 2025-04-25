'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  ClipboardList,
  FlaskConical,
  CheckCircle,
  Package,
  Truck,
} from 'lucide-react';

const TimelineStep = ({
  icon,
  title,
  description,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}) => {
  return (
    <motion.div
      className="relative flex items-start mb-8 last:mb-0 pl-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <div className="absolute left-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#1b03a3] text-white">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const PharmacyWorkflow = () => {
  const steps = [
    {
      icon: <FileText size={24} />,
      title: 'Prescription Received',
      description: 'We securely receive and validate prescriptions from verified healthcare providers.',
    },
    {
      icon: <ClipboardList size={24} />,
      title: 'Order Processing',
      description: 'Orders are logged, cross-checked, and queued for fulfillment with utmost accuracy.',
    },
    {
      icon: <FlaskConical size={24} />,
      title: 'Medication Preparation',
      description: 'Licensed pharmacists prepare prescriptions with precision and verified dosage protocols.',
    },
    {
      icon: <CheckCircle size={24} />,
      title: 'Quality Assurance',
      description: 'Each order undergoes rigorous checks to ensure safety, compliance, and accuracy.',
    },
    {
      icon: <Package size={24} />,
      title: 'Secure Packaging',
      description: 'Meds are packed using tamper-proof, labeled packaging that maintains integrity and confidentiality.',
    },
    {
      icon: <Truck size={24} />,
      title: 'Delivery & Tracking',
      description: 'Orders are dispatched with real-time tracking and optional pharmacist support on arrival.',
    },
  ];

  return (
    <div className="max-w-4xl my-10 mx-auto p-8 bg-white rounded-lg shadow-lg">
      <motion.h2
        className="text-3xl font-bold mb-12 text-center text-[#1b03a3]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Hygieia Pharmacy Workflow
      </motion.h2>
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200"></div>
        {steps.map((step, index) => (
          <TimelineStep key={index} {...step} index={index} />
        ))}
      </div>
    </div>
  );
};

export default PharmacyWorkflow;
