const input = document.querySelector('input'); // Select your input field

if (document.activeElement === input) {
    console.log("The input is focused.");
    console.log(input);
} else {
    console.log("The input is not focused.");
}
