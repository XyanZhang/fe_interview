
// 对象可遍历
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}

function* lottery(max) {
  let count = 0;
  while (true) {
    count++;
    if (count > max) {
      break;
    }
    yield count;
  }
}

const lotteryDraw = lottery(5);
console.log(lotteryDraw.next().value); // 1
console.log(lotteryDraw.next().value); // 2
console.log(lotteryDraw.next().value); // 3
console.log(lotteryDraw.next().value); // 4
console.log(lotteryDraw.next().value); // 5
// console.log(lotteryDraw.next.log('step2 start'))

function* step2() {
  yield new Promise((resolve, reject) => {
    setTimeout(() => resolve('step2 done'), 2000);
  });
  console.log('step3 start');
}


function* controlFlow() {
  yield step2();
}

const flow = controlFlow();
flow.next().value; // 'step1 done'
flow.next().value; // 'step2 done'
flow.next().value; // 'step3 start'
flow.next().value; // undefined