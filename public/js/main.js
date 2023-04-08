// start in navbar
let openNavbar = document.querySelector(".openNav");
let navbarList = document.querySelector("nav ul");
openNavbar.addEventListener("click", () => {
  navbarList.style.opacity = "1";
});
// start in log in
let openLogAndSearch = document.querySelectorAll(".userLogSearch");
let closeLogAndSearch = document.querySelectorAll(".closeLogSearch");
let openClose = () => {
  openLogAndSearch.forEach((open) => {
    open.onclick = () => {
      let datashow = document.querySelector(open.dataset.show);
      datashow.style.opacity = "1";
      datashow.style.zIndex = "10";
      datashow.style.height = "100%";
    };
  });
  closeLogAndSearch.forEach((close) => {
    close.onclick = () => {
      let datashow = document.querySelector(close.dataset.show);
      datashow.style.opacity = "0";
      datashow.style.zIndex = "-5";
      datashow.style.height = "0";
    };
  });
};
openClose();

if (document.querySelector("#header")) {
  var splide = new Splide("#header", {
    type: "loop",
    drag: "free",
    snap: true,
    perPage: 1,
  });
  splide.mount();
}

// start in slider customer
if (document.querySelector("#customer")) {
  var splide = new Splide("#customer", {
    type: "loop",
    height: "auto",
    perPage: 4,
    autoplay: true,
    breakpoints: {
      640: {
        perPage: 1,
      },
      767: {
        perPage: 2,
      },
      1024: {
        perPage: 3,
      },
    },

    updateOnMove: true,
    pagination: true,
    arrows: false,
  });

  splide.mount();
}

// ------------ start in page shopping -----------------------

async function fetchUrl(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

async function loopData() {
  try {
    const dataLoop = await fetchUrl("json/shooping.json");
    for (let index = 0; index < dataLoop.length; index++) {
      addDataFromFetchInShooping(dataLoop[index]);
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

loopData();

// add data from fetch api in page shooping
function addDataFromFetchInShooping(dataFromFetch) {
  let allProductContent = document.querySelector(
    ".productsShop .contentsProduct"
  );
  if (allProductContent) {
    allProductContent.innerHTML += ` 
              <div class="productShop shoopingProductCard">
                  <div class="productImg relative overflow-hidden">
                    <figure class="cursor-pointer h-96">
                      <img
                        src="${dataFromFetch.imgOne}"
                        alt=""
                        class="rounded-md w-full h-full"
                      />
                      <img
                        src="${dataFromFetch.imgTwo}"
                        alt="not found"
                        class="rounded-md w-full h-full absolute top-0 left-0"
                      />
                    </figure>
                    <ul class="icon">
                      <li class="rounded-full px-3 py-3 text-center mb-3">
                        <i class="fa-regular fa-eye"></i>
                      </li>
                      <li class="rounded-full px-3 py-3 text-center">
                        <i class="fa-solid fa-bag-shopping"></i>
                      </li>
                    </ul>
                    <div class="addCart w-full py-2">
                      <h1 class="capitalize text-xl text-center">
                        add to cart
                      </h1>
                    </div>
                    <div class="overlay"></div>
                  </div>
                  <div class="productContent text-center my-4">
                    <a
                      href=""
                      class="title font-bold text-xl capitalize cursor-pointer"
                    >
                      ${dataFromFetch.title}</a
                    >
                    <div class="priceCount flex flex-row justify-center mt-2">
                      <p class="price  capitalize font-bold">price:<span>${dataFromFetch.price}</span> </p>
                      <p class="count  capitalize font-bold px-3">price:<span>${dataFromFetch.count}</span> </p>
                    </div>
                  </div>
                </div>
  `;
  }
  getInforFromShooping();
}

function styleCartShooping() {
  let mainCardShooping = document.querySelector(".cardShooping");
  let closeCartShooping = document.querySelector(".closeCart");
  mainCardShooping.style.transform = "scale(1)";
  closeCartShooping.addEventListener("click", () => {
    mainCardShooping.style.transform = "scale(0)";
  });
}

getInfoLocal();

// check array is contain elemetn
let infoToArray = [];
if (window.localStorage.getItem("item")) {
  infoToArray = JSON.parse(window.localStorage.getItem("item"));
}

function getInforFromShooping() {
  let addToCarts = document.querySelectorAll(".addCart");
  addToCarts.forEach((addToCart) => {
    addToCart.addEventListener("click", () => {
      styleCartShooping();
      let parrenCartShooping = addToCart.parentNode.parentElement;
      let titleInfoCart =
        parrenCartShooping.querySelector(".productContent a").textContent;
      let priceInfoCart = parrenCartShooping.querySelector(
        ".priceCount .price span"
      ).textContent;
      pushInfromationToArray(titleInfoCart, priceInfoCart);
    });
  });
}

function pushInfromationToArray(titleInfoCart, priceInfoCart) {
  const objInfo = {
    id: Date.now(),
    price: priceInfoCart,
    title: titleInfoCart,
  };
  infoToArray.push(objInfo);
  setInfoLocal(infoToArray);
  setInformationToCart(infoToArray);
}

function setInformationToCart(getInforArray) {
  let contentListCart = document.querySelector(".cardShooping .listCart");
  contentListCart.innerHTML = "";
  getInforArray.forEach((item) => {
    contentListCart.innerHTML += `
                      <li class="flex flex-col justify-center my-1" data-id=${item.id}>
                      <h2 class="titleCartShooping break-all text-center mb-2">${item.title}</h2>
                      <div class="flex flex-row justify-between w-full items-center py-0.5 px-1">
                        <input
                          type="number"
                          class="countClothes w-8 h-5 outline-none rounded-md text-xs text-center"
                        />
                        <p class="priceCartShooping">${item.price}</p>
                                                <span class=" flex justify-center">
                          <i
                            class="reomveElement fa-solid fa-xmark mx-2 rounded-md px-1 py-0 w-5 h-5 text-sm cursor-pointer opacity-70"
                          ></i>
                        </span>
                      </div>
                    </li>
    `;
    removeElementFromCart(item.id);
    changeCountClothes(item.price);
  });
}

function changeCountClothes(priceChange) {
  let countCloth = document.querySelectorAll(".countClothes");
  let changePrice = document.querySelector(".priceCartShooping");
  countCloth.forEach((count) => {
    count.onkeyup = function () {
      changePrice.innerHTML = "";
      changePrice.innerHTML = priceChange.match(/\d+/)[0] * count.value;
    };
  });
}

function removeElementFromCart(itemId) {
  let removeElement = document.querySelectorAll(".reomveElement");  
  removeElement.forEach((clickRemove) => {
    clickRemove.addEventListener("click", () => {
      let pareentListClothe =
        clickRemove.parentNode.parentElement.parentElement;
      reomveElementFromLocal(itemId);
      pareentListClothe.remove();
    });
  });
}

function reomveElementFromLocal(itemId) {
  infoToArray = infoToArray.filter((item) => item.id != itemId);
  console.log(infoToArray);
  // let getKey = Object.keys(bird);
  // localStorage.removeItem(getKey);
}

function setInfoLocal(informationLocal) {
  window.localStorage.setItem("item", JSON.stringify(informationLocal));
}

function getInfoLocal() {
  let dataItem = window.localStorage.getItem("item");
  if (dataItem) {
    let toJson = JSON.parse(dataItem);
    setInformationToCart(toJson);
  }
}
