# MUSICOLGY LIBRARY
음악학이라는 학문 분야의 필수적인 도서들을 모아놓은 사이트입니다.
<br>
<br>
<br>
## 1. 왜 MUSICOLOGY LIBRARY인가?
 프론트 엔드 공부를 하며 공부한 것들을 정리하기 위해 무엇을 개발해야 할까라는 고민이 많았습니다. 그래서 제가 정한 개발 대상의 기준은 다음과 같았습니다.  
 >첫번째, 어느정도 양의, 사용가능한 자료가 있어야 한다.  
 >두번째, 개발하기 어렵지 않지만 기본적인 기술이 들어갈 수 있는 수준이어야 한다.  
 >세번째, 쓸만은 해야 한다.
 
 해당 기준으로 데이터를 물색하던 중 [The Taruskin Challenge](https://taruskinchallenge.com/musicology-must-reads-2/)라는 커뮤니티에서 음악학과 관련된 리딩 리스트를 정리해 놓은 게시물을 보게 되었습니다. 약 170여 권 정도의 도서정보가 있었고, 이를 활용하여 개발할 수 있는 도서정보 사이트를 만들자는 생각을 했습니다. 
  
 솔직히 말해서 세번째 기준에 대해서는 많이 미흡하다는 생각이 들지만, 그럼에도 프론트엔드 개발의 기본적인 부분들을 다루고 있다는 점에서 강점이 있는 것 같습니다.  
<br>
<br>
<br>
## 2. 어떤 기능이 들어있는가요?
 도서관에서 검색할 수 있는 기본적인 기능들이 구현되어 있습니다.

#### 1. 메인 페이지의 UI  
 scroll에 따른 header의 간단한 변화와 nav 바의 애니메이션을 볼 수 있습니다. 더불어 header에는 검색기능이 포함되어 있어, 검색을 통해 원하는 도서를 찾을 수 있도록 했습니다. 또 로그인 기능을 통해 본인이 선택한 도서를 볼 수 있도록 구성해 보았습니다.
 <br>
 <br> 
 메인 페이지의 간단한 환영메시지를 scroll에 따라 볼 수 있도록 구성했습니다. 
 <br>
 <br>
 grid 를 사용해 화면을 구성해보고 싶었으나 아직은 상용화되지 못했다는 생각이 들어, 특정 카드 부분만 grid로 간단하게 구현해보았습니다.
  <br>
  <br>
 추천도서 목록을 사용하여 간단한 슬라이드를 구성해 보았습니다.
  <br/>
  <br/>
#### 2. 도서 목록과 관련된 부분  
 사용한 데이터의 분류에 따라 도서를 분류해서 볼 수 있도록 페이지를 구성했습니다. 총 6가지 분류로 도서를 볼 수 있습니다. 더불어서 도서를 추가하고 수정하고 삭제할 수 있는 기본적인 기능들을 구현해보았습니다.
 <br>
 <br>
 <br>
## 3. 어떤 기술들을 사용(공부)하셨나요?
 기본적으로 html, css, javascript를 중심으로 공부했었습니다. 해당 프로젝트에서는 node.js, 특히 express와 ejs를 사용하여 데이터를 바인딩하였는데요, mongodb와 연결하여 도서들을 추가, 수정, 삭제하는 기능을 구현해 보았습니다. put 요청의 경우 method-override를 사용해보았는데요, 사실 아직 관련 기능에는 자신이 없어 배운 그대로 구현해보는데 집중하였습니다. delete의 경우는 ajax를 사용해 새로고침 없이 삭제 될 수 있도록 했습니다.
 <br>
 <br>
 디자인의 경우 기본적인 기능을 이용해서만 만드려고 최대한 라이브러리를 사용하지 않았습니다. google-fonts와 google-icons에서 가져온 몇몇 요소들을 제외하고는 직접 만들어보려고 노력했습니다.
 <br>
 <br>
 <br>
 