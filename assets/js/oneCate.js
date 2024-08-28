const nav = document.querySelector("nav");
const prod = document.querySelector(".products");
let addTo;
const getData = async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const url = params.get("url");
    const response = await fetch(`${url}`);
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
    document.querySelector(".category").innerHTML = data.products[0].category;
    document.querySelector(".kind").innerHTML = data.products[0].category;
    document.querySelector("head title").innerHTML = data.products[0].category;
    const res = data.products
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
    document.querySelector(".row").innerHTML = res;
    // add the animation when scroll
    let allprod = document.querySelectorAll(".row .product-box");
    allprod.forEach((el) => {
      el.style.opacity = "0";
    });
    window.addEventListener("scroll", () => {
      const triggerBottom = window.innerHeight;
      for (let i = 0; i < allprod.length; i++) {
        const top = allprod[i].getBoundingClientRect().top;
        if (top < triggerBottom) {
          allprod[i].classList.add("fade-up");
        } else {
          allprod[i].classList.remove("fade-up");
        }
      }
    });
    //end animation
    addTo = document.querySelectorAll(".add");
    for (let i = 0; i < addTo.length; i++) {
      addTo[i].addEventListener("click", () => {
        addToCart(addTo[i].getAttribute("id"));
      });
    }
  } catch (e) {
    console.error(e);
  } finally {
    document.querySelector(".overlay").classList.add("d-none");
  }
};
displayData();
let cart = [];
let totalPrice = 0;
const addToCart = async (id) => {
  console.log(id);
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
window.addEventListener("scroll", () => {
  const allLinks = document.querySelectorAll("nav a");
  const triggerBottom = window.innerHeight;
  if (window.scrollY > 0) {
    nav.classList.add("scrolled");
    for(let i = 0; i < allLinks.length; i++){
      allLinks[i].classList.add("text-black");
    }
  } else {
    nav.classList.remove("scrolled");
    for(let i = 0; i < allLinks.length; i++){
      allLinks[i].classList.remove("text-black");
    }
  }
});
