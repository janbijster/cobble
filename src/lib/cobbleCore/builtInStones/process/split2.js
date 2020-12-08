import { StateVariable, BuiltInStone } from '@/lib/cobbleCore/classes/index.js'

export default new BuiltInStone({
  name: 'split2',
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
      name: 'output1',
      type: StateVariable.Types.number,
      value: 0,
      isInput: false,
      isOutput: true
    }),
    new StateVariable({
      name: 'output2',
      type: StateVariable.Types.number,
      value: 0,
      isInput: false,
      isOutput: true
    })
  ],
  startFunction: () => {},
  updateFunction: ({ state }) => {
    state.set('output1', state.get('input', 0))
    state.set('output2', state.get('input', 1))
  }
})
