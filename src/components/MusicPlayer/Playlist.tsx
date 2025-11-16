import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  albumArt: string;
}

interface PlaylistProps {
  tracks: Track[];
  currentTrackId: string;
  isPlaying: boolean;
  onTrackSelect: (trackId: string) => void;
}

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const Playlist = ({
  tracks,
  currentTrackId,
  isPlaying,
  onTrackSelect,
}: PlaylistProps) => {
  return (
    <div className="space-y-1">
      {tracks.map((track, index) => {
        const isCurrent = track.id === currentTrackId;
        return (
          <div
            key={track.id}
            onClick={() => onTrackSelect(track.id)}
            className={`group flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all hover-lift ${
              isCurrent
                ? "glass-effect border-primary/30"
                : "hover:bg-secondary/50"
            }`}
          >
            <div className="relative w-8 flex items-center justify-center">
              {isCurrent ? (
                <div className="w-4 h-4">
                  {isPlaying ? (
                    <div className="flex gap-0.5 items-end h-4">
                      <div className="w-0.5 bg-primary animate-pulse-glow h-2" />
                      <div className="w-0.5 bg-primary animate-pulse-glow h-4" style={{ animationDelay: "0.2s" }} />
                      <div className="w-0.5 bg-primary animate-pulse-glow h-3" style={{ animationDelay: "0.4s" }} />
                    </div>
                  ) : (
                    <Pause className="h-4 w-4 text-primary" />
                  )}
                </div>
              ) : (
                <>
                  <span className="text-muted-foreground text-sm group-hover:hidden">
                    {index + 1}
                  </span>
                  <Play className="h-4 w-4 text-primary hidden group-hover:block" />
                </>
              )}
            </div>

            <img
              src={track.albumArt}
              alt={track.title}
              className="w-10 h-10 rounded object-cover"
            />

            <div className="flex-1 min-w-0">
              <h4
                className={`font-medium truncate ${
                  isCurrent ? "text-primary" : "text-foreground"
                }`}
              >
                {track.title}
              </h4>
              <p className="text-sm text-muted-foreground truncate">
                {track.artist}
              </p>
            </div>

            <span className="text-sm text-muted-foreground">
              {formatDuration(track.duration)}
            </span>
          </div>
        );
      })}
    </div>
  );
};
