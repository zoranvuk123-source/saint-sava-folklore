import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Heart, X, ChevronLeft, ChevronRight, FolderOpen, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Gallery = () => {
  const { t } = useLanguage();
  const [selectedYear, setSelectedYear] = useState("all");
  const [storagePhotos, setStoragePhotos] = useState<{ src: string; alt: string; year: string }[]>([]);
  const [storageVideos, setStorageVideos] = useState<{ src: string; title: string; year: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeSubGallery, setActiveSubGallery] = useState<string | null>(null);

  type Photo = { src: string; alt: string };
  type SubGallery = { id: string; title: string; photos: Photo[] };
  type YearEntry = Photo[] | { photos: Photo[]; subGalleries?: SubGallery[] };

  const years = ["2026", "2025", "2024", "2023", "2020", "2019", "2018", "2017", "2016"];

  // Video data organized by year (local MP4 files)
  const videoData = {
    "2017": [
      { src: "/gallery/2017/2017-01-30_1.mp4", title: "January 2017", year: "2017" }
    ],
    "2018": [
      { src: "/gallery/2018/2018-05-14_1.mp4", title: "May 2018", year: "2018" },
      { src: "/gallery/2018/2018-05-22_1.mp4", title: "May 2018", year: "2018" }
    ],
    "2019": [
      { src: "/gallery/2019/2019-02-25_1.mp4", title: "February 2019", year: "2019" },
      { src: "/gallery/2019/2019-03-02_1.mp4", title: "March 2019", year: "2019" }
    ],
    "2025": [
      { src: "/gallery/2025/2025-05-24_1.mp4", title: "May 2025", year: "2025" },
      { src: "/gallery/2025/2025-05-25_1.mp4", title: "May 2025", year: "2025" },
      { src: "/gallery/2025/2025-06-08_1.mp4", title: "June 2025", year: "2025" },
      { src: "/gallery/2025/2025-07-14_1.mp4", title: "July 2025", year: "2025" }
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
      { src: "/gallery/2018/2018-05-28_3.jpg", alt: "May 2018" }
    ],
    "2019": [
      { src: "/gallery/2019/2019-02-27_1.jpg", alt: "February 2019" },
      { src: "/gallery/2019/2019-03-04_1.jpg", alt: "March 2019" },
      { src: "/gallery/2019/2019-05-17_1.jpg", alt: "May 2019" }
    ],
    "2020": [
      { src: "/gallery/2020/2020-01-26_1.jpg", alt: "January 2020" },
      { src: "/gallery/2020/2020-01-26_2.jpg", alt: "January 2020" }
    ],
    "2023": [
      { src: "/gallery/2023/2023-02-04_2.jpg", alt: "February 2023" },
      { src: "/gallery/2023/2023-02-04_3.jpg", alt: "February 2023" },
      { src: "/gallery/2023/2023-02-04_4.jpg", alt: "February 2023" },
      { src: "/gallery/2023/2023-02-04_5.jpg", alt: "February 2023" },
      { src: "/gallery/2023/2023-11-14_1.jpg", alt: "November 2023" },
      { src: "/gallery/2023/2023-11-14_2.jpg", alt: "November 2023" },
      { src: "/gallery/2023/2023-11-14_3.jpg", alt: "November 2023" }
    ],
    "2024": [
      { src: "/gallery/2024/2024-02-04_2.jpg", alt: "February 2024" },
      { src: "/gallery/2024/2024-02-12_1.jpg", alt: "February 2024" },
      { src: "/gallery/2024/2024-02-12_2.jpg", alt: "February 2024" },
      { src: "/gallery/2024/2024-02-12_3.jpg", alt: "February 2024" },
      { src: "/gallery/2024/2024-11-25_1.jpg", alt: "November 2024" }
    ],
    "2025": [
      { src: "/gallery/2025/2025-02-24_1.jpg", alt: "February 2025" },
      { src: "/gallery/2025/2025-02-24_2.jpg", alt: "February 2025" },
      { src: "/gallery/2025/2025-03-15_1.jpg", alt: "March 2025" },
      { src: "/gallery/2025/2025-03-15_2.jpg", alt: "March 2025" },
      { src: "/gallery/2025/2025-03-15_3.jpg", alt: "March 2025" },
      { src: "/gallery/2025/2025-03-15_4.jpg", alt: "March 2025" },
      { src: "/gallery/2025/2025-04-27_1.jpg", alt: "April 2025" },
      { src: "/gallery/2025/2025-04-27_2.jpg", alt: "April 2025" },
      { src: "/gallery/2025/2025-04-27_3.jpg", alt: "April 2025" },
      { src: "/gallery/2025/2025-05-13_1.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-05-13_2.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-05-13_3.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-05-27_1.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-05-27_2.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-05-27_3.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-05-27_4.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-05-27_5.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-05-27_6.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-05-27_7.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-05-27_8.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-05-27_9.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-05-27_10.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-05-27_11.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-05-27_12.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-05-27_13.jpg", alt: "May 2025" },
      { src: "/gallery/2025/2025-06-01_1.jpg", alt: "June 2025" },
      { src: "/gallery/2025/2025-06-01_2.jpg", alt: "June 2025" },
      { src: "/gallery/2025/2025-06-01_3.jpg", alt: "June 2025" },
      { src: "/gallery/2025/2025-06-01_4.jpg", alt: "June 2025" },
      { src: "/gallery/2025/2025-06-01_5.jpg", alt: "June 2025" },
      { src: "/gallery/2025/2025-06-16_1.jpg", alt: "June 2025" },
      { src: "/gallery/2025/2025-08-24_1.jpg", alt: "August 2025" },
      { src: "/gallery/2025/2025-08-24_2.jpg", alt: "August 2025" },
      { src: "/gallery/2025/2025-08-24_3.jpg", alt: "August 2025" }
    ],
    "2026": {
      photos: [
      ],
      subGalleries: [
        {
          id: "spring-folklorama-2026",
          title: "Spring Folklorama - April 25, 2026",
          photos: [
            { src: "/gallery/2026/2026_1.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/2026_2.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404384.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404385.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404386.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404389.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404391.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404392.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404393.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404394.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404395.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404396.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404397.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404402.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404404.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404405.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404406.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404409.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404410.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404411.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404413.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404414.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404415.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404416.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404417.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404419.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404420.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404421.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404422.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404423.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404424.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404425.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404426.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404427.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404428.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404429.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404430.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404431.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404432.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404433.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404434.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404435.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404436.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404437.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404438.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404439.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404440.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404441.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404442.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404443.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404444.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404445.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404446.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404447.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404448.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404449.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404450.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404451.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404452.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404453.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404454.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404455.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404456.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404457.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404458.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404459.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404460.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404461.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404462.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404463.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404464.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404465.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404466.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404467.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404468.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404469.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404470.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404471.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404472.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404473.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404474.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404475.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404476.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404477.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404478.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404479.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404480.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404481.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404482.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404483.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404484.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404485.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404486.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404487.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404488.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404489.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404492.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404493.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404494.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404495.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404496.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404497.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404498.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404499.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404500.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404501.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404502.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404503.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404504.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404505.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404506.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404507.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404508.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404509.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404511.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404512.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404513.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404514.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404515.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404516.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404517.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404519.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404520.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404521.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404522.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404523.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404524.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404525.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404526.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404527.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404528.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404529.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404530.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404531.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404532.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404533.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404534.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404535.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404537.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404538.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404541.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404542.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404543.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404544.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404545.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404546.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404547.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404548.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404549.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404550.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404551.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404552.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404553.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404554.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404555.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404556.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404557.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404558.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404559.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404560.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404561.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404562.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404564.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404565.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404566.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404567.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404568.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404569.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404570.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404574.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404576.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404578.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404579.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404580.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404581.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404582.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404583.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404584.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404585.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404587.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404588.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404589.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404590.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404591.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404592.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404593.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404594.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404595.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404596.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404597.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404598.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404599.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404600.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404601.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404602.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404603.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404604.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404605.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404606.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404607.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404608.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404609.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404611.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404612.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404613.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404614.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404616.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404617.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404618.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404619.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404620.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404621.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404622.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404623.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404624.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404625.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404627.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404628.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404629.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404631.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404632.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404634.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404635.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404636.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404637.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404638.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404639.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404640.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404641.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404642.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404645.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404646.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404647.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404648.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404649.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404650.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404651.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404652.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404653.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404654.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404656.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404658.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404659.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404660.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404661.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404662.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404665.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404666.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404667.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404668.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404669.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404671.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404674.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404675.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404676.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404678.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404681.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404682.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404683.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404684.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404685.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404686.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404687.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404688.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404689.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404690.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404691.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404692.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404694.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404696.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404699.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404700.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404701.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404702.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404703.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404704.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404705.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404706.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404707.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404708.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404709.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404711.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404712.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404713.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404714.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404715.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404716.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404717.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404718.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404721.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404722.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404723.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404724.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404725.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404726.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404727.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404728.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404731.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404732.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404733.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404734.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404735.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404736.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404737.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404738.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404740.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404741.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404743.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404745.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404747.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404748.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404751.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404752.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404753.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404754.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404755.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404756.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404758.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404759.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404760.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404761.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404762.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404763.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404764.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404765.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404767.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404768.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404769.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404770.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404771.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404773.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404775.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404776.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404777.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404778.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404779.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404780.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404781.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404782.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404783.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404784.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404785.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404786.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404787.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404788.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404789.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404790.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404791.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404792.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404794.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404795.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404796.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404798.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404800.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404801.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404802.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404803.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404806.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404807.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404808.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404809.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404810.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404811.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404812.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404813.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404817.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404821.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404823.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404824.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404825.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404826.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404827.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404830.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404831.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404832.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404833.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404834.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404835.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404837.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404838.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404839.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404841.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404842.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404843.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404845.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404846.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404847.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404848.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404850.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404854.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404855.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404856.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404858.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404859.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404860.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404861.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404864.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404865.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404867.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404869.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404870.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404871.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404872.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404873.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404874.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404875.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404876.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404877.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404878.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404879.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404881.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404882.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404884.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404885.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404886.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404888.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404891.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404892.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404893.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404895.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404897.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404898.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404900.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404901.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404902.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404904.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404907.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404908.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404909.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404910.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404912.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404913.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404914.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404915.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404916.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404917.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404918.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404920.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404921.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404922.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404923.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404924.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404925.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404926.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404927.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404929.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404930.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404932.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404933.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404934.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404935.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404936.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404938.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404939.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404942.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404944.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404945.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404947.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404948.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404949.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404951.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404953.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404955.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404958.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404960.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404962.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404963.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404964.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404965.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404966.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404967.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404968.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404969.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404971.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404973.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404974.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404975.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404978.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404979.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404980.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404982.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404984.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404986.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404987.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404989.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404990.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404991.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404992.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404993.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404994.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404995.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404997.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404998.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7404999.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405000.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405002.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405003.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405004.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405006.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405007.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405008.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405010.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405011.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405013.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405015.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405017.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405019.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405020.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405022.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405024.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405025.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405026.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405029.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405030.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405031.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405032.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405033.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405034.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405035.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405036.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405038.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405040.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405041.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405042.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405043.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405044.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405045.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405046.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405047.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405049.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405051.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405052.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405053.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405054.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405055.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405057.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405061.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405063.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405065.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405066.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405067.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405069.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405071.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405073.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405075.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405078.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405079.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405080.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405081.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405082.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405084.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405085.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405087.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405089.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405090.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405093.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405094.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405096.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405099.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405103.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405108.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405112.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405113.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405115.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405116.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405117.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405118.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405119.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405120.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405121.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405125.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405127.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405129.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405131.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405132.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405133.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405135.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405137.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405138.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405139.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405140.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405142.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405144.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405147.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405151.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405152.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405154.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405155.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/2026_3.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/2026_4.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405156.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405157.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405160.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405162.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405163.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405164.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405165.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405166.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405167.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405168.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405169.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405170.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405171.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405173.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405175.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405177.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405178.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405179.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405180.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405181.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405182.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405183.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405184.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405187.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405190.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405191.jpg", alt: "Spring Folklorama - April 25, 2026" },
            { src: "/gallery/2026/spring-folklorama/A7405194.jpg", alt: "Spring Folklorama - April 25, 2026" }
          ]
        }
      ]
    }
  } as Record<string, YearEntry>;

  // Helpers to read year entries (which may be a plain array or an object with subGalleries)
  const getYearPhotos = (year: string): Photo[] => {
    const entry = galleryData[year];
    if (!entry) return [];
    return Array.isArray(entry) ? entry : entry.photos;
  };
  const getYearSubGalleries = (year: string): SubGallery[] => {
    const entry = galleryData[year];
    if (!entry || Array.isArray(entry)) return [];
    return entry.subGalleries ?? [];
  };
  const getActiveSubGalleryObj = (): SubGallery | null => {
    if (!activeSubGallery || selectedYear === "all") return null;
    return getYearSubGalleries(selectedYear).find((s) => s.id === activeSubGallery) ?? null;
  };

  const getAllPhotos = (): Photo[] => {
    return Object.keys(galleryData).flatMap((year) => [
      ...getYearPhotos(year),
      ...getYearSubGalleries(year).flatMap((s) => s.photos)
    ]);
  };

  const getFilteredPhotos = (): Photo[] => {
    if (selectedYear === "all") return getAllPhotos();
    const sub = getActiveSubGalleryObj();
    if (sub) return sub.photos;
    return getYearPhotos(selectedYear);
  };

  const filteredPhotos = getFilteredPhotos();
  const activeSub = getActiveSubGalleryObj();
  const subGalleriesForYear =
    selectedYear !== "all" && !activeSub ? getYearSubGalleries(selectedYear) : [];

  // Reset sub-gallery when switching years
  useEffect(() => {
    setActiveSubGallery(null);
  }, [selectedYear]);

  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filteredPhotos.length) % filteredPhotos.length
    );
  const showNext = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % filteredPhotos.length
    );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, filteredPhotos.length]);

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

              {/* Sub-gallery breadcrumb */}
              {activeSub && (
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setActiveSubGallery(null)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-muted/80 font-semibold transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to {selectedYear}
                  </button>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">
                    {activeSub.title}
                  </h3>
                </div>
              )}

              {/* Photo Grid */}
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading gallery...</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-2">
                  {/* Sub-gallery tiles (only when a year is selected and no sub-gallery is active) */}
                  {subGalleriesForYear.map((sub) => {
                    const cover = sub.photos[0];
                    return (
                      <div
                        key={sub.id}
                        onClick={() => setActiveSubGallery(sub.id)}
                        className="group relative overflow-hidden rounded-sm aspect-square cursor-pointer transition-all duration-300 hover:shadow-elegant hover:z-10"
                      >
                        {cover && (
                          <img
                            src={cover.src}
                            alt={sub.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 flex flex-col items-center justify-center text-center p-3">
                          <FolderOpen className="w-8 h-8 md:w-10 md:h-10 text-white mb-2 drop-shadow" />
                          <span className="text-white font-semibold text-sm md:text-base leading-tight drop-shadow">
                            {sub.title}
                          </span>
                          <span className="mt-1 text-white/80 text-xs">
                            {sub.photos.length} {sub.photos.length === 1 ? "photo" : "photos"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  {filteredPhotos.map((photo, index) => (
                    <div
                      key={`${photo.src}-${index}`}
                      onClick={() => setLightboxIndex(index)}
                      className="group relative overflow-hidden rounded-sm aspect-square cursor-pointer transition-all duration-300 hover:shadow-elegant hover:z-10"
                    >
                      <img
                        key={photo.src}
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onLoad={(e) => {
                          e.currentTarget.style.display = "";
                        }}
                        onError={(e) => {
                          // Hide images that fail to load so captions don't float alone
                          e.currentTarget.style.display = "none";
                        }}
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

      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-white transition-colors p-2 rounded-full bg-black/40 hover:bg-black/60"
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous"
            className="absolute left-2 md:left-6 text-white/80 hover:text-white transition-colors p-2 md:p-3 rounded-full bg-black/40 hover:bg-black/60"
          >
            <ChevronLeft className="w-7 h-7 md:w-10 md:h-10" />
          </button>

          <img
            src={filteredPhotos[lightboxIndex].src}
            alt={filteredPhotos[lightboxIndex].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[92vw] max-h-[88vh] object-contain rounded-sm shadow-2xl"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next"
            className="absolute right-2 md:right-6 text-white/80 hover:text-white transition-colors p-2 md:p-3 rounded-full bg-black/40 hover:bg-black/60"
          >
            <ChevronRight className="w-7 h-7 md:w-10 md:h-10" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/40 px-3 py-1 rounded-full">
            {lightboxIndex + 1} / {filteredPhotos.length}
          </div>
        </div>
      )}
    </main>
  );
};

export default Gallery;
