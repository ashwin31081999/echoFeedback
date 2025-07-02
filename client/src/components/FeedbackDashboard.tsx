
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FeedbackItem } from "@/components/FeedbackItem";
import { RefreshCw, Inbox } from "lucide-react";
import type { Feedback } from "@/pages/Index";

export const FeedbackDashboard = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFeedbacks = () => {
    setIsLoading(true);
    try {
      const storedFeedbacks = JSON.parse(localStorage.getItem('feedback') || '[]');
      // Sort by creation date, newest first
      const sortedFeedbacks = storedFeedbacks.sort((a: Feedback, b: Feedback) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setFeedbacks(sortedFeedbacks);
    } catch (error) {
      console.error('Error loading feedbacks:', error);
      setFeedbacks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
          <span className="ml-3 text-gray-600">Loading feedback...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-semibold text-gray-800">
                Feedback Dashboard
              </CardTitle>
              <p className="text-gray-600 mt-1">
                Manage and review all submitted feedback
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="px-3 py-1">
                {feedbacks.length} Total
              </Badge>
              <Button
                onClick={loadFeedbacks}
                variant="outline"
                size="sm"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {feedbacks.length === 0 ? (
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="py-12">
            <div className="text-center">
              <Inbox className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                No feedback yet
              </h3>
              <p className="text-gray-600">
                Submitted feedback will appear here for review and management.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((feedback) => (
            <FeedbackItem key={feedback.id} feedback={feedback} />
          ))}
        </div>
      )}
    </div>
  );
};
