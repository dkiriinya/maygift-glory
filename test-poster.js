const { Cloudinary } = require('@cloudinary/url-gen');
const { fill } = require('@cloudinary/url-gen/actions/resize');
const { format, quality } = require('@cloudinary/url-gen/actions/delivery');

const cld = new Cloudinary({
  cloud: { cloudName: 'dm8lfxxwl' }
});

const videoId = 'maygift-glory/Travel Management/Travel_Management_and_coordination_hforsb';

const urlA = cld.video(videoId)
  .resize(fill().width(800).height(600))
  .delivery(quality('auto'))
  .delivery(format('jpg'))
  .toURL();

const urlB = cld.image(videoId)
  .resize(fill().width(800).height(600))
  .delivery(quality('auto'))
  .delivery(format('jpg'))
  .toURL();

console.log("URL A (video to jpg):", urlA);
console.log("URL B (image to jpg):", urlB);
