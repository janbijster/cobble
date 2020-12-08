import { StateVariable, BuiltInStone } from '@/lib/cobbleCore/classes/index.js'

export default new BuiltInStone({
  name: 'transformVector4',
  role: 'process',
  state: [
    new StateVariable({
      name: 'input',
      type: StateVariable.Types.vector,
      value: [0, 0, 0, 0],
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'multiply',
      type: StateVariable.Types.vector,
      value: [1, 1, 1, 1],
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'add',
      type: StateVariable.Types.vector,
      value: [0, 0, 0, 0],
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
  updateFunction: ({ state }) => {
    state.set('output', [
      state.get('input', 0) * state.get('multiply', 0) + state.get('add', 0),
      state.get('input', 1) * state.get('multiply', 1) + state.get('add', 1),
      state.get('input', 2) * state.get('multiply', 2) + state.get('add', 2),
      state.get('input', 3) * state.get('multiply', 3) + state.get('add', 3)
    ])
  }
})
