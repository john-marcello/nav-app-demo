function randomNumber() {
    const min = 10;
    const max = 25;
    const randomNumber = Math.random() * (max - min) + min;
    const roundedNumber = Math.round(randomNumber * 2) / 2;
    const formattedNumber = roundedNumber.toFixed(1);
    return formattedNumber;
}

export default randomNumber;