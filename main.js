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
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
});

// navbar 토글 버튼 클릭시 메뉴 나오도록 (for small screen)
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});


// contact me 버튼 클릭시 contact 섹션으로 이동
const home_contact = document.querySelector('.home__contact');
home_contact.addEventListener('click', ()=>{
    // const target = event2.target;
    // const contact = target.dataset.contact;
    // if(contact == null){return;}
    // console.log(contact); 불필요...!!!
    scrollIntoView('#contact');
});

// 스크롤링시 페이드아웃 되듯이 올라가는 홈페이지가 투명해짐
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', ()=>{
    console.log(homeHeight); //960.4000244140625
    home.style.opacity = 1 - window.scrollY / homeHeight;
});

// 스크롤링 시 arrowup버튼 보이도록 하기
const arrow__up = document.querySelector('.arrow__up');
document.addEventListener('scroll', ()=>{
    if(window.scrollY > homeHeight / 2){
        arrow__up.classList.add('visible');
    }
    else{
        arrow__up.classList.remove('visible');
    }
})

// arrow up 버튼 클릭시 홈 화면으로 이동
arrow__up.addEventListener('click', ()=>{
    scrollIntoView('#home');
});


// work 버튼 클릭시 해당 타입의 프로젝트가 뜨도록
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.parentNode.dataset.filter || e.target.dataset.filter;
    if(filter == null){return;}

    // 이전에 선택된 버튼의 효과를 없애고 선택된 버튼에 효과주기
    const active = document.querySelector('.category__btn.selected');
    if (active != null) {
        active.classList.remove('selected');
    }
    e.target.classList.add('selected');


    projectContainer.classList.add('ani-out');

    setTimeout(()=>{
        projects.forEach((project) =>{
            if(filter === 'all' || filter === project.dataset.type){
                project.classList.remove('invisible');
            }else{
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('ani-out');
    },300);
});



// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이텐을 활성화 시킨다.

const sectionIds = [   
    '#home', 
    '#about', 
    '#skills', 
    '#work', 
    '#contact'
];

const sections = sectionIds.map(id=>document.querySelector(id));
const navItems = sectionIds.map(id=>document.querySelector(`[data-link="${id}"]`))
console.log(sections);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected){
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

// 함수로..
function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
    root:null,
    rootMargin:'0px',
    threshold:0.3,
};
const observerCallback = (entries, observer)=>{
    entries.forEach(entry => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0){
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            // 스크롤링이 아래로 되어서 페이지가 올라옴
            if(entry.boundingClientRect.y < 0){ // 밑으로 내리기
                selectedNavIndex = index + 1;
            }else{
                selectedNavIndex = index - 1;
            }

        }

    });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', ()=>{
    if(window.scrollY === 0){
        selectedNavIndex = 0;
    }else if(window.scrollY + window.innerHeight === document.body.clientHeight){
        selectedNavIndex = navItems.length - 1;
    }
    
    selectNavItem(navItems[selectedNavIndex]);

});