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
    const dataLoop = await fetchUrl("json/shooping.json");
    for (let index = 0; index < dataLoop.length; index++) {
      addDataFromFetchInShooping(dataLoop[index]);
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

loopData();

let i = 0;
// add data from fetch api in page shooping
function addDataFromFetchInShooping(dataFromFetch) {
  let allProductContent = document.querySelector(
    ".productsShop .contentsProduct"
  );
  if (allProductContent) {
    allProductContent.innerHTML += ` 
              <div class="productShop shoopingProductCard" data-id=${i}>
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
                      <p class="count  capitalize font-bold px-3">price:<span>${dataFromFetch.count}</span> </p>
                    </div>
                  </div>
                </div>
  `;
    i++;
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
// window.localStorage.clear();
getInfoLocal();

// check array is contain element
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
      let parrenCartShoopingId = addToCart.parentNode.parentElement.dataset.id;

      let titleInfoCart =
        parrenCartShooping.querySelector(".productContent a").textContent;
      let priceInfoCart = parrenCartShooping.querySelector(
        ".priceCount .price span"
      ).textContent;
      pushInfromationToArray(
        parrenCartShoopingId,
        priceInfoCart,
        titleInfoCart
      );
    });
  });
}

function pushInfromationToArray(idShooping, priceInfoCart, titleInfoCart) {
  const objInfo = {
    id: idShooping,
    price: priceInfoCart,
    title: titleInfoCart,
    count: "",
  };
  infoToArray.push(objInfo);

  setInformationToCart(infoToArray, objInfo.id);
  setInfoLocal(infoToArray);
}

console.log(infoToArray);
function setInformationToCart(getInforArray, idElement) {
  let contentListCart = document.querySelector(".cardShooping .listCart");
  contentListCart.innerHTML = "";
  getInforArray.forEach((item) => {
    contentListCart.innerHTML += `
                      <li class="flex flex-col justify-center my-1" data-id=${item.id} data-price=${item.price}>
                      <h2 class="titleCartShooping break-all text-center mb-2">${item.title}</h2>
                      <div class="flex flex-row justify-between w-full items-center py-0.5 px-1">
                        <input
                          type="number"
                          class="countClothes w-8 h-5 outline-none rounded-md text-xs text-center"
                          value=${item.count}
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

    removeElementFromCart();
    changeTotalPriceElement();
  });
}

function changeTotalPriceElement() {
  let countCloth = document.querySelectorAll(".countClothes");
  countCloth.forEach((count) => {
    count.onkeyup = function () {
      // The change count in input
      let countValue = count.value;
      let getId = count.parentElement.parentElement.dataset.id;
      let getPrice = count.parentElement.parentElement.dataset.price;

      // console.log(count.parentElement.parentElement.dataset.id);

      infoToArray.forEach((objectCount) => {
        if (objectCount.id == getId) {
          objectCount.count = countValue;
          setInfoLocal(infoToArray);
        }
      });

      // The total price of the item
      placePrice = count.parentElement.children[1];
      placePrice.innerHTML = getPrice.match(/\d+/)[0] * count.value;
    };
  });
}

function removeElementFromCart() {
  let removeElement = document.querySelectorAll(".reomveElement");
  removeElement.forEach((clickRemove) => {
    clickRemove.addEventListener("click", () => {
      let pareentListClothe =
        clickRemove.parentNode.parentElement.parentElement;

      let getDataId = pareentListClothe.dataset.id;
      reomveElementFromLocal(getDataId);
      pareentListClothe.remove();
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

// ------------- preview page --------------
