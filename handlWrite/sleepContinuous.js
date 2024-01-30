async function main() {
  for (let i = 0; i < 6; i++) {
    await sleep(1000)
    console.log(i);
  }
}

main()

function sleep(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, seconds);
  })
}