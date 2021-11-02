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
  if (scrollheight > 0) {
    header.style.backgroundColor = 'transparent';
    visible.style.display = 'none';
    header.addEventListener('mouseover', function () {
      header.style.backgroundColor = '#fff';
      visible.style.display = 'flex';
    })
  } else if (scrollheight == 0) {
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
    }

  })
  prebtn.addEventListener('click', function () {
    if (nowbook >= 1) {
      nowbook--;
      let translatevalue = -50 * nowbook;
      changeobj.style.transform = `translateX(${translatevalue}vw)`;
    }
  })

};
booksbtn();


$('.search-btn').click(function () {
  var searchingValue = $('.search>input').val();
  window.location.href = '/search?value=' + searchingValue
});


$('.delete').click(function (e) {
  var idvalue = e.target.dataset.id;
  var click = e.target;
  $.ajax({
    method: 'DELETE',
    url: '/delete',
    data: {
      _id: idvalue
    }
  }).done(function (result) {
    click.parent('.book-card').fadeout;
    console.log("del complete")
  }).fail(function (xhr, code, err) {
    console.log(xhr, code, err)
  })
})




function setCookie(cName, cValue, cDay) {
  var expire = new Date();
  expire.setDate(expire.getDate() + cDay);
  cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
  if (typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
  document.cookie = cookies;
}

// 쿠키 가져오기 함수
function getCookie(cName) {
  cName = cName + '=';
  var cookieData = document.cookie;
  var start = cookieData.indexOf(cName);
  var cValue = '';
  if (start != -1) {
    start += cName.length;
    var end = cookieData.indexOf(';', start);
    if (end == -1) end = cookieData.length;
    cValue = cookieData.substring(start, end);
  }
  return unescape(cValue);
}

//최초 한번만 띄우기 위함
if (1 > 0 && getCookie("Reply") != "Y") {
  alert("초과되었습니다");
  setCookie("Reply", "Y", "1") //변수, 변수값, 저장기간
}