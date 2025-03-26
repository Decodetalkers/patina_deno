import { render } from "preact";

import { useEffect, useRef, useState } from "preact/hooks";

import styled, { AttributeGroup, StyleGroup } from "styled-components-deno";

import { defaultConfig, PantaData } from "@nobody/patina";

const OutputBox = styled.div`
  overflow: hidden;
  img {
    display: block;
    object-fit: contain;
  }
  @media(min-width:820px) {
    img {
      float: left;
      width: 50%;
      max-width: 500px;
      max-height: 500px;

    }
  }
  @media(max-width:820px) {
    img {
      margin: 0 auto;
    }
    .source-image {
      display: none
    }
  }
`;
const CtrlBoxName = ["ctrl-box"] as const;

const CtrlBoxGroup = new StyleGroup(CtrlBoxName, "ctrl-box");

CtrlBoxGroup.setCSS("ctrl-box")`
  padding: 10px 15px
`;

const InputBox = styled.div`
  padding: 4px 0;
`;

const ctrlBox = CtrlBoxGroup.generate();
const appKeys = [`data-running="true"`] as const;

const appStyle = new AttributeGroup(appKeys);

appStyle.setCSS('data-running="true"')`
  cursor: wait;
  ${ctrlBox["ctrl-box"]} {
    pointer-events: none
  }
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
  paintaData.setImageSrc("./static/images/totoro-avatar.jpg");

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
        <img
          className="source-image"
          src={srcUrl}
          ref={imgRef}
          width={previewWidth}
        />
        <img src={outputUrl} width={previewWidth} />
      </OutputBox>
      <div className={ctrlBox["ctrl-box"]}>
        <button type="submit">Choose or clip Picture</button>
      </div>
    </div>
  );
}
function App() {
  return <ImagePreview />;
}

if (mount) {
  render(<App />, mount!);
}
