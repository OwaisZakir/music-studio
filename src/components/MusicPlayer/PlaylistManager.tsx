import { useState } from "react";
import { Plus, List, Trash2, Edit2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export interface Playlist {
  id: string;
  name: string;
  trackIds: string[];
  createdAt: number;
}

interface PlaylistManagerProps {
  playlists: Playlist[];
  currentPlaylistId: string;
  onPlaylistSelect: (playlistId: string) => void;
  onPlaylistCreate: (name: string) => void;
  onPlaylistDelete: (playlistId: string) => void;
  onPlaylistRename: (playlistId: string, newName: string) => void;
}

export const PlaylistManager = ({
  playlists,
  currentPlaylistId,
  onPlaylistSelect,
  onPlaylistCreate,
  onPlaylistDelete,
  onPlaylistRename,
}: PlaylistManagerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleCreate = () => {
    if (newPlaylistName.trim()) {
      onPlaylistCreate(newPlaylistName.trim());
      setNewPlaylistName("");
    }
  };

  const handleRename = (id: string) => {
    if (editName.trim()) {
      onPlaylistRename(id, editName.trim());
      setEditingId(null);
      setEditName("");
    }
  };

  const startEdit = (playlist: Playlist) => {
    setEditingId(playlist.id);
    setEditName(playlist.name);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <List className="h-4 w-4" />
            Playlists
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Playlists</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="New playlist name"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              />
              <Button onClick={handleCreate} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {playlists.map((playlist) => (
                  <div
                    key={playlist.id}
                    className={`flex items-center gap-2 p-3 rounded-lg transition-all ${
                      playlist.id === currentPlaylistId
                        ? "glass-effect border-primary/30"
                        : "hover:bg-secondary/50"
                    }`}
                  >
                    {editingId === playlist.id ? (
                      <>
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleRename(playlist.id)}
                          className="flex-1"
                          autoFocus
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleRename(playlist.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setEditingId(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            onPlaylistSelect(playlist.id);
                            setIsOpen(false);
                          }}
                          className="flex-1 text-left font-medium"
                        >
                          {playlist.name}
                        </button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => startEdit(playlist)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setDeleteId(playlist.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Playlist</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this playlist? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteId) {
                  onPlaylistDelete(deleteId);
                  setDeleteId(null);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
