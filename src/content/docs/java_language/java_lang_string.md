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

**사용예시**
```java
public class CharAtExample {
    public static void main(String[] args) {
        String text = "Java";

        // 1. 유효한 인덱스에서 단일 문자(char) 추출
        // 인덱스는 0부터 시작하므로 첫 번째 문자는 인덱스 0에 위치합니다.
        char firstChar = text.charAt(0);
        //마지막 문자의 인덱스는 항상 length() -1 입니다.
        char lastChar = text.charAt(text.length() -1);

        System.out.println("첫 번째 문자 (인덱스 0): " + firstChar); //출력: J
        System.out.println("마지막 문자 (인덱스 3): " + lastChar); // 출력: a

        // 2. 기본형(primitive type) 반환값을 활용한 조건문 검사
        // 반환값이 객체가 아닌 char 기본형이므로 '==' 연산자로 즉시 비교가 가능합니다.
        if (text.charAt(0) == 'J') {
            System.out.println("안내: 이 문자열은 'J'로 시작합니다.");
        }

        // 3. 주의 사항: IndexOutOfBoundsException 예외 발생
        // 3-1. 인덱스가 음수 (0 미만)인 경우
        try {
            char negativeIndexChar = text.charAt(-1);
        } catch (IndexOutOfBoundsException e) {
            System.out.println("예외 발생: 인덱스는 음수(-1)일 수 없습니다.");
        }


        // 3-2. 인덱스가 문자열의 길이(length())보다 크거나 같은 경우
        try {
            //text.length()는 4이므로 인덱스 4는 범위를 벗어납니다. (최대 인덱스는 3)
            char outOfBoundsChar = text.charAt(4);
        } catch (IndexOutOfBoundsException e) {
            System.out.println("예외 발생: 지정한 인덱스가 문자열의 길이를 벗어났습니다.")
        }

        // 4. 서로게이트(Surrogate) 쌍 처리 확인 (유니코드 보충 문자)
        // 이모지(음표 🎵등)은 내부적으로 2개의 char(서로게이트 쌍)으로 구성 됩니다.
        Stirng musicNote = "🎵";
        System.out.println("\n음표 이모지 문자열의 길이: " + musicNote.length()); // 출력: 2

        // charAt()은 서로게이트 쌍을 분리하지 않고 단일 char로 취급하므로,
        // 보통 문자의 경우 절반(깨진 문자)만 반환하게 됩니다.
        char surrogateHalf = musicNote.charAt(0);
        System.out.println("인데스 0의 char 값(서로게이트 일부 반환): " + surrogateHalf);
    }
}

```
* `text.charAt(text.length() -1)` 패턴은 문자열의 길이에 상관없이 항상 마지막 문자를 안전하게 가져오기 위해 실무에서 매우 자주 쓰이는 관용구 입니다.
* 서로게이트 쌍(Surrogate pairs)의 경우, `charAt`은 문자의 시각적 의미(이모지 1개)를 고려하지 않고 메모리에 저장된 16비트 `char` 단위로만 접근한다는 점을 코드로 확인할 수 있습니다.


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

**`indexOf()`메서드의 실제 위치(Java API 문서)**
* `Java.lang.String`클래스: 문자열 내부에서 특정 문자(`char`의 정수형인 `int`)나 부분 문자열 인덱스를 찾기 위한 `indexOf(int ch)` 및 `indexOf(String str)`메서드를 제공합니다.
* `java.util.List`인터페이스: 리스트 컬렉션 내부에서 특정 객체의 위치를 찾기 위한 `indexOf(Object o)` 메서드를 제공합니다.

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

        
        // 2. 문자열 내에 존재하지 않는 부분 문자열 검색
        int indexPython = text.indexOf("Pythob");
        System.out.println("Python이 처음 시작되는 인덱스: " + indexPython);
        // 출력 "Python"이 처음 시작되는 인덱스: -1


        // 3. 빈 문자열 ("") 검색 (공식 문서 규정)
        // 빈 문자열을 인수로 전달하면 항상 0을 반환합니다.
        int indexEmpty = text.indexOf("");
        System.out.println("빈 문자열 검색 결과 인덱스: " + indexEmpty);
        // 출력: 빈 문자열("") 검색 결과 인덱스: 0

        // 4. 주의 사항: null 전달 시 NullPointerException 발생
        try {
            // 공식 문서에 명시된 대로 파라미터가 null 이면 예외가 발생합니다.
            int indexNull = text.indexOf(null);
        } catch (NullPointerException e) {
            System.out.println("안내: 검색 인수로 null 전달하면 NullPointerException이 발생합니다.")
        }

        // 5. 실무에서의 활용 (특정 단어 포함 여부 확인)
        if (text.indexOf("World") != -1) {
            System.out.println("안내: 해당 텍스트에는 'World'라는 단어가 포함되어 있습니다.");
        }
    }
}

