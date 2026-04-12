---
title: 내가 보려고 만든 linux 간단 명령어
description: linux 간당 명령어 모음집
---

## 리눅스 명령어
- <mark style="background: #ADCCFFA6;">ssh</mark> <mark style="background: #BBFABBA6;">{~i. 키파일}</mark><mark style="background: #FFB8EBA6;">{user@host}</mark>: 보안 쉘을 이용해서 원격 호스트 접속
- <mark style="background: #ADCCFFA6;">Tab 키</mark> 자동완성
- <mark style="background: #ADCCFFA6;">ls</mark> <mark style="background: #BBFABBA6;">{-옵션}</mark> : 현재 위치의 파일 목록 조회
	-  <mark style="background: #BBFABBA6;">-a</mark> : 히든 파일
	- <mark style="background: #BBFABBA6;">-l</mark>: 파일 상세 정보
	- <mark style="background: #BBFABBA6;">-h</mark>: 파일 용량을 보기 편하게 단위 변경
	- <mark style="background: #BBFABBA6;">-t</mark>: 파일 생성된 날짜 순으로
	- <mark style="background: #BBFABBA6;">-r</mark>: 순서 반대로
- <mark style="background: #ADCCFFA6;">cd</mark><mark style="background: #FFB8EBA6;">{대상 위치}</mark>: 위치 이동
	- <mark style="background: #FFB8EBA6;">./</mark> 현재 위치 기준
	- <mark style="background: #FFB8EBA6;">../</mark>: 한단계 상위 위치
	- <mark style="background: #FFB8EBA6;">/</mark>: 루트 디렉토리
	- <mark style="background: #FFB8EBA6;">~/</mark>: 홈 디렉토리
- <mark style="background: #ADCCFFA6;">pwd</mark> : 현재 위치 확인
- <mark style="background: #ADCCFFA6;">cp</mark> <mark style="background: #BBFABBA6;">{-옵션}</mark> <mark style="background: #FFB8EBA6;">{복사할 위치}</mark> <mark style="background: #FFB8EBA6;">{새 파일}</mark> : 파일 복사
	-  `rf` : 디렉토리를 대상으로 하위 내용 전체 포함 복사
- <mark style="background: #ADCCFFA6;">rm</mark> <mark style="background: #BBFABBA6;">{-옵션}</mark> <mark style="background: #FFB8EBA6;">{파일 또는 디렉토리}</mark> : 파일 삭제
	- `rf` : 디렉토리를 대상으로 하위 내용 전체 삭제
- <mark style="background: #ADCCFFA6;">mv</mark> <mark style="background: #FFB8EBA6;">{이동할 파일 또는 디렉토리}{ 새 경로 또는 이름}</mark>:파일 이동 또는 이름 변경
	- `mv download/ekey.pem keys/`
- <mark style="background: #ADCCFFA6;">mkdir</mark> <mark style="background: #FFB8EBA6;">{디렉토리명}</mark>: 새로운 디렉토리 생성
- <mark style="background: #ADCCFFA6;">wget</mark> <mark style="background: #FFB8EBA6;">{url}</mark>: url에 있는 파일 다운로드
- <mark style="background: #ADCCFFA6;">curl</mark> <mark style="background: #BBFABBA6;">{method}</mark> <mark style="background: #FFB8EBA6;">{url}</mark> : REST API 로 지정한 method를 사용해서 url 접속
	- <mark style="background: #BBFABBA6;">-O -L</mark> : url 에 있는 파일 다운로드 (wget 대신 사용 가능)
	- <mark style="background: #BBFABBA6;">-X[GET,PUT,POST,DELETE,HEAD]</mark> : 사용 가능한 메소드들
	- <mark style="background: #BBFABBA6;">-u{user.password}</mark>: 접속에 필요한 인증정보 입력
- <mark style="background: #ADCCFFA6;">tar</mark> <mark style="background: #BBFABBA6;">{method}</mark> <mark style="background: #FFB8EBA6;">{대상 파일}</mark> : 파일 압축 또는 압축 해제
	- <mark style="background: #BBFABBA6;">xfz</mark>: 압축파일과 같은 이름의 디렉토리에 압축 해제 (앞에 - 없음)
	- <mark style="background: #BBFABBA6;">cfz</mark> <mark style="background: #FFB8EBA6;">{새 파일명}</mark> <mark style="background: #FFB8EBA6;">{압축할 디렉토리}</mark> : 대상 디렉토리를 압축 (앞에 - 없음)
