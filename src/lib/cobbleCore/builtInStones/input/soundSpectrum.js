import { StateVariable, BuiltInStone } from '@/lib/cobbleCore/classes/index.js'

const numBins = Math.pow(2, 4)
const binNumbers = [...Array(numBins).keys()]

export default new BuiltInStone({
  name: 'soundSpectrum',
  role: 'input',
  state: [
    new StateVariable({
      name: 'peak',
      type: StateVariable.Types.number,
      value: 0,
      isInput: false,
      isOutput: true
    }),
    ...binNumbers.map(
      bin =>
        new StateVariable({
          name: `frequency${bin}`,
          type: StateVariable.Types.number,
          value: 0,
          isInput: false,
          isOutput: true
        })
    )
  ],
  startFunction: ({ p5Lib }) => {
    let mic = new p5Lib.AudioIn()
    mic.start()
    window.cobbleRun.fft = new p5Lib.FFT(0.8, numBins)
    window.cobbleRun.fft.setInput(mic)
  },
  updateFunction: ({ state }) => {
    let spectrum = window.cobbleRun.fft.analyze()
    let peak = 0
    let peakValue = -1
    binNumbers.forEach(bin => {
      state.set(`frequency${bin}`, spectrum[bin])
      if (spectrum[bin] > peakValue) {
        peakValue = spectrum[bin]
        peak = bin
      }
    })
    state.set('peak', peak)
  }
})
