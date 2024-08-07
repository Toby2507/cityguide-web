const clamp = (val: number) => Math.min(255, Math.max(0, val));

const convolve = (imageData: ImageData, kernel: number[]): ImageData => {
  const { width, height, data } = imageData;
  const output = new ImageData(width, height);
  const kSize = Math.sqrt(kernel.length);
  const kHalfSize = Math.floor(kSize / 2);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0,
        g = 0,
        b = 0;
      for (let ky = 0; ky < kSize; ky++) {
        for (let kx = 0; kx < kSize; kx++) {
          const px = Math.min(width - 1, Math.max(0, x + kx - kHalfSize));
          const py = Math.min(height - 1, Math.max(0, y + ky - kHalfSize));
          const i = (py * width + px) * 4;
          const weight = kernel[ky * kSize + kx];
          r += data[i] * weight;
          g += data[i + 1] * weight;
          b += data[i + 2] * weight;
        }
      }
      const i = (y * width + x) * 4;
      output.data[i] = clamp(r);
      output.data[i + 1] = clamp(g);
      output.data[i + 2] = clamp(b);
      output.data[i + 3] = data[i + 3]; // Keep original alpha
    }
  }

  return output;
};

// Separable convolution function
const separableConvolve = (imageData: ImageData, weightsX: Float32Array, weightsY: Float32Array): ImageData => {
  const { width, height } = imageData;
  let temp = new ImageData(width, height);
  const output = new ImageData(width, height);

  // Horizontal pass
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0,
        g = 0,
        b = 0;
      for (let i = 0; i < weightsX.length; i++) {
        const px = Math.min(width - 1, Math.max(0, x + i - Math.floor(weightsX.length / 2)));
        const idx = (y * width + px) * 4;
        const weight = weightsX[i];
        r += imageData.data[idx] * weight;
        g += imageData.data[idx + 1] * weight;
        b += imageData.data[idx + 2] * weight;
      }
      const i = (y * width + x) * 4;
      temp.data[i] = clamp(r);
      temp.data[i + 1] = clamp(g);
      temp.data[i + 2] = clamp(b);
      temp.data[i + 3] = imageData.data[i + 3]; // Keep original alpha
    }
  }

  // Vertical pass
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0,
        g = 0,
        b = 0;
      for (let i = 0; i < weightsY.length; i++) {
        const py = Math.min(height - 1, Math.max(0, y + i - Math.floor(weightsY.length / 2)));
        const idx = (py * width + x) * 4;
        const weight = weightsY[i];
        r += temp.data[idx] * weight;
        g += temp.data[idx + 1] * weight;
        b += temp.data[idx + 2] * weight;
      }
      const i = (y * width + x) * 4;
      output.data[i] = clamp(r);
      output.data[i + 1] = clamp(g);
      output.data[i + 2] = clamp(b);
      output.data[i + 3] = temp.data[i + 3]; // Keep original alpha
    }
  }

  return output;
};

// Converting the image from RGB to GreyScale
const greyScale = (pixels: ImageData): ImageData => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const output = ctx!.createImageData(pixels.width, pixels.height);
  const dst = output.data;
  const d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];
    // CIE luminance for the RGB
    const v = 0.299 * r + 0.587 * g + 0.114 * b;
    dst[i] = v;
    dst[i + 1] = v;
    dst[i + 2] = v;
  }
  return output;
};

// Reducing image data
const reducedPixels = (imageData: ImageData): Uint8ClampedArray[] => {
  const { data: pixels, width } = imageData;
  const rowLen = width * 4;
  let i;
  let x;
  let y;
  let row;
  const rows = [];

  for (y = 0; y < pixels.length; y += rowLen) {
    row = new Uint8ClampedArray(imageData.width);
    x = 0;
    for (i = y; i < y + rowLen; i += 4) {
      row[x] = pixels[i];
      x += 1;
    }
    rows.push(row);
  }
  return rows;
};

