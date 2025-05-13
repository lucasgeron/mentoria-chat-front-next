import React from 'react';

interface SidebarMetricsProps {
  label: React.ReactNode;
  value: React.ReactNode;
}

export const SidebarMetric = ({ label, value }: SidebarMetricsProps) => {
  return (
    <div className="text-gray-300 text-center">
      <p className="font-medium text-white text-sm">{label}</p>
      <p className="bg-gray-900 my-0.5 py-0.5 rounded-lg font-medium text-white text-sm">
        {value}
      </p>
    </div>
  );
};