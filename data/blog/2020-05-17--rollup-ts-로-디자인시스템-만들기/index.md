---
title: Rollup.js+ Typescript + Storybook으로 구축하는 디자인 시스템
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

## 시작하기에 앞서 😀

rollup.js + typescript + storybook으로 디자인 시스템을 구축하는것과 관련한 아티클들이 해외 아티클들은 많지만, 예전 내용들로 작성되어 있는 경우가 대부분이었고, 또 구축 당시 관련 자료 리서치에 필요한 자료들이 많이 분산되고 여러 방식으로 소개가 되어 있었기에 많은 어려움을 겪어 디자인시스템을 구축하며 겪은 내용들을 정리해 글로 작성해 보았습니다.

#### 디자인 시스템

디자인 시스템이란 product를 만들면서 사용하는 여러가지의 디자인 요소들을 모아둔 시스템 혹은 원칙을 뜻하며 다양한 정의가 존재하고 있습니다. 또 제품을 효율적이고 빠르게 디자인할 수 있도록 돕는 역할을 합니다, 따라서 개발상의 효용성을 위해 많은 회사 혹은 여러 프로젝트들에서 디자인 시스템을 많이들 구축하고 있습니다.

#### rollup.js 란

[Rollup.js](https://rollupjs.org/guide/en/)은 Webpack과 같이 여러 모듈(파일)들을 라이브러리나 어플리케이션으로 작게 만들어 주는 번들러입니다. 큰단위의 프로젝트가 아닌 크지않은 라이브러리들에서의 번들러로 많이들 사용되고 있고 또한 여러가지 loader들을 붙여주거나 설정 파일이 복잡한 webpack에 비해 빌드에 필요한 설정이 매우 간단한 편이고, 이외에도 [많은 장점](https://rollupjs.org/guide/en/#the-why)이 있습니다.

- rollup 관련 아티클
  - [webpack에서 rollup 전환기](https://medium.com/naver-fe-platform/webpack%EC%97%90%EC%84%9C-rollup%EC%A0%84%ED%99%98%EA%B8%B0-137dc45cbc38)
  - [rollup.js를 왜 사용하는가](https://rollupjs.org/guide/en/#the-why)

#### storybook이란

Storybook은 UI 컴포넌트 개발을 할때 뛰어난 UI를 체계적이고 효율적으로 구축 할 수 있도록 도와주는 유용한 tool입니다. 다양한 기능을 제공하는데, 이글에서는 설정만 하는내용을 다루고 [이 글](https://ideveloper2.dev/blog/2020-04-25--storybook-%EC%9E%98-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0/)에 스토리북을 잘 활용하는 방법을 적어두었습니다.

---

## 디자인 시스템 구축하기 🎨

시작하기에 앞서, https://github.com/Brew-Brew/rollup-ts-design-system 에 글에 포스팅된 코드를 올려놓았으니 참고하시기 바랍니다 :)

#### 1)컴포넌트 구성에 필요한 폴더 구조 만들기

```shell
npm init
yarn add -D react react-dom @types/react node-sass classnames @types/classnames

```

`react react-dom peer dependency 관련`

react나 react dom은 다른 리액트 프로젝트에서 디자인 시스템에서 사용될것이므로, peer dependency로 넣어주도록 변경해줍니다.

```json
  "devDependencies": {
    "@types/react": "^16.9.35"
  },
  "peerDependencies": {
    "react": "^16.13.1",
    "react-dom": "^16.13.1"
  }
```

최종적으로는 아래 폴더 구조를 가지도록 파일들을 생성해 줄 것입니다.

```
.storybook/
  main.js
.gitignore
package.json
rollup.config.js
tsconfig.json
components/
  Button/
    index.tsx
    index.module.scss
    index.stories.tsx
typings/
  declaration.d.ts
index.ts
```

**gitignore 파일 생성**

아래와 같이 root의 node_modules를 ignore 해 줍니다.

```gitignore
/node_modules
```

우선은 아래처럼 디자인 시스템에 넣을 Button 컴포넌트 파일과 폴더들을 생성해 줍니다. 예시를 위해 Button만 제작해 줬지만, 필요에 따라 다른 컴포넌트들 역시 같은 방식으로 제작해 주면 됩니다.

`components/Button 폴더`

```typescript
// components/Button/index.tsx
import React from "react";
import classNames from "classnames";

import styles from "./style.module.scss";

export enum ButtonType {
  DEFAULT = "default",
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export interface IProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  theme?: ButtonType;
}

const Button: React.FC<IProps> = ({ children, theme = ButtonType.DEFAULT }) => {
  const classNameProps = classNames(styles.default, styles[theme]);
  return <button className={classNameProps}>{children}</button>;
};

export default Button;
```

유의할점이 한가지 있는데, 아래에서 interface나 enum은 모두 export를 해주었는데, ts에서 자동을 type을 정의할때 필요한 부분이고, 아래 타입스크립트 설정 부분에서 자세히 설명해드리겠습니다.

```scss
// components/Button/style.module.scss

.default {
  padding: 8px;
  background: white;
  border: white;
  border-radius: 4px;
}

.primary {
  background: #03a9f4;
  border: #03a9f4;
  color: white;
}

.secondary {
  background: #a0ddf9;
  border: #a0ddf9;
  color: white;
}
```

그다음 디자인시스템에 사용되는 컴포넌트들을 모아주는 root 파일을 만들어줍니다.

```typescript
// index.ts
export { default as Button } from "./components/Button";
```

일단 여기까지는 아래와 같은 구조가 만들어 집니다.

```
.gitignore
package.json
components/
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

아래와 같이 tsconfig를 설정해 줍니다. 필요에 따라 config 설정은 바꿔주셔도 무방합니다.

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
    "typeRoots": ["./typings"]
  },
  "include": ["typings", "src"]
}
```

단, 중요한 부분이 맨 윗줄 두가지에 있는데요, `"declaration": true` 와 `"declarationDir": "./build"` 를 명시해 줌으로써, 우리가 만들 디자인 시스템의 타입들을 자동으로 생성해 빌드 폴더에 넣어주는 역할을 하게 됩니다.

그리고, 중요한 사항이 있는데 component 를 제작한 tsx파일에서 interface나 enum을 **export** 해주지 않으면 declaration 정의를 실패해 build가 실패하는 케이스가 있으니, 모든 interface나 enum은 export해주는것이 빌드 실패를 막을수 있습니다.

또한, `preserveModules: true` 로 옵션을 줌으로써 기존 폴더구조 그대로 build를 할수 있게 하여 그 구조 그대로 아래와 가지 두가지 방식으로 import 할수 있게 됩니다. https://rollupjs.org/guide/en/#preservemodules 에 가시면 자세한 설명이 나와있으니 참고바랍니다.

Option A

```
import Button from 'library/components/build/Button'
```

Option B

```
import Button from 'library'
```

추가로 아래는 preserveModules 옵션에 따른 build 폴더의 비교 그림입니다.

![image](https://user-images.githubusercontent.com/26598542/82752221-7db94c00-9df7-11ea-9e60-606512abc7f9.png)

typings안에는 아래와 같이 scss파일을 위한 declaration.d.ts 타입 파일을 선언 해줍니다.

```typescript
// typings/declaration.d.ts
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
components/
  Button/
    index.tsx
    style.module.scss
typings/
  declaration.d.ts
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
  input: "./index.ts",
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

- dir
  - build 폴더명
- format
  - build format, cjs로도 설정 가능
- exports
  - Name for UMD export
- sourcemap
  - sourcemap generate 여부

`plugins`

- @rollup/plugin-commonjs
  - 외부 노드 모듈이 es6 으로 변환되지 않았을 경우 es6 으로 변환하는 플러그인
- @rollup/plugin-node-resolve
  - node_modules에서 third party 모듈을 사용하는 용도, js 이외의 확장자 (ts, tsx) 파일을 불러오기 위해서도 이 플러그인을 필요로 함
- rollup-plugin-peer-deps-external
  - peerDependency로 설치된 라이브러리의 코드가 번들링된 결과에 포함되지 않고, import 구문으로 불러와서 사용할 수 있게 만들어주는 플러그인
- rollup-plugin-postcss
  - scss,css 관련 플러그인
- rollup-plugin-typescript2
  - typescript 관련 플러그인

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
components/
  Button/
    index.tsx
    style.module.scss
typings/
  declaration.d.ts
index.ts
```

#### 4) storybook 설치 및 설정 & story 작성

```shell
yarn add -D @storybook/react @babel/core babel-preset-react-app babel-loader sass-loader
```

.storybook/main.js 파일을 만들어주고 아래와 같이 넣어줍니다.
아래에서 css module을 사용할때는 css-loader 옆에 `?modules`를 넣어줘야 합니다. 관련 내용을 찾는데 꽤 시간을 썼던 기억이 있습니다..ㅎ

```javascript
const path = require("path");

module.exports = {
  stories: ["../**/*.stories.tsx"],
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

import Button, { ButtonType } from "./index";

export default {
  title: "버튼",
  component: Button,
  parameters: {
    componentSubtitle: "Button 컴포넌트",
  },
};

export const defaultButton = () => {
  return <Button>default 버튼</Button>;
};

export const primaryButton = () => {
  return <Button theme={ButtonType.PRIMARY}>primary 버튼</Button>;
};
export const secondaryButton = () => {
  return <Button theme={ButtonType.SECONDARY}>secondary 버튼</Button>;
};
```

storybook을 실행해보면 아래와 같이 잘 나오는것을 확인 할수 있습니다.

![image](https://user-images.githubusercontent.com/26598542/82751396-d2f25f00-9df1-11ea-9ca1-6558ebe73d71.gif)

storybook 설정마저 끝나면 아래와 같이 최종적인 폴더구조가 나오게 됩니다.

```
.storybook/
  main.js
.gitignore
package.json
rollup.config.js
tsconfig.json
components/
  Button/
    index.tsx
    index.module.scss
    index.stories.tsx
typings/
  declaration.d.ts
index.ts
```

#### 5) 라이브러리 배포하기

npm publish 를 통해 배포를 해줍니다.

login이 되어 있지 않다면 npm login 을 통해 login을 해주면 됩니다.

![image](https://user-images.githubusercontent.com/26598542/82141424-b0e86200-9870-11ea-9933-636d08219bd4.png)

---

## 제작한 라이브러리 사용하기 📁

ts-rollup-storybook-system 라는 이름으로 배포를 해주었으므로 제작한 라이브러리를 아래와 같이 설치를 해줍니다.

```
yarn add ts-rollup-storybook-system
```

rollup에서 `preserveModules` 옵션을 true로 주었으므로, 아래와 같이 두가지 옵션으로 모두 import가 가능하게 됩니다.

**option a**

```typescript
import Button from "ts-rollup-storybook-system/build/components/Button";
```

**option b**

```typescript
import { Button } from "ts-rollup-storybook-system";
```

components내에 정의된 interface나 enum을 불러와야 하면 option a로 import를 해줘야 합니다.

```typescript
import React from "react";

import Button, {
  ButtonType,
} from "ts-rollup-storybook-system/build/components/Button";

function App() {
  return (
    <div>
      <Button>버튼</Button>
      <Button theme={ButtonType.PRIMARY}>버튼</Button>
      <Button theme={ButtonType.SECONDARY}>버튼</Button>
    </div>
  );
}

export default App;
```

---

## 마치며 🎬

이렇게 ts + rollup.js + storybook 환경에서의 디자인 시스템을 구축해보았습니다.

이 글을 참고하여 개발을 하실때 궁금한 사항이 있거나 잘 안되는 부분이 있으면 코드를 올려놓았으니 https://github.com/Brew-Brew/rollup-ts-design-system 를 참고 하시면 됩니다. 혹은 댓글이나, 깃헙 이슈로 문의주시면 최대한 빠르게 답변드리겠습니다 :) 감사합니다.

---

## ETC

- scss파일에서 background-image 방식으로 url을 불러오는데 이슈가 있었는데 아래와 같이 postcss-url을 활용해 설정파일을 수정해 줘서 해결해주었습니다.

```typescript
...
import postcssUrl from "postcss-url";

export default {
  ...
  plugins: [
    ...
    postcss({
      ...
      plugins: [
        postcssUrl({
          url: "inline",
        }),
      ],
    }),
  ],
};

```

- rollup + ts + storybook 환경 개발 참고 url
  - https://blog.harveydelaney.com/creating-your-own-react-component-library/
- webpack vs parcel vs rollup 비교
  - https://medium.com/js-imaginea/comparing-bundlers-webpack-rollup-parcel-f8f5dc609cfd
