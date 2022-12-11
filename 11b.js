const input = `Monkey 0:
Starting items: 65, 78
Operation: new = old * 3
Test: divisible by 5
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 78, 86, 79, 73, 64, 85, 88
Operation: new = old + 8
Test: divisible by 11
  If true: throw to monkey 4
  If false: throw to monkey 7

Monkey 2:
Starting items: 69, 97, 77, 88, 87
Operation: new = old + 2
Test: divisible by 2
  If true: throw to monkey 5
  If false: throw to monkey 3

Monkey 3:
Starting items: 99
Operation: new = old + 4
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 5

Monkey 4:
Starting items: 60, 57, 52
Operation: new = old * 19
Test: divisible by 7
  If true: throw to monkey 7
  If false: throw to monkey 6

Monkey 5:
Starting items: 91, 82, 85, 73, 84, 53
Operation: new = old + 5
Test: divisible by 3
  If true: throw to monkey 4
  If false: throw to monkey 1

Monkey 6:
Starting items: 88, 74, 68, 56
Operation: new = old * old
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 2

Monkey 7:
Starting items: 54, 82, 72, 71, 53, 99, 67
Operation: new = old + 1
Test: divisible by 19
  If true: throw to monkey 6
  If false: throw to monkey 0`

const monkeys = input.split('\n\n').map((monkey_str) => {
  const [name, items, operation, test, condition1, condition2] = monkey_str.split('\n')
  const monkey_id = name.split(' ')[1].charAt(0)
  const starting_items = items.split(': ')[1].split(',').map((str) => BigInt(parseInt(str)))

  const operation_fn = (num) => {
    if(operation.includes('*')) {
      const [x, y] = operation.split(' = ')[1].split(' * ')
      const a = x === 'old' ? num : BigInt(x)
      const b = y === 'old' ? num : BigInt(y)
      return (a * b) % 9699690n // got this number by manually multiplying all the prime `divisible by` from the input.
    }
    
    if(operation.includes('+')) {
      const [x, y] = operation.split(' = ')[1].split(' + ')
      const a = x === 'old' ? num : BigInt(x)
      const b = y === 'old' ? num : BigInt(y)
      return (a + b) % 9699690n
    }
    
  }

  const test_fn = (num) => {
    const divisor = BigInt(test.split('divisible by ')[1])
    if(num % divisor === 0n) {
      return condition1.split('throw to monkey ')[1]
    }
    return condition2.split('throw to monkey ')[1]
  }

  return {
    id: monkey_id,
    items: starting_items,
    operation_fn: operation_fn,
    test_fn: test_fn,
    inspections: 0
  }
})


const MAX_ROUNDS = 10000

// ROUNDS
for(let i = 0; i < MAX_ROUNDS; i++){
  monkeys.forEach(monkey => {
    const { items, operation_fn, test_fn } = monkey
    items.forEach(item => {
      const new_item = operation_fn(item)
      const next_monkey = test_fn(new_item)
      monkeys[next_monkey].items.push(new_item)
    })
    monkey.inspections += monkey.items.length
    monkey.items = []
  })
}

// sort monkeys by inspection count
monkeys.sort((a, b) => b.inspections - a.inspections)
console.log(monkeys[0].inspections * monkeys[1].inspections )
