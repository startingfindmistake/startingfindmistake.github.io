---
title: java 기본 코드 정처기 준비
description: java 기본 코드 정처기 준비
---

## 먼저 알아야 할 사전 지식

* **배열(Array)**: 동일한 데이터 타입의 값들을 하나의 연속된 공간에 묶어서 저장하는 자료구조 입니다.
    * `new int[4]`는 정수 (`int`) 4개를 저장할 수 있는 공간을 메모리에 생성하라는 의미 입니다.
    * 배열의 인덱스는 `0`부터 시작합니다. (길이가 4라면 인덱스는 0, 1, 2, 3)
    * 배열의 길이는 `배열 이름.length` 속성을 통해 알 수 있습니다.

</br>

* 메서드 (Method)와 반환 (Return)**: 특정 작업을 수행하는 코드의 블록 입니다.
    * `marr()` 메서드는 `static int[]`라는 반환 타입을 가집니다.  
    이는 메서드가 실행을 마치고 나면 정수형 배열(`int[]`)을 결과값으로 돌려준다(return)는 뜻입니다.

</br>

* 참조 변수와 메모리(Reference Variables): Java에서 배열은 '객체' 취급을 받습니다.
    * `int temp[]`나 `int iarr[]` 같은 변수에는 배열의 실제 데이터 (0, 1, 2, 3)이 직접 저장되는 것이 아니라, 데이터가 저장된 메모리 주소(참조값)이 저장됩니다.


```java
public class java_test1 {
    static int[] marr() {
        int temp[] = new int[4];
        for(int i = 0; i < temp.length; i++)
            temp[i] = i;
        return temp;
    }

    public static void main(String[] args) {
        int iarr[];
        iarr = marr();
        for(int i = 0; i < iarr.length; i++)
            System.out.print(iarr[i] + " ");
    }
}
```


#### 1단계: `main` 메서드 시작

```java
public static void main(String[] args) {
    int iarr[];
}
```

* 가장 먼저 `int iarr[];`가 선언됩니다.  
이는 정수형 배열의 주소를 담을 수 있는 참조 변수 `iarr`를 만든 것입니다.  
아직 어떤 배열과도 연결되지 않은 빈 상태입니다.


</br>
</br>

#### 2. `marr()` 메서드 호출

```java
iarr = marr();
```

* `iarr`에 값을 할당하기 위해 `marr()` 메서드를 호출합니다.  
프로그램의 실행 흐름이 `marr()` 메서드 내부로 이동합니다.

</br>
</br>

#### 3. `marr()` 메서드 내부 - 배열 생성

```java
    static int[] marr() {
        int temp[] = new int[4];
    }
```
* `temp`라는 이름의 정수형 배열 참조 변수를 만듭니다.
* `new int[4]`를 통해 메로리(Heap영역)에 4개의 정수가 들어갈 공간을 생성하고,  
그 메로리 주소를 `temp`에 저장합니다.  
이때 배열의 초기값은 모두 `0`입니다. (`{0, 0, 0, 0}`)

</br>

#### 4단계: `marr()` 메서드 내부 - 배열 값 초기화(for문)

```java
for(int i = 0; i < temp.length; i++)
    temp[i] = i;
```
* `temp.length`는 배열의 길이인 `4`입니다. 반복문이 `i=0`부터 `i=3`까지 4번 실행됩니다.
    * `i = 0` 일 때: `temp[0] = 0;`
    * `i = 1` 일 때; `temp[1] = 1;`
    * `i = 2` 일 때; `temp[2] = 2;`
    * `i = 3` 일 때; `temp[3] = 3;`

* 반복문이 끝나면 `temp` 배열은 `{0, 1, 2, 3}`의 값을 가지게 됩니다.

</br>
</br>

#### 5단계: 배열 반환(return)
```java
        return temp;
    }
```
* 완성된 배열을 가리키는 주소값(`temp`가 가지고 있는 값)을 메서드를 호출했던 곳으로 반환합니다.

</br>
</br>

#### 6단계: 반환된 배열을 `iarr`에 저장

```java

    // main 메서드로 돌아옴
    iarr = marr();
```
* `marr()`메서드가 반환한 주소값이 `iarr`변수에 저장됩니다.
* 이제 `main` 메서드의 `iarr` 변수와 `marr` 메서드에서 만들었던 `temp` 변수는 **메모리 상의 동일한 배열** `{0, 1, 2, 3}`을 가리키게 됩니다.


</br>
</br>

#### 7단계: 결과 출력(main의 for문)
```java
    for(int i = 0; i < iarr.length; i++)
        System.out.print(iarr[i] + " ");
    }
```
* `iarr.length` 역시 `4` 입니다.  
반복문을 통해 `iarr` 배열의 요소를 처음부터 끝까지 순회하며 출력합니다.
* `print()` 메서드는 줄바꿈 없이 출력하므로, 각각의 숫자 뒤에 공백(" ")을 붙여서 화면에 출력합니다.

</br>
</br>

#### 최종 실행 결과
```plaintext
0 1 2 3
```