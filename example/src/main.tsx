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

  const imgRef = useRef<HTMLImageElement>(paintaData.srcImg);
  const [srcUrl, setSrcUrl] = useState(paintaData.srcUrl);
  const [outputUrl, setOutputUrl] = useState(paintaData.outputUrl);
  const [srcWidth, setSrcWidth] = useState(paintaData.srcWidth);

  useEffect(() => {
    imgRef.current.onload = async () => {
      try {
        await paintaData.patina((data) => {
          setSrcUrl(data.srcImg.src);
          setSrcWidth(paintaData.srcWidth);
          setOutputUrl(data.outputUrl);
        });
      } catch (e) {
        console.error(e);
      }
    };
  }, []);
  document.addEventListener("paste", (e) => {
    const clipboardData = e.clipboardData;
    if (clipboardData?.items[0]) {
      const file = clipboardData.items[0].getAsFile();
      if (file && isImageRegex.test(file.type)) {
        readFileToURl(file, (src) => {
          paintaData.setImageSrc(src);
          setSrcUrl(paintaData.srcImg.src);
          setSrcWidth(paintaData.srcWidth);
          setOutputUrl(paintaData.outputUrl);
        });
      }
    }
  });
  return (
    <ImageDiv>
      <img src={srcUrl} ref={imgRef} width={srcWidth} />
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
