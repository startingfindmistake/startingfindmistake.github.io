---
title: Github 관련 작업 명령어들을 알아보자
description: Github actions에 대해서 단계별로 자세히 알아보자
---


### 원하는 파일만 담기

전체를 다 담는 `git add .` 명령어 대신 파일 경로를 직접 지정합니다.

```bash
#1. 뛰어쓰기로 파일들을 구분합니다. 
#특정 파일이름은 git status 명령어를 통해 정확히 알수 있습니다.
git add <특정 파일 주소 이름> <특정 파일 주소 이름>
```

Tip.
경로가 길면 `git add <특정 파일 이름 앞글자만 치고>` `Tab` 키를 눌러 자동완성을 사용하세요.

### 잘 담겼는지 확인

```bash
git status
```

* **커밋할 변경 사항 (Changes to be committed)**
  🟢 **초록색** 목록에 방금 `git add`로 추가한 `<특정 파일 주소 이름>`만 표시되어야 합니다.

* **커밋하도록 정하지 않은 변경 사항 (Changes not staged for commit)**
  🔴 **빨간색** 목록에는 아직 추가하지 않은 나머지 파일들이 그대로 남아 있어야 합니다.

**💡 `git status` 실행 결과 예시**

```bash
$ git status
On branch main

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   src/components/Button.js    # 🟢 초록색 (커밋될 준비 완료!)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   src/App.js                  # 🔴 빨간색 (아직 추가 안 됨)

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        src/styles/style.css                    # 🔴 빨간색 (아직 추가 안 됨)
```

### "제외하고 싶은 코드"들은 어떻게 할까?

---
현재 `git status`에 빨간색으로 남아 있는 파일들(`<추가하지 않은 여러가지  파일 주소>` 파일 등)을 처리하는 방법은 크게 **3가지**가 있습니다.

#### 대안A. "이 파일 들은 내 컴퓨터에만 필요하고, Git 신경 안썻으면 좋겠어"

테스트 데이터(`json`)이나 (`.env`)등 개인 정보 파일등 임시 스크립트가 자꾸 `git status`에 뜨는 게 귀찮다면 `.gitignore` 파일을 사용해야 합니다.

1. 프로젝트 최상위 경로에 `.gitignore`파일을 만듭니다.
2. 무시할 파일명을 적고 저장합니다.

```paintext
# .gitignore파일 내용
<제외하고 싶은 첫번째 파일 이름>
<제외하고 싶은 두번째 파일이름>
```

1. 이제 `git status`를 쳐도 이 파일들은 보이지 않게 됩니다.

</br>
</br>

#### 대안B. "삭제된 파일들이 있었는데, 사실 지우려고 했던것이 아니야!"(복구)

```bash
git resotre <복구파일명1> <또다른 복구파일명2>
```

* 이렇게 하면 삭제 전 상태로 파일이 복구됩니다.

</br>
</br>

#### 대안C. "나중에 다시 작업할 건데 지금은 잠깐 치워두고 싶어"(임시 저장)

지금 당장 커밋하긴 싫지만, 변경 사항을 잃어버리긴 싫고, 작업 공간은 깨끗하게 하고 싶다면 `stash`를 씁니다.

```bash
git stash
```

* 현재 작업 중인(커밋하지 않은) 모든 내용을 임시 상자에 넣어 치워둡니다.

* 나중에 `git stash pop`으로 다시 꺼내올 수 있습니다.
