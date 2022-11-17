# 🎬 movielly 😻
OMDb API를 활용한 영화 검색 사이트

- 배포 주소 : https://movielly.netlify.app

## 사용 기술
- HTML
- SCSS
- JavaScript
- Parcel

## 요구사항

### :exclamation: 필수

- [x] 영화 제목으로 검색 가능하고 검색된 결과의 영화 목록이 출력돼야 합니다.
- [x] jQuery, React, Vue 등 JS 라이브러리와 프레임워크는 사용하지 않아야 합니다.
- [x] 스타일(CSS) 라이브러리나 프레임워크 사용은 자유입니다.
- [x] 실제 서비스로 배포하고 접근 가능한 링크를 추가해야 합니다.

### :grey_question: 선택

- [x] 한 번의 검색으로 영화 목록이 20개 이상 검색되도록 만들어보세요.
- [x] 영화 개봉연도로 검색할 수 있도록 만들어보세요.
- [x] 영화 목록을 검색하는 동안 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 무한 스크롤 기능을 추가해서 추가 영화 목록을 볼 수 있도록 만들어보세요.
- [x] 영화 포스터가 없을 경우 대체 이미지를 출력하도록 만들어보세요.
- [x] 단일 영화의 상세정보(제목, 개봉연도, 평점, 장르, 감독, 배우, 줄거리, 포스터 등)를 볼 수 있도록 만들어보세요.
- [x] 영화 상세정보가 출력되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 영화 상세정보 포스터를 고해상도로 출력해보세요.(실시간 이미지 리사이징)
- [x] 차별화가 가능하도록 프로젝트를 최대한 예쁘게 만들어보세요.
- [x] 영화와 관련된 기타 기능도 고려해보세요.

## 추가 구현 기능
- localStorage 를 사용한 좋아요 기능 구현 & 좋아요 한 영화 목록 확인 가능
- localStorage 를 사용해 최근 상세 보기한 영화 목록 확인 가능
- hashchange 를 사용한 라우터 기능
- 기능별로 모듈화하여 코드 작성
- 팝콘이 내리는 애니메이션 구현
- 미디어 쿼리를 사용해 모바일 사이즈에서 UI 가 올바르게 나오도록 구현
- 검색 결과가 없는 경우 검색 결과 영역 숨기기
