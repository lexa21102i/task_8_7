let minValue = parseInt(prompt('Минимальное знание числа для игры','0'));
let maxValue = parseInt(prompt('Максимальное знание числа для игры','100'));
alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
let answerNumber  = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${answerNumber }?`;

document.getElementById('btnRetry').addEventListener('click', function () {
    minValue = parseInt(prompt('Минимальное значение числа для игры', minValue || '0'));
    maxValue = parseInt(prompt('Максимальное значение числа для игры', maxValue || '100'));
    if (isNaN(minValue) || isNaN(maxValue) || minValue >= maxValue) {
        alert('Введены некорректные значения. Будут использованы значения по умолчанию: 0 и 100');
        minValue = 0;
        maxValue = 100;
}
    orderNumber = 1;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    gameRun = true;
    orderNumberField.innerText = orderNumber;
    const questionRandom = Math.round(Math.random() * 2);
    let questionPhrase;
    switch (questionRandom) {
        case 0:
            questionPhrase = `Думаю, вы загадали число ${answerNumber}?`;
            break;
        case 1:
            questionPhrase = `Да тут все понятно! Ты загадал ${answerNumber}?`;
            break;
        case 2:
            questionPhrase = `Я очень надеюсь, что это число ${answerNumber}?`;
            break;
        default:
            questionPhrase = `Вы загадали число ${answerNumber}?`;
    }
    answerField.innerText = questionPhrase;
    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
});

document.getElementById('btnOver').addEventListener('click', function () {
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
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const questionRandom = Math.round(Math.random() * 2);
            let questionPhrase;
            switch (questionRandom) {
                case 0:
                    questionPhrase = `Может быть это число ${answerNumber}?`;
                    break;
                case 1:
                    questionPhrase = `Да это легко! В следующий раз нормально загадывай и нормально будет. Ты загадал ${answerNumber}?`;
                    break;
                case 2:
                    questionPhrase = `Уверен, что это число ${answerNumber}?`;
                    break;
                default:
                    questionPhrase = `Вы загадали число ${answerNumber}?`;
            }
            
            answerField.innerText = questionPhrase;
        }
    }
});

document.getElementById('btnLess').addEventListener('click', function () {
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
        } else {
            maxValue = answerNumber - 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const questionRandom = Math.round(Math.random() * 2);
            let questionPhrase;
            switch (questionRandom) {
                case 0:
                    questionPhrase = `Может быть это число ${answerNumber}?`;
                    break;
                case 1:
                    questionPhrase = `Да это легко! В следующий раз нормально загадывай и нормально будет. Ты загадал ${answerNumber}?`;
                    break;
                case 2:
                    questionPhrase = `Уверен, что это число ${answerNumber}?`;
                    break;
                default:
                    questionPhrase = `Вы загадали число ${answerNumber}?`;
            }
            
            answerField.innerText = questionPhrase;
        }
    }
});

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        const successRandom = Math.round(Math.random() * 2);
        let successPhrase;
        switch (successRandom) {
            case 0:
                successPhrase = `Я всегда угадываю, разве может быть иначе!\n\u{1F60E}`;
                break;
            case 1:
                successPhrase = `Естественно это было число ${answerNumber}!\n\u{1F389}`;
                break;
            case 2:
                successPhrase = `Ура! Я угадал число ${answerNumber}!\n\u{1F973} Еще будешь загадывать или с тебя хватит?`;
                break;
            default:
                successPhrase = `Я всегда угадываю!\n\u{1F60E}`;
        }
        
        answerField.innerText = successPhrase;
        gameRun = false;
    }
});