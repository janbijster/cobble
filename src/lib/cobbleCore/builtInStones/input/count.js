import { StateVariable, BuiltInStone } from '@/lib/cobbleCore/classes/index.js'

export default new BuiltInStone({
  name: 'count',
  role: 'input',
  state: [
    new StateVariable({
      name: 'start',
      type: StateVariable.Types.number,
      value: 0,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'speed',
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
    })
  ],
  startFunction: ({ state }) => {
    state.set('output', state.get('start'))
  },
  updateFunction: ({ state }) => {
    state.set('output', state.get('output') + state.get('speed'))
  }
})
