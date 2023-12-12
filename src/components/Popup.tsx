import "./Popup.css";

interface PopupProps {
  embedHtml: string | null;
  onCloseButtonClick: any;
}

export function Popup(props: PopupProps) {
  const { embedHtml, onCloseButtonClick } = props;

  return (
    <div className="popup">
      <button className="close-button" onClick={onCloseButtonClick}>
        X
      </button>
      {embedHtml && (
        <div
          className="video"
          dangerouslySetInnerHTML={{ __html: embedHtml }}
        />
      )}
    </div>
  );
}
