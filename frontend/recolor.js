const { Jimp } = require('jimp');

async function recolor() {
  const image = await Jimp.read('src/assets/images/splash/logo.png');
  
  const targetR = 138;
  const targetG = 86;
  const targetB = 29;
  
  const baseR = 244; // Approx average red of the orange
  
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // Background is ~19,23,23. Flame is ~244,95,40.
    // If r > g + 10, it's definitely the flame/text or its anti-aliased edge.
    if (r > g + 5) {
      // It's the orange part
      // Calculate intensity based on how bright the red channel is compared to baseR
      // Since it's a flat color with some anti-aliasing to black, this linear scale works perfectly.
      const intensity = r / baseR;
      
      this.bitmap.data[idx + 0] = Math.min(255, targetR * intensity);
      this.bitmap.data[idx + 1] = Math.min(255, targetG * intensity);
      this.bitmap.data[idx + 2] = Math.min(255, targetB * intensity);
    }
  });

  await image.write('logo_recolored.png');
  console.log("Saved logo_recolored.png");
}
recolor().catch(console.error);
