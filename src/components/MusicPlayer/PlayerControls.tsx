import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  shuffle: boolean;
  onShuffleToggle: () => void;
  repeat: boolean;
  onRepeatToggle: () => void;
}

export const PlayerControls = ({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  shuffle,
  onShuffleToggle,
  repeat,
  onRepeatToggle,
}: PlayerControlsProps) => {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={onShuffleToggle}
        className={`hover:text-primary transition-colors ${
          shuffle ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <Shuffle className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevious}
        className="text-foreground hover:text-primary transition-colors"
      >
        <SkipBack className="h-5 w-5" />
      </Button>

      <Button
        variant="default"
        size="icon"
        onClick={onPlayPause}
        className="h-12 w-12 rounded-full gradient-primary hover:scale-110 transition-transform glow-primary"
      >
        {isPlaying ? (
          <Pause className="h-6 w-6 fill-white" />
        ) : (
          <Play className="h-6 w-6 fill-white ml-1" />
        )}
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        className="text-foreground hover:text-primary transition-colors"
      >
        <SkipForward className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onRepeatToggle}
        className={`hover:text-primary transition-colors ${
          repeat ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <Repeat className="h-4 w-4" />
      </Button>
    </div>
  );
};
