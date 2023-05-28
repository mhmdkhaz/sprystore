// start in navbar
let openNavbar = document.querySelector(".openNav");
let navbarList = document.querySelector("nav ul");
openNavbar.addEventListener("click", () => {
  navbarList.classList.toggle("activeNav");
  navbarList.classList.toggle("notActiveNav");
});
// start in drop
let openDropdown = document.querySelector(".openDrop");
let contetnDrop = document.querySelector(".contetnDrop");
openDropdown.addEventListener("click", () => {
  contetnDrop.classList.toggle("hideDrop");
});

// start in loader
window.onload = function () {
  let loader = document.querySelector(".loader");
  loader.classList.add("hideLoader");
};

// start in back to top
let btnToTop = document.querySelector(".btnToTop svg");
function toTop() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    btnToTop.style.opacity = "1";
  } else {
    btnToTop.style.opacity = "0";
  }
}

window.onscroll = () => {
  toTop();
  btnToTop.onclick = function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
};

// start in log in
let openLogAndSearch = document.querySelectorAll(".userLogSearch");
let closeLogAndSearch = document.querySelectorAll(".closeLogSearch");
let openClose = () => {
  openLogAndSearch.forEach((open) => {
    open.onclick = () => {
      let datashow = document.querySelector(open.dataset.show);
      datashow.style.right = "0";
    };
  });
  closeLogAndSearch.forEach((close) => {
    close.onclick = () => {
      let datashow = document.querySelector(close.dataset.show);
      datashow.style.right = "-100%";
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
    const dataLoop = await fetchUrl("public/json/shooping.json");
    for (let index = 0; index < dataLoop.length; index++) {
      addDataFromFetchInShooping(dataLoop[index]);
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

loopData();

let allProductContent,
  i = 0;
// add data from fetch api in page shooping
function addDataFromFetchInShooping(dataFromFetch) {
  allProductContent = document.querySelector(".productsShop .contentsProduct");

  if (allProductContent) {
    allProductContent.innerHTML += ` 
              <div class="productShop shoopingProductCard" data-id=${i}>
                  <div class="productImg relative overflow-hidden">
                    <figure class="cursor-pointer h-96">
                      <img
                        src="${dataFromFetch.imgOne}"
                        alt=""
                        class="cartImgages rounded-md w-full h-full"
                      />
                      <img
                        src="${dataFromFetch.imgTwo}"
                        alt="not found"
                        class="rounded-md w-full h-full absolute top-0 left-0"
                      />
                    </figure>
                    <ul class="icon">
                      <li class="rounded-full px-3 py-3 text-center mb-3 fromShooping">
                       <a href="preview.html"> <i class="fa-regular fa-eye"></i></a>
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
                      <p class="count  capitalize font-bold px-3">count:<span>${dataFromFetch.count}</span> </p>
                    </div>
                  </div>
                </div>
  `;
    i++;
  }
  getInforFromShooping();
  getPathFromShooping();
}

function styleCartShooping() {
  let mainCardShooping = document.querySelector(".cardShooping");
  let closeCartShooping = document.querySelector(".closeCart");
  mainCardShooping.style.transform = "scale(1)";
  closeCartShooping.addEventListener("click", () => {
    mainCardShooping.style.transform = "scale(0)";
  });
}

// ---------------------
getInfoLocal();
// ---------------------

// ------------------------ main function -----------------------

// check array is contain element
let infoToArray = [];
if (window.localStorage.getItem("item")) {
  infoToArray = JSON.parse(window.localStorage.getItem("item"));
}

function removeItemById() {
  // حذف العناصر المتشابهة باستخدام `filter()`
  infoToArray = infoToArray.filter((product, index, array) => {
    return index === array.findIndex((prod) => prod.id === product.id);
  });
}

function changeCountPriceMain() {
  let changeCount = document.querySelectorAll(".countClothes");
  changeCount.forEach((change) => {
    change.oninput = function () {
      // total number sum
      sumNumbers();
      // change count in input
      let getId = change.closest("[data-id]").dataset.id;

      infoToArray.forEach((objectChange) => {
        if (objectChange.id == getId) {
          //total price of the item
          let placePrice = change
            .closest(".mainProduct")
            .querySelector(".price");
          let subTotalPrice = objectChange.mainPrice * change.value;
          placePrice.innerHTML = `${subTotalPrice}$`;
          //
          objectChange.count = change.value;
          objectChange.price = subTotalPrice;
          setInfoLocal(infoToArray);
        }
      });
    };
  });
}

function removeElementFromCart() {
  let removeElement = document.querySelectorAll(".reomveElement");
  removeElement.forEach((clickRemove) => {
    clickRemove.addEventListener("click", () => {
      let pareentListClothe = clickRemove.closest("[data-id]");
      let getDataId = pareentListClothe.dataset.id;
      pareentListClothe.remove();
      reomveElementFromLocal(getDataId);
      sumNumbers();
    });
  });
}

function reomveElementFromLocal(itemId) {
  infoToArray = infoToArray.filter((item) => item.id != itemId);
  setInfoLocal(infoToArray);
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
// ------------------------ main function -----------------------

function getInforFromShooping() {
  let addToCarts = document.querySelectorAll(".addCart");
  addToCarts.forEach((addToCart) => {
    addToCart.addEventListener("click", () => {
      styleCartShooping();
      let parrenCartShooping = addToCart.parentNode.parentElement;
      let parrenCartShoopingId = addToCart.parentNode.parentElement.dataset.id;

      let imagesCart = parrenCartShooping.querySelector(".cartImgages").src;

      let titleInfoCart =
        parrenCartShooping.querySelector(".productContent a").textContent;

      let priceInfoCart = parrenCartShooping.querySelector(
        ".priceCount .price span"
      ).textContent;
      let toNumvetPrice = parseFloat(priceInfoCart.replace("$", ""));

      pushInfromationToArray(
        parrenCartShoopingId,
        toNumvetPrice,
        titleInfoCart,
        imagesCart
      );

      removeItemById();

      setInformationToCart(infoToArray);
      setInfoLocal(infoToArray);
    });
  });
}

function getPathFromShooping() {
  let fromShooping = document.querySelectorAll(".productShop .fromShooping");
  fromShooping.forEach((el) => {
    el.addEventListener("click", () => {
      let parentMainShop = el.closest(".productShop");
      let getImgPathFromShooping = parentMainShop
        .querySelector("figure img")
        .getAttribute("src");
      // set path to local storage
      localStorage.setItem("path", getImgPathFromShooping);

      previewInfoSetLocal(parentMainShop);
    });
  });
}

function setPathtoPreview() {
  let getPathFromLocal = window.localStorage.getItem("path");
  let setImgToPreviw = document.querySelector(".storePreview .previewLeft img");
  if (setImgToPreviw) {
    setImgToPreviw.setAttribute("src", getPathFromLocal);
  }
}
setPathtoPreview();

function previewInfoSetLocal(parentMainShop) {
  let parentMainShopId = parentMainShop.dataset.id;
  let dataObject = JSON.parse(localStorage.getItem("item"));
  const objectExists = dataObject.find((obj) => obj.id == parentMainShopId);
  // to string for set local
  const objectExistsToString = JSON.stringify(objectExists);
  localStorage.setItem("countPreivew", objectExistsToString);
}

function previewInfoGetLocal() {
  let countPlace = document.querySelector(".storePreview .input-group-field");

  let getCount = localStorage.getItem("countPreivew");
  if (countPlace && getCount && getCount !== "undefined") {
    try {
      let getCountToParse = JSON.parse(getCount); // to parse for get local
      infoToArray.forEach((objectCount) => {
        if (objectCount.id == getCountToParse.id) {
          countPlace.value = objectCount.count;
          countPlace.onkeyup = function () {
            objectCount.count = countPlace.value;
            setInfoLocal(infoToArray);
          };
        }
      });
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
    }
  } else if (countPlace && getCount && getCount == "undefined") {
    countPlace.style.display = "none";
  }
}

previewInfoGetLocal();

function pushInfromationToArray(
  idShooping,
  priceInfoCart,
  titleInfoCart,
  imagesCart
) {
  const objInfo = {
    id: idShooping,
    price: priceInfoCart,
    mainPrice: priceInfoCart,
    title: titleInfoCart,
    images: imagesCart,
    count: 1,
  };
  infoToArray.push(objInfo);
}

function setInformationToCart(getInforArray) {
  let contentListCart = document.querySelector(".cardShooping .listCart");
  if (contentListCart) {
    contentListCart.innerHTML = "";
    getInforArray.forEach((item) => {
      contentListCart.innerHTML += `
                    <li class="mainProduct flex flex-col items-center my-1" data-id=${item.id}
                      <h2 class="titleCartShooping break-all text-center mb-6">${item.title}</h2>
                      <div class="flex flex-row justify-between w-full items-center py-0.5 px-1">
                        <input
                          type="number"
                          class="countClothes w-8 h-5 outline-none rounded-md text-xs text-center"
                          value=${item.count}
                        />
                        <p class="priceCartShooping price">${item.price}</p>
                                <span class=" flex justify-center">
                          <i
                            class="reomveElement fa-solid fa-xmark mx-2 rounded-md px-1 py-0 w-5 h-5 text-sm cursor-pointer opacity-70"
                          ></i>
                        </span>
                      </div>
                    </li>
    `;
    });
  }
  removeElementFromCart();
  changeInfoInShooping();
}

function changeInfoInShooping() {
  changeCountPriceMain();
}

// ------------- preview page --------------

// ------------- start in my cart page --------------
let itemsCart = document.querySelector(".itemsProduct");
function showItemsCart() {
  if (itemsCart) {
    infoToArray.forEach((showCart) => {
      itemsCart.innerHTML += `
            <article class="mainProduct product rounded-md mt-5 py-4" data-id="${showCart.id}">
            <figure>
              <a class="imgProduct mt-3 lg:mt-0">
                <img
                  src="${showCart.images}"
                  alt=""
                  class="h-full"
                />

                <h3 class="reomveElement text-center py-3">Remove product</h3>
              </a>
            </figure>

            <div class="infoContet relative ">
              <div class="content text-left my-5">
                <h1>${showCart.title}</h1>

                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Soluta, numquam quis perspiciatis ea ad omnis provident laborum
                dolore in atque.
              </div>

              <div
                class="contentMoney quantity w-full "
              >
                <input type="text" class="countClothes rounded-md text-center" value="${showCart.count}"  />
                <div class="flex">
                  <h2 class="price">${showCart.price}</h2>
                  <h2 class="full-price">${showCart.mainPrice}</h2>
                </div>
              </div>
            </div>
          </article>
    `;
    });
  }
  changeInfoInMyCart();
  removeFromCart();
  sumNumbers();
}
showItemsCart();

function changeInfoInMyCart() {
  changeCountPriceMain();
}

function removeFromCart() {
  removeElementFromCart();
}

function sumNumbers() {
  let placeTotalPrice = document.querySelector(".total span"); // عنصر HTML لعرض المجموع الإجمالي
  let total = 0;
  if (placeTotalPrice) {
    for (let i = 0; i < infoToArray.length; i++) {
      total += infoToArray[i].price;
    }
    placeTotalPrice.innerHTML = total;
  }
}

// placeTotalPrice.innerHTML = sumNumbers(); // حساب المجموع الإجمالي وعرضه في العنصر HTML
// ------------- end in my cart page --------------
