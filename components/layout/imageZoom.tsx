"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ImageZoomProps {
  src: string;
  width?: number;
  height?: number;
  zoom?: number;
}

const ImageZoom: React.FC<ImageZoomProps> = ({
  src,
  width = 600,
  height = 600,
  zoom = 2.5,
}) => {
  const [hover, setHover] = useState<boolean>(false);
  const [coords, setCoords] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setCoords({ x, y });
  };

  return (
    <div
      className="relative"
      style={{ width, height }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={src}
        alt="Product"
        fill
        style={{ objectFit: "contain" }}
        unoptimized
      />

      {hover && (
        <div
          className="absolute top-0 left-full ml-4 border border-gray-300 shadow-lg z-50 bg-white"
          style={{
            width: width / 2,
            height: height / 2,
            overflow: "hidden",
          }}
        >
          <Image
            src={src}
            alt="Zoomed"
            fill
            style={{
              objectFit: "contain",
              transform: `translate(-${coords.x}%, -${coords.y}%) scale(${zoom})`,
              transformOrigin: "top left",
            }}
            unoptimized
          />
        </div>
      )}
    </div>
  );
};

export default ImageZoom;