// Gaussian blur is applied to reduce high-frequency noise
const gaussianBlur = (pixels: ImageData, diameter: number): ImageData => {
  diameter = Math.abs(diameter);
  if (diameter <= 1) return pixels;
  const radius = diameter / 2;
  const len = Math.ceil(diameter) + (1 - (Math.ceil(diameter) % 2));
  const weights = new Float32Array(len);
  const rho = (radius + 0.5) / 3;
  const gaussianFactor = 1 / Math.sqrt(2 * Math.PI * rho * rho);
  const rhoFactor = -1 / (2 * rho * rho);
  let wsum = 0;
  const middle = Math.floor(len / 2);
  for (let i = 0; i < len; i++) {
    const x = i - middle;
    const gx = gaussianFactor * Math.exp(x * x * rhoFactor);
    weights[i] = gx;
    wsum += gx;
  }
  for (let i = 0; i < weights.length; i++) {
    weights[i] /= wsum;
  }
  return separableConvolve(pixels, weights, weights); // What is this supposed to do? and how do I make my own implementation, it doesn't seem to be native.
};

// Egde analysis
const detectBlur = (pixels: Uint8ClampedArray[]) => {
  const width = pixels[0].length;
  const height = pixels.length;
  const getMean = () => {
    let sum = 0;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        sum += pixels[i][j];
      }
    }
    return sum / (width * height);
  };
  const getVariance = (mean: number) => {
    let sum = 0;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const normalized = pixels[i][j] - mean;
        sum += normalized * normalized;
      }
    }
    return sum / (width * height);
  };
  return getVariance(getMean());
};

// Egde Density Analysis using sobel operators
const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
const sobelY = [1, 2, 1, 0, 0, 0, -1, -2, -1];

const edgeDensity = (pixels: Uint8ClampedArray[]) => {
  const width = pixels[0].length;
  const height = pixels.length;
  let edgeCount = 0;

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let gx = 0;
      let gy = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          const px = pixels[y + i][x + j];
          gx += px * sobelX[i + 1 + (j + 1) * 3];
          gy += px * sobelY[i + 1 + (j + 1) * 3];
        }
      }
      const magnitude = Math.sqrt(gx * gx + gy * gy);
      if (magnitude > 0.5 * 255) edgeCount++;
    }
  }

  return edgeCount / (width * height); // Normalize by image area
};

// Contrast analysis using the std of the pixel intensities
const contrastAnalysis = (pixels: Uint8ClampedArray[]) => {
  const width = pixels[0].length;
  const height = pixels.length;
  let sum = 0;
  let sumSquares = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const intensity = pixels[y][x];
      sum += intensity;
      sumSquares += intensity * intensity;
    }
  }

  const mean = sum / (width * height);
  const variance = sumSquares / (width * height) - mean * mean;
  return Math.sqrt(variance); // Standard deviation for contrast
};

// Brightness analysis using the average pixel intensity
const brightnessAnalysis = (pixels: Uint8ClampedArray[]) => {
  const width = pixels[0].length;
  const height = pixels.length;
  let sum = 0;

  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) sum += pixels[y][x];

  return sum / (width * height); // Average intensity for brightness
};

const BLUR_BEFORE_EDGE_DETECTION_DIAMETER = 3.0; // pixels
const LAPLACIAN_APERTURE = [0, 1, 0, 1, -4, 1, 0, 1, 0];

const prepareImage = (imageData: ImageData) => {
  const preBlurredImageData = gaussianBlur(imageData, BLUR_BEFORE_EDGE_DETECTION_DIAMETER);
  const greyScaled = greyScale(preBlurredImageData);
  return convolve(greyScaled, LAPLACIAN_APERTURE);
};
// export const measureBlur = (imageData: ImageData): number => detectBlur(reducedPixels(prepareImage(imageData)));

export const assessImgQuality = (imageData: ImageData) => {
  const pixels = reducedPixels(prepareImage(imageData));
  const blur = detectBlur(pixels);
  const density = edgeDensity(pixels);
  const contrast = contrastAnalysis(pixels);
  const brightness = brightnessAnalysis(pixels);
  return { blur, density, contrast, brightness };
};
