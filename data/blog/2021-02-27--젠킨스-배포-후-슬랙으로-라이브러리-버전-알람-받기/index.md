---
title: 젠킨스 배포 시 슬랙으로 npm 라이브러리 버전 알람 받기
createdDate: "2021-02-27"
updatedDate: "2021-02-27"
author: Ideveloper
tags:
  - etc
image: jenkins-slack.png
draft: false
---

## 시작하기 전 ✅

사내 npm 라이브러리를 만들면 배포 버전의 히스토리 관리가 잘되지 않고,또 해당 라이브러리의 버저닝을 알람으로 받아보고 싶은 경우가 생기곤 합니다. 이러한 사내 라이브러리를 (디자인 시스템, ..etc) 만들었을때 젠킨스로 배포하는경우, 해당 라이브러리 배포 이후 버전 정보를 슬랙 알람으로 받아보고 히스토리를 남기는 작업에 대한 포스팅글입니다.

## 사전 설정 🔧

우선 라이브러리에 대한 알람과 버전정보를 받기에 앞서 슬랙 젠킨스 CI app 에서 몇가지 설정을 해줘야 합니다.

`Jenkins slack CI integration 추가`

- 슬랙 젠킨스 CI app 에서 configuration을 생성해줍니다.

![스크린샷 2021-02-27 오후 9 51 06](https://user-images.githubusercontent.com/26598542/109387643-ec5aa580-7945-11eb-8fc3-aa42ea74cf6b.png)

`발급 된 token 복사`

- configuration설정시 발급 된 Token credential ID를 복사해줍니다. (추후 jenkins credential 생성에 사용됩니다.)

![스크린샷 2021-02-27 오후 10 40 30](https://user-images.githubusercontent.com/26598542/109388826-d2709100-794c-11eb-931b-6dc727ffc16f.png)

`알람 받을 슬랙 채널 설정`

- 또한 슬랙 알람을 받아볼 채널을 설정해줍니다.

![스크린샷 2021-02-27 오후 9 49 06](https://user-images.githubusercontent.com/26598542/109387604-ae5d8180-7945-11eb-8724-d4f88fb3e873.png)

## 젠킨스 연동 🛠

`추후 버저닝 정보에 사용할 변수 할당`

- 젠킨스 빌드 실행 스크립트에 아래와 같이 변수를 추후 빌드 후 조치에 사용할수 있게 package.json에서 버전 값을 꺼내 할당을 합니다.

```
FILE_VERSION=$(node -p -e "require('./package.json').version")`
echo FILE_VERSION=$FILE_VERSION > env.properties
```

![스크린샷 2021-02-27 오후 10 22 43](https://user-images.githubusercontent.com/26598542/109388440-6856ec80-794a-11eb-8a5e-46dad15adcec.png)

`환경 변수 inject`

- 추후 빌드 후 액션 으로 슬랙 alarm으로 패키지 버전이 포함된 메시지를 보낼수 있게, 아까 할당해준 환경 변수를 inject해줍니다. (앞에서 package.json에서 버전 추출하여 변수에 할당한것)

![_2021-01-12__2 48 35](https://user-images.githubusercontent.com/26598542/109387756-9803f580-7946-11eb-8466-6b74276b7a6d.png)

`알람 메시지 custom`

- 빌드 후 조치에 slack notification을 추가해줍니다.

![스크린샷 2021-02-27 오후 10 30 58](https://user-images.githubusercontent.com/26598542/109388656-c20be680-794b-11eb-8977-9b62faa86c1d.png)

- credential을 종류를 secret text로 선택 후 생성해 추가해주고, 슬랙 젠킨스 CI app configuration에서 복사한 토큰id값을 secret 란에 넣어 credential을 생성 해 넣어줍니다.

![스크린샷 2021-02-27 오후 10 39 42](https://user-images.githubusercontent.com/26598542/109388865-08157a00-794d-11eb-91b4-f2765fa3f923.png)

- 생성후 credential 선택이 완료되었다면 알람을 받을 채널역시도 설정해줍니다.

![스크린샷 2021-02-27 오후 10 33 41](https://user-images.githubusercontent.com/26598542/109388699-131bda80-794c-11eb-964f-ae9041d2fadc.png)

- 그리고 빌드 후 조치 란에 가서 아래와 같이 슬랙 notification 설정을 추가해 줍니다. 앞에서 환경변수를 inject 해줬으므로 아래와같이 **\$FILE_VERSION** 이라는 값으로 라이브러리 버전에 접근이 가능하고, 알람을 받아볼 슬랙 메시지를 custom할수 있습니다.

![스크린샷 2021-02-27 오후 9 57 38](https://user-images.githubusercontent.com/26598542/109387814-d39ebf80-7946-11eb-9b94-eb991ef60b8d.png)

- 모든 설정을 다 해주고 젠킨스 설정을 해주면 배포시 아래와 같이 슬랙으로 라이브러리 배포시 알람을 받아볼수 있습니다.

![배포](https://user-images.githubusercontent.com/26598542/109387901-342dfc80-7947-11eb-8c41-cfcbab48279f.png)

### 마치며

깃헙액션이나 다른 방법들로도 라이브러리의 버전정보를 받아오는 방법이 있겠지만, 깃랩환경이라 깃헙액션을 사용하지 못하거나, 젠킨스로 라이브러리 배포 파이프라인을 구축했을시에 위 포스팅글처럼 npm 라이브러리의 버전정보를 배포시에 슬랙 알람으로 받아볼수 있었습니다. :)
