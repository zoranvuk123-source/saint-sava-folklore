import { Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Video {
  title: string;
  url: string;
  thumbnail: string;
  category: string;
}

const videos: Video[] = [
  {
    title: "Group 1 Kriva Reka Performance",
    url: "https://www.youtube.com/watch?v=JNq9Z4KbN4A",
    thumbnail: "https://img.youtube.com/vi/JNq9Z4KbN4A/maxresdefault.jpg",
    category: "Dance"
  },
  {
    title: "Group 1 Igre iz Bujanovca",
    url: "https://youtu.be/Gc9jhgSfoPU?si=yX0CiI55yNK5JLpL",
    thumbnail: "https://img.youtube.com/vi/Gc9jhgSfoPU/maxresdefault.jpg",
    category: "Dance"
  },
  {
    title: "Group 2 Sumadija Performance",
    url: "https://youtu.be/Vk_WxtYyDao",
    thumbnail: "https://img.youtube.com/vi/Vk_WxtYyDao/maxresdefault.jpg",
    category: "Dance"
  },
  {
    title: "Pavilion Serbia",
    url: "https://www.youtube.com/watch?v=CdPAdGP1VO4",
    thumbnail: "https://img.youtube.com/vi/CdPAdGP1VO4/maxresdefault.jpg",
    category: "Carassauga Festival"
  },
  {
    title: "Festival Performance",
    url: "https://youtu.be/wZV5mekOx2s",
    thumbnail: "https://img.youtube.com/vi/wZV5mekOx2s/maxresdefault.jpg",
    category: "Carassauga Festival"
  },
  {
    title: "Costumes Fashion Show",
    url: "https://youtu.be/4-Yx_ZaXi-k?si=KUeFk3sR4uXd3uBs",
    thumbnail: "https://img.youtube.com/vi/4-Yx_ZaXi-k/maxresdefault.jpg",
    category: "Carassauga Festival"
  }
];

const VideoGallery = () => {
  return (
    <section id="videos" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Performance <span className="text-primary">Videos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience our captivating performances showcasing traditional Serbian dances and cultural celebrations
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
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
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
                      {video.category}
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
