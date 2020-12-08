import { StateVariable, BuiltInStone } from '@/lib/cobbleCore/classes/index.js'

export default new BuiltInStone({
  name: 'mousePosition',
  role: 'input',
  state: [
    new StateVariable({
      name: 'x',
      type: StateVariable.Types.number,
      value: 0,
      isInput: false,
      isOutput: true
    }),
    new StateVariable({
      name: 'y',
      type: StateVariable.Types.number,
      value: 0,
      isInput: false,
      isOutput: true
    })
  ],
  startFunction: () => {},
  updateFunction: ({ p5, state }) => {
    state.set('x', p5.mouseX)
    state.set('y', p5.mouseY)
  }
})
