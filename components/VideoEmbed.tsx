import React from 'react';

interface VideoEmbedProps {
  className?: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ className = '' }) => {
  return (
    <div className={`glass-card rounded-2xl overflow-hidden shadow-2xl aspect-video relative group ${className}`}>
      <iframe
        src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2FUpkeepHobbiesOfficial%2Fvideos%2F1474924136931167%2F&show_text=false&width=267&t=0"
        width="100%"
        height="100%"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        title="Facebook Live"
        className="w-full h-full"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <p className="text-white font-medium glass-button px-4 py-2 rounded-lg">
          Update iframe src in code with your Video URL
        </p>
      </div>
    </div>
  );
};

export default VideoEmbed;