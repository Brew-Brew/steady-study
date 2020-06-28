---
title: video tag React 컴포넌트로 custom 하기
createdDate: "2020-06-27"
updatedDate: "2020-06-27"
author: Ideveloper
tags:
  - frontend
  - react
image: video.png
draft: false
---

## 😀 시작하기에 앞서

video tag를 사용하여 각 브라우저에서 제공하는 비디오 UI를 노출시킬수 있지만, 브라우저마다 다르게 보여지기도 하고, 원하는 디자인 혹은 원하는 기능을 추가하여 custom 하고 싶을때가 있습니다. 따라서 이런 요구사항들을 충족하기 위해 video 컴포넌트를 react에서 custom 하는 방법을 알아봅시다.

### video tag attribute

video 컴포넌트를 custom 하여 제작하기전에 어떤 attribute들이 있는지 대략 살펴보면 아래와 같습니다.

- loop
  - 동영상이 끝나면, 동영상을 다시 재생할지를 나타내는 boolean 값입니다.
- muted
  - 음소거를 적용할지를 나타내는 boolean 값입니다.
- playsInline

  - ios에서 영상을 별도의 창으로 띄우지않고, 인라인으로 띄울지여부 값입니다.
  - webkit 접두어를 추가하여 webkit-playsinline으로 추가하여 사용했었으나 최근 HTML 사양에 추가되어 접두사 없이도 사용가능합니다.

- 그외
  - https://developer.mozilla.org/ko/docs/Web/HTML/Element/Video 로 들어가시면 더 많은 attribute들을 확인 가능합니다.

### HTMLMediaElement

https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement

또한 HTMLMediaElement는 오디오와 비디오에 통용되는 미디어 관련 확장성을 제공하기 위해 HTMLElement에 메소드와 프로퍼티를 추가한 인터페이스입니다. HTMLVideoElement 와 HTMLAudioElement 는 이 인터페이스를 상속하기 때문에 다양한 attribute나 메소드들을 활용할 수 있습니다.

**그 중 비디오 컴포넌트 custom에 사용되는 몇가지 method나 attribute를 확인하면 아래와 같습니다.**

`관련 attribute`

- duration (영상 길이)
  - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/duration
- currentTime (영상 시간)
  - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime
- autoplay (자동재생 여부)
  - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/autoplay

`관련 함수`

- play
  - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
- pause
  - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause

---

## 🛠 필요한 컴포넌트 제작하기

기본 브라우저에서 제공되는 video tag UI 는 모바일/데스크탑에서 아래와 같이 나오는것을 볼 수 있습니다.

```html
<video controls>
  <source src={videoSrc}></source>
</video>
```

