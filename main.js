// 네브 버튼을 누르면 솨라락 나타나고, 닫기를 누르면 솨라락 없어지기!


function btn (btn, name, style){
  document.querySelector(btn).addEventListener('click', function () {
    document.querySelector(name).style.transform = style ;
  })
}

btn(".nav-btn", ".nav",  "translateX(0vw)")
btn(".close-btn", ".nav",  "translateX(-30vw)")
