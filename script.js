
let slider = document.getElementById("slider"); 
let speed = document.getElementById("speed");
let algo = document.getElementById("algorithm");

let n = 20;
let sortSpeed = 200;
let array = [];
let isInit = false;
let algoSelected = "bubble";
init();

slider.addEventListener("input", function(){
    container.innerHTML = "";
    array = [];
    n = slider.value;
    init();
})

speed.addEventListener("input",function(){

    if(speed.value == 200){
        sortSpeed = 200;
    }else if(speed.value == 100){
        sortSpeed = 100;
    }else if(speed.value == 25){
        sortSpeed = 25;
    }

})

algo.addEventListener("input",function(){
    algoSelected = algo.value;
})

function init(){
    array = [];
    for(let i = 0; i < n; i++){
        array[i] = Math.random();
    }
    isInit = true;
    showBars();
}



function play(){
    if(isInit){
        const copy = [...array];
        let moves = [];
        switch(algoSelected){
            case "bubble":
                moves = bubbleSort(copy);
                break;

            case "insertion":
                moves = InsertionSort(copy);
                break;
            
            case "quick":
                quickSort(copy, 0, copy.length -1,moves);
                animate(moves);
                break;

            case "selection":
                moves = SelectionSort(copy);
                break;
        }

        if (algoSelected !== "quick") {
            animate(moves);
        }
        isInit = false;
    }

    //showBars();
}

function animate(moves){
    if(moves.length == 0){
        showBars();
        return;
    }
    const [i,j] = moves.shift();
    [array[i],array[j]]=[array[j],array[i]];
    showBars([i,j]);
    setTimeout(function(){
        animate(moves);
    },sortSpeed);
}

function bubbleSort(array){
    const moves=[];
    do{
        var swapped = false;
        for(let i = 1; i < array.length; i++){
            if(array[i-1] > array[i]){
                swapped = true;
                moves.push([i-1,i]);
                [array[i-1],array[i]]=[array[i],array[i-1]];
            }
        }
    }while(swapped);
    return moves;
}


function InsertionSort(array) {
    const moves = [];
    do{
        var swapped = false;

        for (let i = 1; i < array.length; i++) {
            let key = array[i];
            let j = i - 1;
            while (j >= 0 && array[j] > key) {
              swapped = true;
              moves.push([j,j+1]);
              array[j + 1] = array[j];
                
        
              for (let k = 0; k < array.length; k++) {
                if (k != j + 1) {
                  
                }
              }
              j = j - 1;
            }
            array[j + 1] = key;
        }
    }while(swapped);
    
    return moves;
}


function SelectionSort(array){
    const moves = [];
    do{
        var swapped = false;
        var temp, min;
        for(let i = 0; i < array.length-1; i++){
            min = i;
            for(let j = i+1; j<n; j++){
                if(array[j] < array[min]){
                    min = j;
                }
            }
            if (min !== i) {
                swapped = true;
                moves.push([min, i]);
                [array[i], array[min]] = [array[min], array[i]];
            }
        }
    }while(swapped);

    return moves;
}



function quickSort(array, low, high, moves){
        if(low < high){
            var p;
            p = partition(array,low, high, moves);
            quickSort(array, low, p-1, moves);
            quickSort(array, p+1, high, moves);
        }
}

function partition(array,low,high,moves){
    var pivot = array[high];
    var i = (low-1);

    for(var j = low; j <= high-1; j++){
        if(array[j] <= pivot){
            i++;
            moves.push([i,j]);
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    moves.push([i+1,high]);
    var temp = array[i+1];
    array[i+1] = array[high];
    array[high] = temp;

    return (i+1);

}


function showBars(indices){
    container.innerHTML = "";
    for(let i = 0; i < array.length; i++){
        const bar = document.createElement("div");
        bar.style.height=array[i]*123+"%";
        bar.classList.add("bar");
        if(indices && indices.includes(i)){
            bar.style.backgroundColor = "red";
        }
    container.appendChild(bar);
    }
}

console.log(array);