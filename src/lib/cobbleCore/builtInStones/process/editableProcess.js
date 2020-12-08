import {
  StateVariable,
  UserDefinedStone
} from '@/lib/cobbleCore/classes/index.js'

export default new UserDefinedStone({
  name: 'editableProcess',
  role: 'process',
  state: [
    new StateVariable({
      name: 'input',
      type: StateVariable.Types.number,
      value: 1,
      isInput: true,
      isOutput: false
    }),
    new StateVariable({
      name: 'output',
      type: StateVariable.Types.number,
      value: 1,
      isInput: false,
      isOutput: true
    }),
    new StateVariable({
      name: 'parameter',
      type: StateVariable.Types.number,
      value: 1,
      isInput: true,
      isOutput: false
    })
  ],
  startFunctionCode: ``,
  updateFunctionCode: `// Use process stones to modify variables. Example:
state.set('output', state.get('input') + p5.random(-state.get('parameter'), state.get('parameter')));`
})
