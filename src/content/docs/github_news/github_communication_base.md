---
title: 내가 보려고 만든 GitHub 간단 명령어
description: GitHub 프로젝트 관리를 위한 핵심 Git 명령어 모음집
---

## 🎨 색상 구분 가이드

- <mark style="background: #ADCCFFA6;">명령어</mark> : Git 기본 명령어
- <mark style="background: #BBFABBA6;">{-옵션}</mark> : 명령어의 세부 동작을 제어하는 옵션
- <mark style="background: #FFB8EBA6;">{대상/변수}</mark> : 파일명, 브랜치명, URL 등 사용자가 직접 입력해야 하는 값

---

## 1. 초기 설정 및 프로젝트 가져오기 (Setup & Init)

- <mark style="background: #ADCCFFA6;">git config</mark> <mark style="background: #BBFABBA6;">{--global}</mark> <mark style="background: #FFB8EBA6;">user.name "[name]"</mark> : 커밋에 연결될 작성자 이름 설정
- <mark style="background: #ADCCFFA6;">git config</mark> <mark style="background: #BBFABBA6;">{--global}</mark> <mark style="background: #FFB8EBA6;">user.email "[email]"</mark> : 커밋에 연결될 작성자 이메일 설정
- <mark style="background: #ADCCFFA6;">git init</mark> : 현재 디렉토리를 새로운 Git 저장소로 초기화
- <mark style="background: #ADCCFFA6;">git clone</mark> <mark style="background: #FFB8EBA6;">{[url]}</mark> : GitHub에 있는 원격 저장소와 전체 커밋 기록을 로컬로 복제
  - 🔗 [GitHub 공식 가이드 - Git 설정하기](https://docs.github.com/ko/get-started/getting-started-with-git/setting-your-username-in-git)

## 2. 브랜치 관리 (Branching)

- <mark style="background: #ADCCFFA6;">git branch</mark> : 로컬에 있는 브랜치 목록 확인
- <mark style="background: #ADCCFFA6;">git branch</mark> <mark style="background: #FFB8EBA6;">{[branch-name]}</mark> : 새로운 브랜치 생성
- <mark style="background: #ADCCFFA6;">git switch</mark> <mark style="background: #FFB8EBA6;">{[branch-name]}</mark> : 지정한 브랜치로 작업 환경 이동 (기존 `checkout` 대체)
  - <mark style="background: #ADCCFFA6;">git switch</mark> <mark style="background: #BBFABBA6;">{-c}</mark> <mark style="background: #FFB8EBA6;">{[branch-name]}</mark> : 브랜치 생성과 동시에 이동
- <mark style="background: #ADCCFFA6;">git merge</mark> <mark style="background: #FFB8EBA6;">{[branch-name]}</mark> : 지정한 브랜치의 변경 내역을 현재 작업 중인 브랜치로 병합
  - 🔗 [GitHub 공식 가이드 - 브랜치 정보](https://docs.github.com/ko/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches)

## 3. 변경 사항 추적 및 저장 (Making Changes)

- <mark style="background: #ADCCFFA6;">git status</mark> : 현재 작업 디렉토리의 변경 상태(추가, 수정, 삭제) 확인
- <mark style="background: #ADCCFFA6;">git add</mark> <mark style="background: #FFB8EBA6;">{[file]}</mark> : 변경된 파일을 다음 커밋을 위해 Staging Area에 추가
  - <mark style="background: #ADCCFFA6;">git add</mark> <mark style="background: #FFB8EBA6;">.</mark> : 현재 디렉토리의 모든 변경 사항을 추가
- <mark style="background: #ADCCFFA6;">git commit</mark> <mark style="background: #BBFABBA6;">{-m}</mark> <mark style="background: #FFB8EBA6;">{"[message]"}</mark> : Staging Area의 변경 사항을 영구적인 커밋 메시지와 함께 저장
  - 🔗 [GitHub 공식 가이드 - 커밋 정보](https://docs.github.com/ko/pull-requests/commit-changes-to-your-project/creating-and-editing-commits/about-commits)

## 4. 원격 저장소 동기화 (Synchronizing)

- <mark style="background: #ADCCFFA6;">git remote add origin</mark> <mark style="background: #FFB8EBA6;">{[url]}</mark> : 로컬 저장소를 GitHub 원격 저장소와 연결
- <mark style="background: #ADCCFFA6;">git fetch</mark> : 원격 저장소의 최신 변경 내역을 가져오기만 함 (로컬 병합 X, 안전한 확인용)
- <mark style="background: #ADCCFFA6;">git pull</mark> : 원격 저장소의 변경 사항을 가져와 현재 로컬 브랜치에 즉시 병합
- <mark style="background: #ADCCFFA6;">git push</mark> <mark style="background: #FFB8EBA6;">{origin} {[branch-name]}</mark> : 로컬의 커밋 내역을 GitHub 원격 저장소의 특정 브랜치로 업로드
  - 🔗 [GitHub 공식 가이드 - 원격 리포지토리 관리](https://docs.github.com/ko/get-started/getting-started-with-git/managing-remote-repositories)

## 5. 변경 사항 되돌리기 (Undoing Changes) 💡

- <mark style="background: #ADCCFFA6;">git restore</mark> <mark style="background: #FFB8EBA6;">{[file]}</mark> : 작업 디렉토리의 변경 사항을 취소하고 마지막 커밋 상태로 되돌림
- <mark style="background: #ADCCFFA6;">git reset</mark> <mark style="background: #BBFABBA6;">{-옵션}</mark> <mark style="background: #FFB8EBA6;">{[commit-hash]}</mark> : 지정한 커밋 이후의 기록을 로컬에서 삭제
  - <mark style="background: #BBFABBA6;">--soft</mark> : 작업 내역은 보존하고 Staging Area에 남김
  - <mark style="background: #BBFABBA6;">--mixed</mark> : (기본값) 작업 내역은 보존하되 Staging Area에서 제외
  - <mark style="background: #BBFABBA6;">--hard</mark> : 지정한 커밋 이후의 모든 작업 내역을 완전히 삭제 (주의 필요)
- <mark style="background: #ADCCFFA6;">git revert</mark> <mark style="background: #FFB8EBA6;">{[commit-hash]}</mark> : 이전 커밋을 취소하는 '새로운 커밋'을 생성 (이미 원격에 Push된 내역을 안전하게 되돌릴 때 사용)
  - 🔗 [Git 공식 매뉴얼 - Git Reset 명확히 알고 가기](https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-Reset-%EB%AA%85%ED%99%95%ED%9E%88-%EC%95%8C%EA%B3%A0-%EA%B0%80%EA%B8%B0)

## 6. 작업 내역 검토 (Review & History)

- <mark style="background: #ADCCFFA6;">git log</mark> : 현재 브랜치의 커밋 히스토리 확인
- <mark style="background: #ADCCFFA6;">git diff</mark> : 아직 Staging Area에 추가되지 않은 로컬 변경 사항을 줄 단위로 상세히 비교
