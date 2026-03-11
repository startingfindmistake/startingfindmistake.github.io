---
title: <Java> 배열
description: java배열 에 대해 알아보자
---

```java
import java.util.Scanner;

public class test_1{
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);



        // String 배열 선언과 초기화
        String arr[] = new String[3];

        arr[3] = sc.nextLine();

        System.out.print(arr[3]);
    }
}


```
코드를 작성하고 돌려보니

`Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3`
인덱스 범위 초과 예외 발생! 길이가 3인 배열인데, 3번 인덱스(4번째 자리)에 접근 하려고 해서 범위를 벗어났습니다.

왜 이런 에러가 발생할까
한번 살펴보면

## Step1. 배열의 선언과 크기(Length)
```java
String arr[] = new String[3];
```

이 코드를 보면 **데이터를 3개 담을 수 있는 String 배열을 만들어라**라는 뜻입니다.
즉 공간이 3개인 상자가 만들어졌다고 생각하시면 됩니다.


## Step2. 배열의 인덱스(Zero - based Indexing)
자바 공식 문서의 [Arrays](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html)섹션 에서는 인덱스에 대해 다음과 같이 설명합니다.

<pre>"Each item in an array is called an element, and each element is accessed by its numerical index. As shown in the preceding illustration, numbering begins with 0."</pre>

배열의 각 항목은 요소(element)라고 부르며, 숫자 인덱스로 접근합니다.
번호 매기는 0부터 시작합니다.


크기가 3인 배열(`new String[3]`)을 만들었다면,
사용할 수 있는 방 번호(인덱스)는 1, 2, 3이 아니라 0. 1. 2가 됩니다.
* 첫 번째 방: `arr[0]`
* 두 번째 방: `arr[1]`
* 세 번째 방(마지막): `arr[2]`



## 에러 메시지 분석 (ArrayIndexOutOfBoundsException)
```java
arr[3] = sc.next();
```

여기서 중요한 것이 배열을 선언하고 초기화 할대는 `arr[3]`은 size가 3이라고 명시하지만
아까 사이즈가 3인것은 `arr[0]` 부터 `arr[2]`까지 만들어진 것이다.
그래서 `arr[3]`은 4번째에 넣는다는 표현으로 에러가 난것이다.

초기화 할때와 인덱스를 찾으러 갈때 헷갈리지 말자~!





우리는 인덱스를 구분 할때, 배열을 사용하여 인덱스의 위치를 알아낸다.

예를들어
```java
int N;
int arr[] = new arr[N];
```
`arr[]`배열을 새로 선언했다고 해보자
그러면 사이즈가 N인 배열이 선언이 됐는데 문제는 우리는 여기에 배열을 넣는다고 생각해보면
```
for(int i = 0; i <N; i ++)
```
반복문을 통해 값을 하나씩 받아서 배열에 넣을 것이다.

그러면 `int arr[]`는 인덱스당 정수값 하나만 들어갈수 있다. 라고 생각을 하다가

갑자기 `String[]` 배열이 나오면 문자열 저장한다고 생각을 하는데 조금 했갈리는데 문자열이면 어떻게 해야 하지 라는 생각이든다


쉽게 생각하면
` " ~ " ` ~기호에 어떤 문자열을 초과하지만 않으면 뛰어쓰기를 넣어도 상관없이 길게 작성이 가능하다.

그러면 다시 생각해보면

**1. 방의 용량 1칸 = 1개의 데이터**
`arr[0]`은 단 하나의 상자입니다. 따라서 "사과", "바나나", "포도"라는 3개의 독립된 문자열을
`arr[0]`이라는 방 하나에 따로 따로 구분해서 넣을 수는 없습니다.
여러 개의 단어를 각각 다루고 싶다면 `arr[0]`, `arr[1]`, `arr[2]` 처럼 준비된 다른 방들을 각각 사용해야 합니다.

**2. 데이터의 형태: 뛰어쓰기가 포함된 긴 문장**
단, `arr[0]`에 들어가는 그 '하나의 문자열' 자체가 아주 긴 문장일 수는 있습니다.
예를 들어, `"사과 바나나 포도"` 라는 뛰어쓰기가 포함된 텍스트 전체를 **하나의 통짜 문자열**로 취급해서 `arr[0]`에 넣는 것은 얼마든지 가능합니다.

```java
// 뛰어쓰기가 여러 개 있지만, 쌍따옴표(" ")로 묶인 하나의 문자열 덩어리입니다.
arr[0] = "사과 바나나 포도 딸기 수박";
```


그런데 여기서 핵심인게 **Scanner의 입력방식**에 대해 알아봅시다
* `sc.next()`를 사용할 때
    * 콘솔에 `안녕 반가워`라고 입력하고 엔터를 칩니다
    * `sc.next()`는 띄어쓰기를 기준으로 단얼르 잘라서 가져오기 때문에,
    `arr[0]`에는 오직 `"안녕"` 하나 만 들어갑니다.
    (남은 "반가워"는 다음 입력을 위해 허공에 대기하게 됩니다.)
    
* `sc.nextLine()`을 사용할 때
    * 콘솔에 `안녕 반가워`라고 입력하고 엔터를 칩니다
    * `sc.nextLine()`은 엔터를 치기 전까지 적힌 **그 줄 전체**를 한 덩어리로 가져옵니다.
    따라서 `arr[0]`에는 `"안녕 반가워"` 라는 긴 문자열 하나가 통째로 들어가게 됩니다.
    
    
> `arr[0]`에는 여러 개의 데이터를 쪼개서 넣을 수는 없지만, 띄어쓰기가 포함된 아주 긴 문장 하나를 통째로 넣는 것은 가능합니다.





입력을 다 받고 내용을 한번에 출력할수는 없을까?


1. StringBuilder (결과를 모아두는 역할)
문자열을 계속 이어 붙일 수 있는 '가변(mutable) 문자열' 객체입니다.

- StringBuilder sb = new StringBuilder();: 결과를 저장할 빈 객체를 만듭니다.

- sb.append(값);: 괄호 안의 값을 문자열 뒤에 붙입니다.

- sb.append('\n');: 줄바꿈(엔터)도 직접 붙여줘야 합니다.

- System.out.println(sb);: 모아둔 모든 내용을 콘솔에 출력합니다. (마지막에 딱 1번)



StringBuilder: 출력을 메모리에 모으는 도구

append(): 내용을 뒤에 이어 붙이는 함수

