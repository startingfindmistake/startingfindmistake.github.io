---
title: <Java> javas.io.BufferedReader
description: javas.io.BufferedReader에 대해 알아보자
---

## `readLine()`메서드
---
**클래스**: `java.io.BufferedReader`
**메서드:** `public String readLine() throws IOException`

**설명(Description)**
텍스트 한 줄(line of text)을 읽어 들입니다.
한 줄의 끝은 라인 피드(`\n`), 캐리지 리턴(`\r`), 캐리지 리턴 직후의 라인 피드(`\r\n`), 또는 스트림의 끝(EOF, End-Of-File)에 도달하는 것 중 하나로 간주됩니다.
결과는 줄의 내용을 포함하는 `String` 객체를 반환하며, 스트림의 끝에 도달하여 더 이상 읽을 문자가 없는 경우에는 `null`을 반환합니다.

**적용 방법(Application)**
파일, 콘솔 입력(사용자 입력), 네트워크 소켓 등 문자 기반 입력 스트림에서 텍스트 데이터를 한 줄씩 효율적으로 읽어올 때 사용합니다.
대량의 문자 데이터를 처리하거나, 데이털르 줄 단위로 파싱(parsing)해야 하는 모든 입출력 작업에 호출합니다.

**주의 사항(Notes)**
* **줄 바꿈 문자 제외**: 반환되는 문자열(String)에는 `\n`이나 `\r`과 같은 줄 바꿈 문자가 포함되지 않습니다.
오직 순순한 텍스트 데이터으 내용만 반환됩니다.
* **스트림 종료 처리 (Null 반환):** 파일의 끝(EOF)이나 스트림의 끝에 도달하면 `null`을 반환합니다. 따라서 반복문(while 등)을 사용할 때 반드시 `null` 체크를 통해 읽기 종료 조건을 명시해야 합니다.
* **예외 처리 필수:** 메서드 시그니처에 명시되어 있듯이, 입출력 에러가 발생할 경우 `IOException`을 발생시키므로 반드시 `try-catch`블록으로 예외를 처리하거나 `throws` 키워드로 예외를 전가해야 합니다.

**사용예시**
```java
import java.io.BufferedReader;
import java.io.StringReader;
import java.io.IOException;

public class ReadLineExample{
    public static void main(String[] args) {
        // 테스트용 문자열: 공식 문서에 명시된 다양한 줄 바꿈 문자(\n, \r, \r\n ) 포함
        String textData = "첫 번째 줄입니다. \n두 번째 줄입니다.\r세 번째 줄입니다.\r\n네 번째 줄입니다.";


        // BufferedReader 객체 생성 (StringReader를 이용해 문자열을 문자 스트림으로 변환)
        try (BufferedReader br = new BufferedReader(new StringReader(textData))) {
            String line;

            System.out.println("--- 텍스트 읽기 시작 ---");

            // 1. EOF(null) 도달 시점까지 한 줄씩 읽기
            // readLine()은 스트림 끝에 돋3ㅏㄹ하면 null을 반환하므로 이를 종료 조건으로 사용합니다.
            while ((line = br.readLine()) != null) {

                // 2. 줄 바꿈 문자 제외 호가인
                // 반환된 line 문자열에는 \n, \r 등의 줄 바꿈 문자가 포함되어 있지 않습니다.
                System.out.println("읽은 내용: " + line);
            }
            // 출력:
            // 읽은 내용: 첫 번째 줄입니다. 
            // 읽은 내용: 두 번째 줄입니다.
            // 읽은 내용: 세 번째 줄입니다.
            // 읽은 내용: 네 번째 줄입니다. 

            System.out.println("--- 텍스트 읽기 종료 ---");
        } catch (IOException e) {
            // 3. 예외 처리 확인
            // 입출력 과정에서 오류가 발생하면 IOException이 던져 집니다.
            System.err.println("입출력 에러가 발생했습니다: " + e.getMessage());
        }
    }
}
```