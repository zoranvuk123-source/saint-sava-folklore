import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Gallery = () => {
  const { t } = useLanguage();
  const [selectedYear, setSelectedYear] = useState("all");
  const [storagePhotos, setStoragePhotos] = useState<{ src: string; alt: string; year: string }[]>([]);
  const [storageVideos, setStorageVideos] = useState<{ src: string; title: string; year: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = (src: string) => {
    setFailedImages(prev => new Set(prev).add(src));
  };

  const years = ["2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016"];

  // Video data organized by year (local MP4 files)
  const videoData = {
    "2017": [
      { src: "/gallery/2017/2017-01-30_1.mp4", title: "January 2017", year: "2017" }
    ],
    "2018": [
      { src: "/gallery/2018/2018-05-22_1.mp4", title: "May 2018", year: "2018" }
    ],
    "2019": [
      { src: "/gallery/2019/2019-02-25_1.mp4", title: "February 2019", year: "2019" }
    ],
    "2025": [
      { src: "/gallery/2025/2025-05-24_1.mp4", title: "May 2025", year: "2025" }
    ]
  };

  const getFilteredVideos = () => {
    const localVideos = selectedYear === "all" 
      ? Object.values(videoData).flat()
      : videoData[selectedYear as keyof typeof videoData] || [];
    
    const storageFiltered = selectedYear === "all"
      ? storageVideos
      : storageVideos.filter(video => video.year === selectedYear);
    
    return [...localVideos, ...storageFiltered];
  };

  // Fetch images and videos from Supabase storage
  useEffect(() => {
    const fetchStorageMedia = async () => {
      try {
        // Fetch all files from storage
        const { data, error } = await supabase.storage
          .from('gallery-images')
          .list('', { sortBy: { column: 'name', order: 'desc' } });

        if (error) throw error;

        const photos: { src: string; alt: string; year: string }[] = [];
        const videos: { src: string; title: string; year: string }[] = [];

        data.forEach((file) => {
          const { data: publicUrl } = supabase.storage
            .from('gallery-images')
            .getPublicUrl(file.name);
          
          // Extract year from filename (assuming format: YYYY-MM-DD_N.ext)
          const yearMatch = file.name.match(/^(\d{4})/);
          const year = yearMatch ? yearMatch[1] : "2025";
          
          // Check if it's a video or photo based on file extension
          const ext = file.name.split('.').pop()?.toLowerCase();
          const videoExtensions = ['mp4', 'webm', 'mov', 'avi'];
          const imageExtensions = ['jpg', 'jpeg', 'png', 'webp'];
          
          if (ext && videoExtensions.includes(ext)) {
            videos.push({
              src: publicUrl.publicUrl,
              title: `Gallery ${file.name}`,
              year
            });
          } else if (ext && imageExtensions.includes(ext)) {
            photos.push({
              src: publicUrl.publicUrl,
              alt: `Gallery ${file.name}`,
              year
            });
          }
        });

        setStoragePhotos(photos);
        setStorageVideos(videos);
      } catch (error) {
        console.error('Error fetching media:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStorageMedia();
  }, []);

  // Gallery data organized by year
  const galleryData = {
    "2016": [
      { src: "/gallery/2016/2016-12-25_1.jpg", alt: "December 2016" },
      { src: "/gallery/2016/2016-12-25_2.jpg", alt: "December 2016" },
      { src: "/gallery/2016/2016-12-27_1.jpg", alt: "December 2016" },
      { src: "/gallery/2016/2016-12-30_1.jpg", alt: "December 2016" }
    ],
    "2017": [
      { src: "/gallery/2017/2017-02-23_1.jpg", alt: "February 2017" },
      { src: "/gallery/2017/2017-04-08_1.jpg", alt: "April 2017" },
      { src: "/gallery/2017/2017-05-28_1.jpg", alt: "May 2017" },
      { src: "/gallery/2017/2017-05-29_1.jpg", alt: "May 2017" },
      { src: "/gallery/2017/2017-05-29_2.jpg", alt: "May 2017" },
      { src: "/gallery/2017/2017-05-30_1.jpg", alt: "May 2017" },
      { src: "/gallery/2017/2017-05-30_2.jpg", alt: "May 2017" },
      { src: "/gallery/2017/2017-05-30_3.jpg", alt: "May 2017" },
      { src: "/gallery/2017/2017-05-30_4.jpg", alt: "May 2017" },
      { src: "/gallery/2017/2017-05-30_5.jpg", alt: "May 2017" },
      { src: "/gallery/2017/2017-05-30_6.jpg", alt: "May 2017" },
      { src: "/gallery/2017/2017-06-01_1.jpg", alt: "June 2017" },
      { src: "/gallery/2017/2017-06-16_1.jpg", alt: "June 2017" },
      { src: "/gallery/2017/2017-08-11_1.jpg", alt: "August 2017" },
      { src: "/gallery/2017/2017-10-01_1.jpg", alt: "October 2017" },
      { src: "/gallery/2017/2017-11-05_1.jpg", alt: "November 2017" }
    ],
    "2018": [
      { src: "/gallery/2018/2018-02-04_1.jpg", alt: "February 2018" },
      { src: "/gallery/2018/2018-02-06_1.jpg", alt: "February 2018" },
      { src: "/gallery/2018/2018-02-06_2.jpg", alt: "February 2018" },
      { src: "/gallery/2018/2018-02-06_3.jpg", alt: "February 2018" },
      { src: "/gallery/2018/2018-04-14_1.jpg", alt: "April 2018" },
      { src: "/gallery/2018/2018-05-14_1.jpg", alt: "May 2018" },
      { src: "/gallery/2018/2018-05-14_2.jpg", alt: "May 2018" },
      { src: "/gallery/2018/2018-05-22_1.jpg", alt: "May 2018" },
      { src: "/gallery/2018/2018-05-28_1.jpg", alt: "May 2018" },
      { src: "/gallery/2018/2018-05-28_2.jpg", alt: "May 2018" },
      { src: "/gallery/2018/2018-05-28_3.jpg", alt: "May 2018" },
      { src: "/gallery/2018/2018-06-05_1.jpg", alt: "June 2018" },
      { src: "/gallery/2018/2018-11-16_1.jpg", alt: "November 2018" }
    ],
    "2019": [
      { src: "/gallery/2019/2019-02-05_1.jpg", alt: "February 2019" },
      { src: "/gallery/2019/2019-02-27_1.jpg", alt: "February 2019" },
      { src: "/gallery/2019/2019-03-04_1.jpg", alt: "March 2019" },
      { src: "/gallery/2019/2019-04-14_1.jpg", alt: "April 2019" },
      { src: "/gallery/2019/2019-05-17_1.jpg", alt: "May 2019" },
      { src: "/gallery/2019/2019-05-28_1.jpg", alt: "May 2019" },
      { src: "/gallery/2019/2019-05-30_1.jpg", alt: "May 2019" },
      { src: "/gallery/2019/2019-06-03_1.jpg", alt: "June 2019" },
      { src: "/gallery/2019/2019-10-30_1.jpg", alt: "October 2019" },
      { src: "/gallery/2019/2019-11-03_1.jpg", alt: "November 2019" }
    ],
    "2020": [
      { src: "/gallery/2020/2020-01-26_1.jpg", alt: "January 2020" },
      { src: "/gallery/2020/2020-01-26_2.jpg", alt: "January 2020" },
      { src: "/gallery/2020/2020-02-11_1.jpg", alt: "February 2020" }
    ],
    "2021": [
      { src: "/gallery/2021/2021-06-01_1.jpg", alt: "June 2021" }
    ],
    "2022": [
      { src: "/gallery/2022/2022-02-13_1.jpg", alt: "February 2022" },
      { src: "/gallery/2022/2022-05-22_1.jpg", alt: "May 2022" },
      { src: "/gallery/2022/2022-05-30_1.jpg", alt: "May 2022" }
    ],
    "2023": [
      { src: "/gallery/2023/2023-02-04_2.jpg", alt: "February 2023" },
      { src: "/gallery/2023/2023-02-04_3.jpg", alt: "February 2023" },
      { src: "/gallery/2023/2023-02-04_4.jpg", alt: "February 2023" },
      { src: "/gallery/2023/2023-02-04_5.jpg", alt: "February 2023" },
      { src: "/gallery/2023/2023-02-05_1.jpg", alt: "February 2023" },
      { src: "/gallery/2023/2023-05-28_1.jpg", alt: "May 2023" },
      { src: "/gallery/2023/2023-05-31_1.jpg", alt: "May 2023" },
      { src: "/gallery/2023/2023-06-04_1.jpg", alt: "June 2023" },
      { src: "/gallery/2023/2023-11-14_1.jpg", alt: "November 2023" },
      { src: "/gallery/2023/2023-11-14_2.jpg", alt: "November 2023" },
      { src: "/gallery/2023/2023-11-14_3.jpg", alt: "November 2023" }
    ],
    "2024": [
      { src: "/gallery/2024/2024-02-04_1.jpg", alt: "February 2024" },
      { src: "/gallery/2024/2024-02-04_2.jpg", alt: "February 2024" },
      { src: "/gallery/2024/2024-02-12_1.jpg", alt: "February 2024" },
      { src: "/gallery/2024/2024-02-12_2.jpg", alt: "February 2024" },
      { src: "/gallery/2024/2024-02-12_3.jpg", alt: "February 2024" },
      { src: "/gallery/2024/2024-05-26_1.jpg", alt: "May 2024" },
      { src: "/gallery/2024/2024-06-02_1.jpg", alt: "June 2024" },
      { src: "/gallery/2024/2024-11-25_1.jpg", alt: "November 2024" }
    ],
    "2025": [
      { src: "/gallery/2025/2025-02-02_1.jpg", alt: "February 2025" },
      { src: "/gallery/2025/2025-02-24_1.jpg", alt: "February 2025" },
      { src: "/gallery/2025/2025-02-24_2.jpg", alt: "February 2025" },
      { src: "/gallery/2025/2025-03-15_1.jpg", alt: "March 2025" },
      { src: "/gallery/2025/2025-03-15_2.jpg", alt: "March 2025" },
      { src: "/gallery/2025/2025-03-15_3.jpg", alt: "March 2025" },
      { src: "/gallery/2025/2025-03-15_4.jpg", alt: "March 2025" },
      { src: "/gallery/2025/2025-04-27_1.jpg", alt: "April 2025" },
      { src: "/gallery/2025/2025-04-27_2.jpg", alt: "April 2025" },
      { src: "/gallery/2025/2025-05-13_1.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-05-13_2.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-05-13_3.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-05-27_1.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-05-27_2.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-05-27_3.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-05-27_4.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-05-27_5.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-06-01_1.jpg", alt: "June 2025" },
      { src: "/gallery/2025/2025-06-01_2.jpg", alt: "June 2025" },
      { src: "/gallery/2025/2025-06-01_3.jpg", alt: "June 2025" },
      { src: "/gallery/2025/2025-06-01_4.jpg", alt: "June 2025" },
      { src: "/gallery/2025/2025-06-01_5.jpg", alt: "June 2025" },
      { src: "/gallery/2025/2025-06-16_1.jpg", alt: "June 2025" },
      { src: "/gallery/2025/2025-08-24_1.jpg", alt: "August 2025" },
      { src: "/gallery/2025/2025-08-24_2.jpg", alt: "August 2025" },
      { src: "/gallery/2025/2025-08-24_3.jpg", alt: "August 2025" }
    ]
  };

  const getAllPhotos = () => {
    const localPhotos = Object.values(galleryData).flat();
    return [...localPhotos, ...storagePhotos];
  };

  const getFilteredPhotos = () => {
    if (selectedYear === "all") {
      return getAllPhotos();
    }
    
    // Filter local photos by year from galleryData keys
    const localFiltered = galleryData[selectedYear as keyof typeof galleryData] || [];
    
    // Filter storage photos by their year property
    const storageFiltered = storagePhotos.filter(photo => photo.year === selectedYear);
    
    return [...localFiltered, ...storageFiltered];
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t("photos.title")} <span className="text-primary">{t("photos.gallery")}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {t("photos.subtitle")}
            </p>
          </div>

          {/* Tabs for Videos and Photos */}
          <Tabs defaultValue="photos" className="mb-12">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="photos">{t("photos.title")}</TabsTrigger>
              <TabsTrigger value="videos">{t("videos.title")}</TabsTrigger>
            </TabsList>

            {/* Photos Section */}
            <TabsContent value="photos" className="space-y-8">
              {/* Year Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <button
                  onClick={() => setSelectedYear("all")}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedYear === "all"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {t("photos.all")}
                </button>
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all ${
                      selectedYear === year
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>

              {/* Photo Grid */}
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading gallery...</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {getFilteredPhotos().map((photo, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer transition-all duration-300 hover:shadow-elegant hover:-translate-y-1"
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={() => handleImageError(photo.src)}
                      />
                    </div>
                  ))}
                </div>
              )}
              </TabsContent>

            {/* Videos Section */}
            <TabsContent value="videos" className="space-y-8">
              {/* Year Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <button
                  onClick={() => setSelectedYear("all")}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedYear === "all"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {t("photos.all")}
                </button>
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all ${
                      selectedYear === year
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>

              {/* Video Grid */}
              {getFilteredVideos().length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    {selectedYear === "all" 
                      ? "No videos available yet" 
                      : `No videos from ${selectedYear}`}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredVideos().map((video, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-lg bg-muted/30 transition-all duration-300 hover:shadow-elegant hover:-translate-y-1"
                    >
                      <video
                        src={video.src}
                        controls
                        className="w-full h-auto"
                        preload="metadata"
                      >
                        Your browser does not support the video tag.
                      </video>
                      <div className="p-4">
                        <p className="text-sm font-medium text-foreground">{video.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Invite Section */}
          <Card className="p-8 md:p-12 bg-gradient-to-r from-primary/10 to-secondary/10 border-0">
            <div className="text-center max-w-3xl mx-auto">
              <Heart className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-bold mb-4">
                Share Your Memories
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                We invite all former and current members to contribute their photos and videos to our ongoing memorial collection. Help us preserve the rich history of Sv. Sava Oplenac through the years!
              </p>
              <a 
                href="mailto:saintsavaoplenac@gmail.com?subject=Gallery Photo Submission"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
              >
                <Mail className="w-5 h-5" />
                Submit Your Photos
              </a>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Gallery;
