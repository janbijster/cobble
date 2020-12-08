import { StateVariable, BuiltInStone } from '@/lib/cobbleCore/classes/index.js'

export default new BuiltInStone({
  name: 'randomizeVector2',
  role: 'process',
  state: [
    new StateVariable({
      name: 'input',
      type: StateVariable.Types.vector,
      value: [0, 0],
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'from',
      type: StateVariable.Types.vector,
      value: [-10, -10],
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'to',
      type: StateVariable.Types.vector,
      value: [10, 10],
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'output',
      type: StateVariable.Types.vector,
      value: [0, 0],
      isInput: false,
      isOutput: true
    })
  ],
  startFunction: () => {},
  updateFunction: ({ state, p5 }) => {
    state.set('output', [
      state.get('input', 0) +
        p5.random(state.get('from', 0), state.get('to', 0)),
      state.get('input', 1) +
        p5.random(state.get('from', 1), state.get('to', 1))
    ])
  }
})
