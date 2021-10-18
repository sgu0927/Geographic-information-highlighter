## :pencil2: Geographic Information Highlighter(Chrome Extension)
### :books: 한양대학교 컴퓨터소프트웨어학부 졸업 프로젝트(2021.03 ~ 진행중)
- ### :bulb: **Topic** : <code>텍스트 내 지리정보 추출을 이용한 서비스</code>
- #### 👨‍💻 맡은 역할: 크롬 익스텐션 개발, API server(Django), 배포 (팀원: ELECTRA 모델 담당)
- ### :clipboard: Description
  - Naver NER challenge dataset을 이용해 pre-training 시킨 ELECTRA 모델(**KoELECTRA**)에 crf layer를 올린 모델을 이용해 ner task로 finetuning 후 지리정보 추출에 이용한다
  - 크롬 익스텐션을 통해 크롬 브라우저 내 텍스트 중 NER로 추출한 지리정보 단어를 highlight하여 **지리정보를 한눈에 보이도록 한다.**
  - 크롬 익스텐션을 통해 브라우저 내 **텍스트를 드래그하면 드래그한 파트의 서비스(지도 표출, 길찾기, 주변 Entity 검색(1km 반경 음식점, 카페, 편의점, 주유소))를 제공한다.**
  - 원하는 서비스를 크롬 익스텐션의 Popup을 이용해 설정으로 set할 수 있다.
  - 본문의 body를 받아 NER을 수행해 지리정보를 추출한 뒤, Extension으로 response하는 웹 서버 프레임워크로 **Django**를 이용했다.
- ### :ballot_box_with_check: 현재 상황
  - 지도 표출 기능, Highlight 기능, 길찾기, 주변 entity 검색, option 설정 기능 구현
  - fetch로 본문 내용 보내줄 때 실시간으로 업데이트되는 정보가 많으면 계속 보내주고 그것이 부하가 된다. ex) 뉴스 사이트의 실시간 주요뉴스, 당신이 좋아할만한 기사, 광고
  - 속도가 상당히 느리다(inference Time이 오래 걸린다)
- ### :heavy_check_mark: Todo
  - ~~길찾기, 주변 entity 검색 등 추가 기능 구현~~ **[구현 완료]**
  - ~~AWS or GCP(Google Cloud Platform)로 배포, 공인 ssl인증서 이용~~ : gpu 서버 비용 문제 -> 연구실 docker 환경에서 구동해봄(NVidiaTesla GPU 4개)
  - 실시간으로 업데이트되는 정보 구분하는 logic 추가(처리할 내용 빼고는 ignore) : Nodefilter
  - ~~inference에 GPU를 사용할 수 있는 파트가 있으므로 GPU 서버로 배포한다.~~
  - 코드 정리
 - ### :pencil2: How to use
    1. chrome://extensions/ 에서 압축해제된 확장 프로그램을 로드합니다를 클릭하여 manifest.json(설정파일)가 있는 폴더를 지정하면 등록됨.
    2. Extension의 background.js, content.js에 server 주소 설정 
    3. Django server on
 - ### 참고
    - pre-train된 KoElectra + crf (NER) 모델은 용량이 커서 따로 업로드 예정. 추가할 경로 (/NER_server/server/)

 - ### Example
 ![1](https://user-images.githubusercontent.com/26399303/134728462-059e0051-315b-4053-9014-c9d99db7b675.png)
 - 실제 화면입니다. 창을 업로드 하면 chrome extension에서 post 형식으로 본문 내용(document.body.innerText)를 서버로 보내고 서버에서 KoElectra를 통해 NER한 결과들을 response합니다. 받은 response의 단어들을 highlight해줍니다.<br><br>
 ![2](https://user-images.githubusercontent.com/26399303/134728524-912fed94-a17f-4e9d-998c-f8961399bfff.png)

 - 본문에서 지리정보 검색하고 싶은 text를 드래그하면 (highlight 된 부분 아니더라도, highligh는 참고용) 우측에 지도_검색 link가 뜨게 됩니다. 
 - X키를 누르면 사라집니다. 
 - 또한 option에서 지도 표출을 체크하지 않은 경우에는 드래그해도 지도_검색 link가 뜨지 않습니다.
 ![3](https://user-images.githubusercontent.com/26399303/134728532-3502395f-6791-4a1e-b3bb-e2cceb4e2f7f.png)
  
  - 링크를 클릭하면 드래그한 정보로 검색한 page로 이동됩니다.<br>

