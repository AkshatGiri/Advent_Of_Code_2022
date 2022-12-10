const input = `noop
noop
addx 5
addx 31
addx -30
addx 2
addx 7
noop
noop
addx -4
addx 5
addx 6
noop
addx -1
addx 5
addx -1
addx 5
addx 1
noop
addx 5
noop
addx -1
addx -35
addx 3
noop
addx 2
addx 3
addx -2
addx 2
noop
addx 8
addx -3
addx 5
addx -17
addx 22
addx -2
addx 2
addx 5
addx -2
addx -26
addx 31
addx 2
addx 5
addx -40
addx 30
addx -27
addx 4
addx 2
addx 3
addx -3
addx 8
noop
noop
addx 2
addx 21
addx -15
addx -2
addx 2
noop
addx 15
addx -16
addx 8
noop
addx 3
addx 5
addx -38
noop
noop
noop
addx 5
addx -5
addx 6
addx 2
addx 7
noop
noop
addx 4
addx -3
noop
noop
addx 7
addx 2
addx 2
addx -1
noop
addx 3
addx 6
noop
addx 1
noop
noop
addx -38
noop
noop
addx 7
addx 3
noop
addx 2
addx -2
addx 7
addx -2
addx 5
addx 2
addx 5
addx -4
addx 2
addx 5
addx 2
addx -21
addx 9
addx 15
noop
addx 3
addx -38
addx 7
noop
noop
addx 18
addx -17
addx 4
noop
addx 1
addx 2
addx 5
addx 3
noop
noop
addx 14
addx -9
noop
noop
addx 4
addx 1
noop
addx 4
addx 3
noop
addx -8
noop`

const instructions = input.split('\n')

let xVals = []
let x = 1
nextCycle = (value = 0) => {
    x += value
    xVals.push(x)
}

instructions.forEach((instruction) => {
  const [operation, value_str] = instruction.split(' ')
  const value = parseInt(value_str)
  if(operation === 'addx'){
    nextCycle()
    nextCycle(value)    
  } else if(operation === 'noop'){
    nextCycle()
  }
})

console.log(`${xVals[18]} * 20 + ${xVals[58]} * 60 + ${xVals[98]} * 100 + ${xVals[138]} * 140 + ${xVals[178]} * 180 + ${xVals[218]} * 220`)
console.log(xVals[18] * 20 + xVals[58] * 60 + xVals[98] * 100 + xVals[138] * 140 + xVals[178] * 180 + xVals[218] * 220)
