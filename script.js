let minValue = 0;
let maxValue = 100;
let answerNumber = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');
const currentMinSpan = document.getElementById('currentMin');
const currentMaxSpan = document.getElementById('currentMax');
const messageModal = $('#messageModal');
const initialModal = $('#initialModal');
const modalMessage = document.getElementById('modalMessage');

function showMessage(message) {
    modalMessage.textContent = message;
    messageModal.modal('show');
}

function numberToWords(num) {
    const units = [
        '', 'один', 'два', 'три', 'четыре', 'пять', 
        'шесть', 'семь', 'восемь', 'девять'
    ];
    const teens = [
        'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 
        'четырнадцать', 'пятнадцать', 'шестнадцать', 
        'семнадцать', 'восемнадцать', 'девятнадцать'
    ];
    const tens = [
        '', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 
        'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'
    ];
    const hundreds = [
        '', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 
        'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'
    ];

    if (num === 0) return 'ноль';
    
    let result = '';
    let isNegative = false;
    let number = num;
    
    if (number < 0) {
        isNegative = true;
        number = -number;
    }

    if (number >= 100) {
        result += hundreds[Math.floor(number / 100)] + ' ';
        number %= 100;
    }
    
    if (number >= 20) {
        result += tens[Math.floor(number / 10)] + ' ';
        number %= 10;
        if (number > 0) {
            result += units[number] + ' ';
        }
    } else if (number >= 10) {
        result += teens[number - 10] + ' ';
        number = 0;
    } else if (number > 0) {
        result += units[number] + ' ';
    }

    result = result.trim();
    if (isNegative) {
        result = 'минус ' + result;
    }
    
    return result.trim();
}

function formatNumber(num) {
    const textForm = numberToWords(num);
    if (textForm.length < 20) {
        return textForm;
    } else {
        return num.toString();
    }
}

function updateInterface() {
    orderNumberField.innerText = orderNumber;
    currentMinSpan.textContent = minValue;
    currentMaxSpan.textContent = maxValue;
    
    const questionRandom = Math.round(Math.random() * 2);
    let questionPhrase;
    
    switch (questionRandom) {
        case 0:
            questionPhrase = `Думаю, вы загадали число ${formatNumber(answerNumber)}?`;
            break;
        case 1:
            questionPhrase = `Да тут все понятно! Ты загадал ${formatNumber(answerNumber)}?`;
            break;
        case 2:
            questionPhrase = `Я очень надеюсь, что это число ${formatNumber(answerNumber)}?`;
            break;
        default:
            questionPhrase = `Вы загадали число ${formatNumber(answerNumber)}?`;
    }
    
    answerField.innerText = questionPhrase;
}

function setGameValues(newMin, newMax) {
    newMin = newMin < -999 ? -999 : (newMin > 999 ? 999 : newMin);
    newMax = newMax < -999 ? -999 : (newMax > 999 ? 999 : newMax);
    
    if (isNaN(newMin) || isNaN(newMax) || newMin >= newMax) {
        showMessage('Введены некорректные значения. Будут использованы значения по умолчанию: 0 и 100');
        minValue = 0;
        maxValue = 100;
    } else {
        minValue = newMin;
        maxValue = newMax;
    }

    orderNumber = 1;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    gameRun = true;
    
    updateInterface();
    showMessage(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю!`);
}

document.getElementById('initStartBtn').addEventListener('click', function() {
    const initMin = parseInt(document.getElementById('initMinValue').value) || 0;
    const initMax = parseInt(document.getElementById('initMaxValue').value) || 100;
    
    setGameValues(initMin, initMax);
    $('#initialModal').modal('hide');
    document.getElementById('gameContainer').style.display = 'block';
    document.getElementById('settingsMin').value = minValue;
    document.getElementById('settingsMax').value = maxValue;
});
document.getElementById('btnRetry').addEventListener('click', function() {
    $('#settingsCollapse').collapse('show');
    document.getElementById('settingsMin').value = minValue;
    document.getElementById('settingsMax').value = maxValue;
});

document.getElementById('applySettings').addEventListener('click', function() {
    const settingsMin = parseInt(document.getElementById('settingsMin').value) || 0;
    const settingsMax = parseInt(document.getElementById('settingsMax').value) || 100;
    
    setGameValues(settingsMin, settingsMax);
    $('#settingsCollapse').collapse('hide');
    document.getElementById('settingsError').style.display = 'none';
});

document.getElementById('btnOver').addEventListener('click', function() {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round(Math.random() * 2);
            let answerPhrase;
            switch (phraseRandom) {
                case 0:
                    answerPhrase = `Не нужно больше загадывать это число, оно неправильное!\n\u{1F914}`;
                    break;
                case 1:
                    answerPhrase = `Получается, что я сдаюсь..\n\u{1F92F}`;
                    break;
                case 2:
                    answerPhrase = `Мне кажется, или тут что-то не так...\n\u{1F928}`;
                    break;
                default:
                    answerPhrase = `Я сдаюсь..\n\u{1F92F}`;
            }
            answerField.innerText = answerPhrase;
            gameRun = false;
            showMessage('Кажется, что-то пошло не так. Давайте начнем заново!');
        } else {
            minValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            updateInterface();
        }
    }
});

document.getElementById('btnLess').addEventListener('click', function() {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round(Math.random() * 2);
            let answerPhrase;
            switch (phraseRandom) {
                case 0:
                    answerPhrase = `Не нужно больше загадывать это число, оно неправильное!\n\u{1F914}`;
                    break;
                case 1:
                    answerPhrase = `Получается, что я сдаюсь..\n\u{1F92F}`;
                    break;
                case 2:
                    answerPhrase = `Мне кажется, или тут что-то не так...\n\u{1F928}`;
                    break;
                default:
                    answerPhrase = `Я сдаюсь..\n\u{1F92F}`;
            }
            answerField.innerText = answerPhrase;
            gameRun = false;
            showMessage('Кажется, что-то пошло не так. Давайте начнем заново!');
        } else {
            maxValue = answerNumber - 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            updateInterface();
        }
    }
});

document.getElementById('btnEqual').addEventListener('click', function() {
    if (gameRun){
        const successRandom = Math.round(Math.random() * 2);
        let successPhrase;
        switch (successRandom) {
            case 0:
                successPhrase = `Я всегда угадываю, разве может быть иначе!\n\u{1F60E}`;
                break;
            case 1:
                successPhrase = `Естественно это было число ${formatNumber(answerNumber)}!\n\u{1F389}`;
                break;
            case 2:
                successPhrase = `Ура! Я угадал число ${formatNumber(answerNumber)}!\n\u{1F973} Еще будешь загадывать или с тебя хватит?`;
                break;
            default:
                successPhrase = `Я всегда угадываю!\n\u{1F60E}`;
        }
        
        answerField.innerText = successPhrase;
        gameRun = false;
        showMessage(`Ура! Я угадал ваше число ${formatNumber(answerNumber)} за ${orderNumber} попыток! Хотите сыграть еще?`);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    initialModal.modal('show');
    document.getElementById('gameContainer').style.display = 'none';
    updateInterface();
});