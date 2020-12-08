import { StateVariable, BuiltInStone } from '@/lib/cobbleCore/classes/index.js'

export default new BuiltInStone({
  name: 'transformNumber',
  role: 'process',
  state: [
    new StateVariable({
      name: 'input',
      type: StateVariable.Types.number,
      value: 0,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'multiply',
      type: StateVariable.Types.number,
      value: 1,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'add',
      type: StateVariable.Types.number,
      value: 0,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'output',
      type: StateVariable.Types.number,
      value: 0,
      isInput: false,
      isOutput: true
    })
  ],
  startFunction: () => {},
  updateFunction: ({ state }) => {
    state.set(
      'output',
      state.get('input') * state.get('multiply') + state.get('add')
    )
  }
})
