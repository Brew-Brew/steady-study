---
title: Rollup + Typescript + Storybook으로 구축하는 디자인 시스템
createdDate: "2020-05-17"
updatedDate: "2020-05-17"
author: Ideveloper
tags:
  - frontend
  - react
  - rollup
  - typescript
image: rolluptsstory.png
draft: false
---

## 시작하기에 앞서

rollup + typescript + storybook으로 디자인 시스템을 구축하는데에 관련 아티클도 해외아티클들은 많지만 예전 내용들로 작성되어 있는 경우도 있고하여 구축 당시 많은 어려움을 겪었어서 겪은 내용들을 정리해 글로 작성해 보았습니다.

#### 디자인 시스템

효용성을 위해 디자인 시스템을 많이들 구축한다.. etc

#### rollup 이란

Rollup은 Webpack과 여러 모듈(파일)들을 라이브러리나 어플리케이션으로 작게 만들어 주는 번들러입니다.

Rollup is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application. It uses the new standardized format for code modules included in the ES6 revision of JavaScript, instead of previous idiosyncratic solutions such as CommonJS and AMD. ES modules let you freely and seamlessly combine the most useful individual functions from your favorite libraries. This will eventually be possible natively everywhere, but Rollup lets you do it today.

- rollup 관련 아티클
  - https://medium.com/naver-fe-platform/webpack%EC%97%90%EC%84%9C-rollup%EC%A0%84%ED%99%98%EA%B8%B0-137dc45cbc38

#### storybook이란

Storybook은 UI 컴포넌트 개발을 할때 뛰어난 UI를 체계적이고 효율적으로 구축 할 수 있도록 도와주는 유용한 tool입니다.

[https://ideveloper2.dev/blog/2020-04-25--storybook-%EC%9E%98-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0/]이 글에 스토리북을 잘 활용하는 방법을 적어두었습니다.

---

## 디자인 시스템 구축하기

#### 1)컴포넌트 구성에 필요한 폴더 구조 만들기

```shell
npm init
yarn add -D react react-dom @types/react node-sass

```

`react react-dom peer dependency 관련`
Having them as peer dependencies will mean that once our library is installed in another project, they won't be automatically installed as dependencies.

```json
  "devDependencies": {
    "@types/react": "^16.9.35"
  },
  "peerDependencies": {
    "react": "^16.13.1",
    "react-dom": "^16.13.1"
  }
```

이제 아래와 같이 최종적을 폴더 구조를 가지도록 파일들을 생성해 줄 차례입니다.

```
.storybook/
  main.js
.gitignore
package.json
rollup.config.js
tsconfig.json
src/
  Button/
    index.tsx
    index.types.ts
    index.module.scss
    index.stories.tsx
  index.ts
```

gitignore 파일 생성

```gitignore
/node_modules
```

우선은 아래 캡쳐한 사진처럼 파일과 폴더들을 생성해 줍니다.

`src.index.ts 파일`

```typescript
// src/index.ts
export { default as Button } from "./Button";
```

`src/Button 폴더`

```typescript
// src/Button/index.tsx
import React from "react";

import styles from "./style.module.scss";

export enum ButtonType {
  DEFAULT = "default",
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

interface IProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  theme?: ButtonType;
}

const Button: React.FC<IProps> = ({ children }) => {
  return <button>{children}</button>;
};

export default Button;
```

```scss
// src/Button/style.module.scss

.default {
  padding: 8px;
}
```

일단 여기까지는 아래와 같은 구조가 만들어 집니다.

```
.gitignore
package.json
src/
  Button/
    index.tsx
    style.module.scss
  index.ts
```

#### 2) typescript 설치 및 관련 설정 해주기

typescript를 설치해줍니다.

```shell
yarn add -D typescript
```

아래와 같이 tsconfig를 설정해 줍니다. 필요에 따라 config 설정은 바꿔주셛 무방합니다.

단, 중요한 부분이 맨 윗줄 두가지에 있는데요, `"declaration": true` 와 `"declarationDir": "./build/src"` 를 명시해 줌으로써, 우리가 만들 디자인 시스템의 타입들을 자동으로 생성해 빌드 폴더에 넣어주는 역할을 하게 됩니다.

또한, `preserveModules: true` 로 옵션을 줌으로써 기존 폴더구조 그대로 build를 할수 있게 하여 그 구조 그대로 import 할수 있게 됩니다.

Option A

```
import Button from 'library/src/build/Button'
```

Option B

```
import Button from 'library'
```

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./build",
    "baseUrl": "./",
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "jsx": "react",
    "typeRoots": ["./src/typings"]
  },
  "include": ["typings", "src"]
}
```

typings안에는 아래와 같이 scss파일을 위한 타입을 선언해줍니다.

```typescript
declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}
```

여기까지는 아래와 같은 구조가 나오게 됩니다.

```
.gitignore
package.json
tsconfig.json
src/
  Button/
    index.tsx
    style.module.scss
  index.ts
