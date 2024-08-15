const nav = document.querySelector("nav");
const service = document.querySelector(".services");
const someProd = document.querySelector(".some-products");
const mode = document.querySelector(".mode");
const search = document.querySelector(".search");
const sections = document.querySelectorAll("section");
let addTo;
service.style.opacity = "0";
someProd.style.opacity = "0";
const getData = async (lim) => {
  try {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${lim}&skip=0`
    );
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
    const data = await getData(10);
    const result = data.products
      .map((product) => {
        return `
            <div class="col-lg-3 col-md-4 col-sm-6">
                                <div class="product-box p-2 rounded-2 shadow h-100">
                                    <div class="img d-flex justify-content-center align-items-center w-100 shadow-sm rounded-2 p-2">
                                        <img src="${
                                          product.thumbnail
                                        }" class=" img-fluid w-75">
                                    </div>
                                    <div class="img-info d-flex justify-content-center align-items-center gap-1 flex-column">
                                        <h5 class="mt-2">${product.title
                                          .split(" ")
                                          .slice(0, 2)
                                          .join(" ")}</h5>
                                        <p class="text-secondary">${product.description
                                          .split(" ")
                                          .slice(0, 10)
                                          .join(" ")}...</p>
                                        <a href="categories.html" class="btn btn-outline-main">Buy Now</a>
                                    </div>
                                    <div class="icons d-flex justify-content-center gap-3 p-1">
                                        <i class="fa-regular fa-heart fade-down" ></i>
                                        <i class="fa-solid fa-cart-plus fade-down add" id=${
                                          product.id
                                        }  ></i>
                                        <a href="details.html?id=${
                                          product.id
                                        }" class="fa-solid fa-circle-info fade-down details "></a>
                                    </div>
                                </div>
                      </div>
            `;
      })
      .join("");
    document.querySelector(".active .row").innerHTML = result;
    addTo = document.querySelectorAll(".add");
    addTo.forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("id");
        addToCart(id);
      });
    });
    const allLinks = document.querySelectorAll(".some-products .nav-link");
    for (let i = 0; i < allLinks.length; i++) {
      allLinks[i].addEventListener("click", () => {
        if (i == 0) {
          displayData();
        } else if (i == 1) {
          const result1 = data.products.filter((product) => {
            return product.rating >= 3;
          });
          const alo = result1
            .map((product) => {
              return `
                     <div class="col-lg-3 col-md-4">
                                <div class="product-box p-2 rounded-2 shadow h-100">
                                    <div class="img d-flex justify-content-center align-items-center w-100">
                                        <img src="${
                                          product.thumbnail
                                        }" class="w-75">
                                    </div>
                                    <div class="img-info d-flex justify-content-center align-items-center gap-1 flex-column">
                                        <h5 class="mt-2">${product.title
                                          .split(" ")
                                          .slice(0, 2)
                                          .join(" ")}</h5>
                                        <p class="text-secondary">${product.description
                                          .split(" ")
                                          .slice(0, 10)
                                          .join(" ")}...</p>
                                        <a href="categories.html" class="btn btn-outline-main">Buy Now</a>
                                    </div>
                                    <div class="icons d-flex justify-content-center gap-3 p-1">
                                        <i class="fa-regular fa-heart fade-down" ></i>
                                        <i class="fa-solid fa-cart-plus fade-down add" id=${
                                          product.id
                                        }  ></i>
                                        <a href="details.html?id=${
                                          product.id
                                        }" class="fa-solid fa-circle-info fade-down details "></a>
                                    </div>
                                </div>
                      </div>
                    `;
            })
            .join(" ");
          document.querySelector(".active .row").innerHTML = alo;
          addTo = document.querySelectorAll(".add");
          addTo.forEach((el) => {
            el.addEventListener("click", () => {
              const id = el.getAttribute("id");
              addToCart(id);
            });
          });
        }
      });
    }
  } catch (e) {
    console.error(e);
  }
};
displayData();

search.addEventListener("input", async (e) => {
  e.preventDefault();
  const filter = e.target.value.toUpperCase();
  if (typeof filter === `string` && filter.length === 0) {
    document.querySelector(".modal-content .container .row").innerHTML = ``;
  } else {
    try {
      document.querySelector(".overlay").classList.remove("d-none");
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${filter}`
      );
      const data = await response.json();
      const result = data.products
        .map((product) => {
          return `
       <div class="col-md-6" data-bs-theme="dark">
         <div class="product-box p-2 rounded-4 shadow bg-white h-100 d-flex gap-2">
             <div class="img d-flex justify-content-center align-items-center w-50 bg-transparent">
                 <img src="${product.thumbnail}" class="w-100">
             </div>
             <div class="img-info d-flex justify-content-center align-items-center gap-1 flex-column">
                 <h5 class="mt-2">${product.title
                   .split(" ")
                   .slice(0, 2)
                   .join(" ")}</h5>
                 <p class="text-secondary">${product.description
                   .split(" ")
                   .slice(0, 10)
                   .join(" ")}...</p>
                 <a href="categories.html" class="btn btn-outline-main">Buy Now</a>
             </div>
             <div class="icons d-flex justify-content-center gap-3 p-1">
                 <i class="fa-regular fa-heart fade-down" ></i>
                 <i class="fa-solid fa-cart-plus fade-down add "id=${
                   product.id
                 } ></i>
                 <a href="details.html?id=${
                   product.id
                 }" class="fa-solid fa-circle-info fade-down details "></a>
             </div>
         </div>
                      </div>

      `;
        })
        .join("");
      document.querySelector(".modal-content .container .row").innerHTML =
        result;
      addTo = document.querySelectorAll(".add");
      addTo.forEach((el) => {
        el.addEventListener("click", () => {
          const id = el.getAttribute("id");
          addToCart(id);
        });
      });
    } catch (e) {
    } finally {
      document.querySelector(".overlay").classList.add("d-none");
    }
  }
});
window.addEventListener("scroll", () => {
  const triggerBottom = window.innerHeight;
  const allLinks = document.querySelectorAll("nav a");
  if (window.scrollY > 0) {
    if(document.querySelector("body").classList.contains("dark-mode")){
      nav.classList.add("dark-scrolled");
    }
    else{

      nav.classList.add("scrolled");
    }
    for(let i = 0; i < allLinks.length; i++){
      allLinks[i].classList.add("text-black");
    }
  } else {
    if(document.querySelector("body").classList.contains("dark-mode")){
      nav.classList.remove("dark-scrolled");
    }
    else
    nav.classList.remove("scrolled");
    for(let i = 0; i < allLinks.length; i++){
      allLinks[i].classList.remove("text-black");
    }
  }
  for (let i = 0; i < sections.length; i++) {
    const sectionTop = sections[i].getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
      sections[i].classList.add("fade-down");
    } else {
      sections[i].classList.remove("fade-down");
    }
  }
});
let cart = [];
let totalPrice = 0;
const addToCart = async (id) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await response.json();
  let { title, price, thumbnail: src } = data;
  let product = cart.find((item) => {
    return item.name == title;
  });
  if (!product) {
    cart.push({ name: title, price: price, quantity: 1, img: data.thumbnail });
  } else {
    product.quantity++;
  }
  updatCart(cart);
};

