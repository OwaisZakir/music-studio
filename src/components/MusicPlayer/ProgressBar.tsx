import { Slider } from "@/components/ui/slider";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (value: number[]) => void;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const ProgressBar = ({ currentTime, duration, onSeek }: ProgressBarProps) => {
  return (
    <div className="flex items-center gap-3 w-full">
      <span className="text-xs text-muted-foreground min-w-[40px]">
        {formatTime(currentTime)}
      </span>
      <Slider
        value={[currentTime]}
        max={duration}
        step={1}
        onValueChange={onSeek}
        className="flex-1"
      />
      <span className="text-xs text-muted-foreground min-w-[40px]">
        {formatTime(duration)}
      </span>
    </div>
  );
};