```

#### 3) Rollup 설치하기

rollup 설정에 필요한 라이브러리들을 아래 명령어로 설치 해줍니다.

```shell
yarn add -D rollup rollup-plugin-typescript2 rollup-plugin-postcss @rollup/plugin-commonjs @rollup/plugin-node-resolve rollup-plugin-peer-deps-external @rollup/plugin-image
```

rollup.config.js 파일을 만들어줍니다.

```javascript
// rollup.config.js 파일

import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import image from "@rollup/plugin-image";

export default {
  input: "./src/index.ts",
  output: [
    {
      dir: "build",
      format: "esm",
      exports: "named",
      sourcemap: true,
    },
  ],
  preserveModules: true,
  plugins: [
    peerDepsExternal(),
    image(),
    resolve(),
    commonjs({
      include: /node_modules/,
    }),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss({
      extract: false,
      modules: true,
      use: ["sass"],
    }),
  ],
};
```

위 config 파일들을 간략히 각 부분들을 설명하면 아래와 같습니다.

`input`

- entry 파일 지정

`output`

여기까지는 아래와 같은 구조가 나오게 됩니다.

`plugins`

- 플러그인들을 설명하면 아래와 같습니다.
  - @rollup/plugin-commonjs
  - @rollup/plugin-node-resolve
  - rollup-plugin-peer-deps-external
  - rollup-plugin-postcss
  - rollup-plugin-typescript2

package.json의 main을 빌드한 파일을 바라보도록 바꿔주고, 빌드를 위한 script를 추가해줍니다.

```
{
  ...
  "main": "./build/index.js",
  "scripts": {
    "build": "rollup -c",
     ...
  }
}

```

이제는 아래와 같은 구조가 나오게 됩니다.

```
.gitignore
package.json
rollup.config.js
tsconfig.json
src/
  Button/
    index.tsx
    style.module.scss
  index.ts
```

#### 4) storybook 설치해주기

```shell
yarn add -D @storybook/react @babel/core babel-preset-react-app babel-loader sass-loader
```

.storybook/main.js 파일을 만들어주고 아래와 같이 넣어줍니다.
아래에서 css module을 사용할때는 css-loader 옆에 `?modules`를 넣어줘야 합니다. 관련 내용을 찾는데 꽤 시간을 썼던 기억이 있습니다..ㅎ

```javascript
const path = require("path");

module.exports = {
  stories: ["../**/*.stories.tsx"],
  // Add any Storybook addons you want here: https://storybook.js.org/addons/
  addons: [],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader?modules", "sass-loader"],
      include: path.resolve(__dirname, "../"),
    });

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [["react-app", { flow: false, typescript: true }]],
      },
    });
    config.resolve.extensions.push(".ts", ".tsx");

    return config;
  },
};
```

그리고 storybook 실행을 위한 스크립트를 아래와 같이 넣어줍니다.

```json
{
  "scripts": {
   ...
    "storybook": "start-storybook -p 9009 -s public"
   ...
  }
}
```

그리고 컴포넌트의 story 파일 역시 넣어줍니다.

```typescript
// index.stories.tsx
import React from "react";

import Button from "./index";

export default {
  title: "버튼",
  component: Button,
  parameters: {
    componentSubtitle: "Button 컴포넌트",
  },
};

export const defaultButton = () => {
  return <Button>버튼</Button>;
};
```

#### 5) 라이브러리 배포하기

npm publish 를 통해 배포를 해줍니다.

login이 되어 있지 않다면 npm login 을 통해 login을 해주면 됩니다.

![image](https://user-images.githubusercontent.com/26598542/82141424-b0e86200-9870-11ea-9933-636d08219bd4.png)

---

## 라이브러리 사용하기

ts-rollup-storybook-system 라는 이름으로 배포를 해주었으므로 아래와 같이 설치를 해줍니다.

```
yarn add ts-rollup-storybook-system
```

option a

```typescript
import Button from "ts-rollup-storybook-system/build/src/Button";
```

option b

```typescript
import { Button } from "ts-rollup-storybook-system";
```

---

## 예시 파일

https://github.com/Brew-Brew/rollup-ts-design-system 를 참고 하시면 됩니다.

---

## ETC

- 참고 링크
  - https://blog.harveydelaney.com/creating-your-own-react-component-library/
