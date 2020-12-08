import { StateVariable, BuiltInStone } from '@/lib/cobbleCore/classes/index.js'

export default new BuiltInStone({
  name: 'screenSize',
  role: 'input',
  state: [
    new StateVariable({
      name: 'width',
      type: StateVariable.Types.number,
      value: 0,
      isInput: false,
      isOutput: true
    }),
    new StateVariable({
      name: 'height',
      type: StateVariable.Types.number,
      value: 0,
      isInput: false,
      isOutput: true
    }),
    new StateVariable({
      name: 'center-x',
      type: StateVariable.Types.number,
      value: 0,
      isInput: false,
      isOutput: true
    }),
    new StateVariable({
      name: 'center-y',
      type: StateVariable.Types.number,
      value: 0,
      isInput: false,
      isOutput: true
    })
  ],
  startFunction: () => {},
  updateFunction: ({ p5, state }) => {
    state.set('width', p5.width)
    state.set('height', p5.height)
    state.set('center-x', 0.5 * p5.width)
    state.set('center-y', 0.5 * p5.height)
  }
})
