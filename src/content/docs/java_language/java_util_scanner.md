---
title: <Java> java.util.Scanner
description: java.util.Scanner에 대해 알아보자
---



### 입력 값을 문자열로 읽어오기
---

* 클래스: `java.util.Scanner`
* 메서드: `next()`
* 설명: `public String next()`

* 설명 
    * 이 스캐너에서 다음 완전한 토큰(complete token)을 찾아 반환합니다.
    * 완전한 토큰이란 스캐너의 구분자 패턴(delimiter pattern)과 일치하는 입력에 의해 앞뒤가 구분되는 데이터 덩어리를 뜻합니다.
    * 이 메서드는 스캔할 입력이 들어오기를 기다리는 동안 블로킹(실행을 멈추고 대기)될수 있습니다.
    (이전에 `hasNext()` 메서드가 `true`를 반환했더라도 대기 상태가 될 수 있습니다.)
    
* 적용 방법(Application)
    * 스캐너가 설정한 구분자(기본적으로는 공백, 탭, 줄바꿈 등의 Whitespace)를 기준으로 입력 스트림을 분리하여, 다음 문자열 토큰을 읽어오고자 할 때 호출하여 사용합니다.
    * 호출 시 스캐너에 더 이상 읽어올 수 있는 토큰이 존재하지 않으면
    `NoSuchElementException` 예외를 발생시킵니다.
    * 만약 스캐너 객체가 이미 닫힌(closed)상태에서 이 메서드를 호출하게 되면
    `IllegalStateException`예외를 발생시킵니다.
    
    
**주의 사항(Notes)**

* `NoSuchElementException`:
스캐너가 더 이상 읽어올 수 있는 토큰이 존재하지 않을 때(입력이 모두 소진되었을 때) 예외를 발생시킵니다.
따라서 `hasNext()`메서드를 통해 읽어올 토큰이 있는지 먼저 확인하는 것이 안전합니다.

* `IllegalStateException`:
스캐너 객체가 이미 닫힌(`closed`)상태에서 이 메서드를 호출하게 되면 예외를 발생시킵니다. 스캐너 사용이 끝난 후 닫힌 상태에서는 데이털르 읽을 수 없으므로 상태 관리에 주의 해야 합니다.

* **블로킹(Blocking) 발생 가능성**
스캔할 입력이 들어오기를 기다리는 동안 메서드 실행이 멈추고 대기(블로킹) 상태가 될 수 있습니다. 공식문서에 따르면, 이전에 `hasNext()`메서드가 `true`를 반환했더라도 스캐너가 입력을 기다리며 블로킹될 수 있으므로 프로그램의 실행 흐름을 설계할 때 이 점을 인지해야 합니다.

**사용예시**
```java
import java.util.Scanner;
import java.util.NoSuchElementException;

public class ScannerNextExample {
    public static void main(String[] args) {
        // 테스트 문자열 입력 소스 (기본 구분자인 공백으로 단어 구분)
        String input = "Hello Java World";
        Scanner scanner = new Scanner(input);

        // 1. 완전한 토큰(Complete  Token) 읽기
        // 공백을 기준으로 문자열을 잘라 반환합니다.
        System.out.println("첫 번째 토큰: " + scanner.next()); // 출력: Hello
        System.out.println("두 번째 토큰: " + scanner.next()); // 출력: Java
        System.out.println("세 번째 토크: " + scanner.next()); // 출력: World

        // 2. 주의 사항: NoSuchElementException 예외 발생
        // 입력된 문자열을 모두 소진하여 더 이상 읽어올 토큰이 없는 상태
        try {
            String emptyToken = scanner.next();
        } catch (NoSuchElementException e) {
            System.out.println("\n 예외 발생: 스캐너에 더 이상 읽어올 토큰이 존재하지 않습니다.");
        }

        // 3. 주의 사항: IllegalStateException 예외 발생
        // 스캐너 사용을 종료하고 닫음(close)
        scanner.close();
        try {
            // 이미 닫힌 스캐너에 다시 데이털르 읽으려 시도
            String closedToken = scanner.next();
        } catch (IllegalStateException e) {
            System.out.println("예외 발생: 스캐너 객체가 이미 닫힌(closed)상태 입니다. ");
        }


        // 4. 주의 사항: 블로킹(Blocking)현상
        // 키보드 입력(System.in)을 받을 때 next()가 어떻게 대기하는지 보여주는 예시입니다.
        Scanner consoleScanner = new Scanner(System.in);
        System.out.print("단어를 입력하세요: ");
        // 아래 줄에서 프로그램은 사용자가 단어를 입력하고 Enter를 누를 때까지
        //실행을 멈추고 기다립니다. (이것이 공식 문서에서 말하는 블로킹 상태 입니다.)
        String userInput = consoleScanner.next();
        System.out.println("입력된 단어: " + userInput);
    }
}
```
* 실무에서는 `NosuchElementException` 예외가 발생하는 것을 방지하기 위해 보통 `while(Scanner.hasNext())`와 같은 조건문으로 토큰이 남아있는지 먼저 확인한 후 `next()`를 호출하는 패턴을 주로 사용합니다.
* 예시에서는 `String` 변수를 스캐너의 입력 소스로 사용했지만, `Scanner(System.in)`처럼 콘솔 입력을 받을 때 `next()`가 입력을 기다리며 프로그램 실행을 멈추는 것(블로킹)이 가장대표적인 동작 특징입니다.

[oracle](https://docs.oracle.com/javase/8/docs/api/java/util/Scanner.html#next--)