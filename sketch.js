  // Classifier Variable
  let classifier;
  // Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/Y4GjfvaDF/';

  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "";

  // Load the model first
  function preload() {
      classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  function setup() {
      createCanvas(375, 600);
      // 注意视频比例！
      video = createCapture(VIDEO);
      video.size(375, 540);
      video.hide();

      flippedVideo = ml5.flipImage(video);
      // 开始识别
      classifyVideo();
  }

  function draw() {
      background(0);
      // Draw the video
      image(flippedVideo, 0, 0);

      // Draw the label
      fill(0);
      textSize(16);
      textAlign(CENTER);
      text(label, width / 2, height - 4);
  }

  // Get a prediction for the current video frame
  function classifyVideo() {
      flippedVideo = ml5.flipImage(video)
      classifier.classify(flippedVideo, gotResult);
      flippedVideo.remove();

  }

  // When we get a result
  function gotResult(error, results) {
      // If there is an error
      if (error) {
          console.error(error);
          return;
      }
      // The results are in an array ordered by confidence.
      // console.log(results[0]);
      label = results[0].label;
      // Classify again!
      classifyVideo();

  }

  function clickEvent() {
      alert(JSON.stringify(label))
  }
