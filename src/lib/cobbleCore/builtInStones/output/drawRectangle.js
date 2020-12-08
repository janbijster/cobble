import { StateVariable, BuiltInStone } from '@/lib/cobbleCore/classes/index.js'

export default new BuiltInStone({
  name: 'drawRectangle',
  role: 'output',
  state: [
    new StateVariable({
      name: 'x',
      type: StateVariable.Types.number,
      value: 100,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'y',
      type: StateVariable.Types.number,
      value: 100,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'size',
      type: StateVariable.Types.number,
      value: 30,
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
    })
  ],
  startFunction: () => {},
  updateFunction: ({ p5, state }) => {
    p5.noStroke()
    p5.fill(
      p5.color(
        state.get('color-r'),
        state.get('color-g'),
        state.get('color-b'),
        state.get('color-a')
      )
    )
    p5.rectMode(p5.CENTER)
    p5.rect(
      state.get('x'),
      state.get('y'),
      state.get('size'),
      state.get('size')
    )
  }
})
