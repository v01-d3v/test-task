import "./Thumbnail.css";

interface ThumbnailProps {
  image: string;
  title: string;
  handlePlaybackClick: any;
}

export function Thumbnail(props: ThumbnailProps) {
  const { image, title, handlePlaybackClick } = props;

  return (
    <div className="thumbnail">
      <span className="title">{title}</span>
      <img
        src={image}
        className="preview-image"
        style={{ cursor: "pointer" }}
        onClick={handlePlaybackClick}
      />
    </div>
  );
}