- <mark style="background: #ADCCFFA6;">ps</mark> <mark style="background: #BBFABBA6;">{-옵션}</mark> : 실행중인 프로세스 확인
	- <mark style="background: #BBFABBA6;">-e</mark> :다른 사용자의 프로세스까지 표시
	- <mark style="background: #BBFABBA6;">-f</mark> pid를 포함한 프로세스의 상세 정보 표시
- <mark style="background: #FFB8EBA6;">{명령}</mark> | <mark style="background: #FFB8EBA6;">{명령}</mark> : 앞 명령의 출력을 뒷 명령의 입력으로 전달
- <mark style="background: #ADCCFFA6;">grep</mark> <mark style="background: #BBFABBA6;">{-옵션}</mark> <mark style="background: #FFB8EBA6;">{패턴}</mark> <mark style="background: #FFB8EBA6;">{파일}</mark> : 파일에서 해당하는 패턴 찾기
	- `-i`: 대소문자 구분 안함
- <mark style="background: #ADCCFFA6;">chmod</mark> <mark style="background: #BBFABBA6;">{mode}</mark> <mark style="background: #FFB8EBA6;">{파일 또는 디렉토리}</mark> : 대상 파일 또는 디렉토리의 권한 변경
	- {(1)종류}{(3)<mark style="background: #FF5582A6;">user</mark>}{(3)<mark style="background: #BBFABBA6;">group</mark>}{(3)<mark style="background: #ADCCFFA6;">other</mark>} 를 나타냄
	* `r`: read / `w`: write / `x`: execute : 에 해당하는 3비트씩을 십진수 (0~7) 로 입력
* <mark style="background: #ADCCFFA6;">history</mark> 

---

* 예) <mark style="background: #FF5582A6;">7</mark><mark style="background: #BBFABBA6;">5</mark><mark style="background: #ADCCFFA6;">4</mark>== <mark style="background: #FF5582A6;">111</mark><mark style="background: #BBFABBA6;">101</mark><mark style="background: #ADCCFFA6;">100</mark> = <mark style="background: #FF5582A6;">rwx</mark><mark style="background: #BBFABBA6;">r-x</mark><mark style="background: #ADCCFFA6;">r--</mark>
  user 는 read/write/execute, group 은 read/execute, other 는 read 가능.
* <mark style="background: #ADCCFFA6;">chown </mark><mark style="background: #BBFABBA6;">{-옵션}</mark> {user:group} {파일 또는 디렉토리} : 대상 파일 또는 디렉토리의 지정한 소유자로 변경
	* -R : 디렉토리 아래 파일 및 하위 디렉토리 모두 변경
* <mark style="background: #ADCCFFA6;">sudo { 다른 명령}</mark> : 루트 사용자로 명령 실행

- <mark style="background: #ADCCFFA6;">tail </mark> <mark style="background: #BBFABBA6;">{-옵션}</mark> 
	- <mark style="background: #BBFABBA6;">-f</mark> : 실시간으로 보여준다.
    
    
- `-v`: 상세로그 확인

## vi 명령어

<mark style="background: #ADCCFFA6;">vi </mark><mark style="background: #FFB8EBA6;">{파일 이름}</mark> : 편집할 파일을 vi 로 오픈. 파일이 없는 경우 새 파일 입력.

* <mark style="background: #ADCCFFA6;">Esc 키</mark>: 명령 모드로 전환.
* **입력 모드로 전환하는 키**
    * **i** : 커서가 있는 곳에서 입력 모드로 전환
    * **a** : 커서 다음 글자에서 입력 모드로 전환
    * **o** : 커서 아래 새 라인을 추가하고 입력 모드로 전환
    * **I (대문자 i)** : 라인 맨 앞에서 입력 모드로 전환
    * **A** : 라인 맨 뒤에서 입력 모드로 전환
    * **O** : 커서 위에 새 라인을 추가하고 입력 모드로 전환
* **x** : 한 글자 삭제
* **dd** : 한 줄 삭제
* d<mark style="background: #FFB8EBA6;">{숫자}</mark>d: 입력한 숫자 만큼의 줄 삭제
* **yy** : 현재 줄 복사
* **p** : 커서 아래 라인에 복사한 줄 붙여넣기
* **P** : 커서 윗 라인에 복사한 줄 붙여넣기
* **gg** : 파일의 맨 처음으로 이동
* **G** : 파일의 맨 마지막으로 이동
* /(슬래시)<mark style="background: #FFB8EBA6;">{검색어}</mark> : 입력한 단어 검색
    * **n** : 다음 단어로 이동
    * **N** : 이전 단어로 이동
* **: (콜론)** : ex 모드로 전환
    * **w** : 저장
    * **wq** : 저장하고 나가기
    * **q!** : 저장하지 않고 나가기




