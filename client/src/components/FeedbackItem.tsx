
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Calendar, FileText, FileImage, Download, Eye } from "lucide-react";
import type { Feedback } from "@/pages/Index";

interface FeedbackItemProps {
  feedback: Feedback;
}

export const FeedbackItem = ({ feedback }: FeedbackItemProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleFileView = () => {
    if (feedback.file?.url) {
      window.open(feedback.file.url, '_blank');
    }
  };

  const handleFileDownload = () => {
    if (feedback.file?.url && feedback.file?.name) {
      const link = document.createElement('a');
      link.href = feedback.file.url;
      link.download = feedback.file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-lg text-gray-800">
              {feedback.organizationName}
            </h3>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(feedback.createdAt)}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Feedback Description:</h4>
          <p className="text-gray-600 leading-relaxed bg-gray-50 rounded-lg p-4">
            {feedback.description}
          </p>
        </div>

        {feedback.file && (
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Attached File:</h4>
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                {feedback.file.type.startsWith('image/') ? (
                  <FileImage className="w-6 h-6 text-blue-600" />
                ) : (
                  <FileText className="w-6 h-6 text-red-600" />
                )}
                <div>
                  <p className="font-medium text-gray-800">{feedback.file.name}</p>
                  <Badge variant="outline" className="text-xs">
                    {feedback.file.type.split('/')[1].toUpperCase()}
                  </Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={handleFileView}
                  size="sm"
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button
                  onClick={handleFileDownload}
                  size="sm"
                  variant="outline"
                  className="border-green-200 text-green-600 hover:bg-green-50"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
