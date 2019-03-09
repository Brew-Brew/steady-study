---
title: Function in es6
createdDate: "2019-03-09"
updatedDate: "2019-03-09"
author: Ideveloper
tags:
  - es6
  - function
image: es6js.png
draft: false
---

```
함수 자체는 javascript에서는 정말 중요한 요소입니다. 그리고 js개발자라면 es6문법은 익숙해야 하므로, 이러한 함수를 es6내에서 면밀히 살펴 봅시다.
```

### 1.함수와 매개변수

#####코드

```javascript
function f(x) {
  console.log(`f 내부 x=${x}`);
  x = 5;
  console.log(`f 내부: x=${x} (할당 후)`);
}

let x = 3;
console.log(`f를 호출하기 전: x=${x}`);
f(x);
console.log(`f를 호출한 다음 x=${x}`);
```

#####결과

```text
f를 호출하기 전: x=3
f 내부: x=3
f 내부: x=5 (할당 후)
f를 호출한 다음: x=3
```

중요한점은 함수안에서 x에 값을 할당하더라도 함수 바깥의 변수 x에는 아무 영향도 없는 것입니다. 이름은 같지만, 둘은 다른 개체라는 말이 되는거죠.

여기까지는, 누구나 쉽게 이해하고, 직관적으로 이해하며 쓰고 있습니다.

하지만, 함수 안에서 객체 자체를 변경하면, 그 객체는 함수 바깥에서도 바뀐점이 반영됩니다!

#####코드

```javascript
function f(o) {
  o.message = `f 안에서 수정함 `;
  o = { message: "새로운 객체!" };
  console.log(`f 내부: o.message="${o.message}" (할당 후)`);
}

let o = {
  message: "초기 값"
};

console.log(`f를 호출하기 전: o.message="${o.message}"`);
f(o);
console.log(`f를 호출한 다음: o.message=${o.message}`);
```

#####결과

```
f를 호출하기 전: o.message="초기 값"
f 내부: o.message="새로운 객체!" (할당 후)
f를 호출한 다음: o.message="f에서 수정함"
```

여기서 중요한점은 함수 안 매개변수 o와, 함수 바깥의 변수 o가 다른점입니다.

f를 호출 했을때는 둘은 같은 객체를 가리키지만, f 내부에서 o에 할당한 객체는 새로운, 전혀 다른 객체입니다.

`NOTE`

```
객체는 참조 타입입니다.(reference type) 객체를 전달할 때 두변수는 같은 객체를 가리키기 때문입니다.
```

### 2.매개변수 해체

매개변수 역시도 해체할당이 가능합니다.

단, `주의`할점은 확산 연산자는 반드시 마지막 매개변수 여야 한다는 점입니다. 확산 연산자 뒤에 다른 매개변수가 있으면 자바스크립트는 전달된 값 중 어디까지를 확산 매개변수에 할당해야 하는지 판단할 수 없어 `에러`를 일으킵니다.

```javascript
function addPrefix(prefix, ...words) {
  const prefixedWords = [];
  for (let i = 0; i < words.length; i++) {
    prefixedWords[i] = prefix + words[i];
  }
  return prefixedWords;
}

addPrefix("쩌는", "개발자", "블로그"); // ["쩌는 개발자","쩌는 블로그"]
```

### 3. 매개변수 기본값

`es6`에서는 매개변수에 기본값을 지정하는 기능이 추가되었습니다. 일반적으로 매개변수에 값을 제공하지 않으면 undefined가 값으로 할당 됩니다.

```javascript
function f(a, b = "default", c = 3) {
  return `${a} - ${b} - ${c}`;
}

f(5, 6, 7); // "5 - 6 - 7";
f(5, 6); // "5 - 6 - 3";
f(5); // "5 - default - 3";
f(); // "undefined - default - 3";
```

### 4. 객체의 프로퍼티가 되는 함수

객체의 프로퍼티인 함수를 메서드라고 불러 일반적인 함수와 구별합니다.
es6에서는 간편하게 메서드를 추가할 수 있는 문법이 새로 생겼습니다. 그예는 아래와 같습니다.

