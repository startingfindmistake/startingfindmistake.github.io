---
title: <Java> java.lang.StringBuilder
description: java.lang.Integer에 대해 알아보자
---

</br>
</br>

 ### `reverse()` 메서드
 ---
 * **클래스**: `java.lang.StringBuilder`
 * **메서드**: `public StringBuilder reverse()`
 * **설명 (Description):**
     * 이 문자 시퀀스(character sequence)가 역순으로 바뀐 시퀀스로 대체되도록 합니다.
     * 시퀀스에 서로게이트 쌍(surrogate pairs, 유니코드 보충 문자를 표현하는 방식)이 포함되어 있다면, 역순 작업 시 이를 분리하지 않고 단일 문자로 취급하여 처리합니다.
     * 조작이 완료된 이 객체(`StringBuilder`) 자신에 대한 참조를 반환합니다.
    
 * **적용 방법(Application):**
	 * 
     * 생성된 `StringBuilder` 객체 내부의 문자 배열 순서를 거꾸로 뒤집고자 할 때 호출합니다.
    새로운 객체를 생성하는 것이 아니라 기존 객체 내부의 데이터를 직접 수정합니다.
     * 반환값이 객체 자신이기 때문에 `.reverse() .toString()`처럼 다른 메서드와 이어서 (Chaining) 사용할 수 있습니다.
 * **주의 사항**
 1. 문자열로 입력을 받는다.
 2. reverse()를 통해 문자열을 뒤집는다.
 3. 에러가 발생한다?
 ```java
 import java.util.Scanner;
 import java.lang,StringBuilder;
 
 public class Main {
 	public static void main(String[] args){
    
    Scanncer sc = new Scanner(System.in);
    StringBuilder sb = new StringBuilder();
    
    //Scanner객체를 통해 문자열을 입력받는다.
    String A = sc.next();
    
    // 에러 발생 cannot convert from StringBuilder to String
    String C = sb.reverse();
    }
}
```
에러 메시지를 해석해보면 "타입 불일치: StringBuilder 타입을 String 타입을 변환할 수 없습니다." 라는 뜻입니다.

자바는 변수의 '타입(자료형)'을 매우 엄격하게 구분하는 언어입니다.
비록 둘 다 문자열을 다루는 클래스지만,
자바의 관점에서 `String`과 `StringBuilder`는 완전히 다른 종류의 객체이기 때문에 서로 직접 대입할 수 없습니다.
```java
String C = sb.reverse();
```
* 왼쪽(`String C`): `C`라는 변수는 `String` 타입의 데이터를 담을 준비를 하고 있습니다.
* 오른쪽(`sb.reverse()`):
`public StringBuilder reverse()`
Causes this character sequence to be replaced by the reverse of the sequence.
Returns: a reference to this object

>즉, `reverse()` 메서드는 문자열을 뒤집은 후 결과값을 `String`으로 주는 것이 아니라,
자기 자신인 `StringBuilder` 객체를 그대로 다시 반환합니다.

결과적으로 위 코드는 `String C = (StringBuilder 객체)가 되어버리기 때문에, 자바 컴파일러가 "타입이 달라서 넣을 수 없어!" 라며 에러를 뱉어내는 것입니다.

</br>
`StringBuilder` 객체를 `String` 변수에 넣으려면, `StringBuilder`가 가지고 있는 문자열 데이터를 `String` 타입으로 변환해 주어야 합니다.
이때 사용하는 메서드가 바로 `toString()` 입니다.

```java
String C = sb.reverse().toString();
```
 </br>
 </br>
 

### `toStirng()`메서드

---

 * **클래스:** `java.lang.StringBuilder`
 * **메서드:** `public String toString()`
 
 * **설명(Description):**
    * 이 시퀀스의 데이터를 나타내는 문자열(`String`)을 반환합니다.
    * 이 객체가 현재 나타내고 있는 문자 시퀀스를 포함하도록, 새로운 `String` 객체가 메모리에 할당(allocated)되고 초기화(Initialized)됩니다.
    * 이 메서드를 호출한 이후에 `StringBuilder` 객체의 내용을 수정하더라도, 이미 반환된 `String` 객체의 내용에는 영향을 미치지 않습니다.
    
 * **적용방법(Application):**
    * `StringBuilder`를 통해 문자열 조작(추가, 수정, 뒤집기 등)을 모두 마친 후,
    최종 결과를 일반적인 불변(immutable)문자열 타입인 `String`으로 변환하여 저장하거나 다른 메서드의 인자로 넘겨줄 때 호출합니다.