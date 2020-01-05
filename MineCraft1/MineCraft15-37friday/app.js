function game() {
  const array_height = 20;
  const array_width = 20;
  const numOfCloud = 5;
  const array = []; //creating 1d empty array
  let selectedTool;
  let selectedStorage;
  let cloudCounter = 0;
  let treeBrownCounter = 0;
  let treeGreenCounter = 0;
  let stoneCounter = 0;
  let groundCounter = 0;
  create2dArray();
  createGround();
  createCloudsRandomly();
  createStonesRandomly();
  create2TreesOn3RowsRandomly();
  createTheAxe();
  storageTreeGreen();
  storageTreeBrown();
  createThePickaxe();
  storageStone();
  createTheShovel();
  storageGround();
  createTheClouds();
  storageClouds();

  //////////////////////////////////////////////////////////////////////////////////////////////////
  //create 2d array elements inside col1 = sky
  function create2dArray() {
    const col1 = document.getElementsByClassName("col1")[0];
    //rows
    for (let i = 0; i < array_width; i++) {
      array[i] = []; //creating an array in the first array = 2d array
      array[i] = document.createElement("div");
      array[i].setAttribute("class", "row");
      array[i].style.setProperty("height", 100 / array_width + "%");
      col1.append(array[i]);
      //cols
      for (let j = 0; j < array_height; j++) {
        array[i][j] = document.createElement("div");
        array[i][j].setAttribute("class", "col");
        array[i][j].style.setProperty("width", 100 / array_height + "%");
        array[i].append(array[i][j]);
        array[i][j].addEventListener("click", function(event) {
          blankClicked(event);
        });
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////
  //set ground image from the 2/3 of the sky till bottom
  function createGround() {
    //rows
    for (let i = Math.round(array_width * 0.75); i < array_width; i++) {
      array[i].setAttribute("data-type", "ground" + i);
      //cols
      for (let j = 0; j < array_height; j++) {
        array[i][j].classList.add("groundImg");
        array[i][j].setAttribute("data-type", "ground");
        array[i][j].addEventListener("click", function(event) {
          groundClicked(event);
        });
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////
  //set clouds randomly in the sky in the top querter of screen
  function createCloudsRandomly() {
    //rows
    for (h = 0; h < 3; h++) {
      let counter = Math.floor(Math.random() * 5);
      for (let i = 0; i < Math.round(array_width * 0.25); i++) {
        //cols
        for (
          let j = 0 + counter * (array_height / numOfCloud);
          j <
          counter * (array_height / numOfCloud) + array_height / numOfCloud - 1;
          j++
        ) {
          let num = 0;
          if (num === Math.floor(Math.random() * 2)) {
            array[i][j].setAttribute("data-type", "cloud");
            array[i][j].classList.add("cloudImg");
            array[i][j].addEventListener("click", function(event) {
              cloudClicked(event);
            });
          }
        }
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////
  //make stones on 1/3 of the row that is on top of the ground
  function createStonesRandomly() {
    for (i = array_width * 0.75 - 1; i < array_width * 0.75; i++) {
      for (j = 0; j < array_height / 2; j++) {
        let num = Math.floor(Math.random() * array_height);
        array[i][num].setAttribute("data-type", "stone");
        array[i][num].classList.add("stonedImg");
        array[i][num].addEventListener("click", function(event) {
          stoneClicked(event);
        });
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////
  function create2TreesOn3RowsRandomly() {
    //make logs = tree brown
    let tree_brown_arr = [];
    //make trees on 1/3 of the row that is on top of the ground
    for (i = array_width * 0.75 - 1; i < array_width * 0.75; i++) {
      //make 2 trees (because array_height/10)
      for (j = 0; j < array_height / 10; j++) {
        num = Math.floor(Math.random() * (array_height - 1) + 1);
        while (
          array[i][num].getAttribute("data-type") ||
          array[i][num - 1].getAttribute("data-type") === "stone"
        ) {
          num = Math.floor(Math.random() * (array_height - 1) + 1);
        }
        tree_brown_arr.push(num);
        array[i][num].setAttribute("data-type", "tree_brown");
        array[i][num].classList.add("tree_brownImg");
        array[i][num].addEventListener("click", function(event) {
          brownTreeClicked(event);
        });
      }
    }
    for (i = array_width * 0.75 - 3; i < array_width * 0.75 - 1; i++) {
      for (j = 0; j < 2; j++) {
        array[i][tree_brown_arr[j]].setAttribute("data-type", "tree_brown");
        array[i][tree_brown_arr[j]].classList.add("tree_brownImg");
        array[i][tree_brown_arr[j]].addEventListener("click", function(event) {
          brownTreeClicked(event);
        });
      }
    }

    //make tree green
    //make trees on 1/3 of the row that is on top of the ground
    for (i = array_width * 0.75 - 6; i < array_width * 0.75 - 3; i++) {
      //make 2 trees (because array_height/10)
      for (j = 0; j < 2; j++) {
        array[i][tree_brown_arr[j]].setAttribute("data-type", "tree_green");
        array[i][tree_brown_arr[j] - 1].setAttribute("data-type", "tree_green");
        array[i][tree_brown_arr[j] + 1].setAttribute("data-type", "tree_green");
        array[i][tree_brown_arr[j]].classList.add("tree_greenImg");
        array[i][tree_brown_arr[j] - 1].classList.add("tree_greenImg");
        array[i][tree_brown_arr[j] + 1].classList.add("tree_greenImg");
        array[i][tree_brown_arr[j]].addEventListener("click", function(event) {
          greeenTreeClicked(event);
        });
        array[i][tree_brown_arr[j] - 1].addEventListener("click", function(
          event
        ) {
          greeenTreeClicked(event);
        });
        array[i][tree_brown_arr[j] + 1].addEventListener("click", function(
          event
        ) {
          greeenTreeClicked(event);
        });
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////
  //create the tools+storage inside of side menu of col2, put the img and add event listenerfunction st createTheAxe(){
  //create axe tool
  function createTheAxe() {
    const element = document.createElement("div");
    element.className = "option-axe option";
    const allSideMenu = document.querySelector(".col2-tools");
    allSideMenu.appendChild(element);
    element.addEventListener("click", function(event) {
      selectedTool = "axe";
      setActive(".option-axe.option");
    });
  }

  //create tree green storage
  function storageTreeGreen() {
    const element = document.createElement("div");
    element.className = "storageTreeGreen storage";
    element.innerHTML = "x" + treeGreenCounter;
    const allSideMenu = document.querySelector(".col2-storage");
    allSideMenu.appendChild(element);
    element.addEventListener("click", function(event) {
      selectedStorage = "storageTreeGreen";
      selectedTool = "";
      setActive(".storageTreeGreen.storage");
    });
  }

  //create tree brown storage
  function storageTreeBrown() {
    const element = document.createElement("div");
    element.className = "storageTreeBrown storage";
    element.innerHTML = "x" + treeBrownCounter;
    const allSideMenu = document.querySelector(".col2-storage");
    allSideMenu.appendChild(element);
    element.addEventListener("click", function(event) {
      selectedStorage = "storageTreeBrown";
      selectedTool = "";
      setActive(".storageTreeBrown.storage");
    });
  }

  //create pickaxe tool
  function createThePickaxe() {
    const element = document.createElement("div");
    element.className = "option-pickaxe option";
    const allSideMenu = document.querySelector(".col2-tools");
    allSideMenu.appendChild(element);
    element.addEventListener("click", function(event) {
      selectedTool = "pickaxe";
      setActive(".option-pickaxe.option");
    });
  }

  //create stone storage
  function storageStone() {
    const element = document.createElement("div");
    element.className = "storageStone storage";
    element.innerHTML = "x" + stoneCounter;
    const allSideMenu = document.querySelector(".col2-storage");
    allSideMenu.appendChild(element);
    element.addEventListener("click", function(event) {
      selectedStorage = "storageStone";
      selectedTool = "";
      setActive(".storageStone.storage");
    });
  }

  //create shovel tool
  function createTheShovel() {
    const element = document.createElement("div");
    element.className = "option-shovel option";
    const allSideMenu = document.querySelector(".col2-tools");
    allSideMenu.appendChild(element);
    element.addEventListener("click", function(event) {
      selectedTool = "shovel";
      setActive(".option-shovel.option");
      selectedStorage = "";
    });
  }

  //create ground storage
  function storageGround() {
    const element = document.createElement("div");
    element.className = "storageGround storage";
    element.innerHTML = "x" + groundCounter;
    const allSideMenu = document.querySelector(".col2-storage");
    allSideMenu.appendChild(element);
    element.addEventListener("click", function(event) {
      selectedStorage = "storageGround";
      selectedTool = "";
      setActive(".storageGround.storage");
    });
  }

  //create cloud tool
  function createTheClouds() {
    const element = document.createElement("div");
    element.className = "option-clouds option";
    const allSideMenu = document.querySelector(".col2-tools");
    allSideMenu.appendChild(element);
    element.addEventListener("click", function(event) {
      selectedTool = "clouds";
      setActive(".option-clouds.option");
    });
  }

  //create clouds storage
  function storageClouds() {
    const element = document.createElement("div");
    element.className = "storageClouds storage";
    element.innerHTML = "x" + cloudCounter;
    const allSideMenu = document.querySelector(".col2-storage");
    allSideMenu.appendChild(element);
    element.addEventListener("click", function(event) {
      selectedStorage = "storageClouds";
      selectedTool = "";
      setActive(".storageClouds.storage");
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////
  //remove and increase counter of specific pattern (only if the image is match to tool i choose)
  function cloudClicked(e) {
    console.log("cloudClicked");
    if (selectedTool === "clouds" && e.toElement.dataset.type === "cloud") {
      e.target.removeAttribute("data-type"); //remove the data-type attribute
      e.target.classList.remove("cloudImg"); //remove the class
      cloudCounter++; //increase the specific counter according to times i remove the element
      document.querySelector(".storageClouds").innerHTML = "x" + cloudCounter; //change the number ihave in storag for specific element
    }
  }

  function greeenTreeClicked(e) {
    if (selectedTool === "axe" && e.toElement.dataset.type === "tree_green") {
      e.target.removeAttribute("data-type"); //remove the data-type attribute
      e.target.classList.remove("tree_greenImg"); //remove the class
      treeGreenCounter++; //increase the specific counter according to times i remove the element
      document.querySelector(".storageTreeGreen").innerHTML =
        "x" + treeGreenCounter; //change the number ihave in storag for specific element
    }
  }

  function brownTreeClicked(e) {
    if (selectedTool === "axe" && e.toElement.dataset.type === "tree_brown") {
      e.target.removeAttribute("data-type"); //remove the data-type attribute
      e.target.classList.remove("tree_brownImg"); //remove the class
      treeBrownCounter++; //increase the specific counter according to times i remove the element
      document.querySelector(".storageTreeBrown").innerHTML =
        "x" + treeBrownCounter; //change the number ihave in storag for specific element
    }
  }

  function groundClicked(e) {
    if (selectedTool === "shovel" && e.toElement.dataset.type === "ground") {
      console.log("groundClicked");
      e.target.removeAttribute("data-type"); //remove the data-type attribute
      e.target.classList.remove("groundImg"); //remove the class
      groundCounter++; //increase the specific counter according to times i remove the element
      document.querySelector(".storageGround").innerHTML = "x" + groundCounter; //change the number ihave in storag for specific element
    }
  }

  function stoneClicked(e) {
    if (selectedTool === "pickaxe" && e.toElement.dataset.type === "stone") {
      e.target.removeAttribute("data-type"); //remove the data-type attribute
      e.target.classList.remove("stonedImg"); //remove the class
      stoneCounter++; //increase the specific counter according to times i remove the element
      document.querySelector(".storageStone").innerHTML = "x" + stoneCounter; //change the number ihave in storag for specific element
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////
  // build the trees , stones , ground and cloud by the user
  function blankClicked(e) {
    if (selectedStorage === "storageGround" && groundCounter > 0) {
      let clickedDiv = e.target;
      let parentRow = jQuery(clickedDiv).parent()[0];
      let indexOfParent = jQuery(clickedDiv).index();
      let nextRow = jQuery(parentRow).next();
      let bottomOfClicked = jQuery(nextRow)
        .children()
        .eq(indexOfParent);
      if (jQuery(bottomOfClicked).hasClass("groundImg")) {
        e.target.setAttribute("data-type", "ground"); //add the data-type attribute
        e.target.classList.add("groundImg"); //add the class
        e.target.addEventListener("click", function(event) {
          groundClicked(event);
        });
        groundCounter--; //remove from storage
        document.querySelector(".storageGround").innerHTML =
          "x" + groundCounter; //change the number ihave in storag for specific element
      }
    }
    if (selectedStorage === "storageTreeGreen" && treeGreenCounter > 0) {
      let clickedDiv = e.target;
      let parentRow = jQuery(clickedDiv).parent()[0];
      let indexOfParent = jQuery(clickedDiv).index();
      let nextRow = jQuery(parentRow).next();
      let bottomOfClicked = jQuery(nextRow)
        .children()
        .eq(indexOfParent);
      if (jQuery(bottomOfClicked).hasClass("tree_greenImg")) {
        e.target.setAttribute("data-type", "tree_green"); //add the data-type attribute
        e.target.classList.add("tree_greenImg"); //add the class
        e.target.addEventListener("click", function(event) {
          greeenTreeClicked(event);
        });
      }
      if (jQuery(bottomOfClicked).hasClass("tree_brownImg")) {
        e.target.setAttribute("data-type", "tree_green"); //add the data-type attribute
        e.target.classList.add("tree_greenImg"); //add the class
        e.target.addEventListener("click", function(event) {
          greeenTreeClicked(event);
        });
      }
      if (jQuery(bottomOfClicked).hasClass("col")) {
        e.target.setAttribute("data-type", "tree_green"); //add the data-type attribute
        e.target.classList.add("tree_greenImg"); //add the class
        e.target.addEventListener("click", function(event) {
          greeenTreeClicked(event);
        });
      }
      treeGreenCounter--;
      document.querySelector(".storageTreeGreen").innerHTML =
        "x" + treeGreenCounter; //change the number ihave in storag for specific element
    }
    if (selectedStorage === "storageTreeBrown" && treeBrownCounter > 0) {
      let clickedDiv = e.target;
      let parentRow = jQuery(clickedDiv).parent()[0];
      let indexOfParent = jQuery(clickedDiv).index();
      let nextRow = jQuery(parentRow).next();
      let bottomOfClicked = jQuery(nextRow)
        .children()
        .eq(indexOfParent);
      if (jQuery(bottomOfClicked).hasClass("tree_brownImg")) {
        e.target.setAttribute("data-type", "tree_brown"); //add the data-type attribute
        e.target.classList.add("tree_brownImg"); //add the class
        e.target.addEventListener("click", function(event) {
          brownTreeClicked(event);
        });
      }
      if (jQuery(bottomOfClicked).hasClass("groundImg")) {
        e.target.setAttribute("data-type", "tree_brown"); //add the data-type attribute
        e.target.classList.add("tree_brownImg"); //add the class
        e.target.addEventListener("click", function(event) {
          brownTreeClicked(event);
        });
      }
      treeBrownCounter--; //remove from storage
      document.querySelector(".storageTreeBrown").innerHTML =
        "x" + treeBrownCounter; //change the number ihave in storag for specific element
    }
    if (selectedStorage === "storageStone" && stoneCounter > 0) {
      let clickedDiv = e.target;
      let parentRow = jQuery(clickedDiv).parent()[0];
      let indexOfParent = jQuery(clickedDiv).index();
      let nextRow = jQuery(parentRow).next();
      let bottomOfClicked = jQuery(nextRow)
        .children()
        .eq(indexOfParent);
      if (jQuery(bottomOfClicked).hasClass("stonedImg")) {
        e.target.setAttribute("data-type", "stone"); //add the data-type attribute
        e.target.classList.add("stonedImg"); //add the class
        e.target.addEventListener("click", function(event) {
          stoneClicked(event);
        });
      }
      if (jQuery(bottomOfClicked).hasClass("groundImg")) {
        e.target.setAttribute("data-type", "stone"); //add the data-type attribute
        e.target.classList.add("stonedImg"); //add the class
        e.target.addEventListener("click", function(event) {
          stoneClicked(event);
        });
      }
      stoneCounter--; //remove from storage
      document.querySelector(".storageStone").innerHTML = "x" + stoneCounter; //change the number ihave in storag for specific element
    }
    if (selectedStorage === "storageClouds" && cloudCounter > 0) {
      let clickedDiv = e.target;
      let parentRow = jQuery(clickedDiv).parent()[0];
      let indexOfParent = jQuery(clickedDiv).index();
      let nextRow = jQuery(parentRow).next();
      let bottomOfClicked = jQuery(nextRow)
        .children()
        .eq(indexOfParent);
      if (jQuery(bottomOfClicked).hasClass("cloudImg")) {
        e.target.setAttribute("data-type", "cloud"); //add the data-type attribute
        e.target.classList.add("cloudImg"); //add the class
        e.target.addEventListener("click", function(event) {
          cloudClicked(event);
        });
      }
      if (jQuery(bottomOfClicked).hasClass("col")) {
        e.target.setAttribute("data-type", "cloud"); //add the data-type attribute
        e.target.classList.add("cloudImg"); //add the class
        e.target.addEventListener("click", function(event) {
          cloudClicked(event);
        });
      }
      cloudCounter--; //remove from storage
      document.querySelector(".storageClouds").innerHTML = "x" + cloudCounter; //change the number ihave in storag for specific element
    }
  }

  function setActive(val) {
    let buttonToActive = jQuery(val)[0];
    console.log(buttonToActive, val);
    if (buttonToActive) {
      jQuery(jQuery(".storageTreeGreen.storage")[0]).removeClass("active");
      jQuery(jQuery(".storageTreeBrown.storage")[0]).removeClass("active");
      jQuery(jQuery(".storageStone.storage")[0]).removeClass("active");
      jQuery(jQuery(".storageGround.storage")[0]).removeClass("active");
      jQuery(jQuery(".storageClouds.storage")[0]).removeClass("active");
      jQuery(jQuery(".option-axe.option")[0]).removeClass("active");
      jQuery(jQuery(".option-pickaxe.option")[0]).removeClass("active");
      jQuery(jQuery(".option-shovel.option")[0]).removeClass("active");
      jQuery(jQuery(".option-clouds.option")[0]).removeClass("active");

      jQuery(buttonToActive).addClass("active");
    }
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//pop up before game starts
const popup_btn = document.getElementsByClassName("popup_btn")[0];
popup_btn.addEventListener("click", launchGame);

function launchGame() {
  const modal = document.getElementsByClassName("show")[0];
  modal.setAttribute("class", "not_show");
  const container = document.getElementsByClassName("col_container")[0];
  container.classList.remove("not_show");
  game();
}
