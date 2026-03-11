---
title: <Java> 반복문(loop)
description: java반복문 에 대해 알아보자
---







## 반복문에 ';' 세미콜론을 붙이면 어떻게 될까?
```java
import java.util.Scanner;


public class T2675 {
    public static void main(String[] args){
        // 입력을 받기 위해 스캐너 클래스 선언
        Scanner sc = new Scanner(System.in);

        // 나중에 배열을 한 번에 출력하기 위해서
        StringBuilder sb = new StringBuilder();

        // 테스트 케이스 입력 받기
        int T = sc.nextInt();

        
        for(int i = 0; i < T; i++){
            // 문자열 R번 반복 입력횟수를 입력받는다.
            int R = sc.nextInt();

            // 문자열을 입력 받는다.
            String B = sc.next();

            for(int j = 0; j < R; j++);
                sb.append(B);
        
        }
        System.out.print(sb);
    }
}

```

```bash
[18:01:19] ➜  backjoon-java git:(develop) ✗ java T2675.java
2
3
abc

d
Exception in thread "main" java.util.InputMismatchException
        at java.base/java.util.Scanner.throwFor(Scanner.java:964)
        at java.base/java.util.Scanner.next(Scanner.java:1619)
        at java.base/java.util.Scanner.nextInt(Scanner.java:2284)
        at java.base/java.util.Scanner.nextInt(Scanner.java:2238)
        at T2675.main(T2675.java:18)
        
```

왜 18번에서 InputMismatchException이 발생할까?

컴퓨터 내부에는 사용자가 키보드로 치는 글자들을 임시로 보관하는 **입력 버퍼(대기열)**라는 공간이 있습니다. `Scanner`는 항상 이 버퍼에서 데이터를 하나씩 꺼내갑니다.

1. 프로그램 시작 및 초기화 (Line 1~12)

* 컴퓨터가 `Scanner`와 `StringBuilder`를 준비합니다.

* 현재 입력 버퍼: `[텅 빔]`

</br>


2. 첫 번째 입력 대기 (Line 13)

* `int T = sc.nextInt();`를 만납니다. 버퍼가 비어있으므로 사용자 입력을 기다립니다.

* 사용자가 `2`를 치고 엔터(`\n`)를 누릅니다.

* 입력 버퍼: `[ 2, \n ]`

* `nextInt()`는 숫자 `2`만 쏙 빼서 `T`에 저장합니다.

* 현재 입력 버퍼: `[ \n ]` (엔터키는 버퍼에 남습니다)

</br>

3. 첫 번째 루프 진입 - `i = 0` (Line 16)

* `for (int i = 0; i < T; i++)` 조건을 통과합니다. (0 < 2)

</br>

4. 18번 라인 통과 - 첫 번째 `R` 입력 (Line 18)

* `int R = sc.nextInt();`를 만납니다. 버퍼에 엔터(`\n`)밖에 없으므로, `Scanner`는 의미 있는 값이 들어올 때까지 다시 기다립니다.

사용자가 `3 ABC`를 치고 엔터(`\n`)를 누릅니다.

입력 버퍼: `[ \n, 3, (공백), A, B, C, \n ]`

* `nextInt()`는 공백이나 엔터를 무시하고 첫 번째 숫자인 `3`만 가져와 `R`에 저장합니다.

* 현재 입력 버퍼: `[ (공백), A, B, C, \n ]`

5. 21번 라인 통과 - `B` 입력 (Line 21)

* `String B = sc.next();`를 만납니다.

* `next()`는 공백을 무시하고 그다음 문자열인 `ABC`를 가져옵니다.

* 현재 입력 버퍼: `[ \n ]`

6. 첫 번째 루프 종료 (Line 23~24)

* 의도치 않은 세미콜론(;) 때문에 헛도는 for문을 지나, `sb.append(B)`가 실행되어 `sb` 안에는 `"ABC"`가 저장됩니다.

루프 끝에 도달하여 다시 위로 올라갑니다.

7. 💥 운명의 두 번째 루프 진입 - `i = 1` (Line 16 ~ 18)

* `i`가 1이 되어 두 번째 테스트 케이스를 시작합니다.

* **18번 라인(`int R = sc.nextInt();`)**을 다시 만납니다.

* 컴퓨터가 버퍼를 확인합니다. 현재 입력 버퍼: `[ \n ]`

가져올 숫자가 없으므로, 컴퓨터는 아무런 화면 출력 없이 사용자의 입력을 멍하니 기다립니다.

8. 에러 발생! (InputMismatchException)

