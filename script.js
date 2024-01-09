// callAPI function that takes the base and exponent numbers as parameters
var callAPI = (base, exponent) => {
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({ "base": base, "exponent": exponent });
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("YOUR API GATEWAY ENDPOINT", requestOptions)
        .then(response => response.text())
        .then(result => alert(JSON.parse(result).body))
        .catch(error => console.log('error', error));
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

function calculate() {
    // temporary: but we move this over to the API
    if (operator !== null) {
        let result;
        switch (operator) {
            case '+':
                result = operand + parseFloat(currentInput);
                break;
            case '-':
                result = operand - parseFloat(currentInput);
                break;
            case '*':
                result = operand * parseFloat(currentInput);
                break;
            case '/':
                result = operand / parseFloat(currentInput);
                break;
            case '^':
                result = operand ^ parseFloat(currentInput);
                break;
        }
        document.getElementById('display').value = result;
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