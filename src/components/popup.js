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
          Simply click the login button, link your Spotify account and then you
          will have three options.
        </p>
        <p>
          1. Get liked songs: This will compare your "liked songs" on Spotify to
          the Glastonbury 2025 lineup and present any matches
        </p>
        <p>
          2. Use a specific playlist instead: This will allow you to select a
          specific playlist you want to compare to the Glastonbury lineup.
        </p>
        <p>
          3. Use all my Playlists. This is the longest method, it will crawl
          through each of your playlists and return any matches to the
          Glastonbury lineup. This also includes your liked songs
        </p>

        <p>
          Afterwards, you will see a list of any artists you've liked that are
          performing. Click on these for more information such as stage and
          time.
        </p>
        <p>
          If an artist is highlighted then it means they clash with another
          artist you also liked
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
