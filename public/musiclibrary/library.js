

function nav_btn(btn, name, style) {
  document.querySelector(btn).addEventListener('click', function () {
    document.querySelector(name).style.transform = style;
  })
};

nav_btn(".nav-btn", ".nav", "translateX(0vw)");
nav_btn(".close-btn", ".nav", "translateX(-50vw)");



function header() {
  const header = document.querySelector('header');
  const visible = document.querySelector('.visible');
  let scrollheight = document.documentElement.scrollTop;
  console.log(scrollheight)
  if (scrollheight <=10){
    header.style.backgroundColor = '#fff';
    visible.style.display = 'flex';
    
  } else if(scrollheight > 10) {
    header.style.backgroundColor = 'transparent';
    visible.style.display = 'none';
    header.addEventListener('mouseenter', function () {
      header.style.backgroundColor = '#fff';
      visible.style.display = 'flex';
    })
  }

};

document.addEventListener('scroll', header);