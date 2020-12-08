import {
  StateVariable,
  UserDefinedStone
} from '@/lib/cobbleCore/classes/index.js'

export default new UserDefinedStone({
  name: 'editableInput',
  role: 'input',
  state: [
    new StateVariable({
      name: 'someVariable',
      type: StateVariable.Types.number,
      value: 127,
      isInput: true,
      isOutput: true
    })
  ],
  startFunctionCode: ``,
  updateFunctionCode: `// for an input, you could use p5 functions to create inputs.
// Make sure you set it to a state variable so you can connect it.
// example:
if (p5.keyIsDown(p5.LEFT_ARROW())) {
  state.set('someVariable', 0);
} else if (p5.keyIsDown(p5.RIGHT_ARROW())) {
  state.set('someVariable', 255);
} else {
  state.set('someVariable', 127);
}`
})
