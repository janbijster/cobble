import { StateVariable, BuiltInStone } from '@/lib/cobbleCore/classes/index.js'

export default new BuiltInStone({
  name: 'oscillator',
  role: 'input',
  state: [
    new StateVariable({
      name: 'min',
      type: StateVariable.Types.number,
      value: 0,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'max',
      type: StateVariable.Types.number,
      value: 100,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'start',
      type: StateVariable.Types.number,
      value: 0,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'period',
      type: StateVariable.Types.number,
      value: 1,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'output',
      type: StateVariable.Types.number,
      value: 0,
      isInput: false,
      isOutput: true
    }),
    new StateVariable({
      name: 'count',
      type: StateVariable.Types.number,
      value: 0,
      isInput: false,
      isOutput: false
    })
  ],
  startFunction: ({ state }) => {
    state.set('count', state.get('start'))
  },
  updateFunction: ({ p5, state }) => {
    state.set('count', state.get('count') + p5.deltaTime / 1000)
    let wave =
      0.5 * (state.get('max') + state.get('min')) +
      0.5 *
        (state.get('max') - state.get('min')) *
        p5.sin(
          ((2 * Math.PI) / state.get('period')) * state.get('count') -
            0.5 * Math.PI
        )
    state.set('output', wave)
  }
})
