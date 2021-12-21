const submitBtn = document.querySelector(".btn-exc");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const wannabe = document.querySelector(".txt-wannabe input").value;
  const time = document.querySelector(".txt-time input").value;
  const printWannabe = document.querySelector(".result-wannabe");
  const printTime = document.querySelector(".result-time");

  if (!wannabe || time <= 0) {
    alert("정확하게 입력해 주세요");
    return;
  }
  printWannabe.textContent = wannabe;
  printTime.textContent = Math.ceil(10000 / parseInt(time));
});
