async function callAPI (operand, other, operator) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw;
    switch (operator) {
        case '+':
            raw = JSON.stringify({ "first": operand, "second": other, "operator": "+" });
            break;
        case '-':
            raw = JSON.stringify({ "first": operand, "second": other, "operator": "-" });
            break;
        case '*':
            raw = JSON.stringify({ "first": operand, "second": other, "operator": "*" });
            break;
        case '/':
            raw = JSON.stringify({ "first": operand, "second": other, "operator": "/" });
            break;
        case '^':
            raw = JSON.stringify({ "first": operand, "second": other, "operator": "^" });
            break;
    }
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    try {
        return fetch("https://41s3dc0al9.execute-api.us-east-2.amazonaws.com/dev/", requestOptions).then(response => response.json()).then(result => result.body).catch(error => console.log('error', error));
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