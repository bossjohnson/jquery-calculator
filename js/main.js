$(document).ready(function() {

    var divisionSymbol = $('div.buttons span:nth-child(2)').text();
    resetData();

    // All Buttons
    $('.buttons span').click(function() {
        var screenText = $('#screen').text();
        $('#screen').text(screenText + $(this).text());
    });

    // Number Buttons
    $('.buttons span:not(.operator)').click(function() {
        arg += $(this).text();
    });

    // Operator Buttons
    $('.operator:not(#cancel)').click(function() {
        args.push(arg);
        arg = '';
        switch ($(this).text()) {
            case divisionSymbol:
                ops.push(div);
                break;
            case 'x':
                ops.push(mult);
                break;
            case '-':
                ops.push(sub);
                break;
            case '+':
                ops.push(add);
                break;
            default:

        }
    });

    // Cancel Button
    $('#cancel').click(resetData);

    // Calc Button
    $('#calc').click(printResult);
});


// This all gets hoisted
var arg;
var args;
var ops;
var result;
var repeat;

function resetScreen() {
    $('#screen').text("");
}

function resetData() {
    arg = '';
    args = [];
    ops = [];
    result = 0;
    repeat = false;
    resetScreen();
}

function printResult() {
    if (repeat) {
        result = ops[ops.length - 1](result, Number(args[args.length - 1]));
    } else {
        result += Number(args[0]);
        for (var i = 0; i < ops.length; i++) {
            result = ops[i](result, Number(args[i + 1]));
        }
    }
    resetScreen();
    $('#screen').text("=" + result);
    repeat = true;
}

// Operator Functions
function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function mult(a, b) {
    return a * b;
}

function div(a, b) {
    return a / b;
}
