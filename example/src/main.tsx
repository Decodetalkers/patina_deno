import { render } from "preact";

import { useEffect, useRef, useState } from "preact/hooks";

import styled, { AttributeGroup } from "styled-components-deno";

import { defaultConfig, PantaData } from "@nobody/patina";

const OutputBox = styled.div`
  img {
    display: block;
    object-fit: contain;
    with: 50%;
    float: left;
  }
`;

const appKeys = [`data-running="true"`] as const;

const appStyle = new AttributeGroup(appKeys);

appStyle.setCSS('data-running="true"')`
  cursor: wait;
`;

appStyle.generate();

const appCSS = appStyle.groupName;

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
  const [running, setRunning] = useState(paintaData.isRunning);
  const [outputUrl, setOutputUrl] = useState(paintaData.outputUrl);
  const [previewWidth, setPreviewWidth] = useState(paintaData.srcWidth);

  useEffect(() => {
    imgRef.current.onload = async () => {
      try {
        await paintaData.patina((data) => {
          setSrcUrl(data.srcImg.src);
          setPreviewWidth(paintaData.previewWidth);
          setOutputUrl(data.outputUrl);
          setRunning(data.isRunning);
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
          setPreviewWidth(paintaData.previewWidth);
          setOutputUrl(paintaData.outputUrl);
        });
      }
    }
  });
  return (
    <div className={appCSS} data-running={running}>
      <OutputBox>
        <img src={srcUrl} ref={imgRef} width={previewWidth} />
        <img src={outputUrl} width={previewWidth} />
      </OutputBox>
    </div>
  );
}
function App() {
  return <ImagePreview />;
}

if (mount) {
  render(<App />, mount!);
}
