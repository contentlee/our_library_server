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



function addBook(){
  const btn = document.querySelector('.add-book')
  const section = document.querySelector('.section2')
  let counter = 0

  btn.addEventListener('click', function(){
    if (counter == 0){
      section.style.display = 'flex'
      counter++;
    } else if (counter == 1){
      section.style.display = 'none'
      counter--;
    }
  })
}

addBook();



$('.search-btn').click(function(){
  var searchingValue = $('.search>input').val();
  window.location.href='/search?value=' + searchingValue
});



$('.delete').click(function (e) {
  var idvalue = e.target.dataset.id;
  var click = e.target;
  $.ajax({
   method : 'DELETE',
   url : '/delete',
   data : { _id : idvalue}
  }).done(function(result){
    click.parents('.book-card').fadeout;
    console.log("del complete")
  }).fail(function(xhr,code,err){
    console.log(xhr,code,err)
  })
})