```

* 부분 문자열을 검색할 때는 해당 단어의 첫 글자가 위치한 인덱스를 반환 합니다. (예 `java`의 `j`위치)
* 찾고자 하는 문자열이 여러 번 등장하더라도 무조건 가장 처음 매칭되는 위치만 반환합니다.
* `indexOf(String str) != -1` 형태의 조건문은 자바에서 특정 문자열의 포함 여부를 검사할 때 `contains()`메서드와 함께 가장 자주 사용되는 패턴 중 하나입니다.


</br>
</br>


## `replace()`메서드
---
**클래스:** `java.lang.String`

**메서드 1:** `public String replace(char oldChar , char newChar)`
**메서드 2:** `public String replace(CharSequence target, CharSequence replacement)`

**설명 (Description)**
* `replace(char oldChar , char newChar)`: 이 문자열에서 발견되는 모든 `oldChar`를 `newChar`로 치환한 결과 문자열을 반환합니다.
만약 이 `String` 객체의 문자 시퀀스에 `oldChar`가 단 하나도 존재하지 않는다면, 새로운 객체를 생성하지 않고 ** 이 `String` 객체 자신에 대한 참조를 그대로 반환** 합니다.

* `replace(Char Sequence target, CharSequence replacement)`: 지정된 리터럴 대상 시퀀스(`target`)와 일치하는 이 문자열의 각 부분 문자열을 지정된 리터럴 대체 시퀀스(`replcement`)로 치환합니다.
치환 작업은 **문자열의 첨으부터 끝을 향해(from the beginning to the end)진행** 됩니다.
공식 문서에 따르면, 문자열 `"aaa"`에서 `"aa"`를 `"b"`로 치환하면 뒤쪽을 먼저 치환한 `"ab"`가 아니라, 앞에서부터 치환이 이루어져 `"ba"`가 됩니다.


**적용 방법(Application)**
* 정규표현식(Regular Expression)이 아닌, 문자열 내의 특정 단일 문자나 단순한 부분 문자열(단어 등) 값 자체를 모두 찾아 다른 문자로 일괄 변경하고자 할 때 호출합니다.
반환된 새로운 문자열을 변수에 담아 사용해야 합니다.

**주의 사항(Throws & Notes)**
* `NullPointerException`: `replace(CharSequence target, CharSequence replacement)`를 사용할 때, `target`이나 `replacement` 인수로 `null`을 전달하면 예외가 발생합니다.
* **불변성(Immutability)**: `String`은 불변 객체이므로 원본 문자열 자체는 절대 수정되지 않습니다.
`replace()`의 결과는 항상 반환값으로 받아야 합니다.

**`replace()`사용 예시 코드**
```java
public class ReplaceExample {
    public static void main(String[] args) {
        String original = "Hello, Java World!";

        // 1. 단일 문자(char) 치환
        // 모든 'o' 문자를 '0'(숫자 영)으로 변경하여 새로운 문자열 반환
        String replacedChar = original.replace('o', '0');
        System.out.println("문자 치환 결과: " + replacedChar);
        // 출력: Hell0, Java W0rld!

        // 2. 문자 치환 시 변경 대상이 없는 경우 (공식 문서 명세)
        // 'z'는 원본에 없으므로, 새로운 객체를 만들지 않고 original 객체의 참조를 그대로 반환합니다.
        String noChange = original.replace('z', 'x');
        System.out.println("변경 대상이 없을 때 참조 동일 여부: " + (original == noChange));
        // 출력: true (같은 메모리 주소를 가리킴)

        // 3. 부분 문자열(CharSequence) 치환
        String replacedString = original.replace("Java", "Spring");
        System.out.println("문자열 치환 결과: " + replacedString);
        // 출력: Hello, Spring World!

        // 4. 주의 사항: 치환 방향 (처음부터 끝으로 진행)
        // 공식 문서에서 제공하는 대표적인 동작 예시입니다.
        String aaa = "aaa";
        String ba = aaa.replace("aa", "b");
        System.out.println("\"aaa\"에서 \"aa\"를 \"b\"로 치환한 결과: " + ba);
        // 출력: ba (앞의 "aa"가 먼저 "b"로 바뀌고, 뒤에 남은 "a"가 붙음)

        // 5. 주의 사항: NullPointerException 발생
        try {
            String nullTest = original.replace("Java", null);
        } catch (NullPointerException e) {
            System.out.println("\n예외 발생: target이나 replacement에 null을 넣을 수 없습니다.");
        }
    }
}

