---
title: Test code with Front-end
createdDate: "2019-03-03"
updatedDate: "2019-03-03"
author: Ideveloper
tags:
  - test code
  - jest
image: cup-of-coffee-laptop-office-macbook-89786.jpeg
draft: false
---

# 테스트 관련정리

## 1.테스트 관련 파악하기

- Jest => 테스트 러너
- Enzyme => 리액트 테스트 유틸리티

`테스트는 대부분 jest 스냅샷으로 얕은(shallow) 렌더링을 한다.`

### #shallow 렌더링

- 얕은 렌더링은 자식을 제외한 컴포넌트 자체만 렌더링

### #스냅샷 테스트

- jest 스냅샷은 텍스트로 구성된 창과 버튼이 있는 오래된 텍스트 UI와 비슷

### #Jest

- 매우 빠르다
- 스냅샷 테스트
- 변경 사항에 관련된 테스트만 재실행
- 실패메시지가 유용
- 설정이 간단하다
- 목과 스파이
- 설정이 쉬움

### #Enzyme

- 얕은 렌더링, 정적 렌더링 된 마크업 또는 DOM렌더링을 사용하는 편리한 유틸리티이다.
- 엘리먼트를 찾고 prop을 읽는 것이 jquey api와 유사하다.

### #추가정보

snapshotSerializers를 사용하면 enzyme-to-json의 toJson 함수를 호출하여 수동으로 변환하지 않고도 Enzyme 래퍼(wrapper)를 Jest의 스냅샷에 직접 전달할 수 있다.

### #테스트 종류

1.  기본 컴포넌트 렌더링 테스트
2.  props 테스트
3.  이벤트 테스트
4.  이벤트 핸들러 테스트
5.  json 반한하는 모든 함수 테스트 가능

## TODO

- [ ] Replace image
- [ ] Write an awesome article
