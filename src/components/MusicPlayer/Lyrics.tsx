import { useEffect, useRef } from "react";
import { LyricLine } from "./Playlist";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LyricsProps {
  lyrics: LyricLine[];
  currentTime: number;
}

export const Lyrics = ({ lyrics, currentTime }: LyricsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeLyricRef = useRef<HTMLDivElement>(null);

  const currentLyricIndex = lyrics.findIndex((lyric, index) => {
    const nextLyric = lyrics[index + 1];
    return currentTime >= lyric.time && (!nextLyric || currentTime < nextLyric.time);
  });

  useEffect(() => {
    if (activeLyricRef.current && scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        const lyricElement = activeLyricRef.current;
        const containerHeight = scrollContainer.clientHeight;
        const lyricTop = lyricElement.offsetTop;
        const lyricHeight = lyricElement.clientHeight;
        
        scrollContainer.scrollTo({
          top: lyricTop - containerHeight / 2 + lyricHeight / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [currentLyricIndex]);

  if (!lyrics || lyrics.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <p>No lyrics available</p>
      </div>
    );
  }

  return (
    <ScrollArea ref={scrollRef} className="h-full">
      <div className="space-y-6 p-8">
        {lyrics.map((lyric, index) => (
          <div
            key={index}
            ref={index === currentLyricIndex ? activeLyricRef : null}
            className={`transition-all duration-300 ${
              index === currentLyricIndex
                ? 'text-3xl font-bold text-gradient scale-110'
                : index === currentLyricIndex - 1 || index === currentLyricIndex + 1
                ? 'text-xl text-foreground/70'
                : 'text-lg text-muted-foreground/50'
            }`}
          >
            {lyric.text}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
