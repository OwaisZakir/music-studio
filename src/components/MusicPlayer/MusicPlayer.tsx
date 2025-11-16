import { useState, useEffect } from "react";
import { PlayerControls } from "./PlayerControls";
import { ProgressBar } from "./ProgressBar";
import { VolumeControl } from "./VolumeControl";
import { TrackInfo } from "./TrackInfo";
import { Playlist, Track } from "./Playlist";
import { ScrollArea } from "@/components/ui/scroll-area";

const DEMO_TRACKS: Track[] = [
  {
    id: "1",
    title: "Neon Dreams",
    artist: "Synthwave Collective",
    album: "Electric Nights",
    duration: 245,
    albumArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
  },
  {
    id: "2",
    title: "Midnight Drive",
    artist: "Retro Wave",
    album: "Night Cruiser",
    duration: 198,
    albumArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Digital Horizon",
    artist: "Cyber Sound",
    album: "Future Vision",
    duration: 267,
    albumArt: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
  },
  {
    id: "4",
    title: "Starlight Echo",
    artist: "Cosmic Beats",
    album: "Galaxy Dreams",
    duration: 223,
    albumArt: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
  },
  {
    id: "5",
    title: "Urban Pulse",
    artist: "City Lights",
    album: "Metropolitan",
    duration: 189,
    albumArt: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
  },
];

export const MusicPlayer = () => {
  const [currentTrackId, setCurrentTrackId] = useState(DEMO_TRACKS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const currentTrack = DEMO_TRACKS.find((t) => t.id === currentTrackId) || DEMO_TRACKS[0];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= currentTrack.duration) {
          handleNext();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentTrack.duration]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    const currentIndex = DEMO_TRACKS.findIndex((t) => t.id === currentTrackId);
    const nextIndex = (currentIndex + 1) % DEMO_TRACKS.length;
    setCurrentTrackId(DEMO_TRACKS[nextIndex].id);
    setCurrentTime(0);
  };

  const handlePrevious = () => {
    if (currentTime > 3) {
      setCurrentTime(0);
    } else {
      const currentIndex = DEMO_TRACKS.findIndex((t) => t.id === currentTrackId);
      const prevIndex = currentIndex === 0 ? DEMO_TRACKS.length - 1 : currentIndex - 1;
      setCurrentTrackId(DEMO_TRACKS[prevIndex].id);
      setCurrentTime(0);
    }
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(false);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleTrackSelect = (trackId: string) => {
    setCurrentTrackId(trackId);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full grid lg:grid-cols-3 gap-6 p-4 md:p-6 pb-32 lg:pb-40">
          {/* Now Playing - Large Album Art */}
          <div className="lg:col-span-2 flex items-center justify-center">
            <div className="w-full max-w-2xl space-y-8 animate-slide-up">
              <div className="relative aspect-square rounded-2xl overflow-hidden glow-primary group">
                <img
                  src={currentTrack.albumArt}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="text-center space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold text-gradient">
                  {currentTrack.title}
                </h1>
                <p className="text-xl text-muted-foreground">{currentTrack.artist}</p>
                <p className="text-sm text-muted-foreground">{currentTrack.album}</p>
              </div>
            </div>
          </div>

          {/* Playlist */}
          <div className="glass-effect rounded-2xl p-6 space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Queue</h2>
            <ScrollArea className="h-[calc(100vh-280px)] lg:h-[calc(100vh-200px)]">
              <Playlist
                tracks={DEMO_TRACKS}
                currentTrackId={currentTrackId}
                isPlaying={isPlaying}
                onTrackSelect={handleTrackSelect}
              />
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* Player Bar - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 glass-effect border-t border-border/20 backdrop-blur-xl z-50">
        <div className="container mx-auto px-4 md:px-6">
          {/* Mobile Layout */}
          <div className="lg:hidden py-4 space-y-4">
            <div className="flex items-center justify-between">
              <TrackInfo
                title={currentTrack.title}
                artist={currentTrack.artist}
                albumArt={currentTrack.albumArt}
              />
            </div>
            <ProgressBar
              currentTime={currentTime}
              duration={currentTrack.duration}
              onSeek={handleSeek}
            />
            <div className="flex items-center justify-between">
              <PlayerControls
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onPrevious={handlePrevious}
                onNext={handleNext}
                shuffle={shuffle}
                onShuffleToggle={() => setShuffle(!shuffle)}
                repeat={repeat}
                onRepeatToggle={() => setRepeat(!repeat)}
              />
              <VolumeControl
                volume={volume}
                onVolumeChange={handleVolumeChange}
                onMuteToggle={handleMuteToggle}
                isMuted={isMuted}
              />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8 items-center py-4">
            <TrackInfo
              title={currentTrack.title}
              artist={currentTrack.artist}
              albumArt={currentTrack.albumArt}
            />
            
            <div className="flex flex-col items-center gap-2">
              <PlayerControls
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onPrevious={handlePrevious}
                onNext={handleNext}
                shuffle={shuffle}
                onShuffleToggle={() => setShuffle(!shuffle)}
                repeat={repeat}
                onRepeatToggle={() => setRepeat(!repeat)}
              />
              <ProgressBar
                currentTime={currentTime}
                duration={currentTrack.duration}
                onSeek={handleSeek}
              />
            </div>

            <div className="flex justify-end">
              <VolumeControl
                volume={volume}
                onVolumeChange={handleVolumeChange}
                onMuteToggle={handleMuteToggle}
                isMuted={isMuted}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
