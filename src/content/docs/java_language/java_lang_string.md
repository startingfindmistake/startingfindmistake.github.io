---
title: <Java> java.lang.Stirng
description: java.lang.String에 대해 알아보자
---

### `charAt()`메서드
**클래스**: `java.lang.String`
**메서드**: `public char charAt(int index)`

**설명(Description)**:
* 지정한 인덱스(index)에 위치한 `char`값을 반환합니다.
* 인덱스의 범위는 `0`부터 `length() -1`까지 입니다.
배열의 인덱싱 규칙과 동일하게 시퀀스의 첫 번째 `char`값은 인덱스 `0`에, 그 다음 값은 인덱스 `1`에 위치합니다.
* 만약 인덱스로 지정된 `char`값이 서로게이트(surrogate, 유니코드 보충 문자의 일부)인 경우, 해당 서로 게이트 값이 그대로 반환됩니다. (참고: 보충 문자의 전체 코드 포인틀르 얻으려면 `codePointAt`메서들)

**적용 방법(Application)**
* 문자열이나 문자 시퀀스 내에서 특정 위치(순서)에 이쓴ㄴ 단일 문자(`char`) 데이터를 읽어오고자 할 때 호출 합니다.
* 반환값이 객체가 아닌 `char` 기본형(primitive type)이므로, 특정 문자를 조건문으로 검사하거나 추출하여 다른 변수에 저장할 때 주로 사용됩니다.

**주의 사항(Throws)**:
* `IndexOutOfBoundsException`: 전달된 `index`인수가 음수(`0` 미만)이거나 해당 문자열(또는 시퀀스)의 길이 (`length()`)보다 크거나 같을 경우 예외를 발생시킵니다.
따라서 항상 유효한 인덱스 범위 내에서 호출해야 합니다.