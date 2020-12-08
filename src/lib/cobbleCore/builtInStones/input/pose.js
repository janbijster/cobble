import { BuiltInStone, StateVariable } from '@/lib/cobbleCore/classes/index.js'

const partNames = [
  'nose',
  'leftEye',
  'rightEye',
  'leftEar',
  'rightEar',
  'leftShoulder',
  'rightShoulder',
  'leftElbow',
  'rightElbow',
  'leftWrist',
  'rightWrist',
  'leftHip',
  'rightHip',
  'leftKnee',
  'rightKnee',
  'leftAnkle',
  'rightAnkle'
]

export default new BuiltInStone({
  name: 'pose',
  role: 'input',
  state: partNames.reduce(
    (variables, partName) => [
      ...variables,
      new StateVariable({
        name: `${partName}-x`,
        type: StateVariable.Types.number,
        value: 0,
        isInput: false,
        isOutput: true
      }),
      new StateVariable({
        name: `${partName}-y`,
        type: StateVariable.Types.number,
        value: 0,
        isInput: false,
        isOutput: true
      })
    ],
    []
  ),
  startFunction: ({ state, p5, ml5, instanceId }) => {
    let webCamVideo = p5.createCapture(p5.VIDEO)
    webCamVideo.size(p5.width, p5.height)
    let poseNet = ml5.poseNet(webCamVideo, 'single', () => {
      console.log('model loaded')
    })
    poseNet.on('pose', results => {
      if (results.length > 0) {
        results[0].pose.keypoints.forEach(keypoint => {
          state.setOnAddress(
            instanceId,
            `${keypoint.part}-x`,
            p5.width - keypoint.position.x
          )
          state.setOnAddress(
            instanceId,
            `${keypoint.part}-y`,
            keypoint.position.y
          )
        })
      }
    })
    webCamVideo.hide()
  },
  updateFunction: () => {},
  onlyOne: true
})
