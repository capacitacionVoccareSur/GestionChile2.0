interface VideoEmbedProps {
  url: string;
  title?: string;
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export function VideoEmbed({ url, title = "Video" }: VideoEmbedProps) {
  const youtubeId = getYouTubeId(url);

  if (youtubeId) {
    return (
      <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
        <div className="relative aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
      <video
        src={url}
        controls
        className="w-full"
        title={title}
      >
        Tu navegador no soporta la reproducción de video.
      </video>
    </div>
  );
}
