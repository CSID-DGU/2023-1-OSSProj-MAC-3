# 2023-1-OSSProj-MAC-3
2023년 1학기 오픈소스소프트웨어 3조 (MAC) 팀입니다.

## 데모 웹사이트
[http://13.209.241.70](http://13.209.241.70:3000/)
<br><br>
[시연영상] https://youtu.be/0JHX9DPPOrE

## 프로젝트 제목

동국대학교 LMS 내 협업 파일시스템 구축

## 팀원 소개

### Front-End

| 이름   | 전공           | 학번   |
| ------ | -------------- | ------ |
| 안상연 | 멀티미디어공학전공     | 19학번 |


### Back-end

| 이름   | 전공           | 학번   |
| ------ | -------------- | ------ |
| 최필환 | 산업시스템공학전공     | 19학번 |
| 민한결 | 건설환경공학전공     | 17학번 |

## Tech Stack

<div align=center>
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=Bootstrap&logoColor=white">
  <br>
  
  <img src="https://img.shields.io/badge/Java-007396.svg?&style=for-the-badge&logo=Java&logoColor=white">
  <img src="https://img.shields.io/badge/amazon s3-569A31?style=for-the-badge&logo=amazon s3&logoColor=white">
  <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">
  <br>
  
  <img src="https://img.shields.io/badge/ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white">
  <img src="https://img.shields.io/badge/amazon ec2-FF9900?style=for-the-badge&logo=amazon ec2&logoColor=white">
  <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
  <img src="https://img.shields.io/badge/VsCode-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/fontawesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white">
</div>

## 개발 환경

### Backend
- Spring Boot
- MySQL 8.0

### Frontend
- React 18.2.0


## 프로젝트 내용

동국대학교 LMS 내 팀 프로젝트 파일 스토리지 시스템 구축을 통해 파일 이력 관리를 가능하게 하여 협업 능률을 향상시킨다.

### 사용한 오픈소스 코드 및 개선 사항
- UI: 대시보드 템플릿 https://github.com/startbootstrap/startbootstrap-sb-admin-2
  - 디자인 수정 및 리액트 도입
- 인증 처리: 게시판 프로젝트 https://github.com/hojunnnnn/board![image](https://github.com/CSID-DGU/2023-1-OSSProj-MAC-3/assets/87561425/3868262c-ad6b-4e3f-aed4-4066e2d9e8c2) 
  - JWT 토큰 방식으로 변경
  - Refresh Token 도입
  - AES로 DB 접근 시 암복호화
  - ResponseEntity를 return값으로 하고 DTO를 HTTP Body를 JSON 형태로 응답
- 팀 구성: 모임 관리 프로젝트 https://github.com/lcalmsky/spring-boot-app![image](https://github.com/CSID-DGU/2023-1-OSSProj-MAC-3/assets/87561425/ba2e2578-9cb9-4bf7-b996-b409e7a729da)
- 초대장: 초대 링크 생성 프로젝트 https://github.com/heli-os/member-invitation-java-springboot![image](https://github.com/CSID-DGU/2023-1-OSSProj-MAC-3/assets/87561425/a390f772-d98c-42a0-ac57-26405b587c1f)
- 공지사항: ToDo 리스트 프로젝트 https://github.com/rgl-za/ToDo![image](https://github.com/CSID-DGU/2023-1-OSSProj-MAC-3/assets/87561425/ec46a308-e78c-4d0f-a880-be451415f759)
  - ResponseEntity를 return값으로 하고 HTTP Body를 JSON 형태로 응답
  - RDBMS를 사용할 수 있도록 Invitation Table 생성
  - isAccepted(Boolean) 속성으로 초대장 상태 관리
- 파일 스토리지: 블로그 프로젝트 https://github.com/tychejin1218/blog/tree/main/amazon-s3![image](https://github.com/CSID-DGU/2023-1-OSSProj-MAC-3/assets/87561425/44fae83a-eab0-47b7-ba9d-6350c55324de)

### 웹사이트 소개 
**1. 회원가입**

<img src="https://github.com/CSID-DGU/2023-1-OSSProj-MAC-3/assets/87561425/cc101335-35ac-45f1-8e69-c292c0b5a206" width="1200" height="530">
- 이름, 학번, 학과, 비밀번호를 입력해 회원가입.
<br>
<br>

**2. 로그인**

<img src="https://github.com/CSID-DGU/2023-1-OSSProj-MAC-3/assets/87561425/8ba156a5-e1ef-40f0-a076-721907b11efa" width="1200" height="530">
- 학번과 비밀번호를 입력해 로그인.
<br>
<br>

**3. 과목 선택**

<img src="https://github.com/CSID-DGU/2023-1-OSSProj-MAC-3/assets/87561425/5d588138-d218-490c-8fb0-2a219bc63291" width="1200" height="530">
- '내 강의실'에서 원하는 과목을 선택해 해당 과목 팀 활동 페이지로 이동.
<br>
<br>

**4. 팀활동 페이지**

<img src="https://github.com/CSID-DGU/2023-1-OSSProj-MAC-3/assets/87561425/e1885558-b80c-4c4a-a97a-35dadee7575e" width="1200" height="530">
- Navigation: 팀 활동 페이지 버튼 클릭 시 드롭다운 메뉴로 팀 선택 가능
- 파일 스토리지 섹션: 각 파일별 가장 최근에 수정된 버전 리스트로 조회 가능. 
  - 각 파일마다 파일 수정, 파일 삭제, 파일 다운로드, 파일 이력 조회 가능. 
- 팀 구성 정보 섹션: 팀원들 리스트로 조회 가능.
- 공지 사항 섹션: 공지사항 리스트로 조회 가능. 
<br>
<br>

**5. 팀 생성 및 삭제**

<img src="https://github.com/CSID-DGU/2023-1-OSSProj-MAC-3/assets/87561425/a54ff1c3-2630-483e-b6e2-34643e56513e" width="1200" height="530">
- 팀명 입력 후 우측 +버튼으로 팀 생성. 
- 팀명 우측 휴지통 버튼으로 팀 삭제.
<br>
<br>

**6. 파일 업로드(수정) 모달**

<img src="https://github.com/CSID-DGU/2023-1-OSSProj-MAC-3/assets/87561425/b4b54010-5d9b-403b-a111-3da097514ad5" width="1200" height="530">
- 파일 스토리지 우측 상단 +버튼을 클릭하면 나타나는 위 파일 업로드 모달로 파일 선택, 수정사항 입력해 파일 업로드.
- 파일 수정 또한 위 형식의 모달로 파일 선택, 수정사항 입력해 파일 수정.
<br>
<br>

**7. 파일 이력 조회 모달**

<img src="https://github.com/CSID-DGU/2023-1-OSSProj-MAC-3/assets/87561425/b3f0032f-654d-4c0b-9db9-9bae31ebf9f1" width="1200" height="530">
- 이력 조회 버튼 클릭 시 위 모달로 파일 수정 이력 조회. 우측 다운로드 버튼으로 이전 버전 파일 저장 가능.
<br>
<br>

**8. 팀원 초대**

<img src="https://github.com/CSID-DGU/2023-1-OSSProj-MAC-3/assets/87561425/b33dc3ee-4f3e-4c57-8975-0f50a5ef4bc5" width="1200" height="530">
- 팀 구성 정보 섹션의 우측 상단 +버튼을 클릭하면 나타나는 위 팀원 초대 모달로 팀원 선택, 초대 버튼 눌러 초대 메시지 발송.
<br>
<br>

<img src="https://github.com/CSID-DGU/2023-1-OSSProj-MAC-3/assets/87561425/90621b91-f8ab-4999-b1b7-b884c1618e4b" width="1200" height="530">
- 초대된 팀원의 팀 활동 페이지 상단에 초대 메시지 발송 정보 표시. 초대 메시지 확인 후 수락 버튼 눌러 팀 가입.
<br>
<br>

**9. 공지사항**

<img src="https://github.com/CSID-DGU/2023-1-OSSProj-MAC-3/assets/87561425/4e1dc9d2-2a73-40c3-9fdc-0ee40bccef50" width="400" height="200">
<br>
- 공지사항 섹션의 우측 상단 +버튼을 클릭해 공지사항 추가.
- 리스트 우측 버튼을 통해 수정, 삭제 가능.
<br>
<br>

**에러 발생 시**

<img src="https://github.com/CSID-DGU/2023-1-OSSProj-MAC-3/assets/87561425/ec28cd84-e325-4398-8790-3ace73b9b5c3" width="1200" height="500">
-에러 발생 시 에러 원인을 경고창으로 알림.

## References
- https://github.com/startbootstrap/startbootstrap-sb-admin-2
- https://github.com/hojunnnnn/board![image](https://github.com/CSID-DGU/2023-1-OSSProj-MAC-3/assets/87561425/030bbc3d-6e9e-4560-8a5e-c36e61ec367e)
- https://github.com/lcalmsky/spring-boot-app![image](https://github.com/CSID-DGU/2023-1-OSSProj-MAC-3/assets/87561425/88a726cc-3926-4386-ba63-775ba843b1a7)
- https://github.com/heli-os/member-invitation-java-springboot![image](https://github.com/CSID-DGU/2023-1-OSSProj-MAC-3/assets/87561425/f043e647-38a6-45b9-ab71-9cc56117780d)
- https://github.com/rgl-za/ToDo![image](https://github.com/CSID-DGU/2023-1-OSSProj-MAC-3/assets/87561425/7994ff2c-ccfd-49dd-91f7-40443c50349b)
- https://github.com/tychejin1218/blog/tree/main/amazon-s3![image](https://github.com/CSID-DGU/2023-1-OSSProj-MAC-3/assets/87561425/9d803afc-dfed-4a62-b23f-2f8fa7488e73)


## Contact
[HANKYUL] : denirokr22@gmail.com <br>
[PILHWAN] : fill0006@naver.com <br>
[SANGYEON]: sy990607@naver.com <br>




