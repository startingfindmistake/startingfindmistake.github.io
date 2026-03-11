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
    
    
    
    

[oracle](https://docs.oracle.com/javase/8/docs/api/java/util/Scanner.html#next--)