* 이때 화면에 아무것도 안 나오니까, 사용자는 프로그램이 멈춘 줄 알고 무의식중에 스페이스바를 누르거나, 문자를 입력하거나, 다른 키를 누른 뒤 엔터를 쳤을 것입니다. (예: a 입력 후 엔터)

입력 버퍼: `[ \n, a, \n ]`

nextInt()는 버퍼에서 데이터를 꺼내려고 보니, 자기가 기대했던 **숫자(int)가 아니라 문자(a)**가 들어있는 것을 발견합니다.

컴퓨터: "어? 나는 nextInt()라서 정수를 가져와야 하는데 문자가 들어왔네? 해석할 수가 없어!"

결국 18번 라인에서 InputMismatchException (입력 타입 불일치 에러)을 던지며 프로그램을 강제 종료해 버립니다.



</br>
</br>
</br>

---

에러 메시지 해독을 해보자
```bash
Exception in thread "main" java.util.InputMismatchException <-- (1) 여기서 `무슨 에러`인지 파악
        at java.base/java.util.Scanner.throwFor(Scanner.java:964)
        at java.base/java.util.Scanner.next(Scanner.java:1619)
        at java.base/java.util.Scanner.nextInt(Scanner.java:2284)
        at java.base/java.util.Scanner.nextInt(Scanner.java:2238)
        at T2675.main(T2675.java:18) <-- (2)여기서 '내 코드의 어디' 인지 파악
```


** 1.step: 맨 윗줄에서 "어던 종류의 에러(What)"인지 찾기**
가장 첫 줄 끝에 적힌 단어가 바로 에러의 이름입니다.
* `InputMismatchException` 영어 단어를 쪼개보면 `Input(입력)` + `Mismatch(불일치)` + `Exception(예외/에러)` 입니다.
    * 즉, "내가 기대한 입력 타입이랑, 실제로 들어온 입력 타입이 안 맞아서 터졌어!" 라는 뜻입니다.
    
    
    
    
</br>
</br>

**2.step: 맨 아랫줄부터 읽어 올라가며 "내 코드 (Where)"찾기**
그 밑에 주르륵 달린 `at java.bash/...`부분들은 자바 내부에서 자기들끼리 코드를 실행한 복잡한 과정입니다.
이 부분은 우리가 짠 코드가 아니니 과감하게 무시하고

무조건 내가 만판 파일 이름(`T2675`)이 적힌 줄을 찾아야 합니다.
보통 제일 아래쪽에 있습니다.

* `at T2675.main(T2675.java:18)`
* 번역: "T2675.java 파일의 18번째 줄에서 문제가 시작됐어!"



</br>
</br>

**3.step: 두 개를 합쳐서 추리하기**
1단계와 2단계의 정보를 합치면 다음과 같은 결론이 나옵니다.

"아, 내 코드 18번째 줄에서 사용자의 입력을 받는 부분`nextint()`가 있는데, 거기에 숫자(int)가 아닌 엉뚱한 값(Mismatch)이 들어와서 프로그램이 뻗었구나!"


</br>
</br>

그러면 여기서 한단계 더 나아가

```plaintext
at T2675.main(T2675.java:18)  <-- "T2675 파일의 18번 줄(main 함수)에서..."
at java.base/java.util.Scanner.nextInt(Scanner.java:2238) <-- "nextInt()를 호출했는데..."
at java.base/java.util.Scanner.nextInt(Scanner.java:2284) <-- "(내부 처리를 거치다가...)"
at java.base/java.util.Scanner.next(Scanner.java:1619) <-- "다음 값을 읽어오려고 보니..."
at java.base/java.util.Scanner.throwFor(Scanner.java:964) <-- "숫자가 아니어서 에러를 던질게(throw)!"
Exception in thread "main" java.util.InputMismatchException <-- "그 에러의 이름은 InputMismatchException 이야!"
```
이렇게 자세히 어떻게 알까?

바로 아까 무시해도 괜찮은 자바 내부 코드를 해석해 보면 알수 있다.

1. `nextInt`: "숫자를 가져와"(18번 라인에서 호출)
2. `next`: "일단 버퍼에서 다음(next) 덩어리를 읽어봐"
3. `throwFor`: "어? 숫자가 아니네? 에러를 던져(throw)!"


이렇게 해석을 해보면 
자바를 오래 다루다 보면 이 중간 과정의 이름들만 봐도 " 아, `Scanner`가 다음 것을 읽으려다(`next`)숫자가 아니어서 던졌구나(`throw`)" 하고 내부 상황이 머릿속에 그려지게 됩니다.