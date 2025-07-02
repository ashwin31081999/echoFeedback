
import { useState } from "react";
import { FeedbackForm } from "@/components/FeedbackForm";
import { FeedbackDashboard } from "@/components/FeedbackDashboard";
import { Button } from "@/components/ui/button";
import { MessageSquare, Eye } from "lucide-react";

export interface Feedback {
  id: string;
  organizationName: string;
  description: string;
  file?: {
    name: string;
    type: string;
    url: string;
  };
  createdAt: string;
}

const Index = () => {
  const [activeView, setActiveView] = useState<'form' | 'dashboard'>('form');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Feedback Management System
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Streamline your feedback collection and management process with our intuitive platform
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-lg">
            <Button
              variant={activeView === 'form' ? 'default' : 'ghost'}
              onClick={() => setActiveView('form')}
              className="rounded-full px-6 py-2 transition-all duration-200"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Submit Feedback
            </Button>
            <Button
              variant={activeView === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => setActiveView('dashboard')}
              className="rounded-full px-6 py-2 transition-all duration-200"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Feedback
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="transition-all duration-300 ease-in-out">
          {activeView === 'form' ? <FeedbackForm /> : <FeedbackDashboard />}
        </div>
      </div>
    </div>
  );
};

export default Index;
