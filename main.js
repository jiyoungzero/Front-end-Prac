'use strict';

// navbar를 투명하게 만들고 navbarheight만큼 내려가면 pink로 바꾸기
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', ()=>{
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark');
    }else{
        navbar.classList.remove('navbar--dark');
    }
});

// navbar 메뉴 클릭시 해당 메뉴로 스크롤링
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event)=>{
    const target=event.target;
    const link = target.dataset.link;
    if(link == null){
        return;
    }
    const scrollTo = document.querySelector(link);
    scrollTo.scrollIntoView({behavior:'smooth'});
});

// contact me 버튼 클릭시 contact 섹션으로 이동
const home_contact = document.querySelector('.home__contact');
home_contact.addEventListener('click', ()=>{
    // const target = event2.target;
    // const contact = target.dataset.contact;
    // if(contact == null){return;}
    // console.log(contact); 불필요...!!!
    const scrollToContact = document.querySelector('#contact');
    scrollToContact.scrollIntoView({behavior:'smooth'});
});