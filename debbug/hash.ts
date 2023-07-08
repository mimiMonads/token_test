import verifier from "../components/tokens/verifier.ts";
import signer from "../components/tokens/signer.ts";
import digits from "../components/tokens/src/digits.ts";
const sign = await signer({ seed: "hello" })
const verify = await verifier({ seed: "hello" })
const check1 = sign("01234567" + "01234567" + "01234567" + "01234567" + "01234567" + "01234567" + "01234567" + "01234567")
const check = sign("01234567")
const rand = () => Math.floor(Math.random() * 255)
import jStat from 'npm:jstat'
const randArr = () => [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand()]


function chiSquaredTest(obj: Record<string, number>) {
  const totalValues = Object.values(obj).reduce((a, b) => a + b, 0);
  const expectedValue = totalValues / Object.keys(obj).length;
  let chiSquared = 0;

  for (let key in obj) {
    let observedValue = obj[key];
    chiSquared += Math.pow(observedValue - expectedValue, 2) / expectedValue;
  }

  return chiSquared;
}


const num = 64 * 1000


let arr = new Uint8Array(8);

function incrementArray(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    arr[i]++;
    // If the current cell is not 0, break the loop
    // If it is 0, it means it was 255 and has overflowed, so continue to the next cell
    if (arr[i] !== 0) {
      break;
    }
  }
}


const a = {
  1: 29,
  2: 24,
  3: 22,
  4: 19,
  5: 21,
  6: 18,
  7: 19,
  8: 20,
  9: 23,
  10: 18,
  11: 20,
  12: 23
}

console.log(chiSquaredTest(a))

const run = async () => {

  const digit = await digits(Date.now().toString() + 0)({ seed: Date.now().toString() + 'a' })
  const digit1 = await digits(Date.now().toString() + 1)({ seed: Date.now().toString() + 'b' })
  const digit2 = await digits(Date.now().toString() + 2)({ seed: Date.now().toString() + 'c' })
  const digit3 = await digits(Date.now().toString() + 3)({ seed: Date.now().toString() + 'd' })
  const digit4 = await digits(Date.now().toString() + 4)({ seed: Date.now().toString() + 'e' })
  const digit5 = await digits(Date.now().toString() + 5)({ seed: Date.now().toString() + 'f' })
  const digit6 = await digits(Date.now().toString() + 6)({ seed: Date.now().toString() + 'g' })
  const digit7 = await digits(Date.now().toString() + 7)({ seed: Date.now().toString() + 'h' })


  let obj = Object.fromEntries(
    Array.from({ length: 65 }, (_, i) => [i, 0])
  )

  let i = 0
  while (i++ !== num) {
    // verify(check)

    const arr = randArr()
    obj[digit(arr)]++
    obj[digit1(arr)]++
    obj[digit2(arr)]++
    obj[digit3(arr)]++
    obj[digit4(arr)]++
    obj[digit5(arr)]++
    obj[digit6(arr)]++
    obj[digit7(arr)]++
  }
  return obj
}

console.log(await run())

/**
  *
  *
await Deno.writeTextFile("./hello.txt",
  JSON.stringify(
    Object.fromEntries(
      Array.from(
        { length: 240 },
        (_, i) => [i, run()]
      )
    ))) */
