---
title: Github 관련 작업 명령어들을 알아보자
description: Github actions에 대해서 단계별로 자세히 알아보자
---


# 특정 파일만 컷밋하고 올려보자

---

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

# 내 코드 유지, main 코드 같고 오기

---

**github에서 내가 작성한 코드는 그대로 내 컴퓨터에서 유지한 상태로, main에 있는 코드를 같고 오는 작업을 해볼 것이다.**

</br>
</br>

이 상황은 내가 작성한 코드에 아직 확신이 없는 상태여서 내 컴퓨터에만 작성이 되어 있는 상태인데, 팀장님이나 누가 main에 코드를 업데이트 했으니 `git pull` 하라는 상태이다.

</br>
</br>

이런 상황에 있어서 먼저 흐름 계획을 세워보자

1. **현재 작업 보호(Stash)**: 작성 중인 코드가 날아가거나 충돌이 나지 않도록 잠시 '안전 금고'에 넣어둡니다.

2. **최신 코드 가져오기(Pull)**: 내 코드가 치원진 깨끗한 상태에서 GitHub의 `main` 내용을 가져와서 합칩니다.

3. **내 작업 복구(pop)**: 아까 금고에 넣어둔 내 코드를 다시 꺼내서 최신 코드 위에 덮습니다.

</br>
</br>
</br>

### 1step. 현재 상태 확인 및 작업 내용 임시 저장

먼저 어떤 파일이 변경되었는지 확인하고, 이를 임시 저장소로 옮깁니다.

```bash
# 1. 현재 변경된 파일 확인
git status

# 2. 변경 내용(아직 커밋 안 된 코드)을 임시 저장소(스택)에 저장
git stash
```

결과: `git stash`를 실행하면 작업하던 코드가 사라진 것처럼 보이고, 마지막 커밋 상태로 돌아 갑니다.
놀라지 않으셔도 됩니다. 안전하게 보관된 것입니다.

`output`

```bash
[10:40:06] ➜  factory-tycoon-cloud git:(main) ✗ git stash 
Saved working directory and index state WIP on main: 546a7ad add: readme
```

 터미널의 output을 보면은 `WIP`라는 단어가 보일 것이다. 이것은 `Working In progress`의 약자로, `"진행 중인던 작업"` 이라고 생각하면 됩니다.

1. **saved working directory...**: 당신의 작업 파일들이 안전하게 저장되었다는 뜻 입니다.
2. **WIP on main**: `main` 브랜치에서 진행 중이던 작업(Work In Progress)을 저장했다는 뜻입니다.
3. **546a7ad add: readme**: 당신이 작업을 시작했던 **가장 마지막 커밋**의 정보 입니다.
(커밋 아이디: `546a7ad`, 커밋 메시지 `add: readme`)

</br>
</br>
</br>
그러면 우리의 내용이 잘 임시 저장되었는지 확인을 해봐야겠죠

```bash
# 1. 임시 저장된 리스트 확인하기
git stash list
```

**결과 예시:** `stash@{0}: WIP on main: 546a7ad add: readme`

* 가장 최근에 저장한 것이 `stash@{0}`입니다.

**만약**, 리스트를 지우고 싶다면,

```bash
#1. 가장 최근 임시저장된 파일을 지우고 싶으면
git stash drop

#2. 특정 저장본을 골라서 지우고 싶을때
#  - 리스트에서 본 번호 "stash@{번호}" 를 지정해서 지웁니다.
git stash drop stash@{1}

# 3. 저장된 모든 내용을 싹 지우고 싶을 때
# - 저장 목록(Stack)을 완전히 비웁니다.
git stash clear
```

💡 pop과 drop의 차이점

* `git stash pop`: 저장된 내용을 꺼내와서 **적용하고**, 목록에서 **삭제** 합니다. (적용 O, 삭제 O)

* `git stash drop`: 저장된 내용을 적용하지 않고 **그냥 버립니다** (적용 X, 삭제 O)

</br>

