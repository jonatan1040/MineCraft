let array_height = 20;
let array_width = 20;
let array = []; //creating 1d empty array

//create 2d array elements inside col1
let col1 = document.body.getElementsByClassName('col1')[0];
//rows
for (let i = 0; i < array_width; i++) {
    array[i] = []; //creating an array in the first array = 2d array
    array[i] = document.createElement('div');
    console.log(typeof array[i]);
    array[i].setAttribute('class', 'row');
    array[i].style.setProperty('height', 100 / array_width + '%');
    col1.append(array[i]);
    //cols
    for (let j = 0; j < array_height; j++) {
        array[i][j] = document.createElement('div');
        array[i][j].setAttribute('class', 'col');
        array[i][j].style.setProperty('width', 100 / array_height + '%');
        array[i].append(array[i][j]);
    }
}