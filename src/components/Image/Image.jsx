import React from "react";
import { useNearScreen } from "../../hooks/useNearScreen";

export const Image = ({ src, imageClass }) => {
  const [isNear, fromRef] = useNearScreen();

  return (
    <figure ref={fromRef}>
      {isNear && <img src={src} className={imageClass} alt="lazy animal" />}
    </figure>
  );
};
