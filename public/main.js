

function nav_btn(btn, name, style) {
  document.querySelector(btn).addEventListener('click', function () {
    document.querySelector(name).style.transform = style;
  })
}

nav_btn(".nav-btn", ".nav", "translateX(0vw)")
nav_btn(".close-btn", ".nav", "translateX(-50vw)")


function header() {
  var header = document.querySelector('header');
  var visible = document.querySelector('.visible');
  var $scrollheight = document.documentElement.scrollTop;
  if ($scrollheight> 0) {
    header.style.backgroundColor = 'transparent';
    visible.style.display = 'none';
  } else {
    header.style.backgroundColor = '#fff';
    visible.style.display = 'flex';
  }
}

function mainpage(){
  var $maintext = document.querySelectorAll('.text');
  var $scrollheight = document.documentElement.scrollTop;
  // for (let i=1; i<$maintext.length-1;i++){
  //   $maintext[i].style.opacity = '0';
  //   $maintext[i].style.opacity = `((-1/600)*${$scrollheight}) + (1000+(800*${i})/600)`
  // }
  $maintext[0].style.opacity = `((-1/600)*${$scrollheight}) + (1000/600))`;


  console.log($maintext.length-1);}





document.addEventListener('scroll', header)

document.addEventListener('scroll', mainpage)
// 
//  
//   var maintext = document.getElementsByClassName('text')
//   console.log(maintext)
//   // function opacity_value(){
//   //   // for(i=1; i<maintext-1); i++){

//   //   }
//   } ;
  // console.log(maintext[1])
  // maintext.style.opacity = opacity_value;
  // maintext.style.transform = `translateY(-${하잇}px)`
  // console.log(scrollheight)





// 첫번째 메인으로 들어갈 메세지는 HTML로 넣고 스크롤이 되면서
// 이너요소가 완전히 바뀌고, 스크롤의 특정 숫자에 따라 투명도랑 위치가 변경되는 이미지.
// 또 스크롤에 따라 원형도 바뀌어야 함.

// // 네브버튼만 살리고 다 사라지게 하기.

// // 스크롤이 몇이면 이 속성을 바꿔죠.