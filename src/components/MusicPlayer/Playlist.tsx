import { Play, Pause, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface LyricLine {
  time: number;
  text: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  albumArt: string;
  lyrics?: LyricLine[];
}

interface PlaylistProps {
  tracks: Track[];
  currentTrackId: string;
  isPlaying: boolean;
  onTrackSelect: (trackId: string) => void;
  onReorder?: (tracks: Track[]) => void;
}

interface SortableTrackProps {
  track: Track;
  index: number;
  isCurrent: boolean;
  isPlaying: boolean;
  onTrackSelect: (trackId: string) => void;
}

const SortableTrack = ({
  track,
  index,
  isCurrent,
  isPlaying,
  onTrackSelect,
}: SortableTrackProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: track.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all hover-lift ${
        isCurrent
          ? "glass-effect border-primary/30"
          : "hover:bg-secondary/50"
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>

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

      <div onClick={() => onTrackSelect(track.id)} className="flex items-center gap-4 flex-1">
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
    </div>
  );
};

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
  onReorder,
}: PlaylistProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tracks.findIndex((t) => t.id === active.id);
      const newIndex = tracks.findIndex((t) => t.id === over.id);
      const reorderedTracks = arrayMove(tracks, oldIndex, newIndex);
      onReorder?.(reorderedTracks);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={tracks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-1">
          {tracks.map((track, index) => (
            <SortableTrack
              key={track.id}
              track={track}
              index={index}
              isCurrent={track.id === currentTrackId}
              isPlaying={isPlaying}
              onTrackSelect={onTrackSelect}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
