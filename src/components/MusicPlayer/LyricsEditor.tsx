import { useState } from "react";
import { LyricLine } from "./Playlist";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Save, Plus, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface LyricsEditorProps {
  lyrics: LyricLine[];
  onSave: (lyrics: LyricLine[]) => void;
  onClose: () => void;
}

export const LyricsEditor = ({ lyrics, onSave, onClose }: LyricsEditorProps) => {
  const [editedLyrics, setEditedLyrics] = useState<LyricLine[]>(lyrics);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddLine = () => {
    const newLine: LyricLine = {
      time: editedLyrics.length > 0 ? editedLyrics[editedLyrics.length - 1].time + 5 : 0,
      text: ""
    };
    setEditedLyrics([...editedLyrics, newLine]);
  };

  const handleDeleteLine = (index: number) => {
    setEditedLyrics(editedLyrics.filter((_, i) => i !== index));
  };

  const handleUpdateLine = (index: number, field: 'time' | 'text', value: string | number) => {
    const updated = [...editedLyrics];
    updated[index] = { ...updated[index], [field]: value };
    setEditedLyrics(updated);
  };

  const handleSave = () => {
    const sorted = [...editedLyrics].sort((a, b) => a.time - b.time);
    onSave(sorted);
    toast({
      title: "Lyrics saved",
      description: "Your lyrics have been updated successfully.",
    });
    onClose();
  };

  const handleSearchLyrics = () => {
    toast({
      title: "Searching lyrics...",
      description: "This feature would search online lyrics databases.",
    });
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for lyrics online..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={handleSearchLyrics} variant="secondary">
          Search
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-3 pr-4">
          {editedLyrics.map((lyric, index) => (
            <div key={index} className="glass-effect p-3 rounded-lg space-y-2">
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  step="0.1"
                  value={lyric.time}
                  onChange={(e) => handleUpdateLine(index, 'time', parseFloat(e.target.value))}
                  className="w-24"
                  placeholder="Time"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteLine(index)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={lyric.text}
                onChange={(e) => handleUpdateLine(index, 'text', e.target.value)}
                placeholder="Lyric line..."
                className="min-h-[60px]"
              />
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex gap-2 pt-4 border-t border-border/20">
        <Button onClick={handleAddLine} variant="secondary" className="flex-1">
          <Plus className="h-4 w-4 mr-2" />
          Add Line
        </Button>
        <Button onClick={handleSave} className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          Save Lyrics
        </Button>
      </div>
    </div>
  );
};
