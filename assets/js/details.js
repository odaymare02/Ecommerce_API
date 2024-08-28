const rightbtn=document.querySelector(".right");
const leftbtn=document.querySelector(".left");
const getData = async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const response = await fetch(`https://dummyjson.com/products/${id}`);
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
    const allimgs = data.images
      .map((img) => {
        return `<img src="${img}" alt="${data.title}" class="img-fluid w-25 bg-white rounded sos p-2 fade-right">`;
      })
      .join("");
    document.querySelector(".slider-img").innerHTML = allimgs;
    document.querySelector(".main-img img").setAttribute("src", data.thumbnail);
    document.querySelector(".main-img img").classList.add("fade-right");
    const imgSlider = document.querySelectorAll(".slider-img img");
    for (let i = 0; i < imgSlider.length; i++) {
      imgSlider[i].addEventListener("click", () => {
        document
          .querySelector(".main-img img")
          .setAttribute("src", imgSlider[i].getAttribute("src"));
      });
    }
    const allImages =Array.from(document.querySelectorAll(".slider-img img"));
    let currentIndex = 0;
rightbtn.addEventListener("click", () => {
  currentIndex++;
  if(currentIndex>=allImages.length){
    currentIndex=0;
  }
  document
  .querySelector(".main-img img")
  .setAttribute("src", allImages[currentIndex].getAttribute("src"));
});
leftbtn.addEventListener("click",()=>{
  currentIndex--;
  if(currentIndex<0){
    currentIndex=allImages.length-1;
  }
  document
 .querySelector(".main-img img")
 .setAttribute("src", allImages[currentIndex].getAttribute("src"));
});
document.addEventListener("keydown",(e)=>{
  if(e.code=="ArrowRight"){
    rightbtn.click();
  }
});
document.addEventListener("keydown",(e)=>{
  if(e.code=="ArrowLeft"){
    leftbtn.click();
 }
});
    const res = `
                        <div class="details-end fade-down">
                           <div class="category d-flex justify-content-center align-items-center gap-2">
                            <a href="   categories.html">Category</a> > ${data.category}
                           </div>
                           <div class="product-info">
                            <h2>${data.title}</h2>
                            <p>${data.description}</p>
                            <div class="d-flex align-items-center justify-content-around">
                            <div class="d-felx flex-column justify-content-center align-items-center gap-1 ">
                            <span>Price:</span>
                                <span>${data.price}$</span>
                                </div>
                                <button type="button" class="btn btn-outline-main add">Add To Cart</button>
                            </div>
                        </div>
                    </div>
                    </div>
        `;
    document.querySelector(".details-end .product-info").innerHTML = res;
    document.querySelector(".add").addEventListener("click", () => {
      location.reload();
    });
    const reviews = data.reviews
      .map((re) => {
        return `
             
                            <div class="col-md-12">
                                <div class="review d-flex flex-column align-items-center justify-content-center bg-dark p-2 rounded-2 shadow fade-up">
                                    <div class="user d-flex justify-content-between align-items-center w-100">
                                    <div class="d-felx flex-column justify-content-center align-items-center gap-1 ">
                                    <span>Name</span>
                                        <p>${re.reviewerName}</p>
                                        </div>
                                        <div class="d-felx flex-column justify-content-center align-items-center gap-1 ">
                                        <span>Rating</span>
                                        <p>${re.rating}</p>
                                        </div>
                                    </div>
                                    <div class="comment">
                                    <div class="d-felx flex-column justify-content-center align-items-center gap-1 ">
                                    <span>Comment</span>
                                    <p>${re.comment}</p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                       
            `;
      })
      .join("");
    document.querySelector(".reviews .row").innerHTML = reviews;
  } catch (e) {
    console.error(e);
  }
};

displayData();
