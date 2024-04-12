export const FORWARD = 'forward'
export const LEFT = 'left'
export const RIGHT = 'right'

export const MOVE_SPEED = 0.2
export const ROTATE_SPEED = 0.02

export const ACTIONS = {
	[FORWARD]: {
		name: FORWARD,
		keys: [87, 38],
		isActive: false
	},
	[LEFT]: {
		name: LEFT,
		keys: [65, 37],
		isActive: false
	},
	[RIGHT]: {
		name: RIGHT,
		keys: [68, 39],
		isActive: false
	}
}

export const AVAILABLE_KEYS = Object.values(ACTIONS)
	.reduce((acc, { keys }) => [...acc, ...keys], [])
