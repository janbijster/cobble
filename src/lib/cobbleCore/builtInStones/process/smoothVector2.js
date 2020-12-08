import { StateVariable, BuiltInStone } from '@/lib/cobbleCore/classes/index.js'

export default new BuiltInStone({
  name: 'smoothVector2',
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
      name: 'smooth',
      type: StateVariable.Types.number,
      value: 0.2,
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
  updateFunction: ({ state }) => {
    let smooth = state.get('smooth')
    state.set('output', [
      smooth * state.get('output', 0) + (1 - smooth) * state.get('input', 0),
      smooth * state.get('output', 1) + (1 - smooth) * state.get('input', 1)
    ])
  }
})
