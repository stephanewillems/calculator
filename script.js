
const calcFull = document.querySelector('.calc-calculator');
const buttons = calcFull.querySelectorAll('button');
const display = document.querySelector("[name = display");
const komma = document.querySelector("[name = komma]");
const plusmin = document.querySelector("[name = plusmin]");
let displayNumber = [];
let emptyArray = [];
let resultOne = 0;
let resultTwo = 0;
let mergedResult = 0;
let opp = "";
let FinalResult = 0;
const regex = /^[\d.]*$/;
const regexnr = /^[+-/*]$/;
let count = 0;
let keyCount = 0;


buttons.forEach((button) => {

    button.addEventListener('mousedown', getValue);
    button.addEventListener('mouseup', removeClass);

})

function getValue(e) {
    e.target.parentNode.classList.add('pressed'); //voeg pressed class toe

    if (e.target.getAttribute("name") == "plusmin") {
        let plusminCount = 0;
        console.log("true");
        if (displayNumber[0] != '-') {
            displayNumber.unshift('-');
            plusminCount++
            console.log(displayNumber);
        } else {
            displayNumber.shift();
            console.log(displayNumber);
            plusminCount--;
        }
    }

    if ((e.target.value).match(regex)) { //check regex op numbers

        displayNumber.push(e.target.value);
        //if their is more than one komma in the array the button of komma can not work anymore
        if (countInArray(displayNumber, ".") >= 1) {

            console.log("only 1 point allowed");
            komma.disabled = true;
            komma.parentElement.classList.remove("pressed");

        }

        display.value = displayNumber.join('');
       
        console.log("displaynummer " + displayNumber);
    }

    // operations when you press a calculations button

 
        
    if(displayNumber.length != 0){

    if (e.target.value === "+" || e.target.value === "-" || e.target.value === "/" || e.target.value === "*") {
       console.log(displayNumber);
        if (count > 0) {
                    console.log(resultOne);
                    resultTwo = displayNumber.join('');
                    
                    switch (opp) {
                        case '+':
                            operator(add, Number(resultOne), Number(resultTwo));

                            opp = e.target.value;
                            break;

                        case '-':
                            operator(substract, Number(resultOne), Number(resultTwo));
                            opp = e.target.value;
                            break;

                        case '/':
                            operator(divide, Number(resultOne), Number(resultTwo));
                            opp = e.target.value;
                            break;

                        case '*':
                            operator(multiply, Number(resultOne), Number(resultTwo));
                            opp = e.target.value;
                            break;

                        default:
                            console.log('ERROR');
                            display.value = "ERROR";
                    }

                    resultOne = FinalResult;
                    console.log(display.value);
                    console.log(`Merged Result = ${FinalResult}`);
                    console.log(`count = ${count}`);
                    console.log(displayNumber);
                    reset(displayNumber);


        } else {
                    count++;
                    opp = e.target.value;
                    resultOne = displayNumber.join('');

                    console.log(`Result one = ${resultOne}`);
                    console.log(`Result two = ${resultTwo}`);
                    console.log(`count = ${count}`);
                    console.log(displayNumber);
                    reset(displayNumber);
        }

        console.log(resultOne, opp);

        //display value
        FinalResult == 0 ? display.value = opp : display.value = FinalResult;

    } }



    if (e.target.value === "=" ) {
        resultTwo = displayNumber.join('');


        switch (opp) {
            case '+':
                operator(add, Number(resultOne), Number(resultTwo));
                break;

            case '-':
                operator(substract, Number(resultOne), Number(resultTwo));
                break;

            case '/':
                operator(divide, Number(resultOne), Number(resultTwo));
                break;

            case '*':
                operator(multiply, Number(resultOne), Number(resultTwo));
                break;

            default:
                display.value = "ERROR";
                console.log('ERROR');
        }

        reset(displayNumber);
        count = 0;

        if (Number.isNaN(FinalResult)) {
            display.value = " Error";
            console.log(" ah ah ah , you didn't say the magic word!!");

        } else {
            display.value = FinalResult;
        }


    }


    ///RESET 
    if (e.target.value === "reset") {
        reset(displayNumber);
        resultTwo = 0;
        resultOne = 0;
        count = 0;
        FinalResult = 0;
        roundNr = 0;
        opp = "";

    }
    //BACKSPACE
    if (e.target.value === "backspace") {
        console.log(displayNumber);
        displayNumber.pop();
        display.value = displayNumber.join('');
        console.log(displayNumber);

    }


};

function removeClass(e) {
    e.target.parentNode.classList.remove('pressed');
}

function countInArray(arr, el) {

    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === el) {
            count++
        }
    }
    return count;

}
//calculation function
function roundNumber(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function add(a, b) {
    return a + b;


}

function substract(a, b) {

    return a - b;
}

function multiply(a, b) {
    return a * b;
}


function divide(a, b) {
    return a / b;
}


function reset(arr) {
    display.value = "";
    arr.splice(0, arr.length);
    if (komma.disabled) {
        komma.disabled = false;
    }


}

//main function 

function operator(func, firstNumber, secondNumber) {
    let firstR = Number(firstNumber);
    console.log(firstR, typeof (firstR));

    let secondR = Number(secondNumber);
    console.log(secondR, typeof (secondR));
    return FinalResult = func(firstR, secondR);

};
function arrayTrue(arr){
            console.log(arr.length); 
}