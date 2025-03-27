import { JSX, render } from "preact";

import { useRef, useState } from "preact/hooks";

import styled, { AttributeGroup } from "styled-components-deno";

import { defaultConfig, PantaData } from "@nobody/patina";
import { CtrlBox, ctrlBox } from "../components/ControlBox.tsx";
import { App } from "../components/App.tsx";

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
const InputBox = styled.div`
  padding: 4px 0px;
`;

const appKeys = [`data-running="true"`] as const;

const appStyle = new AttributeGroup(appKeys);

appStyle.setCSS('data-running="true"')`
  cursor: wait;
  ${ctrlBox["ctrl-box"]} {
    pointer-events: none
  }
`;

appStyle.generate();

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

const paintaData = new PantaData(defaultConfig);
paintaData.setImageSrc("./static/images/totoro-avatar.jpg");
const form = document.createElement("form");
const input = document.createElement("input");
input.type = "file";
input.accept = "image/*";
form.appendChild(input);

function generateDownloadName(): string {
  return `[lab.magiconch.com][电子包浆]-${+Date
    .now()}.jpg`;
}

function ImagePreview() {
  const imgRef = useRef<HTMLImageElement>(paintaData.srcImg);
  const [srcUrl, setSrcUrl] = useState(paintaData.srcUrl);
  const [downloadName, setDownloadName] = useState(generateDownloadName());
  const [running, setRunning] = useState(paintaData.isRunning);
  const [outputUrl, setOutputUrl] = useState(paintaData.outputUrl);
  const [previewWidth, setPreviewWidth] = useState(paintaData.srcWidth);
  const [isGreen, setGreen] = useState(paintaData.isGreen);
  const [isPop, setPop] = useState(paintaData.isPop);
  const [useWaterMark, setUseWaterMark] = useState(paintaData.useWaterMark);

  const loaded = async () => {
    try {
      await paintaData.patina((data) => {
        setPreviewWidth(paintaData.previewWidth);
        setOutputUrl(data.outputUrl);
        setRunning(data.isRunning);
      });
    } catch (e) {
      console.error(e);
    }
  };
  const readImage = (file: File) => {
    readFileToURl(file, (src) => {
      paintaData.setImageSrc(src);
      setSrcUrl(paintaData.srcImg.src);
      setPreviewWidth(paintaData.previewWidth);
      setOutputUrl(paintaData.outputUrl);
    });
  };
  document.addEventListener("paste", (e) => {
    const clipboardData = e.clipboardData;
    if (clipboardData?.items[0]) {
      const file = clipboardData.items[0].getAsFile();
      if (file && isImageRegex.test(file.type)) {
        readImage(file);
      }
    }
  });

  const submitCallBack = (_: MouseEvent) => {
    form.reset();
    input.onchange = () => {
      if (!input.files || !input.files[0]) {
        return;
      }
      readImage(input.files[0]);
    };
    input.click();
  };

  const onGreenChanged = async (
    e: JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => {
    const isGreen = e.currentTarget.checked;
    paintaData.setIsGreen(isGreen);
    setGreen(isGreen);
    await loaded();
  };
  const onWaterMarkChanged = async (
    e: JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => {
    const isWaterMark = e.currentTarget.checked;
    paintaData.setUseWaterMark(isWaterMark);
    setUseWaterMark(isWaterMark);
    await loaded();
  };
  const onPopChanged = async (
    e: JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => {
    const isPop = e.currentTarget.checked;
    paintaData.setIsPop(isPop);
    setPop(isPop);
    await loaded();
  };
  const resetDownloadName = () => {
    setDownloadName(generateDownloadName());
  };

  return (
    <App dataRunning={running}>
      <OutputBox>
        <img
          className="source-image"
          src={srcUrl}
          ref={imgRef}
          width={previewWidth}
          onLoad={loaded}
        />
        <img src={outputUrl} width={previewWidth} />
      </OutputBox>
      <CtrlBox>
        <InputBox>
          <button type="submit" onClick={submitCallBack}>
            Choose or paste picture here
          </button>
          <a
            className="btn"
            href={outputUrl}
            download={downloadName}
            onClick={resetDownloadName}
          >
            Download
          </a>
        </InputBox>
        <InputBox>
          <label>
            <input
              type="checkbox"
              checked={isGreen}
              onChange={onGreenChanged}
            />
            Green
          </label>
          <label>
            <input
              type="checkbox"
              checked={useWaterMark}
              onChange={onWaterMarkChanged}
            />
            WaterMark
          </label>
          <label>
            <input
              type="checkbox"
              checked={isPop}
              onChange={onPopChanged}
            />
            Pop
          </label>
        </InputBox>
      </CtrlBox>
    </App>
  );
}

function Patina() {
  return <ImagePreview />;
}

if (mount) {
  render(<Patina />, mount!);
}
