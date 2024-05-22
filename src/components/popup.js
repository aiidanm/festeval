import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const ModalContent = styled.div`
  background-color: var(--modal-background-color);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 10000;
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: clamp(200px, 70vw, 500px);
  gap: 1rem;
  color: var(--text-color);
`;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>How to use this webapp</h2>
        <p>
          Simply click the login button, link your Spotify account and then
          click "get liked songs". This will then compare your liked songs
          playlist on Spotify with artists playing at Glastonbury.
        </p>
        <p>It may take a few minutes but bear with it.</p>
        <p>
          Afterwards, you will see a list of any artists you've liked that are
          performing. Click on these for more information such as stage, time,
          and which songs of theirs you have liked.
        </p>
        <p>
          We ask for permission to use some of your Spotify account data. All
          that happens in the background is pulling your playlists and then the
          songs you have in the liked songs playlist.
        </p>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