⚠️ 주의: `drop`이나 `clear`로 지운 내용은 복구하기 매우 어렵거나 불가능하므로, 정말 필요 없는 내용인지 한 번 더 확인하고 실행하세요.

</br>
</br>

### Step2. 최신 코드 가져오기

이제 작업 트리가 깨끗해졌으므로,
원격 저장소(`origin`)의 `main`브랜치 내용을 가져와 현재 브랜치에 병합 합니다.

```bash
# GitHub의 main 브랜치 내용을 가져와서 현재 브랜치에 합침
git pull orgin main
```

결과: 남들이 작업해서 올린 최신 코드가 내 컴퓨터에 반영됩니다.

**output**

`Merge made by the 'ort' strategy.`

* `main` 브랜치에 최신 내용을 당신의 `[브랜치]`에 성공적으로 합쳐졌다.

* `6 commits ahead` (6개 커밋만큼 앞에 있음)
  * 이것은 **내 컴퓨터(Local)**의 정보가 **GitHub웹사이트(Remote)**보다 더 최신이다. 라는 뜻입니다.
  * **왜 6개인가?** (기존에 당신이 작업해서 커밋했던 것들) + (방금 `main`에서 가져온 커밋들) + (두 브랜치를 합치면서 생긴 'Merge Commit')이 합쳐져서 로컬에 쌓여 있기 때문이다.
  * 아직 `git push`를 안 했으니 GitHub 원격 저장소는 이 사실을 모르는 상태 입니다.

</br>
</br>
</br>

### Step3. 내 작업 내용 복구하기

최신 코드가 반영된 상태 위에, 아까 숨겨뒀던 내 코드를 다시 얹습니다.

```bash
# 임시 저장했던 내 코드를 다시 꺼내와서 적용
git stash pop
```

결과: 최신 코드 + 내가 작성 중이던 코드가 합쳐진 상태가 됩니다.

</br>
</br>

---

</br>
</br>

1. `git stash`를 쓴 이유
**충돌 방지**: 작성 중인 코드와 새로 가져오는 코드가 같은 파일을 건드리고 있다면, git pull을 할 때 에러가 나거나 거부될 수 있습니다.

**작업 보호**: `stash`는 현재 작업 중인 파일(Staging Area와 Working Directory의 변경분)을 별도의 스택에 백업합니다. 코드를 잃어버릴 염려 없이 안전하게 업데이트를 받을 수 있게 해주는 "일시 정지 & 저장" 기능입니다.

1. `git pull origin main`을 쓴 이유
이 명령어는 사실 `git fetch` (정보 가져오기) + `git merge` (합치기)를 한 번에 하는 것입니다.

**목적**: 내가 작업하는 동안 다른 팀원이 `main`에 새로운 기능을 추가했을 수 있습니다. 그 변경 사항을 내 로컬 환경으로 가져와서 동기화하는 필수 과정입니다.

1. `git stash pop`을 쓴 이유
`pop`은 스택에 넣어둔 가장 최근의 변경 사항을 꺼내서(`apply`) 적용하고, 스택 목록에서 제거(`drop`)하는 명령어입니다.

**최종 목표 달성**: 이 과정을 통해 **"기반 코드는 최신으로 바꾸되, 그 위에 내가 하던 작업은 그대로 유지"**하는 목표를 달성하게 됩니다.

⚠️ 주의사항: 충돌(Conflict)이 발생한다면?
`git stash pop`을 했을 때 **"Merge conflict"**라는 메시지가 뜰 수 있습니다. 이는 **"최신 코드도 A라는 파일을 고쳤고, 당신도 A라는 파일을 고쳤는데 서로 내용이 달라서 기계가 판단을 못 하겠어"**라는 뜻입니다.

에러가 발생한 파일(VS Code 등 에디터에서 빨간색으로 표시됨)을 엽니다.

`<<<<<<<`, `=======`, `>>>>>>>` 로 표시된 부분을 찾아 원하는 코드로 수정합니다.

수정 후 다시 저장(`git add .`)하면 해결됩니다.
