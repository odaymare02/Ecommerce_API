const nav = document.querySelector("nav");
const categories = document.querySelector(".categories");
let allCategory;
categories.style.opacity = "0";
const getData = async () => {
  try {
    const response = await fetch(`https://dummyjson.com/products/categories`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  } finally {
    document.querySelector(".overlay").classList.add("d-none");
  }
};
const displayData = async () => {
  try {
    const data = await getData();
    const res = data
      .map((s) => {
        return `
             <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="card text-bg-dark">
                        <img src="./assets/images/o.webp" class="card-img" alt="...">
                        <div class="card-img-overlay text-white flex-column" >
                          <h5 class="card-title border-bottom border-2 fade-right">${s.slug}</h5>
                          <p class="card-text fade-down">This is a wider  lead-in to additional content. This content is a little bit longer.</p>
                          <a href="oneCate.html?url=${s.url}" class="discover fade-up align-self-end">Discover <span class="arrow fade-right"> > </span></a>
                        </div>
                      </div>
                </div>
            `;
      })
      .join("");
    document.querySelector(".row").innerHTML = res;
    allCategory = Array.from(document.querySelectorAll(".row .card"));
    for (let i = 0; i < allCategory.length; i++) {
      allCategory[i].style.opacity = "0";
    }
    window.addEventListener("scroll", () => {
      const triggerBottom = window.innerHeight;
      for (let i = 0; i < allCategory.length; i++) {
        const rowTop = allCategory[i].getBoundingClientRect().top;
        if (rowTop < triggerBottom) {
          if (i % 2 == 0) {
            allCategory[i].classList.add("fade-down");
          } else {
            allCategory[i].classList.add("fade-right");
          }
        } else {
          allCategory[i].classList.remove("fade-down");
          allCategory[i].classList.remove("fade-right");
        }
      }
    });
  } catch (e) {
    console.error(e);
  }
};
displayData();
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
  if (window.scrollY >= categories.offsetTop - window.scrollY - 500) {
    categories.classList.add("fade-up");
  } else {
    categories.classList.remove("fade-up");
  }
});
