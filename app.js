let array_width = 20;
let array_height = 20;
let array = [];
let imgs = ["./img/axe.png", "./img/pickaxe.png", "./img/shovel.png"];
let option = document.getElementsByClassName("option");
let options = [[option], [option], [option], [option]];

//create 2d array elements inside col1
const col1 = document.getElementsByClassName("col1");
for (let i = 0; i < array_width; i++) {
  //rows
  for (let j = 0; j < array_height; j++) {
    //cols
    // array[i][j] = document.createElement("div");
    // col1.appendChild(array[i][j]);
  }
}

//create the inside side menu of col2, put the img and add event listener
const createTheSideMenu = () => {
  for (let i = 0; i < 4; i++) {
    const element = document.createElement("div");
    element.className = `option-${i}`;
    const allSideMenu = document.querySelector(".col2");
    allSideMenu.appendChild(element);
    element.style.backgroundImage = `url(${imgs[i]})`;
    element.style.backgroundSize = "100%";
    element.style.backgroundRepeat = "no-repeat";
    element.addEventListener("click", function() {
      pickOption();
    });
  }
};
createTheSideMenu();
