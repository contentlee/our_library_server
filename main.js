function btn(btn, name, style) {
  document.querySelector(btn).addEventListener('click', function () {
    document.querySelector(name).style.transform = style;
  })
}

btn(".visible-header-btn", ".nav", "translateX(0vw)")
btn(".transparent-header-btn", ".nav", "translateX(0vw)")
btn(".close-btn", ".nav", "translateX(-30vw)")


document.addEventListener('scroll', function () {
  if (document.documentElement.scrollTop > 0) {
    document.querySelector('.visible-header').style.display = 'none';
    document.querySelector('.transparent-header').style.display = 'block';
  } else {
    document.querySelector('.visible-header').style.display = 'block';
    document.querySelector('.transparent-header').style.display = 'none';
  }
})

function changing_message(scrollmin, scrollmax, message) {
  document.addEventListener('scroll', function () {
    if ( scrollmin === document.documentElement.scrollTop) {
      document.querySelector('.text-main').textContent = message
    } else if(document.documentElement.scrollTop=== scrollmax){

    }
  })
}


// 첫번째 메인으로 들어갈 메세지는 HTML로 넣고 스크롤이 되면서
// 이너요소가 완전히 바뀌고, 스크롤의 특정 숫자에 따라 투명도랑 위치가 변경되는 이미지.
// 또 스크롤에 따라 원형도 바뀌어야 함.

// // 네브버튼만 살리고 다 사라지게 하기.

// // 스크롤이 몇이면 이 속성을 바꿔죠.