```javascript
//es6 이전
const o = {
  name: "ideveloper",
  talk: function() {
    return "Hi, I'm ideveloper!";
  }
};

//es6
const o = {
  name: "ideveloper",
  talk() {
    return "Hi, I'm ideveloper!";
  }
};
```

### 5. this 키워드

함수 바디 안에는 특별한 읽기 전용 값인 this가 있습니다. this는 일반적으로 객체 지향 프로그래밍 개념과 밀접한 연관이 있습니다.

일반적으로 this는 위에서 본 객체의 property가 되는 함수에서 의미가 있습니다.

```javascript
const o={
  name: "ideveloper",
  talk() { return `Hi my name is ${this.name}`};
}

o.talk(); // "Hi my name is ideveloper"
```

위에서 o.talk를 호출하면 this는 객체 o에 묶이게 됩니다.

중요한 점은, this가 o에 묶인 이유는, talk가 o의 프로퍼티 여서가 아니라, o에서 talk를 호출 했기 때문입니다. 아래 예를 살펴봅시다.

```javascript
const talk = o.talk;
talk === o.talk; // true
talk(); // "Hi my name is undefined"
```

함수를 위와 같이 호출하게 되면, 자바스크립트는 이 함수가 어디에 속하는지 모르므로 this는 undefined에 묶이게 됩니다.

### 6. 함수 표현식과 익명 함수

지금 까지는 함수 선언식의 형태를 많이 살펴보았습니다. 함수를 선언하면, 함수에 바디와 식별자가 모두 주어지게 됩니다. 자바스크립트는 익명함수도 지원합니다. 익명 함수는 식별자가 주어지지 않는 형태입니다.

함수에 식별자가 없다면 어떻게 호출을 하게 되는걸까요? 정답은 `함수 표현식(function expression)` 입니다.

함수 표현식은 함수 이름을 생략할 수 있다는 점을 제외하면, 함수 선언과 문법적으로 완전히 같습니다. 아래 예제는 결과적으로 함수 선언식과 동일합니다.

```javascript
const f = function() {
  // ...
};
```

그러면 함수에 이름을 할당하고 다시 변수에 할당하는 경우는 이유가 무엇일까요?
아래 예제에서 살펴봅시다.

```javascript
const g = function f(stop) {
  if (stop) console.log("stop!!!");
  f(true);
};

g(false);
```

위 예제에서 알수 있듯이 함수안에서 자신을 호출하는 재귀방식에서 유용하게 사용 될 수 있습니다.

함수 안에서는 f를 써서 자기자신을 참조하고, 함수 바깥에서는 g를 써서 함수를 호출합니다. 함수에 두가지 이름을 붙이는게 마냥 좋지는 않지만 함수 표현식이 어떻게 동작하는지 설명하기 위해 위와 같이 정해주었습니다.

여기서 들수 있는 의문은 함수 선언과 함수 표현은 그럼 어떻게 구분하고 또 어떤 차이점이 있을지 인데요. 저역시도 매번 두 개념이 헷갈리고, 다시 찾아보는 경우가 많았습니다.

그 해답은 컨텍스트에 있는데요.

- 나중에 호출할 생각으로 함수를 만든다면 `함수 선언식`을 사용하면 되고,
- 다른 곳에 할당하거나, 다른 함수에 넘길 목적으로 함수를 만든다면, `함수 표현식`을 사용하면 됩니다.

### 7. 화살표 표기법 (arrow function)

es6에서는 화살표 표기법도 새롭게 생긴 문법입니다.
그리고 화살표 표기법 (arrow function)이 가지는 특징은 아래와 같습니다.

- function을 생략해도 된다.
- 매개변수가 하나면 괄호는 생략 가능하다.
- 함수 바디가 표현식 하나라면 중괄호와 return 문도 생략 가능하다.
- 화살표 함수는 항상 익명이다. 이름 붙은 함수를 만들수 없다.

```javascript
const f1 = function() {
  return "hello";
};
//or
const f1 = () => "hello";

const f2 = function(name) {
  return `Hello, ${name}`;
};
//or
const f2 = name => `Hello, ${name}`;
```

