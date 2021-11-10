function JOINbtn(){
  const join = document.querySelector('.JOIN');
  const joinpage = document.querySelector('.join-inner');
  const login = document.querySelector('.LOGIN')
  const loginpage = document.querySelector('.login-inner')
  join.addEventListener('click', function(){
    join.style.display='none'
    loginpage.style.display = 'none'
    login.style.display = 'block'
    joinpage.style.display = 'flex'
   })
  login.addEventListener('click', function(){
    login.style.display='none'
    joinpage.style.display = 'none'
    join.style.display = 'block'
    loginpage.style.display = 'flex'
   })
}

JOINbtn();