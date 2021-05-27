import Controller from './src/Controller.js'
import DOMDisplay from './src/DOMDisplay.js'

import GAME_LEVELS from './src/data/levels.js'

Controller.runGame({ plans: GAME_LEVELS, Display: DOMDisplay })