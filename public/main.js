function nav_btn(btn, name, style) {
  document.querySelector(btn).addEventListener("click", function () {
    document.querySelector(name).style.transform = style;
    console.log("e");
  });
}

nav_btn(".nav-btn", ".nav", "translateX(0vw)");
nav_btn(".close-btn", ".nav", "translateX(-150vw)");

function header() {
  const header = document.querySelector("header");
  const head_wrapper = document.querySelector(".head-wrapper");
  let scrollheight = document.documentElement.scrollTop;
  if (scrollheight > 0) {
    header.style.backgroundColor = "transparent";
    head_wrapper.style.display = "none";
    header.addEventListener("mouseover", function () {
      header.style.backgroundColor = "#fff";
      head_wrapper.style.display = "flex";
    });
  } else if (scrollheight == 0) {
    header.style.backgroundColor = "#fff";
    head_wrapper.style.display = "flex";
  }
}

header();

function search() {
  const searchInput = document.querySelector(".search-wrapper>input");
  const searchBtn = document.querySelector(".search-btn");
  searchBtn.addEventListener("click", function () {
    const searchingValue = searchInput.value;
    window.location.href = "/search?value=" + searchingValue;
  });
  searchInput.addEventListener("keyup", function () {
    if (window.event.keyCode == 13) {
      const searchingValue = searchInput.value;
      window.location.href = "/search?value=" + searchingValue;
    }
  });
}

search();

function main() {
  const video = document.querySelector(".video-wrapper>video");
  let scrollheight = document.documentElement.scrollTop;
  let value = (1 / 150) * scrollheight - 10 / 3;
  if (scrollheight < 500) {
    video.style.filter = `grayscale(0)`;
  } else if (scrollheight >= 500) {
    video.style.filter = `grayscale(${value})`;
  }
  if (scrollheight > 2000) {
    video.style.filter = `grayscale(10)`;
  }

  const text1 = document.querySelector(".text1");
  let opac1 = (1 / 500) * scrollheight - 4 / 5;
  let opac2 = (-1 / 500) * scrollheight + 19 / 5;

  const text2 = document.querySelector(".text2");
  let opac3 = (1 / 500) * scrollheight - 19 / 5;
  let opac4 = (-1 / 500) * scrollheight + 34 / 5;

  if (scrollheight < 300) {
    text1.style.opacity = `0`;
  } else if (scrollheight >= 300) {
    text1.style.opacity = `${opac1}`;
  }

  if (scrollheight >= 1400) {
    text1.style.opacity = `${opac2}`;
  } else if (scrollheight > 1900) {
    text1.style.opacity = `0`;
  }

  if (scrollheight < 1900) {
    text2.style.opacity = `0`;
  } else if (scrollheight >= 1900) {
    text2.style.opacity = `${opac3}`;
  }

  if (scrollheight >= 2900) {
    text2.style.opacity = `${opac4}`;
  } else if (scrollheight > 3400) {
    text2.style.opacity = `0`;
  }
}
document.addEventListener("scroll", header);
document.addEventListener("scroll", main);

function addbtn() {
  const addBtn = document.querySelector(".add-btn");
  const section = document.querySelector(".library-section-b");
  let count = 0;
  addBtn.addEventListener("click", function () {
    if (count === 0) {
      section.style.display = "flex";
      count++;
    } else {
      section.style.display = "none";
      count--;
    }
  });
}

addbtn();

$(".delete").click(function (e) {
  var idvalue = e.target.dataset.id;
  $.ajax({
    method: "DELETE",
    url: "/delete",
    data: {
      _id: idvalue,
    },
  })
    .done(() => {
      console.log($(this).parent());
      $(this).parent().fadeOut();
    })
    .fail(function (xhr, code, err) {
      console.log(xhr, code, err);
    });
});
