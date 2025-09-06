import React from 'react';
import { BarChart3 } from 'lucide-react';

interface AnalyticsButtonProps {
  onClick: () => void;
}

export default function AnalyticsButton({ onClick }: AnalyticsButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 z-50"
      title="Voir les analytics"
    >
      <BarChart3 className="w-6 h-6" />
    </button>
  );
}