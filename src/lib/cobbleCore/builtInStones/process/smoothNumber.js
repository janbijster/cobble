import { StateVariable, BuiltInStone } from '@/lib/cobbleCore/classes/index.js'

export default new BuiltInStone({
  name: 'smoothNumber',
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
      name: 'smooth',
      type: StateVariable.Types.number,
      value: 0.9,
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
    let smooth = state.get('smooth')
    state.set(
      'output',
      smooth * state.get('output') + (1 - smooth) * state.get('input')
    )
  }
})
