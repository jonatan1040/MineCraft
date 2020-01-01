let array_width = 20;
let array_height = 20;
let array = [];

//create 2d array elements inside col1
const col1 = document.getElementsByClassName('col1');
for (let i = 0; i < array_width; i++) {
    //rows
    for (let j = 0; j < array_height; j++) {
        //cols
        array[i][j] = document.createElement('div');
        col1.appendChild(array[i][j]);
    }
}