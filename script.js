// callAPI function that takes the base and exponent numbers as parameters
async function callAPI (operand, other, operator) {
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable

    var raw;
    switch (operator) {
        case '+':
            raw = JSON.stringify({ "first": operand, "second": other, "operator": "add" });
            break;
        case '-':
            raw = JSON.stringify({ "first": operand, "second": other, "operator": "subtract" });
            break;
        case '*':
            raw = JSON.stringify({ "first": operand, "second": other, "operator": "multiply" });
            break;
        case '/':
            raw = JSON.stringify({ "first": operand, "second": other, "operator": "divide" });
            break;
        case '^':
            raw = JSON.stringify({ "first": operand, "second": other, "operator": "power" });
            break;
    }
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    try {
        let response = await fetch("YOUR API GATEWAY ENDPOINT", requestOptions);
        let data = await response.text();
        return data;
    } catch (error) {
        console.log('error', error);
    }
}


let currentInput = '';
let operator = null;
let operand = null;

function appendNumber(number) {
    currentInput += number;
    document.getElementById('display').value = currentInput;
}

function appendOperator(op) {
    if (operator !== null) calculate();
    operator = op;
    operand = parseFloat(currentInput);
    currentInput = '';
}

async function calculate() {
    var display = document.getElementById('display');
    // temporary: but we move this over to the API
    if (operator !== null) {
        let result;
        switch (operator) {
            case '+':
                result = await callAPI(operand, parseFloat(currentInput), operator);
                break;
            case '-':
                result = await callAPI(operand, parseFloat(currentInput), operator);
                break;
            case '*':
                result = await callAPI(operand, parseFloat(currentInput), operator);
                break;
            case '/':
                result = await callAPI(operand, parseFloat(currentInput), operator);
                break;
            case '^':
                result = await callAPI(operand, parseFloat(currentInput), operator);
                break;
        }

        display.value = result;
        // display.style.fontSize = (display.value.length > 10) ? '18px' : '24px';
        currentInput = '' + result;
        operator = null;
    }
}

function clearDisplay() {
    currentInput = '';
    operator = null;
    operand = null;
    document.getElementById('display').value = '';
}


function validateForm() {
    var fileInput = document.getElementById('fileToUpload');
    var errorText = document.getElementById('error');
    if (fileInput.files.length === 0) {
        errorText.textContent = 'Error: No file selected.';
        return false;
    }
    errorText.textContent = '';
    return true;
}