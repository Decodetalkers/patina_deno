import { render } from "preact";

import { useEffect, useRef, useState } from "preact/hooks";

import styled from "styled-components-deno";

import { defaultConfig, PantaData } from "@nobody/patina";

const ImageDiv = styled.div`
  overflow: hidden;
  img {
    display: block;
    object-fit: contain;
    with: 50%;
    float: left;
  }
`;

const mount = document.getElementById("mount");
const isImageRegex = /^image\/(.+)$/;

const readFileToURl = (file: File, onOver: (src: string) => void) => {
  const reader = new FileReader();
  reader.onload = () => {
    const src = reader.result;
    if (typeof src == "string") {
      onOver(src);
    }
  };
  reader.readAsDataURL(file);
};

function ImagePreview() {
  const paintaData = new PantaData(defaultConfig);

  const imgRef = useRef<HTMLImageElement>(paintaData.image);
  const [srcUrl, setSrcUrl] = useState(paintaData.img.src);
  const [outputUrl, setOutputUrl] = useState(paintaData.output);

  useEffect(() => {
    imgRef.current.onload = () => {
      paintaData.patina((data) => {
        setSrcUrl(data.image.src);
        setOutputUrl(data.output || "");
      });
    };
  }, []);
  document.addEventListener("paste", (e) => {
    const clipboardData = e.clipboardData;
    if (clipboardData?.items[0]) {
      const file = clipboardData.items[0].getAsFile();
      if (file && isImageRegex.test(file.type)) {
        readFileToURl(file, (src) => {
          paintaData.setImageSrc(src);
          setSrcUrl(paintaData.img.src);
          setOutputUrl(paintaData.output || "");
        });
      }
    }
  });
  return (
    <ImageDiv>
      <img src={srcUrl} ref={imgRef} />
      <img src={outputUrl} />
    </ImageDiv>
  );
}
function App() {
  return <ImagePreview />;
}

if (mount) {
  render(<App />, mount!);
}
