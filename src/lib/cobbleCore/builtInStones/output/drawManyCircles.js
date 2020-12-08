import { StateVariable, BuiltInStone } from '@/lib/cobbleCore/classes/index.js'

export default new BuiltInStone({
  name: 'drawManyCircles',
  role: 'output',
  state: [
    new StateVariable({
      name: 'amount',
      type: StateVariable.Types.number,
      value: 10,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'startPosition',
      type: StateVariable.Types.vector,
      value: [100, 100],
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'startSize',
      type: StateVariable.Types.vector,
      value: [30, 30],
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'startColor',
      type: StateVariable.Types.vector,
      value: [255, 255, 255, 255],
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'positionAdd',
      type: StateVariable.Types.vector,
      value: [5, 5],
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'sizeMultiply',
      type: StateVariable.Types.number,
      value: 1,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'colorMultiply',
      type: StateVariable.Types.vector,
      value: [0.9, 0.99, 1, 0.5],
      isInput: true,
      isOutput: false
    })
  ],
  startFunction: () => {},
  updateFunction: ({ p5, state }) => {
    p5.noStroke()
    let color = [
      state.get('startColor', 0),
      state.get('startColor', 1),
      state.get('startColor', 2),
      state.get('startColor', 3)
    ]
    let position = [
      state.get('startPosition', 0),
      state.get('startPosition', 1)
    ]
    let size = [state.get('startSize', 0), state.get('startSize', 1)]
    for (let i = 0; i < state.get('amount'); i++) {
      p5.fill(p5.color(...color))
      p5.ellipse(...position, ...size)

      color[0] *= state.get('colorMultiply', 0)
      color[1] *= state.get('colorMultiply', 1)
      color[2] *= state.get('colorMultiply', 2)
      color[3] *= state.get('colorMultiply', 3)

      position[0] += state.get('positionAdd', 0)
      position[1] += state.get('positionAdd', 1)

      size[0] *= state.get('sizeMultiply')
      size[1] *= state.get('sizeMultiply')
    }
  }
})
