let decimal = 10;

function decimalToBinary(decimal) {
  let binary = '';
  while(decimal > 0) {
    binary = (decimal % 2) + binary;
    decimal = Math.floor(decimal / 2);
  }
  return binary;
}

let val = decimalToBinary(11);
console.log(val);