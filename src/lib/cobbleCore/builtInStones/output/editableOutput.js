import {
  StateVariable,
  UserDefinedStone
} from '@/lib/cobbleCore/classes/index.js'

export default new UserDefinedStone({
  name: 'editableOutput',
  role: 'output',
  state: [
    new StateVariable({
      name: 'someVariable',
      type: StateVariable.Types.number,
      value: 1,
      isInput: true,
      isOutput: false
    })
  ],
  startFunctionCode: `// editable stone
// feel free to change the start and update functions.`,
  updateFunctionCode: `// use p5 functions like this:
p5.ellipse(p5.random(100), p5.random(100), state.get('someVariable'), state.get('someVariable'));`
})