![image](https://user-images.githubusercontent.com/26598542/85918294-60671a00-b89c-11ea-8c49-1a875b126c98.gif)

그러나 서비스를 제작하다보면, 디바이스에 상관없이 동일한 UI를 보여주고 싶고, 아래 control bar를 custom 하고 싶기도 하고, 재생/정지 등의 UI를 커스텀하고 싶을때가 있습니다. **예시로 제작할 video 컴포넌트는 아래와 같습니다.** 이를 위해서는 동영상 재생에 따른 시간 업데이트나, fade 애니메이션, 재생/일시정지, progress bar 이동에 따른 시간 업데이트 등등을 모두 구현해야만 합니다.

![image](https://user-images.githubusercontent.com/26598542/85918243-e0d94b00-b89b-11ea-8455-9599ebf0bfe4.gif)

먼저, 제작할 컴포넌트의 예시 코드를 보여드리면 아래와 같습니다.
크게

**1.영상 출력 부분에 해당하는 Video 컴포넌트**

**2.동영상 재생시간 조정, 볼륨조정 등등에 해당하는 ControlBar 컴포넌트**

**3.동영상 시간조절 영역에 해당하는 Progress 컴포넌트**

세가지 입니다.

개별 스타일 file들은 https://github.com/Brew-Brew/react-video repo에서 확인하신후에 적용해주시면 감사하겠습니다!

### Video 컴포넌트

```typescript
import classNames from "classnames";
import React, { memo, useEffect, useRef, useState } from "react";

import styles from "./video.module.scss";
import Controlbar from "./Controlbar";

interface IProps {
  className?: string;
  src: string;
}

const Video: React.FC<IProps> = ({ className, src }) => {
  const [nowPlaying, setNowPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControl, setShowControl] = useState(false);

  const ref = useRef<HTMLVideoElement>(null);

  const totalTime = (ref && ref.current && ref.current.duration) || 0;
  const videoElement = ref && ref.current;

  const classProps = classNames(styles.video, className);

  const videoSrc = src || "";
  const startTime = Math.floor(currentTime);

  // 동영상 시간 업데이트 함수
  const addTimeUpdate = () => {
    const observedVideoElement = ref && ref.current;
    if (observedVideoElement) {
      observedVideoElement.addEventListener("timeupdate", function() {
        setCurrentTime(observedVideoElement.currentTime);
      });
      // 컴포넌트가 처음 마운트 될 때 동영상 시작 할지 말지 여부 (여기서는 시작되게 했음)
      setNowPlaying(true); // highlight-line
      observedVideoElement.play(); // highlight-line
    }
  };

  useEffect(() => {
    addTimeUpdate();
  }, []);

  // progress 이동시켰을때 실행되는 함수
  const onProgressChange = (percent: number) => {
    if (!showControl) {
      setShowControl(true);
    }

    if (videoElement) {
      const playingTime = videoElement.duration * (percent / 100);

      setCurrentTime(playingTime);
    }
  };

  // play icon 클릭했을떄 실행되는 함수
  const onPlayIconClick = () => {
    if (videoElement) {
      if (nowPlaying) {
        setNowPlaying(false);
        videoElement.pause();
      } else {
        setNowPlaying(true);
        videoElement.play();
      }
    }
  };

  // control bar visible 관련 함수
  const handleControlVisible = () => {
    if (!showControl) {
      setShowControl(true);
      setTimeout(() => {
        setShowControl(false);
      }, 2000);
    }
  };

  return (
    <div className={styles.default}>
      <video
        className={classProps}
        loop={true}
        muted={true}
        ref={ref}
        playsInline={true}
        onClick={handleControlVisible}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <Controlbar
        onProgressChange={onProgressChange}
        onPlayIconClick={onPlayIconClick}
        totalTime={totalTime}
        currentTime={currentTime}
        startTime={startTime}
        showControl={showControl}
        nowPlaying={nowPlaying}
        videoElement={videoElement}
      />
    </div>
  );
};

export default memo(Video);
```

개별 상태들에 대해서 먼저 설명을 드리면, nowPlaying은 동영상 재생중인지 여부, currentTime은 현재 동영상의 재생시간, showControl은 controlbar가 visible 한지의 값입니다.

```javascript
const [nowPlaying, setNowPlaying] = useState(false);
const [currentTime, setCurrentTime] = useState(0);
const [showControl, setShowControl] = useState(false);
```

그리고 동영상과 관련한 정보들입니다.
videoElement에는 동영상 ref의 요소값을 넣고, totalTime은 동영상의 총 길이를 넣습니다.

```typescript
const ref = useRef<HTMLVideoElement>(null);

const totalTime = (ref && ref.current && ref.current.duration) || 0;
const videoElement = ref && ref.current;
```

그다음은 동영상 시간 업데이트와 관련된 초기 initialize 함수입니다. 처음 컴포넌트가 mount될때 재생되도록 설정해 주었습니다. (setNowPlaying(true), observedVideoElement.play())

```typescript
const addTimeUpdate = () => {
  const observedVideoElement = ref && ref.current;
  if (observedVideoElement) {
    observedVideoElement.addEventListener("timeupdate", function() {
      setCurrentTime(observedVideoElement.currentTime);
    });
    // 컴포넌트가 처음 마운트 될 때 동영상 시작 할지 말지 여부
    setNowPlaying(true);
    observedVideoElement.play();
  }
};

useEffect(() => {
  addTimeUpdate();
}, []);
```

그 다음은 progress bar를 이동시켰을때 실행되는 함수입니다.

```typescript
const onProgressChange = (percent: number) => {
  if (!showControl) {
    setShowControl(true);
  }

  if (videoElement) {
    const playingTime = videoElement.duration * (percent / 100);

    setCurrentTime(playingTime);
  }
};
```

그 다음은 play/pause 아이콘을 클릭했을때의 함수입니다.

```typescript
const onPlayIconClick = () => {
  if (videoElement) {
    if (nowPlaying) {
      setNowPlaying(false);
      videoElement.pause();
    } else {
      setNowPlaying(true);
      videoElement.play();
    }
  }
};
```

마지막으로는 하단 control bar의 visible과 관련된 함수입니다. 애니메이션을 주기 위해 setTimeout을 주었습니다.

```typescript
const handleControlVisible = () => {
  if (!showControl) {
    setShowControl(true);
    setTimeout(() => {
      setShowControl(false);
    }, 2000);
  }
};
```

### ControlBar 컴포넌트

![image](https://user-images.githubusercontent.com/26598542/85919518-a5904980-b8a6-11ea-857b-1ce8d7355947.png)

기존 video tag에서 controls 옵션을 주어 보여지는 UI 영역에 해당합니다. 기본 video tag에서는 controls attribute를 true로 주면(https://www.w3schools.com/tags/att_video_controls.asp) 컨트롤바가 보이지만 실제로 이 영역에 해당하는 UI를 custom 하기 위해서는 컴포넌트를 제작해야 합니다.

```typescript
import React, { useState, memo } from "react";
import classNames from "classnames";

import toTimeString from "./totimeString";
import ProgressBar from "./ProgressBar";

import styles from "./controlbar.module.scss";

import pauseIcon from "./assets/pause.png";
import playIcon from "./assets/play.png";
import muteIcon from "./assets/mute.png";
import volumeIcon from "./assets/volume.png";

interface IProps {
  onProgressChange: (percent: number) => void;
  onPlayIconClick: () => void;
  startTime: number;
  totalTime: number;
  currentTime: number;
  showControl: boolean;
  nowPlaying: boolean;
  videoElement: HTMLVideoElement | null;
}

const Controlbar: React.FC<IProps> = ({
  onProgressChange,
  onPlayIconClick,
  totalTime,
  currentTime,
  startTime,
  showControl,
  nowPlaying,
  videoElement,
}) => {
  const [volumeClicked, setVolumeClicked] = useState(false);

  const playControlClassProps = classNames(styles.playWrapper, {
    [styles.fadeIn]: showControl,
  });
  const controlBarClassProps = classNames(styles.controlBar, {
    [styles.fadeIn]: showControl,
  });
  const startTimeClassProps = classNames(styles.text, styles.startTime);
  const endTimeClassProps = classNames(styles.text, styles.endTime);

  // volume 클릭 관련 함수
  const handleVolume = () => {
    if (volumeClicked) {
      if (videoElement) {
        videoElement.muted = true;
      }
      setVolumeClicked(false);
    } else {
      if (videoElement) {
        videoElement.muted = false;
      }
      setVolumeClicked(true);
    }
  };

  // 마우스를 올렸을때 실행되는 함수
  const onMouseUp = () => {
    if (videoElement) {
      // controller를 옮긴 시점에 currentTime이 최신화 되지 않아, 이를 위해 수정
      videoElement.currentTime = currentTime;
      nowPlaying ? videoElement.play() : videoElement.pause();
    }
  };

  // 마우스를 내렸을때 실행되는 함수
  const onMouseDown = () => {
    if (videoElement) {
      videoElement.pause();
    }
  };

  return (
    <>
      <div className={controlBarClassProps}>
        <span className={startTimeClassProps}>{toTimeString(startTime)}</span>
        <ProgressBar
          max={totalTime}
          value={currentTime}
          className={styles.progressBar}
          onChange={onProgressChange}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        />
        <span className={endTimeClassProps}>{toTimeString(totalTime)}</span>
        <img
          className={styles.volume}
          src={volumeClicked ? volumeIcon : muteIcon}
          onClick={handleVolume}
        />
      </div>
      <div className={playControlClassProps}>
        <div className={styles.playBg}>
          <img
            className={styles.playIcon}
            src={nowPlaying ? pauseIcon : playIcon}
            onClick={onPlayIconClick}
          />
        </div>
      </div>
    </>
  );
};

export default memo(Controlbar);
```

controlbar 영역도 주요한 부분은 크게 두군데로 나뉠수 있는데 볼륨관련 조절 함수 부분, progress 바 조정을 위한 마우스 up/down 함수 부분입니다.

아래는 volume 관련 함수입니다.

```typescript
const handleVolume = () => {
  if (volumeClicked) {
    if (videoElement) {
      videoElement.muted = true;
    }
    setVolumeClicked(false);
  } else {
    if (videoElement) {
      videoElement.muted = false;
    }
    setVolumeClicked(true);
  }
};
```

아래는 progress바를 핸들링 하기위해 마우스를 올리고 내렸을때 실행되는 함수입니다.

```typescript
// 마우스를 올렸을때 실행되는 함수
const onMouseUp = () => {
  if (videoElement) {
    // controller를 옮긴 시점에 currentTime이 최신화 되지 않아, 이를 위해 수정
    videoElement.currentTime = currentTime;
    nowPlaying ? videoElement.play() : videoElement.pause();
  }
};

// 마우스를 내렸을때 실행되는 함수
const onMouseDown = () => {
  if (videoElement) {
    videoElement.pause();
  }
};
```

아래는 분,초를 출력하기 위한 시간 출력 함수입니다.

```typescript
const toTimeString = (second: number) => {
  const date = new Date(second * 1000);

  const mm = date.getUTCMinutes();
  const ss = date.getSeconds();

  const formattedMinute = mm + ":";
  const formattedSecond = (ss < 10 ? "0" : "") + ss;

  return formattedMinute + formattedSecond;
};

export default toTimeString;
```

### ProgressBar 컴포넌트

동영상 시간을 조절하는 progress 컴포넌트에 해당합니다. input tag를 활용해 구현했습니다.

```typescript
import classNames from "classnames";
import React from "react";

import styles from "./progressBar.module.scss";

interface IProps {
  max: number;
  value: number;
  className?: string;
  onChange: (progress: number) => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
}

const ProgressBar: React.FC<IProps> = ({
  max,
  value,
  className,
  onChange,
  onMouseDown,
  onMouseUp,
}) => {
  const classProps = classNames(styles.default, className);
  const percentNum = (value / max || 0) * 100;
  const percent = `${percentNum}%`;

  return (
    <div className={classProps}>
      <div className={styles.bar} style={{ width: percent }}>
        <input
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          onTouchStart={onMouseDown}
          onTouchEnd={onMouseUp}
          type="range"
          min="0"
          max="100"
          step="1"
          value={percentNum}
          className={styles.controller}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
```

---

## 참고하면 좋을점

### IOS 10+ 에서의 video 인라인 자동재생 이슈 (**autoplay with inline 관련**)

iOS 10에서부터 WebKit은 동영상 인라인 및 자동 재생을 완화하려고 하지만, 여전히 사이트의 대역폭과 사용자의 배터리를 염두에 두고 있습니다. 따라서 **절전모드**에서는 자동재생이 작동하지 않습니다. 또한 자동재생이 동작하게 하기 위해서는 muted, playsinline 등이 항상 true여야 합니다.

[[번역] iOS를 위한 새로운 정책](https://d0gf00t.tistory.com/35)

[Autoplaying video in WKWebView on iOS 10+](https://www.thomasvisser.me/2018/06/26/wkwebview-media/)

---

## 마치며

위 글에서 볼 수 있듯, video tag를 custom 하기 위해서는 많은 함수나, UI들을 직접 구현해야하는 비용이 뒤따르긴 합니다. 또한 저만의 방식으로 HTMLMediaElement 의 attribute나 method를 활용하여 custom 한 방식이기때문에 참고만 하시고, 여러가지 방식으로 구현해 보시기 바랍니다 :) 하지만 위에서 볼수 있듯 video tag도 얼마든지 개발자가 UI를 custom 할수있고, 여러가지 디바이스에 동일한 UI가 보여지게 할 수 있다고 말씀 드릴 수 있습니다 :) 감사합니다.

### 참고하면 좋을 링크들

- [https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/cross_browser_video_player](https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/cross_browser_video_player)
- [https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Video_player_styling_basics](https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Video_player_styling_basics)
- [http://blog.steveheffernan.com/2010/04/how-to-build-an-html5-video-player/](http://blog.steveheffernan.com/2010/04/how-to-build-an-html5-video-player/)
- [https://www.w3schools.com/howto/howto_js_rangeslider.asp](https://www.w3schools.com/howto/howto_js_rangeslider.asp)
- [https://blog.teamtreehouse.com/building-custom-controls-for-html5-videos](https://blog.teamtreehouse.com/building-custom-controls-for-html5-videos)
