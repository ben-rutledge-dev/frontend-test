import { ReactNode, useEffect } from "react";
import "./Modal.css";

interface ModalProps {
  children?: ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="backdrop" onClick={handleBackdropClick}>
      <div className="modal">
        <button
          className="closeButton"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
