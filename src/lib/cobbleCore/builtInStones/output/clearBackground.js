import { StateVariable, BuiltInStone } from '@/lib/cobbleCore/classes/index.js'

export default new BuiltInStone({
  name: 'clearBackground',
  role: 'output',
  state: [
    new StateVariable({
      name: 'color-r',
      type: StateVariable.Types.number,
      value: 0,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'color-g',
      type: StateVariable.Types.number,
      value: 0,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'color-b',
      type: StateVariable.Types.number,
      value: 0,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'color-a',
      type: StateVariable.Types.number,
      value: 255,
      isInput: true,
      isOutput: false
    })
  ],
  startFunction: ({ p5, state }) => {
    p5.background(
      state.get('color-r'),
      state.get('color-g'),
      state.get('color-b'),
      state.get('color-a')
    )
  },
  updateFunction: ({ p5, state }) => {
    p5.background(
      state.get('color-r'),
      state.get('color-g'),
      state.get('color-b'),
      state.get('color-a')
    )
  }
})
