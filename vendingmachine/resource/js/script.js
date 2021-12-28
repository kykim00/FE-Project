const list = document.querySelector(".list-item");
const returnButton = document.querySelector(".btn-return");
const getButton = document.querySelector(".btn-get");
const inputButton = document.querySelector(".btn-put");

function getBtnClick() {
  const myItemList = document.querySelector(".cont-myitems .list-item-staged");
  let balance = document.querySelector(".txt-balance");
  let balanceText = parseInt(balance.textContent.split(",").join(""));
  let totalMoney = document.querySelector(".txt-total-money");
  let totalPrice = 0;
  const stagedItems = document.querySelectorAll(
    ".cont-get .list-item-staged li"
  );
  stagedItems.forEach((item) => {
    const price = item.querySelector(".price").textContent.split(",").join("");
    const amount = item.querySelector(".num-counter").textContent;
    totalPrice += parseInt(price) * parseInt(amount);
  });
  if (totalPrice > balanceText) {
    alert(
      `콜라 총 금액 : ${totalPrice}원\r\n현재 잔액 : ${balance.textContent}\r\n잔액이 부족합니다.`
    );
    return;
  }
  balance.textContent = balanceText - totalPrice + "원";
  totalMoney.textContent = parseInt(totalMoney.textContent) + totalPrice + "원";
  stagedItems.forEach((item) => {
    myItemList.appendChild(item);
  });
}

function returnBtnClick() {
  let balance = document.querySelector(".txt-balance");
  let balanceText = parseInt(balance.textContent.split(",").join(""));
  let myMoney = document.querySelector(".txt-mymoney");
  let myMoneyText = parseInt(myMoney.textContent.split(",").join(""));
  myMoney.textContent = myMoneyText + balanceText + "원";
  balance.textContent = "0원";
}

function inputBtnClick() {
  let balance = document.querySelector(".txt-balance");
  let balanceText = parseInt(balance.textContent.split(",").join(""));
  let myMoney = document.querySelector(".txt-mymoney");
  let myMoneyText = parseInt(myMoney.textContent.split(",").join(""));
  let inputMoney = document.querySelector(".inp-put");
  let inputMoneyText = inputMoney.value;
  if (
    isNaN(inputMoneyText) ||
    inputMoneyText == "" ||
    parseInt(inputMoneyText) < 0
  ) {
    alert("정확한 금액을 입력해주세요.");
    return;
  }
  if (myMoneyText - parseInt(inputMoneyText) < 0) {
    alert("소지금이 부족합니다.");
    return;
  }
  balance.textContent = balanceText + parseInt(inputMoneyText) + "원";
  myMoney.textContent = myMoneyText - parseInt(inputMoneyText) + "원";
  inputMoney.value = "";
}
list.addEventListener("click", function onClick(ev) {
  if (ev.target.tagName == "LI") {
    const btnItem = ev.target.querySelector(".btn-item .txt-item").textContent;
    const stagedItems = document.querySelector(".cont-get .list-item-staged");
    let amount = ev.target.querySelector(".btn-item");
    const stagedItemsName = document.querySelectorAll(
      ".cont-get .list-item-staged .txt-item"
    );
    const stagedItemsNameList = Array.from(stagedItemsName).map(
      (x) => x.textContent
    );

    if (stagedItemsNameList.includes(btnItem)) {
      stagedItems.querySelectorAll("li").forEach((li) => {
        if (li.querySelector(".txt-item").textContent === btnItem) {
          amount.value = amount.value - 1;
          li.querySelector(".num-counter").textContent =
            parseInt(li.querySelector(".num-counter").textContent) + 1;
        }
      });
    } else {
      const temp = ev.target.querySelector("button");
      const temp_img = temp.querySelector(".img-item");
      const temp_text = temp.querySelector(".txt-item");
      const temp_price = temp.querySelector(".txt-price");
      const addCola = document.createElement("li");
      const addCola_img = document.createElement("img");
      const addCola_amount = document.createElement("span");
      const addCola_text = document.createElement("span");
      const addCola_pirce = document.createElement("span");
      addCola_pirce.classList.add("ir", "price");
      addCola_pirce.textContent = temp_price.textContent;
      addCola_img.classList.add("img-item");
      addCola_img.src = temp_img.src;
      addCola_img.alt = "";
      addCola_text.classList.add("txt-item");
      addCola_text.textContent = temp_text.textContent;
      addCola_amount.classList.add("num-counter");
      addCola_amount.textContent = 1;
      addCola.appendChild(addCola_img);
      addCola.appendChild(addCola_text);
      addCola.appendChild(addCola_amount);
      addCola.appendChild(addCola_pirce);
      stagedItems.appendChild(addCola);
      amount.value = amount.value - 1;
    }
    if (amount.value == 0) {
      ev.target.classList.add("sold-out");
      return;
    }
  }
});

getButton.addEventListener("click", getBtnClick);
inputButton.addEventListener("click", inputBtnClick);
returnButton.addEventListener("click", returnBtnClick);