let sum = 0;
let ss;
const updatCart = (carts) => {
  totalPrice = 0;
  ss = 0;
  let result = carts
    .map((item) => {
      totalPrice += item.price * item.quantity;
      ss += item.quantity;
      return `
    <div class="d-flex gap-3 justify-content-between align-items-center shadow rounded-3 p-2">
      <div class="img w-25 h-25 rounded-circle position-relative">
        <img src="${item.img}" class="img-fluid rounded-2 ">
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-white text-dark">
                      ${item.quantity}
                    </span>
      </div>
      <button class="btn btn-outline-main mun">
        <i class="fa-solid fa-minus" style="color: #000000;"></i>
      </button>
      <div class="d-flex flex-column">
        <h6>${item.name}</h6>
        <p>Price: ${item.price}</p>
      </div>
      <button class="btn btn-outline-main plus">
        <i class="fa-solid fa-plus" style="color: #000000;"></i>
      </button>
      <button type="button" class="btn btn-sm btn-outline-danger deleteTabs">Remove</button>
    </div>
    `;
    })
    .join("");
  document.querySelector(".offcanvas-body").innerHTML = result;
  document.querySelector(
    ".oday"
  ).innerHTML += `<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-white text-dark">
  ${ss}
                    </span>`;
  document.querySelector(".toot").textContent = Math.ceil(totalPrice);
  let allPlus = Array.from(document.querySelectorAll(".plus"));
  let allmun = Array.from(document.querySelectorAll(".mun"));
  const deleteTabs = document.querySelectorAll(".deleteTabs");
  for (let i = 0; i < allPlus.length; i++) {
    allPlus[i].addEventListener("click", () => {
      inc(cart[i].name);
    });
    allmun[i].addEventListener("click", () => {
      mu(cart[i].name);
    });
    deleteTabs[i].addEventListener("click", () => {
      dele(cart[i].name);
    });
  }
};
const dele = (namee) => {
  cart = cart.filter((item) => {
    return item.name != namee;
  });
  updatCart(cart);
};
const mu = (namee) => {
  let product = cart.find((item) => {
    return item.name == namee;
  });
  if (product.quantity > 1) {
    product.quantity--;
  }
  updatCart(cart);
};
const inc = (name) => {
  let product = cart.find((item) => {
    return item.name == name;
  });
  product.quantity++;
  updatCart(cart);
};
mode.addEventListener("click",()=>{
  const body=document.querySelector("body");
  if(body.classList.contains("dark-mode")){
    body.classList.remove("dark-mode");
    nav.classList.replace("dark-scrolled","scrolled");
    document.querySelectorAll("nav a").forEach(el=>{
      el.classList.replace("text-white","text-black");
    });
    sections.forEach(section=>{
      section.classList.replace("bg-dark","bg-light");
      section.querySelector(".title").classList.replace("text-white","text-dark");
    });
    mode.querySelector("i").style.transform="rotate(-180deg)";
    mode.querySelector("i").classList.replace("fa-moon","fa-sun");
    mode.querySelector("i").style.color="#FCE570";
    document.querySelector(".offcanvas").classList.remove("bg-dark");
    document.querySelector(".offcanvas").classList.remove("text-light");
    document.querySelector(".modal-dialog").removeAttribute("data-bs-theme");
    document.querySelector(".navbar-toggler").setAttribute("data-bs-theme","light");

  } else {
    body.classList.add("dark-mode");
    mode.querySelector("i").style.transform="rotate(360deg)";
    mode.querySelector("i").classList.replace("fa-sun","fa-moon");
    mode.querySelector("i").style.color="#fff"
;    document.querySelectorAll("nav a").forEach(el=>{
      el.classList.replace("text-black","text-white");
    });
    sections.forEach(section=>{
      section.classList.replace("bg-light","bg-dark");
      section.querySelector(".title").classList.replace("text-dark","text-white");
    });
    nav.classList.replace("scrolled","dark-scrolled");
    document.querySelector(".offcanvas").classList.add("bg-dark");
    document.querySelector(".offcanvas").classList.add("text-light");
    document.querySelector(".modal-dialog").setAttribute("data-bs-theme","dark");
    document.querySelector(".navbar-toggler").setAttribute("data-bs-theme","dark");
  }
});
