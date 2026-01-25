import { Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

interface Video {
  title: string;
  url: string;
  videoId: string;
  category: string;
}

const videos: Video[] = [
  {
    title: "Group 1 Kriva Reka Performance",
    url: "https://www.youtube.com/watch?v=JNq9Z4KbN4A",
    videoId: "JNq9Z4KbN4A",
    category: "Dance"
  },
  {
    title: "Group 1 Igre iz Bujanovca",
    url: "https://youtu.be/Gc9jhgSfoPU",
    videoId: "Gc9jhgSfoPU",
    category: "Dance"
  },
  {
    title: "Group 2 Sumadija Performance",
    url: "https://youtu.be/Vk_WxtYyDao",
    videoId: "Vk_WxtYyDao",
    category: "Dance"
  },
  {
    title: "Pavilion Serbia",
    url: "https://www.youtube.com/watch?v=CdPAdGP1VO4",
    videoId: "CdPAdGP1VO4",
    category: "Carassauga Festival"
  },
  {
    title: "Festival Performance",
    url: "https://youtu.be/wZV5mekOx2s",
    videoId: "wZV5mekOx2s",
    category: "Carassauga Festival"
  },
  {
    title: "Costumes Fashion Show",
    url: "https://youtu.be/4-Yx_ZaXi-k",
    videoId: "4-Yx_ZaXi-k",
    category: "Carassauga Festival"
  }
];

// Helper to get YouTube thumbnail with fallback
const getYouTubeThumbnail = (videoId: string, quality: 'maxres' | 'hq' | 'mq' | 'sd' = 'hq') => {
  const qualityMap = {
    maxres: 'maxresdefault',
    hq: 'hqdefault',
    mq: 'mqdefault',
    sd: 'sddefault'
  };
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
};

const VideoThumbnail = ({ videoId, title }: { videoId: string; title: string }) => {
  const [imgSrc, setImgSrc] = useState(getYouTubeThumbnail(videoId, 'hq'));
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const fallbacks = ['mq', 'sd', 'default'] as const;

  const handleError = () => {
    if (fallbackIndex < fallbacks.length) {
      const quality = fallbacks[fallbackIndex];
      const qualityMap: Record<string, string> = {
        mq: 'mqdefault',
        sd: 'sddefault',
        default: 'default'
      };
      setImgSrc(`https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`);
      setFallbackIndex(prev => prev + 1);
    } else {
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="w-full h-full relative">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-primary/20" />
        </div>
      )}
      {hasError ? (
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Play className="w-8 h-8 text-primary" />
            </div>
            <span className="text-sm">{title}</span>
          </div>
        </div>
      ) : (
        <img
          src={imgSrc}
          alt={`${title} - Serbian kolo dance performance video thumbnail`}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onError={handleError}
          onLoad={handleLoad}
          loading="lazy"
        />
      )}
    </div>
  );
};

const VideoGallery = () => {
  const { t } = useLanguage();

  return (
    <section id="videos" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("videos.title")} <span className="text-primary">{t("videos.performances")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("videos.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <a
              key={index}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="video-card overflow-hidden border-0">
                <CardContent className="p-0 relative">
                  <div className="relative aspect-video overflow-hidden">
                    <VideoThumbnail videoId={video.videoId} title={video.title} />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                        <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-card">
                    <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">
                      {video.category === "Dance" ? t("videos.dance") : t("videos.festival")}
                    </div>
                    <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
