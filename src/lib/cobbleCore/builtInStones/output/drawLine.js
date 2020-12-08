import { StateVariable, BuiltInStone } from '@/lib/cobbleCore/classes/index.js'

export default new BuiltInStone({
  name: 'drawLine',
  role: 'output',
  state: [
    new StateVariable({
      name: 'start-x',
      type: StateVariable.Types.number,
      value: 100,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'start-y',
      type: StateVariable.Types.number,
      value: 100,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'end-x',
      type: StateVariable.Types.number,
      value: 300,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'end-y',
      type: StateVariable.Types.number,
      value: 200,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'color-r',
      type: StateVariable.Types.number,
      value: 255,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'color-g',
      type: StateVariable.Types.number,
      value: 255,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'color-b',
      type: StateVariable.Types.number,
      value: 255,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'color-a',
      type: StateVariable.Types.number,
      value: 255,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'thickness',
      type: StateVariable.Types.number,
      value: 2,
      isInput: true,
      isOutput: false
    })
  ],
  startFunction: () => {},
  updateFunction: ({ p5, state }) => {
    p5.stroke(
      state.get('color-r'),
      state.get('color-g'),
      state.get('color-b'),
      state.get('color-a')
    )
    p5.strokeWeight(state.get('thickness'))
    p5.line(
      state.get('start-x'),
      state.get('start-y'),
      state.get('end-x'),
      state.get('end-y')
    )
  }
})