```

<br />
<br />


## `equals()` 메서드
---

**클래스**: `java.lang.String`
**메서드**: `pulic boolean equals(Object anObject)`

**설명(Description)**
이 문자열(String)을 지정된 객체(Object)와 비교합니다.
결과는 인자로 전돨된 객체가 `null`이 아니고,
이 객체와 **동일한 문자 시퀀스(sequence of character)**를 나타내는 `String` 객체일 경우메난 `true`를 반환합니다.


**적용 방법(Application):**
두 문자열의 내용(실제 문자열 데이터)이 정확히 일치하는지 검사할 때 사용합니다. 객체의 메모리 주소를 비교하는 `==`연산자와 달리, 실제 문자열 값 자체의 동등성(equivalence)을 평가해야 하는 모든 경우에 호출합니다.

**주의 사항(Notes)**
* **Null 체크 내장:** 전달된 인자(`anObject`)가 `null`인 경우, 예외(Exception)를 발생시키지 않고 단순히 `false`를 반환합니다.
* **엄격한 타입(Type)확인:** 비교 대상 객체가 `String` 타입이 아닌 경우(예: `StringBuilder`, `StringBuffer` 등) 내용이 같아 보이더라도 무조건 `false`를 반환합니다.
* **대소문자 구분:** 이 메서드는 문자의 대소문자를 엄격하게 구분합니다. 만약 대소문자를 무시하고 비교하고 싶다면 공식 문서에 명시된 대체 메서드인 `equalsIgnoreCase(String)`을 사용해야 합니다.

**사용 예시**
```java
public class EqualsExample {
    public static void main(String[] args) {
        String str1 = new String("Hello");
        String str2 = new String("Hello");
        String str3 = "hello";


        // 1. 문자 시퀀스(값) 비교
        // str1과 str2는 메모리에 할당된 서로 다른 객체지만,
        // 포함하고 있는 문자 시퀀스가 완전히 동일하므로 true 반환합니다.
        boolean isEqual = str1.equals(str2);
        System.out.println("str1.equals(str2: " + isEqual);
        // 출력: str1.equals(str2): true

        // 2. 동등성(euqsls)과 동일성(==)의 차이 비교
        // equals()는 공식 문서의 설명대로 '문자 시퀀스'를 비교하지만,
        // == 연산자는 객체의 참조(메모리 주소)를 비교하므로 false를 반환합니다.
        System.out.println("str1 == str2: " + (str1 == str2));
        // 출력: str1 == str2: false

        // 3. 주의 사항 확인: 대소문자 구분 및 다른 타입/Null 비교
        // 문자열이 같아도 대소문자가 다르면 false 반환
        System.out.println("\n--- 주의 사항 확인---");
        System.out.println("대소문자 다름: " + str1.equals(str3));

        // 인자가 null인 경우 예외 없이 false 반환
        System.out.println("null 비교: " + str1.equlas(null));
        // 출력: null 비교: false

        // 인자가 String 객체가 아닌 경우(StringBuilder) false 반환
        StringBuilder sb = new StringBuilder("Hello");
        System.out.println("다른 타입 비교: " + str1.equals(sb));
        // 출력: 다른 타입 비교: false
    }
}
```

* `String` 클래스의 `equals()` 메서드는 최상위 클래스인 `Object`의 메서들르 오버라이딩(재정의)하여, 단순히 객체가 같은지르 넘어서 **"객체가 품고 있는 문자 시퀀스의 내용이 같은지"**를 논리적으로 판단하도록 설계되었습니다.

* 자바에서 문자열의 내용이 일치하는지 확인할 때는 참조(주소)를 비교하는 `==` 연산자가 아닌, 반드시 `equals()` 메서드를 사용해야 공식 문서에서 보장하는 올바른 문자 시퀀스 비교 결과를 얻을수 있습니다.