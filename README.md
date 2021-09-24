## :pencil2: Geographic Information Highlighter(Chrome Extension)
### :books: 한양대학교 컴퓨터소프트웨어학부 졸업 프로젝트(2021.03 ~ 진행중)
- ### :bulb: **Topic** : <code>텍스트 내 지리정보 추출을 이용한 서비스</code>
- #### 👨‍💻 맡은 역할: 크롬 익스텐션 개발, API server(Django), 배포 (팀원: ELECTRA 모델 담당)
- ### :clipboard: Description
  - 한국어 corpus(뉴스, 위키, 나무위키, 모두의 말뭉치(신문, 문어, 구어, 메신저, 웹))을 이용해 pre-training 시킨 ELECTRA 모델(**KoELECTRA**)에 crf layer를 올린 모델을 이용해 ner task로 finetuning 후 지리정보 추출에 이용한다
  - 크롬 익스텐션을 통해 크롬 브라우저 내 텍스트 중 NER로 추출한 지리정보 단어를 highlight하여 **지리정보를 한눈에 보이도록 한다.**
  - 크롬 익스텐션을 통해 브라우저 내 **텍스트를 드래그하면 드래그한 파트의 서비스(지도 표출, 길찾기(구현 중))를 제공한다.**
  - 원하는 서비스를 크롬 익스텐션의 Popup을 이용해 설정으로 set할 수 있다.
  - 본문의 body를 받아 NER을 수행해 지리정보를 추출한 뒤, Extension으로 response하는 웹 서버 프레임워크로 **Django**를 이용했다.
- ### :ballot_box_with_check: 현재 상황
  - 지도 표출 기능, Highlight 기능, option 설정 기능 구현
  - 서버(localhost), 사설 ssl인증서 이용, localhost certificate 임의 허용으로 진행
  - fetch로 본문 내용 보내줄 때 실시간으로 업데이트되는 정보가 많으면 계속 보내주고 그것이 부하가 된다. ex) 뉴스 사이트의 실시간 주요뉴스, 당신이 좋아할만한 기사, 광고
  - 속도가 상당히 느리다(inference Time이 오래 걸린다)
- ### :heavy_check_mark: Todo
  - 길찾기, 주변 entity 검색 등 추가 기능 구현
  - AWS or GCP(Google Cloud Platform)로 배포, 공인 ssl인증서 이용
  - 실시간으로 업데이트되는 정보 구분하는 logic 추가(처리할 내용 빼고는 ignore)
  - inference에 GPU를 사용할 수 있는 파트가 있으므로 GPU 서버로 배포한다.
  - 코드 정리
 - ### :pencil2: How to use
    1. chrome://flags/ 에서 Allow invalid certificates for resources loaded from localhost. 임의 허용해서 진행(test) 크롬 익스텐션은 사설 ssl 인증서(현재 local ssl인증서)를 허용하지 않으므로(보안) 임의 허용.
    2. chrome://extensions/ 에서 압축해제된 확장 프로그램을 로드합니다를 클릭하여 manifest.json(설정파일)가 있는 폴더를 지정하면 등록됨. 
    3. Django server on
 - ### 참고
    - pre-train된 KoElectra + crf (NER) 모델은 용량이 커서 따로 업로드 예정. 추가할 경로 (/NER_server/server/)




