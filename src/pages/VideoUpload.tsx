import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, ArrowLeft, Video } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const VideoUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Validate file sizes (50MB limit)
      const maxSize = 50 * 1024 * 1024; // 50MB in bytes
      const files = Array.from(e.target.files);
      const oversizedFiles = files.filter(file => file.size > maxSize);
      
      if (oversizedFiles.length > 0) {
        toast({
          title: "File too large",
          description: `Some files exceed 50MB limit. Please compress or split larger videos.`,
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFiles(e.target.files);
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select videos to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `videos/${Date.now()}-${i}.${fileExt}`;

      try {
        setUploadProgress(Math.round(((i + 1) / selectedFiles.length) * 100));
        
        const { error } = await supabase.storage
          .from('gallery-images')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) throw error;
        successCount++;
      } catch (error) {
        console.error('Error uploading file:', error);
        errorCount++;
      }
    }

    setUploading(false);
    setUploadProgress(0);
    setSelectedFiles(null);

    if (successCount > 0) {
      toast({
        title: "Upload complete",
        description: `Successfully uploaded ${successCount} video(s)${errorCount > 0 ? `. ${errorCount} failed.` : ''}`,
      });
      
      // Navigate back to gallery after 2 seconds
      setTimeout(() => navigate('/gallery'), 2000);
    } else {
      toast({
        title: "Upload failed",
        description: "Failed to upload videos. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/gallery')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Gallery
        </Button>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Video className="w-8 h-8 text-primary" />
              Upload Videos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="videos">Select Videos</Label>
              <Input
                id="videos"
                type="file"
                accept="video/mp4,video/webm,video/mov,video/avi"
                multiple
                onChange={handleFileSelect}
                disabled={uploading}
              />
              <p className="text-sm text-muted-foreground">
                Select one or more videos (MP4, WEBM, MOV, AVI). Max 50MB per file.
              </p>
            </div>

            {selectedFiles && selectedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-semibold">
                  Selected files: {selectedFiles.length}
                </p>
                <div className="max-h-40 overflow-y-auto space-y-1">
                  {Array.from(selectedFiles).map((file, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground">
                      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  ))}
                </div>
              </div>
            )}

            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={uploading || !selectedFiles || selectedFiles.length === 0}
              className="w-full"
            >
              {uploading ? "Uploading..." : "Upload Videos"}
            </Button>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-2">Tips:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Name files with year prefix for organization (e.g., 2024-event.mp4)</li>
                <li>Compress large videos using HandBrake or similar tools to stay under 50MB</li>
                <li>For videos over 50MB, consider upgrading your Lovable plan or using external hosting</li>
                <li>MP4 format with H.264 codec is recommended for best compatibility</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </main>
  );
};

export default VideoUpload;
