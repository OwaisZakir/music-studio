interface TrackInfoProps {
  title: string;
  artist: string;
  albumArt: string;
}

export const TrackInfo = ({ title, artist, albumArt }: TrackInfoProps) => {
  return (
    <div className="flex items-center gap-4 min-w-[240px]">
      <div className="relative group">
        <img
          src={albumArt}
          alt={title}
          className="w-14 h-14 rounded-lg object-cover glow-accent transition-all duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="flex flex-col min-w-0">
        <h3 className="font-semibold text-foreground truncate hover:text-gradient transition-all cursor-pointer">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground truncate">{artist}</p>
      </div>
    </div>
  );
};
