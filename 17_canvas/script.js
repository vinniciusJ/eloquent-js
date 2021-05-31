import Controller from './src/Controller.js'
import DOMDisplay from './src/DOMDisplay.js'

import GAME_LEVELS from './src/data/levels.js'
import CanvasDisplay from './src/CanvasDisplay.js'

Controller.runGame({ plans: GAME_LEVELS, Display: CanvasDisplay })