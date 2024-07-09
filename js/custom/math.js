// Helper functions
const noise = () => {
  return Math.random() - 0.5;
}
const formatLabelRadian = (x) => {
  let n_pi_halves = parseInt(Math.round(x / (Math.PI / 2)));
  // 1/2 -> 1/2
  // ...
  if (n_pi_halves === 0) return '0';
  if ((n_pi_halves + 1) % 2) {
    // 2/2 -> 1
    return (x / Math.PI).toFixed(0) + ' π';
  } else {
    // return n_pi_halves + '/2 π';
    if (parseInt(n_pi_halves / 2) === 0) {
      return '½ π';
    } else {
      return parseInt(n_pi_halves / 2) + '½ π';
    }
  }
  const label = (+ 1) % 2;
  return label;
}

// Fourier space transformations
const getPowerSpectrum = (x) => {
  const n = x.length;
  const data = new fft.ComplexArray(n).map((value, i, n) => {
    value.real = x[i];
    value.imag = 0.0;
  });
  const fx = data.FFT();
  const spec = [...Array(n).keys()].map((i) =>
    Math.pow(fx.real[i], 2) + Math.pow(fx.imag[i], 2)
  );
  return spec;
}

const getAmplitudes = (x) => {
  const n = x.length;
  const data = new fft.ComplexArray(n).map((value, i, n) => {
    value.real = x[i];
    value.imag = 0.0;
  });
  const fx = data.FFT();
  const spec = [...Array(n).keys()].map((i) =>
    Math.sqrt(Math.pow(fx.real[i], 2) + Math.pow(fx.imag[i], 2))
  );
  return spec;
}

const getPhases = (x) => {
  const n = x.length;
  const data = new fft.ComplexArray(n).map((value, i, n) => {
    value.real = x[i];
    value.imag = 0.0;
  });
  const fx = data.FFT();
  const spec = [...Array(n).keys()].map((i) =>
    Math.atan2(fx.imag[i], fx.real[i])
  );
  return spec;
}

// Scales and constants
const n_default = 1024;

// Scales
const x_0_to_n = [...Array(n_default).keys()].map((i) => i);
const x_0_to_2pi = [...Array(n_default).keys()].map((i) => i * 2 * Math.PI / n_default);
const x_0_to_8pi = [...Array(n_default).keys()].map((i) => i * 8 * Math.PI / n_default);

// Sine waves
const sin_32_noisy = [...Array(n_default).keys()].map((i) => 
  Math.sin(i * 16 * 2 * Math.PI / n_default) + 0.03 * noise()
);
const sin_16 = [...Array(n_default).keys()].map((i) => 
  Math.sin(i * 16 * 2 * Math.PI / n_default)
);
const sin_32 = [...Array(n_default).keys()].map((i) => 
  Math.sin(i * 32 * 2 * Math.PI / n_default)
);
const sin_32_artifact = [...Array(n_default).keys()].map((i) => 
  Math.sin(i * 32.01 * 2 * Math.PI / n_default)
);
const sin_32_artifact_rot = [...Array(n_default).keys()].map((i) => 
  Math.sin((i + n_default/2)%n_default * 32.01 * 2 * Math.PI / n_default)
);
const sin_64 = [...Array(n_default).keys()].map((i) => 
  Math.sin(i * 64 * 2 * Math.PI / n_default)
);

const hann = [...Array(n_default).keys()].map((i) => 
  Math.pow(Math.sin(i * Math.PI / n_default), 2)
);

// Peaks and pulses
const delta_peak = [...Array(n_default).keys()].map((i) => 
  i == n_default / 2 ? 1.0 : 0.0
);
const delta_peak_noisy = [...Array(n_default).keys()].map((i) => 
  i == n_default / 2 ? 1.0 : 0.001 * noise()
);
const pulse_noisy = [...Array(n_default).keys()].map((i) =>
  (i >= n_default / 2 - n_default / 64) && (i <= n_default / 2 + n_default / 64) ? 1.0 : 0.001 * noise()
);

// Exponentials and Gauss
const exponential = [...Array(n_default).keys()].map((i) => 
  Math.exp(-10*i / n_default)
);
const gauss = [...Array(n_default).keys()].map((i) => 
  Math.exp(-1/2 * Math.pow((i - (n_default / 2)) / (n_default/30), 2))
);
