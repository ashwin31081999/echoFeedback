
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, FileImage, X, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Feedback } from "@/pages/Index";

export const FeedbackForm = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or image file (JPEG, PNG, GIF, WebP)",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   if (!organizationName.trim() || !description.trim()) {
  //     toast({
  //       title: "Missing information",
  //       description: "Please fill in all required fields",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     // Simulate file upload
  //     let fileData = null;
  //     if (selectedFile) {
  //       const fileUrl = URL.createObjectURL(selectedFile);
  //       fileData = {
  //         name: selectedFile.name,
  //         type: selectedFile.type,
  //         url: fileUrl,
  //       };
  //     }

  //     const feedback: Feedback = {
  //       id: Date.now().toString(),
  //       organizationName: organizationName.trim(),
  //       description: description.trim(),
  //       file: fileData,
  //       createdAt: new Date().toISOString(),
  //     };

  //     // Store in localStorage (simulating backend)
  //     const existingFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
  //     existingFeedback.push(feedback);
  //     localStorage.setItem('feedback', JSON.stringify(existingFeedback));

  //     toast({
  //       title: "Feedback submitted successfully!",
  //       description: "Thank you for your valuable feedback.",
  //     });

  //     // Reset form
  //     setOrganizationName("");
  //     setDescription("");
  //     setSelectedFile(null);
  //     if (fileInputRef.current) {
  //       fileInputRef.current.value = "";
  //     }
  //   } catch (error) {
  //     toast({
  //       title: "Submission failed",
  //       description: "Please try again later.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!organizationName.trim() || !description.trim()) {
    toast({
      title: "Missing information",
      description: "Please fill in all required fields",
      variant: "destructive",
    });
    return;
  }

  setIsSubmitting(true);

  try {
    const formData = new FormData();
    formData.append("name", organizationName.trim());
    formData.append("description", description.trim());
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    const response = await fetch("http://localhost:8000/api/feedback", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to submit feedback");
    }

    toast({
      title: "Feedback submitted successfully!",
      description: "Thank you for your valuable feedback.",
    });

    // Reset form
    setOrganizationName("");
    setDescription("");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  } catch (error) {
    toast({
      title: "Submission failed",
      description: "Please try again later.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Submit Your Feedback
          </CardTitle>
          <p className="text-gray-600">
            Help us improve by sharing your thoughts and suggestions
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="organization" className="text-sm font-medium text-gray-700">
                Organization Name *
              </Label>
              <Input
                id="organization"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder="Enter your organization name"
                className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Feedback Description *
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe your feedback in detail..."
                rows={6}
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Attach File (Optional)
              </Label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-300 transition-colors">
                {selectedFile ? (
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      {selectedFile.type.startsWith('image/') ? (
                        <FileImage className="w-8 h-8 text-blue-500" />
                      ) : (
                        <FileText className="w-8 h-8 text-red-500" />
                      )}
                      <div className="text-left">
                        <p className="font-medium text-gray-800">{selectedFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      Upload PDF or Image files
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Maximum file size: 10MB
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.gif,.webp"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      Choose File
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-200"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Send className="w-4 h-4" />
                  <span>Submit Feedback</span>
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
