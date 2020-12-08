import { StateVariable, BuiltInStone } from '@/lib/cobbleCore/classes/index.js'

export default new BuiltInStone({
  name: 'randomNumber',
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
      name: 'output',
      type: StateVariable.Types.number,
      value: 0,
      isInput: false,
      isOutput: true
    })
  ],
  startFunction: () => {},
  updateFunction: ({ p5, state }) => {
    state.set('output', p5.random(state.get('min'), state.get('max')))
  }
})
