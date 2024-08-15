const sections=document.querySelectorAll("section");
const infoStart=document.querySelector(".info-start");
const infoEnd=document.querySelector(".info-end");

for (var i=0; i<sections.length; i++){
    sections[i].style.opacity="0";
}
// Add smooth scrolling effect to sections
window.addEventListener("scroll",()=>{
    const triggerBottom=window.innerHeight;
    for(let i=0;i<sections.length;i++){
        const sectionTop=sections[i].getBoundingClientRect().top;
        if(sectionTop<triggerBottom){
            if(i%2==0){

                sections[i].classList.add("fade-down");
            }
            else{
                sections[i].classList.add("fade-right");
            }
        }else{
            sections[i].classList.remove("fade-down");
            sections[i].classList.remove("fade-right");
        }
    }
});