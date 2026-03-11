---
title: <Java> if문
description: if문 에 대해 알아보자
---


### 1step. 기본 `if`문
가장 단순한 형태의 조건문 입니다.
주어진 조건이 **참(`true`)**일 때만 특정 코드 블록을 실행합니다.

문법 구조
```java
if (조건식) {
	// 조건식이 true일 때 실행될 코드
}
```

* **조건식(Expression)**:
괄호 `()`안의 조건식은 반드시 `boolean` 데이터 타입(결과가 `true` 또는 `false`)으로 평가되어야 합니다.

* **실행 블록**:
조건식이 `true` 이면 중괄호 `{ }` 안의 코드가 실행되고,
`false`이면 실행되지 않고 `if`문 다음 코드로 넘어갑니다.

example:
```java
int speed = 80;

if (speed > 70) {
	System.out.println("과속입니다. 속도를 줄이세요");
}
```

</br>
</br>

### 2step. `if-else`문
---
조건식이 참일 때와 거짓일 때 실행할 코드를 가각 나누고 싶을 때 사용합니다.

```java
if (조건식) {
	// 조건식이 true일 때 실행될 코드
} else {
	// 조건식이 false일 때 실행될 코드
}
```

* `if`문의 조건식이 `flase`로 평가되면, 프로그램의 제어권은 `else` 블록으로 즉시 넘어갑니다.
* `if`와 `else`블록 중 **오직 하나만**실행되는 것이 보장됩니다.

```java
boolean isRaining = true;

if (isRaining) {
	System.out.println("우산을 챙기세요.");
} else {
	System.out.println("우산이 필요 없습니다.");
}
```


</br>
</br>

### 3step. `if-else if-else`문 (다중 조건문)
---
세 가지 이상의 다양한 조건을 순차적으로 검사해야 할 때 사용합니다.

**문법 구조**
```java
if (조건식1) {
	// 조건식1이 true일 때 실행
} else if (조건식2) {
	// 조건식1이 false이고, 조건식2가 true일 때 실행
} else {
	// 위의 모든 조건이 false일 때 실행
}
```
* **순차적 평가**: 위에서부터 아래로 순서대로 조건을 평가합니다.
* **단일 실행**
여러개의 `else if` 조건 중 하나라도 `true`가 나오면 해당 블록을 실행하고, 나머지 조건은 평가하지 않은 채 전체 `if`문을 빠져나갑니다.

* 마지막의 `else`블록은 선택 사항(Optional)이며, 앞선 모든 조건이 맞지 않을 때의 기본값(Default) 역활을 합니다.


example:
```java
int socre = 85;

if (score >= 90) {
	System.out.println("A 학점");
} else if (score >= 80) {
	System.out.println("B 학점"); // 이 블록이 실해오디고 조건문을 빠져나감
} else if (score >= 70) {
	System.out.println("C 학점");
} else {
	System.out.println("F 학점");
}
```


### 4step. 공식 문서에서 강조하는 주의사항(Best Practices)
Java Language Specifications(JLS)에서는 `if`문 작성 시 발생할 수 있는 모호함에 대해 다음과 같은 규칙을 명시하고 있습니다.

* **Dangling else 문제**:
중첩된 `if` 문에서 중괄호 `{ }`를 생략할 경우,
컴파일러는 `else`구문을 **가장 가까운(바로 직전의)`if`문**과 결합합니다.

* **중괄호 `{ }` 사용 권장**:
실행할 코드가 단 한줄이더라도, 버그를 예방하고 가독성을 높이기 위해 항상 중괄호 `{ }`를 사용하는 것을 공식적으로 강력히 권장합니다.

**나쁜예 (중괄호 생략으로 인한 논리적 오류 가능성)**
```java
if (x > 0)
	if (y > 0)
    	System.out.println("둘 다 양수");
else // 이 else는 들여쓰기와 무관하게 두 번째 if(y > 0)에 종속됩니다.
	System.out.println("x가 양수가 아님을 의도했지만 잘못 작성됨");
```

** 좋은예**
```java
if (x > 0) {
	if (y > 0) {
    	System.out.println("둘 다 양수");
    }
} else {
	System.out.println("x가 0 이하입니다.");
}
```

</br>
</br>


### Java에서는 문자열(`String`)끼리 부등호 (`<` , `>`)로 대소 비교를 할 수 없습니다.
* Java 언어 명세(JLS)에 따르면, 부등호 연산자(`<`,`>`, `<=`, `>=`)는 숫자형(Primitive 타입인 `int`, `double` 등)에 만 사용할 수 있습니다.