그리고 마지막으로 화살표 표기법은 일반 함수와 아주 중요한 차이가 있는데요, 바로 this가 다른 변수와 마찬가지로 정적으로 묶인다는 것입니다.

아래 예제를 살펴봅시다.

```javascript
// arrow function을 쓰기전
const o = {
  name: "ideveloper",
  hi() {
    function talk() {
      return `${this.name}`;
    }
    return `${talk()}`;
  }
};
// arrow function을 쓴 경우
const o = {
  name: "ideveloper",
  hi() {
    const talk = () => {
      return `${this.name}`;
    };
    return `${talk()}`;
  }
};

o.hi();
```

위에서 후자의 경우는 hi 내부 함수 안에서 this가 바인딩 되어 원하는 결과를 얻을 수 있습니다.

추가로 화살표 함수에 있는 특징은 아래와 같습니다.

- 객체 생성자로 사용할수 없는 점
- arguments 변수를 사용할 수 없는 점

### 8. call과 apply, bind

위에서 arrow function을 활용해 this를 바인딩 하는 경우를 살펴보았는데요.
자바스크립트에서는 this를 지정할수 있는 방법이 한가지 더 존재하는데요, 함수를 어디서, 어떻게 호출했느냐와 관계 없이 this를 지정할 수 있습니다.

##### call

먼저 call 부터 살펴보면

```javascript
const ideveloper = { name: "Ideveloper" };

function greet() {
  return `Hi, i'm ${ideveloper}`;
}

greet(); // Hi, i'm undefined
greet.call(ideveloper); // Hi, i'm Ideveloper
```

그리고 call 메서드로 매개변수도 넘길 수 있습니다.

첫번째 매개변수는 this로 사용할 값이고, 매개변수가 더 있으면 그 매개변수는 호출하는 함수로 전달되게 되는것입니다.

```javascript
function update(age) {
  this.age = age;
}

update.call(ideveloper, 24);
// // ideveloper {
//       name: 'ideveloper',
//       age: 24
// // }
```

##### apply

apply는 함수의 매개변수를 처리하는 방법을 제외하면 call과 완전히 같습니다.
call은 일반적인 함수와 마찬가지로 매개변수를 직접 받지만, apply는 매개변수를 배열로 받습니다.

```javascript
function update(age, gender) {
  this.age = age;
  this.gender = gender;
}

update.apply(ideveloper, [24, "male"]);
// // ideveloper {
//       name: 'ideveloper',
//       age: 24,
//       gender: 'male'
// // }

// es6문법을 활용해 아래와 같이도 가능합니다.
const info = [24, "male"];
update.call(ideveloper, ...info);
// // ideveloper {
//       name: 'ideveloper',
//       age: 24,
//       gender: 'male'
// // }
```

따라서, apply는 배열 요소를 함수 매개변수로 사용해야 할때 매우 유용합니다.

```javascript
const arr = [2, 3, 5, -5, 15, 7];
Math.min.apply(null, arr); //-5
```

##### bind

마지막은 bind 입니다.
bind를 사용하면 함수의 this값을 영구하게 바꿀수 있게 됩니다.

```javascript
const ideveloper = { name: "Ideveloper" };
const other = { name: "Other" };
const updateInfo = update.bind(ideveloepr);
updateInfo(24, "male");
// // ideveloper {
//       name: 'ideveloper',
//       age: 24,
//       gender: 'male'
// // }

updateInfo.call(other, 26, "female");
//  ideveloper {
//       name: 'ideveloper',
//       age: 26,
//       gender: 'female'
//  }

//  other {
//        name: "Other"
//  }
}
```

bind로 this가 고정되어 ideveloper의 age, gender가 바뀌고, other은 바뀌지 않게 됩니다.

bind 함수는 함수의 동작을 영구적으로 바꾸게 되므로 찾기 어려운 버그의 원인이 될 수 있습니다. 따라서, bind는 매우 유용하지만 함수의 this가 어디에 묶이는지 정확히 파악하고 사용해야 합니다.

### 9.요약

함수는 자바스크립트에서 매우 핵심적인 부분이고, es6 문법과 함께 곁들여 파악하면 더 좋을 것입니다.
