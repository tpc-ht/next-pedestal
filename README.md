# next-pedestal
nextJS基座
服务端渲染具有诸多优点，包括优化SEO、加快首屏加载速度、增强安全性等。针对注重SEO的C端项目而言，服务端渲染是首选方式，也是每位前端工程师必备的技术栈之一。
# 1. 环境准备

1. Next.js 14版本对于Node.js最低的版本要求是 18.17.0，目前我的环境为 18.19.0

![](https://cdn.nlark.com/yuque/0/2024/webp/21485300/1724826094902-9dd86807-ed37-4352-8d28-28f0a3008463.webp#averageHue=%23f9f9f9&clientId=ud9e9f12d-cb75-4&from=paste&id=u32e119be&originHeight=141&originWidth=556&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ubfe969f3-0077-49c8-8c53-1347d569a55&title=)

1. VSCode相关插件安装：Prettier - Code formatter，ESlint，Nextjs snippets，vscode-styled-components，Tailwind CSS IntelliSense
# 2. 项目创建
为了更快的安装速度，没有切换镜像的，先切换
```bash
yarn config set registry https://registry.npmmirror.com
```
运行
```bash
npx create-next-app@latest
```
根据提示，创建项目

![](https://cdn.nlark.com/yuque/0/2024/webp/21485300/1724826149928-28cbf7cb-2e2d-4e6e-b4f3-4217b2703988.webp#averageHue=%230e315e&clientId=ud9e9f12d-cb75-4&from=paste&id=u2f34129d&originHeight=119&originWidth=609&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u39e10f79-d015-481d-9790-846f44a70d5&title=)

1. 输入项目的名称
2. 启用Typescript
3. 启用ESLint
4. 使用Tailwind CSS
5. 将src作为目录：方便将业务文件与配置文件区分开来
6. 使用App Router：可使用 Server component 和 Streaming 等新特性
7. 不自定义别名，使用默认的@代表src目录
# 3. 配置 Prettier
ESLint 脚手架已默认安装，现需配置prettier
## 1. 安装 eslint ts默认规则补充
```bash
yarn add @typescript-eslint/eslint-plugin@^6.21.0 -D
```
提示：@typescript-eslint/eslint-plugin目前版本已到7.1，但脚手架自带的@typescript-eslint/parser版本为6.21.0，因此安装的时候需手动指定版本。之后如果脚手架升级，只需安装对应版本即可
脚手架自带的@typescript-eslint/typescript-estree6.21.0版本不支持typescript高于5.4.0的版本，而项目中的package.json中"typescript": "^5"，即安装typescript5的最新版本，目前typescript最新版本为5.4.2，会不兼容，因此需指定typescript的版本
## 2. 指定Typescript版本
如果已经安装了，先执行`npm uninstall typescript`进行卸载，然后运行`npm i typescript@^5.2.2 -D`进行安装

## 3. 安装 prettier
```bash
//允许 ESLint 报告不符合 Prettier 格式化规则的代码
npm i eslint-plugin-prettier@^5.1.3 -D

//用来解决与eslint的冲突
npm i eslint-config-prettier@^9.1.0 -D 

//安装prettier
npm i prettier@^3.2.5 -D

```
## 4. 修改 .eslintrc.json
```bash
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "eslint-config-prettier"
  ],
  "plugins": ["prettier"],
  "rules": {
    "@typescript-eslint/no-explicit-any": ["off"], //允许使用any
    "@typescript-eslint/ban-ts-comment": "off", //允许使用@ts-ignore
    "@typescript-eslint/no-non-null-assertion": "off", //允许使用非空断言
    "@typescript-eslint/no-var-requires": "off", //允许使用CommonJS的写法
    "no-console": [
      //提交时不允许有console.log
      "warn",
      {
        "allow": ["warn", "error"]
      }
    ],
    "no-debugger": "warn"
  }
}

```
## 5. 新建 .prettierrc
```bash
{
  "endOfLine": "auto",
  "printWidth": 120,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "bracketSpacing": true
}

```
## 6. 新建 .prettierignore
```bash
/.next/
/node_modules
.env*.local
```
## 7. 修改 package.json
修改 lint 启动命令
```bash
"scripts": {
  "lint": "eslint src --fix --ext .ts,.tsx,.js,.jsx --max-warnings 0",
},
```
重启VSCode，打开src/app/layout.tsx，可以看到报错信息

![](https://cdn.nlark.com/yuque/0/2024/webp/21485300/1724826270807-0e5c5eeb-b2a8-4d79-bf1b-d0819877ee9e.webp#averageHue=%231f231f&clientId=ud9e9f12d-cb75-4&from=paste&id=u834f343e&originHeight=75&originWidth=340&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u7b1e7ae4-cff6-486f-b069-b3ad5f875a4&title=)

这是因为在 .prettierrc 中配置了`"singleQuote": true`即单引号，而文件中使用的是双引号，所以编辑器提示报错
运行 `npm run lint`，可自动修复上述 eslint(prettier/prettier) 问题
# 4. 配置 VSCode
每次运行 npm run lint 修复 eslint(prettier/prettier) 问题比较麻烦。可配置VSCode，在文件保存时，自动格式化文档
根目录新建.vscode文件夹，在文件夹下新建settings.json
```bash
{
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit"
  }
}
```
新版的vscode配置为explicit，老版的为true
在插件中选择扩展设置

![](https://cdn.nlark.com/yuque/0/2024/webp/21485300/1724826301126-66f6cd95-4123-4bde-88c8-d3a955d0f94c.webp#averageHue=%234f4634&clientId=ud9e9f12d-cb75-4&from=paste&id=u531e3fa0&originHeight=374&originWidth=707&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u37a67dc6-6828-4a8f-9485-fcf71b84d8a&title=)

将每行代码的长度限制由80改为120（因为 .prettierrc中"printWidth": 120,）

![](https://cdn.nlark.com/yuque/0/2024/webp/21485300/1724826308888-6cd814d2-3226-4ac4-b30e-22a4c842aaed.webp#averageHue=%23242424&clientId=ud9e9f12d-cb75-4&from=paste&id=ua7da8597&originHeight=206&originWidth=624&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u3f992497-19a4-4d41-ad6b-40eb619db3e&title=)

保存之后，重启VScode
# 5. 配置 import 导入顺序
在开发组件时，需要引用外部资源，当import的包很多时，例如有next、react第三方包，有自定义包，有Typescript类型文件，有样式文件等等。
如果对import的顺序不进行排序的话，会显得很杂乱，比如以下导入，在引入自定义组件的时候，可能会被另一个开发者引入类型文件，这时候规范引入顺序就显得很重要了
```javascript
import Header from '@/components/header';
import type { Metadata } from 'next';
import Tabs from '@/components/tabs';
```
## 1. 安装
```bash
npm i eslint-plugin-import@^2.29.1 -D
```
## 2. 修改 .eslintrc.json
在rules下添加以下配置
```bash
    "import/order": [
      "error",
      {
        //按照分组顺序进行排序
        "groups": ["builtin", "external", "parent", "sibling", "index", "internal", "object", "type"],
        //通过路径自定义分组
        "pathGroups": [
          {
            "pattern": "react*",
            "group": "builtin",
            "position": "before"
          },
          {
            "pattern": "@/components/**",
            "group": "parent",
            "position": "before"
          },
          {
            "pattern": "@/utils/**",
            "group": "parent",
            "position": "after"
          },
          {
            "pattern": "@/apis/**",
            "group": "parent",
            "position": "after"
          }
        ],
        "pathGroupsExcludedImportTypes": ["react"],
        "newlines-between": "always", //每个分组之间换行
        //根据字母顺序对每个组内的顺序进行排序
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ]
```
运行 npm run lint，可统一修复排序问题
在开发的过程中，因为配置了VSCode保存时自动修复，因此配置好之后，不需要我们再操心import导入顺序的问题
# 6. 配置 .gitignore
Next.js目前使用基于Rust的编译器SWC来编译JavaScript/TypeScript。SWC的安装受到Node.js版本等因素的影响，如果版本不一致可能导致启动失败，出现类似 'Failed to load SWC binary for win32/x64' 的错误提示。
解决方案一：package-lock.json文件不上传到GitHub上，修改.gitignore，新增
```bash
#lock
package-lock.json
yarn.lock
```
# 7. 配置 Git hooks
参考：git提交规范 husky | yorkie
# 8. 配置端口号
Next.js的默认访问端口是3000，可修改启动命令，来改变端口号
修改package.json，在启动命令后增加 " -p 3001 " ，这样开发环境与生产环境的启动端口为3001
```bash
"scripts": {
  "dev": "next dev -p 3001",
  "build": "next build",
  "start": "next start -p 3001"
},
```
# 9. 配置环境变量
项目根目录新建 .env、.env.development、.env.production、.env.local，分别代表着所有环境变量，开发环境变量，生产环境变量，本地环境变量
覆盖优先级为：.env.local > .env.production | .env.development > .env
1. 定义服务端组件使用的环境变量
```bash
//.env 
PRIVATE_KEY = '12345'
```
在服务端组件中，使用 process.env.PRIVATE_KEY 获取值，在客户端组件中访问，会得到undefined
2. 定义客户端组件使用的环境变量
使用`NEXT_PUBLIC_`前缀定义客户端组件的环境变量
```bash
//.env.development
NEXT_PUBLIC_BASEURL = 'http://127.0.0.1:9000/api'

//.env.production
NEXT_PUBLIC_BASEURL = 'https://www.test.com/api'
```
使用 process.env. 进行访问
```bash
process.env.NEXT_PUBLIC_BASEURL
```
3. 配置Typescript类型提示
项目根目录新建typings.d.ts
```bash
declare namespace NodeJS {
  interface ProcessEnv {
    /** 基础路径 */
    NEXT_PUBLIC_BASEURL: string;
  }
}
```
修改tsconfig.json，在include中将新增文件加进来
```bash
"include": [
  //新增
  "typings.d.ts",
],
```
之后再VsCode中输入process.env，将会提示出NEXT_PUBLIC_BASEURL
# 10. 配置临时环境变量
在启动或编译应用程序时，我们常常需要根据不同的参数走不同的配置

1. 安装
```bash
npm i cross-env -D
```

2. 修改package.json
```bash
"scripts": {
  "dev": "cross-env NODE_ENV_PLATFORM=window next dev -p 3001",
  "dev:l": "cross-env NODE_ENV_PLATFORM=linux next dev -p 3001",
},
```

1. 读取临时环境变量
```bash
process.env.NODE_ENV_PLATFORM
```
运行 npm run dev，npm run dev:l 将会得到不同的参数配置
# 11. 配置 Scss
随着Next.js逐渐弃用Less，Antd5也弃用Less改用css-in-js方案，这里改用Sass
Next.js内置支持Sass，只需安装sass包

1. 安装
```bash
npm i sass
```

2. 新建src/page.module.scss
```bash
$color: red;
$primary-color: #64ff00;

//定义局部样式
.title {
  color: $color;
}

//在CSS Module中导出scss变量
:export {
  primaryColor: $primary-color;
}
```

3. 使用，修改src/app/page.tsx
```bash
import style from './page.module.scss';

export default async function Home() {
  return (
    <>
      <span className={style.title}>111</span>
      <span style={{ color: style.primaryColor }}>222</span>
    </>
  );
}
```
为了避免全局样式的影响，这里先在src/app/layout.tsx中去掉import './globals.css';
# 12. 配置 Scss 全局样式文件

1. 新建src/styles/index.scss
```bash
$btn-color: red
```

2. 修改next.config.mjs
```bash
const nextConfig = {
  sassOptions: {
    additionalData: '@import "@/styles/index.scss";',
  },
};
```

3. 在scss文件中直接使用变量
```bash
button{
  color: $btn-color;
}
```
# 13. 配置 css-in-js
css-in-js有多种方案，例如@mui/material，styled-jsx，styled-components，@vanilla-extract/css
等。我这边选择下载量最高，更新频率还可以的styled-components

1. 安装
```bash
npm i styled-components
```

2. 配置next.config.mjs
```bash
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
};
```

3. 新建全局注册组件

新建components/StyledComponentsRegistry.tsx
```bash
'use client';

import React, { useState } from 'react';

import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;

  return <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManager>;
}
```

1. 包装根布局组件

修改src/app/layout.tsx
```bash
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;

```

2. 使用
```bash
'use client';
import styled from 'styled-components';

export default function Home() {
  return <Li>1</Li>;
}

const Li = styled.p`
  color: red;
`;
```
CSS-in-JS的样式需要在客户端进行处理，因此需使用 'use client' 声明当前组件为客户端组件。该组件及其所有子组件都会在客户端进行渲染
提示：如果不经过如上配置，安装后直接使用，会出现样式闪烁等现象
# 14. 配置状态管理仓库
仓库不选择传统的redux，@reduxjs/toolkit。而是选择更为轻便的zustand来管理
## 1. 安装 zustand
```bash
npm i zustand
```
## 2. 安装 immer
immer：以更方便的方式处理不可变状态
```bash
npm i immer
```
## 3. 创建 store
新建src/store/user.ts
```bash
import { produce } from 'immer';
import { create } from 'zustand';

interface UserInfo {
  name: string;
  age: number;
}

interface UserState {
  userInfo: UserInfo;
  token: string;
  updateUserInfo: (parmas: UserInfo) => void;
  updateAge: (params: number) => void;
  updateToken: (params: string) => void;
}

// 创建状态存储
const useUserStore = create<UserState>((set) => ({
  userInfo: {
    name: 'zhangsan',
    age: 23,
  },
  token: 'S1',
  //更新整个对象
  updateUserInfo: (userInfo) => set({ userInfo }), //合并userInfo
  //更新对象中某个属性
  updateAge: (age) =>
    set(
      produce((state) => {
        state.userInfo.age = age;
      }),
    ),
  //更新原始数据类型
  updateToken: (token) => set({ token }),
}));

export default useUserStore;
```
## 4. 使用 store
修改src/app/page.tsx
```tsx
'use client';

import useUserStore from '@/store/user';

const Info = () => {
  const { userInfo, token, updateUserInfo, updateAge, updateToken } = useUserStore();

  return (
    <div className="App">
      <div>
        姓名：{userInfo.name} 年龄：{userInfo.age}
      </div>
      <div>token：{token}</div>
      <button onClick={() => updateUserInfo({ name: 'lisi', age: 24 })}>更新用户</button>
      <button onClick={() => updateAge(userInfo.age + 1)}>更新年龄</button>
      <button onClick={() => updateToken('23652')}>更新token</button>
    </div>
  );
};

export default Info;
```
# 15. 配置 UI 组件库

1. 安装
```bash
npm i antd
```

2. 修改src/app/page.tsx，引入 antd 的按钮组件
```bash
import React from 'react';
import { Button } from 'antd';

const Home = () => (
  <div className="App">
    <Button type="primary">Button</Button>
  </div>
);

export default Home;
```

3. 目前按钮样式在首屏刷新时会闪动，还需配合@ant-design/nextjs-registry包使用
```bash
npm i @ant-design/nextjs-registry
```

4. 在 app/layout.tsx 中使用
```bash
import { AntdRegistry } from '@ant-design/nextjs-registry';

import StyledComponentsRegistry from '@/lib/registry';

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <StyledComponentsRegistry>
        <AntdRegistry>{children}</AntdRegistry>
      </StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;
```
提示：Next.js App Router 当前不支持直接使用 . 引入的子组件，如 <Select.Option />、<Typography.Text /> 等，需要从路径引入这些子组件来避免错误
**提示：有些浏览器版本过低，样式会出不来，可升级浏览器版本**
# 16. 配置 Typescript 声明
在window上添加自定义属性，或者使用不支持ts的第三方包是很常见的业务场景。因为项目使用了Typescript，因此需要配置相关的声明使其不报错
修改 next-env.d.ts，新增以下内容：
```typescript
//在window上添加自定义属性
declare interface Window {
  custom: any;
}

//外部模块声明，已支持未使用Typescript的第三方库
declare module 'react-beautiful-dnd';
```
后续需根据业务场景进行配置
# 17. 配置图片网络资源
使用`<Image>`组件时，如果图片是网络资源，需增加 remotePatterns 配置，否则图片会加载失败
修改next.config.mjs
```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', //图片资源的协议
        hostname: 'www.test.com', //图片资源的域名
      }
    ],
  },
};

```
后续需根据业务场景进行配置
# 18. 配置打包资源分析
在打包的时候，分析包资源大小以及占比
## 1. 安装
```bash
npm i @next/bundle-analyzer -D
```
## 2. 配置 next.config.mjs
```typescript
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', //当环境变量ANALYZE为true时开启
});

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    additionalData: '@import "@/assets/styles/index.scss";',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.test.com',
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
```
## 3. 修改 package.json
将启动参数build修改为：
```javascript
"build": "cross-env ANALYZE=true next build",
```
## 4. 打包
运行 `npm run build` 进行打包，.next文件夹下会生成analyze文件夹
.next/analyze/nodejs.html：显示的是服务端文件包的大小，即.next/server文件夹下的资源
.next/analyze/client.html：显示的是客户端文件包的大小，即.next/static文件夹下的资源
# 19. 关闭严格模式
严格模式主要用于识别不安全的生命周期、过时的API等情况。但在开发模式下，会让组件执行两次，意味着会多次调用接口，因此需关闭该模式
```javascript
// next.config.js
const nextConfig = {
  //新增  
  reactStrictMode: false,
};
```
# 20. 开发环境使用HTTPS
修改package.json，配置启动参数：--experimental-https
```bash
"dev": "next dev --experimental-https",
```


















