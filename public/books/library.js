function nav_btn(btn, name, style) {
  document.querySelector(btn).addEventListener('click', function () {
    document.querySelector(name).style.transform = style;
  })
};

nav_btn(".nav-btn", ".nav", "translateX(0vw)");
nav_btn(".close-btn", ".nav", "translateX(-150vw)");



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

document.addEventListener('scroll', header);

function search(){
  document.querySelector('.search-btn').addEventListener('click', function(){
    var searchingValue = document.querySelector('.search>input').value;
    window.location.href = '/search?value=' + searchingValue
  })
}
search()



function addbtn(){
  const addBook = document.querySelector('.add-book');
  const section2 = document.querySelector('.section2');
  let count = 0;
  addBook.addEventListener('click', function(){
    if (count===0){
      section2.style.display = 'flex';
      count++
    } else{
      section2.style.display = 'none';
      count--
    }

  })
}

addbtn();




$('.delete').click(function (e) {
  var idvalue = e.target.dataset.id;
  $.ajax({
    method: 'DELETE',
    url: '/delete',
    data: {
      _id: idvalue
    }
  }).done(() => {
    console.log( $(this).parent())
    $(this).parent().fadeOut();
  }).fail(function (xhr, code, err) {
    console.log(xhr, code, err)
  })
})

