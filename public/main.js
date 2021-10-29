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
  if (scrollheight > 0) {
    header.style.backgroundColor = 'transparent';
    visible.style.display = 'none';
    header.addEventListener('mouseover', function () {
      header.style.backgroundColor = '#fff';
      visible.style.display = 'flex';
    })
  } else if(scrollheight == 0){
    header.style.backgroundColor = '#fff';
    visible.style.display = 'flex';
  }

};

function main() {
  const video = document.querySelector('.video-container>video')
  let scrollheight = document.documentElement.scrollTop;
  let value = ((1 / 150) * scrollheight) - (10 / 3)
  if (scrollheight < 500) {
    video.style.filter = `grayscale(0)`
  } else if (scrollheight >= 500) {
    video.style.filter = `grayscale(${value})`
  }
  if (scrollheight > 2000) {
    video.style.filter = `grayscale(10)`
  }

  const text1 = document.querySelector('.text1')
  let opac1 = ((1 / 500) * scrollheight) - (4 / 5)
  let opac2 = ((-1 / 500) * scrollheight) + (19 / 5)

  const text2 = document.querySelector('.text2')
  let opac3 = ((1 / 500) * scrollheight) - (19 / 5)
  let opac4 = ((-1 / 500) * scrollheight) + (34 / 5)


  const bgcircle = document.querySelector('.bgcircle')
  let scale = ((1 / 200) * scrollheight) - 13


  if (scrollheight < 300) {
    text1.style.opacity = `0`
  } else if (scrollheight >= 300) {
    text1.style.opacity = `${opac1}`
  };

  if (scrollheight >= 1400) {
    text1.style.opacity = `${opac2}`
  } else if (scrollheight > 1900) {
    text1.style.opacity = `0`
  };

  if (scrollheight < 1900) {
    text2.style.opacity = `0`
  } else if (scrollheight >= 1900) {
    text2.style.opacity = `${opac3}`
  };

  if (scrollheight >= 2900) {
    text2.style.opacity = `${opac4}`
  } else if (scrollheight > 3400) {
    text2.style.opacity = `0`
  };

  if (scrollheight < 2600) {
    bgcircle.style.transform = `scale(0)`
  } else if (scrollheight >= 2600) {
    bgcircle.style.transform = `scale(${scale})`
  }
  if (scrollheight > 3600) {
    bgcircle.style.transform = `scale(5)`
  }



}
document.addEventListener('scroll', header);
document.addEventListener('scroll', main);







function booksbtn() {
  const changeobj = document.querySelector('.books>.container');
  const booktray = document.getElementsByClassName('book-tray');
  const nextbtn = document.querySelector('.next')
  const prebtn = document.querySelector('.previous')
  let nowbook = 0

  nextbtn.addEventListener('click', function () {
    if (nowbook <= booktray.length - 3) {
      nowbook++;
      let translatevalue = -50 * nowbook;
      changeobj.style.transform = `translateX(${translatevalue}vw)`;

      console.log(nowbook)

    }

  })
  prebtn.addEventListener('click', function () {
    if (nowbook >= 1) {
      nowbook--;
      let translatevalue = -50 * nowbook;
      changeobj.style.transform = `translateX(${translatevalue}vw)`;
      console.log(nowbook)
    }
  })

};
booksbtn();