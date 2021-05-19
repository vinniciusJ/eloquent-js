import Level from './src/Level.js'

const simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`

const simpleLevel = new Level({ plan: simpleLevelPlan })

console.log(`${simpleLevel.width} by ${simpleLevel.height}`);