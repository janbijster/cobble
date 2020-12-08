import { StateVariable, BuiltInStone } from '@/lib/cobbleCore/classes/index.js'

export default new BuiltInStone({
  name: 'randomVector4',
  role: 'input',
  state: [
    new StateVariable({
      name: 'from',
      type: StateVariable.Types.vector,
      value: [0, 0, 0, 0],
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'to',
      type: StateVariable.Types.vector,
      value: [255, 255, 255, 255],
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'output',
      type: StateVariable.Types.vector,
      value: [0, 0, 0, 0],
      isInput: false,
      isOutput: true
    })
  ],
  startFunction: () => {},
  updateFunction: ({ p5, state }) => {
    state.set('output', [
      p5.random(state.get('from', 0), state.get('to', 0)),
      p5.random(state.get('from', 1), state.get('to', 1)),
      p5.random(state.get('from', 2), state.get('to', 2)),
      p5.random(state.get('from', 3), state.get('to', 3))
    ])
  }
})
