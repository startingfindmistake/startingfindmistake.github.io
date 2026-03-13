---
title: <Java> java.lang.Stirng
description: java.lang.String에 대해 알아보자
---

### `charAt()`
---
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


</br>
</br>

## `indexOf(int ch)`
---
**클래스**: `java.lang.String`
**메서드**: `public int indexOf(int ch)`

**설명(Description)**:
* 이 문자열 내에서 지정된 문자(`ch`)가 처음으로 나타나는 위치의 인덱스를 반환합니다.
* 파라미터로 전달된 `ch` 값이 이 `String` 객체의 문자 시퀀스에 존재하면, 해당 문자가 처음 나타나는 인덱스(유니코드 코드 유닛 기준)이 반환됩니다.
* 이 메서드는 보충 문자(Supplementary characters)를 처리할 수 있도록 설계되어, 인수로 `char` 대신 `int` 타입의 유니코드 코드 포인트(Code point)값을 받습니다.
* 해당 문자가 문자열 내에 존재하지 않으면 `-1`을 반환합니다.

**적용 방법(Application)**:
* 문자열 내부에서 특정 단일 문자(알파벳, 기호 등)이 가장 처음 등장하는 위치(순서)를 찾고자 할 때 호출합니다.
반환된 인덱스를 활용하여 문자열을 자르거나(substring)분석할 때 주로 사용합니다.

**주의 사항**
* 인덱스는 `0`부터 시작합니다.
* 문자를 찾지 못했ㅇ르 때 예외(Exception)를 발생시키지 않고 `-1`을 반환하므로, 반환값이 `0`이상인지 확인하여 문자의 존재 여부를 판별하는 조건문과 함께 자주 사용됩니다.

**사용예시**
```java
public class IndexOfExample {
    public static void main(String[] args) {
        String stext = "Hello, Java World!";

        // 1. 문자열 내에 존재하는 단일 문자 검색
        // 작은따옴표로 감싼 'J'는 char 타입이지만, indexOf(int ch) 메서드를
        // 호출할 때 자동으로 int 값(유니코드 코드 포인트)로 변환되어 전달됩니다.
        int indexJ = text.indexOf('J');
        System.out.println("'J'가 처음 등장하는 인덱스: " + indexJ);
        // 츌룍: 'J'가 처음 등장하는 인덱스: 7

        // 2. 문자열 내에 존재하지 않는 단일 문자 검색
        int indexZ = text.indexOf('Z');
        System.out.println("'z'가 처음 등장하는 인덱스: " + indexZ);
        // 출력: 'Z'가 처음 등장하는 인덱스: -1

        // 3. int형 유니코드 코드 포인트를 직접 전달하여 검색
        // 'a'의 10진수 유니코드(아스키) 값은 97입니다.
        int indexA = text.indexOf(97);
        System.out.println("코드 포인트 97('a')이 처음 등장하는 인덱스: " + indexA);
        // 출력: 코드 포인트 97('a')이 처음 등장하는 인덱스: 8

        // 4. 실무에서 활용 (반환값이 -1인지 확인하는 조건문)
        if (text.indexOf('z') == -1) {
            System.out.println("안내: 해당 문자열에는 'z'가 포함되어 있지 않습니다.");
        }
    }
}
```
* 자바에서 `indexOf`에 문자를 넘길 때 보통 `indexOf('A')`처럼 `char` 형태로 넘기지만, 메서드 시그니처가 `indexOf(int ch)`인 이유는 자바가 `char`값을 `int`로 자동 형변환(Implicit Casting)하여 받아들이기 때문입니다.
이를 통해 16비트 `char`로 표현할 수 없는 유니코드 보충 문자(이모지 등)의 `int` 코드 포인트 값도 안전하게 처리할 수 있습니다.


</br>
</br>

## `indexOf(String str)`
**메서드**: `public int indexOf(String str)`

**설명(Descrpiton)**:
* 이 문자열 내에서 지정된 부분 문자열(substring, `str`)이 처음으로 나타나는 위치의 첫 번째 인덱스를 반환합니다.
* 공식 문서 기준, 반환된느 인덱스는 `this.startsWith(str, k)`가 참(`true`)가 되는 가장 작은 정수`k` 값입니다.
* 해당 부분 문자열이 존재하지 않으면 `-1`을 반환합니다.

**주의 사항**
* `NullPointerException`: 파라미터로 전달된 `str`이 `null`일 경우 예외가 발생합니다.
* 빈 문자열(`""`)을 인수로 전달하여 검색할 경우, 예외 없이 항상 `0`을 반환합니다.
* 반환값이 `-1`인지 여부를 통해 특정 문자열일 포함되어 있는지 검사하는 용도(마치 `contains` 메서드처럼) 흔히 활용됩니다.

**활용예시**
```java
public class IndexOfStringExample {
    public static void main(String[] args) {
        String text = "Hello, Java World! java is fun.";

        // 1. 문자열 내에 존재하는 부분 문자열(substring) 검색
        //"Java"라는 문자열이 두 번 등장하지만, '처음' 나타나는 위치의 첫 인덱스를 반환합니다.
        int indexJava = text.indexOf("Java");
        System.out.println("Java가 처음 시작하는 인덱스" + indexJava);
        // 인덱스는 0부터 시작하기 때문에 `, (콤마)` 와 `\ (공백)`까지 계산하면
        // 출력: "Java"가 처음 시작되는 인덱스: 7
    }
}

```