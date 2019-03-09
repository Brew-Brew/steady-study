---
title: function in es6
createdDate: "2019-03-09"
updatedDate: "2019-03-09"
author: Ideveloper
tags:
  - es6
  - function
image: welcoming.png
draft: false
---

# function in ES6 (es6에서의 함수)

```
함수 자체는 javascript에서는 정말 중요한 요소입니다. 이러한 함수를 es6내에서 면밀히 살펴 봅시다.
```

## 함수와 매개변수

```javascript
function f(x) {
  console.log(`f 내부 x=${x}`);
  x = 5;
  console.log(`f 내부: x=${x} (할당 후)`); // highlight-line
}

let x = 3;
console.log(`f를 호출하기 전: x=${x}`);
f(x);
console.log(`f를 호출한 다음 x=${x}`);
```

실행결과

```
f를 호출하기 전: x=3
f 내부: x=3
f 내부: x=5 (할당 후)
f를 호출한 다음: x=3
```

중요한점은 함수안에서 x에 값을 할당하더라도 함수 바깥의 변수 x에는 아무 영향도 없는 것입니다. 이름은 같지만, 둘은 다른 개체라는 말이 되는거죠.

여기까지는, 누구나 쉽게 이해하고, 직관적으로 이해하며 쓰고 있습니다.

하지만, 함수 안에서 객체 자체를 변경하면, 그 객체는 함수 바깥에서도 바뀐점이 반영됩니다!
