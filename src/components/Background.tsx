import { useState } from "react";
import { Blurhash } from "react-blurhash";
import type { Random } from "unsplash-js/dist/methods/photos/types";

interface Props {
  photo: Random;
}

function Background({ photo }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <>
      <div className="inset-0 fixed">
        <img
          className={`object-cover w-full h-full transition-opacity duration-500 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          src={photo.urls.full}
          alt={photo.alt_description || "Unsplash Photo"}
          onLoad={() => setImgLoaded(true)}
        />
      </div>
      <div className="inset-0 fixed">
        {photo.blur_hash ? (
          <div
            className={`transition-opacity duration-1000 ${
              imgLoaded ? "opacity-0" : "opacity-100"
            }`}
          >
            <Blurhash
              hash={photo.blur_hash}
              width={window.innerWidth}
              height={window.innerHeight}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Background;
