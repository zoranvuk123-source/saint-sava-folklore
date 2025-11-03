import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const GalleryUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select images to upload",
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
      const fileName = `${Date.now()}-${i}.${fileExt}`;

      try {
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
    setSelectedFiles(null);

    if (successCount > 0) {
      toast({
        title: "Upload complete",
        description: `Successfully uploaded ${successCount} image(s)${errorCount > 0 ? `. ${errorCount} failed.` : ''}`,
      });
    } else {
      toast({
        title: "Upload failed",
        description: "Failed to upload images. Please try again.",
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
              <Upload className="w-8 h-8 text-primary" />
              Upload Gallery Images
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="images">Select Images</Label>
              <Input
                id="images"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                multiple
                onChange={handleFileSelect}
                disabled={uploading}
              />
              <p className="text-sm text-muted-foreground">
                Select one or more images (JPEG, PNG, WEBP). Max 10MB per file.
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

            <Button
              onClick={handleUpload}
              disabled={uploading || !selectedFiles || selectedFiles.length === 0}
              className="w-full"
            >
              {uploading ? "Uploading..." : "Upload Images"}
            </Button>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-2">Tips:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Name files with year prefix for organization (e.g., 2024-event.jpg)</li>
                <li>Recommended image size: 1920x1080 or similar</li>
                <li>Compress large images before uploading for faster loading</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </main>
  );
};

export default GalleryUpload;
