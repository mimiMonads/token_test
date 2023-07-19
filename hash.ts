import digits from "https://deno.land/x/endofunctor/components/tokens/src/digits.ts";
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


let arr = new Uint8Array(8).fill(0);

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

const digit = await digits(Date.now().toString() + 0)({ seed: Date.now().toString() + 'a' })
const digit1 = await digits(Date.now().toString() + 1)({ seed: Date.now().toString() + 'b' })
const digit2 = await digits(Date.now().toString() + 2)({ seed: Date.now().toString() + 'c' })
const digit3 = await digits(Date.now().toString() + 3)({ seed: Date.now().toString() + 'd' })
const digit4 = await digits(Date.now().toString() + 4)({ seed: Date.now().toString() + 'e' })
const digit5 = await digits(Date.now().toString() + 5)({ seed: Date.now().toString() + 'f' })
const digit6 = await digits(Date.now().toString() + 6)({ seed: Date.now().toString() + 'g' })
const digit7 = await digits(Date.now().toString() + 7)({ seed: Date.now().toString() + 'h' })


const digit_1 = await digits(Date.now().toString() + 0)({ seed: Date.now().toString() + 'a', sequence: 1 })
const digit1_1 = await digits(Date.now().toString() + 1)({ seed: Date.now().toString() + 'b', sequence: 1 })
const digit2_1 = await digits(Date.now().toString() + 2)({ seed: Date.now().toString() + 'c', sequence: 1 })
const digit3_1 = await digits(Date.now().toString() + 3)({ seed: Date.now().toString() + 'd', sequence: 1 })
const digit4_1 = await digits(Date.now().toString() + 4)({ seed: Date.now().toString() + 'e', sequence: 1 })
const digit5_1 = await digits(Date.now().toString() + 5)({ seed: Date.now().toString() + 'f', sequence: 1 })
const digit6_1 = await digits(Date.now().toString() + 6)({ seed: Date.now().toString() + 'g', sequence: 1 })
const digit7_1 = await digits(Date.now().toString() + 7)({ seed: Date.now().toString() + 'h', sequence: 1 })

const sequence_4_digits = [digit7, digit6, digit5, digit4, digit3, digit2, digit1, digit]
const sequence_1_digits = [digit7_1, digit6_1, digit5_1, digit4_1, digit3_1, digit2_1, digit1_1, digit_1]

const run = (digitArr: { (arr: number[] | Uint8Array): number }[]) => (arr: number[] | Uint8Array) => (isRan: boolean) => {


  let obj = Object.fromEntries(
    Array.from({ length: 65 }, (_, i) => [i, 0])
  )

  let i = 0
  while (i++ !== num) {
    // verify(check)

    if (isRan) {
      arr = randArr()
    } else {
      incrementArray(arr)
    }
    obj[digitArr[0](arr)]++
    obj[digitArr[1](arr)]++
    obj[digitArr[2](arr)]++
    obj[digitArr[3](arr)]++
    obj[digitArr[4](arr)]++
    obj[digitArr[5](arr)]++
    obj[digitArr[6](arr)]++
    obj[digitArr[7](arr)]++
  }
  return chiSquaredTest(obj)
}



await Deno.writeTextFile("4_sequence_random.json",
  JSON.stringify(
    Object.fromEntries(
      Array.from(
        { length: 240 },
        (_, i) => [i, run(sequence_4_digits)(randArr())(true)]
      )
    )))
  ;

await Deno.writeTextFile("4_sequence_inSequence.json",
  JSON.stringify(
    Object.fromEntries(
      Array.from(
        { length: 240 },
        (_, i) => [i, run(sequence_4_digits)(arr)(false)]
      )
    )))
  ;


await Deno.writeTextFile("1_sequence_random.json",
  JSON.stringify(
    Object.fromEntries(
      Array.from(
        { length: 240 },
        (_, i) => [i, run(sequence_1_digits)(randArr())(true)]
      )
    )))
  ;

await Deno.writeTextFile("1_sequence_inSequence.json",
  JSON.stringify(
    Object.fromEntries(
      Array.from(
        { length: 240 },
        (_, i) => [i, run(sequence_1_digits)(arr)(false)]
      )
    )))
  ;

