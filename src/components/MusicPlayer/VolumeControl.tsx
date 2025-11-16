import { Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (value: number[]) => void;
  onMuteToggle: () => void;
  isMuted: boolean;
}

export const VolumeControl = ({
  volume,
  onVolumeChange,
  onMuteToggle,
  isMuted,
}: VolumeControlProps) => {
  return (
    <div className="flex items-center gap-2 min-w-[140px]">
      <Button
        variant="ghost"
        size="icon"
        onClick={onMuteToggle}
        className="text-foreground hover:text-primary transition-colors"
      >
        {isMuted || volume === 0 ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>
      <Slider
        value={[isMuted ? 0 : volume]}
        max={100}
        step={1}
        onValueChange={onVolumeChange}
        className="w-24"
      />
    </div>
  );
};
