// BUILT FOR OPTIMIZING CSS FILTER VALUES
interface SPSAProps {
  A: number;
  a: number[];
  c: number;
  values: number[];
  iters: number;
  loss: (params: number[]) => number;
}

export const spsa = (props: SPSAProps) => {
  const { A, a, c, values, iters, loss } = props;
  const alpha = 1;
  const gamma = 0.16666666666666666;

  let best = null;
  let bestLoss = Infinity;
  let deltas = new Array(6);
  let highArgs = new Array(6);
  let lowArgs = new Array(6);

  for(let k = 0; k < iters; k++) {
      let ck = c / Math.pow(k + 1, gamma);
      for(let i = 0; i < 6; i++) {
          deltas[i] = Math.random() > 0.5 ? 1 : -1;
          highArgs[i] = values[i] + ck * deltas[i];
          lowArgs[i]  = values[i] - ck * deltas[i];
      }

      let lossDiff = loss(highArgs) - loss(lowArgs);
      for(let i = 0; i < 6; i++) {
          let g = lossDiff / (2 * ck) * deltas[i];
          let ak = a[i] / Math.pow(A + k + 1, alpha);
          values[i] = fix(values[i] - ak * g, i);
      }

      let currentLoss = loss(values);
      if(currentLoss < bestLoss) { best = values.slice(0); bestLoss = currentLoss; }
  } return { values: best, loss: bestLoss };

  function fix(value, idx) {
      let max = 100;
      if(idx === 2 /* saturate */) { max = 7500; }
      else if(idx === 4 /* brightness */ || idx === 5 /* contrast */) { max = 200; }

      if(idx === 3 /* hue-rotate */) {
          if(value > max) { value = value % max; }
          else if(value < 0) { value = max + value % max; }
      } else if(value < 0) { value = 0; }
      else if(value > max) { value = max; }
      return value;
  }
}

// const result = spsa({
//   A: 1,
//   a: [1, 1, 1, 1, 1, 1],
//   c: 0.1,
//   values: [1, 1, 1, 1, 1, 1],
//   iters: 100,
//   loss: (params: number[]) => params[0] * params[1] + params[0] * params[2],
// });

// The SPSA function is being called with the following parameters:

// A: This is a fixed parameter that determines the learning rate of the algorithm. It is set to 1.

// a: This is an array of fixed parameters that also determines the learning rate of the algorithm. Each
// element of the array corresponds to a different variable in the optimization problem. In this case,
// all elements are set to 1.

// c: This is a fixed parameter that determines the perturbation size of the algorithm. It is set to 0.1.

// values: This is an array of initial values for the variables that are being optimized. In this case,
// all elements are set to 1.

// iters: This is the maximum number of iterations that the SPSA algorithm should run for. It is set to 100.

// loss: This is the objective function that the SPSA algorithm should minimize. In this case, the objective
// function is f(x) = x[0] * x[1] + x[0] * x[2].

// When the SPSA function is called with these parameters, it will run the SPSA algorithm for a maximum of 100
// iterations, starting with initial values [1, 1, 1, 1, 1, 1], and trying to minimize the objective
// function f(x) = x[0] * x[1] + x[0] * x[2]. The result of the optimization will be an object with two
// properties: values, which is an array of the optimized values, and loss, which is the value of the loss
// function at the optimized values.



// GENERIC SPSA MINIMIZATION
export function minimize(
  objective: (params: number[]) => number,
  params: number[],
  options: {
    perturbationSize: number;
    learningRate: number;
    maxIterations: number;
    convergenceThreshold: number;
  }
): number[] {
  const { perturbationSize, learningRate, maxIterations, convergenceThreshold } = options;

  for (let i = 0; i < maxIterations; i++) {
    // Choose a random perturbation direction
    const direction = Math.random() < 0.5 ? 1 : -1;

    // Perturb the parameters
    const perturbedParams = params.map((param) => param + perturbationSize * direction);

    // Compute the objective function value for the perturbed parameters
    const objectiveValue = objective(perturbedParams);

    // Compute the gradient estimate
    const gradientEstimate = (objectiveValue - objective(params)) / perturbationSize;

    // Update the parameters
    params = params.map((param, j) => param - learningRate * gradientEstimate);

    // Check for convergence
    if (Math.abs(gradientEstimate) < convergenceThreshold) {
      break;
    }
  }

  return params;
}

// const params = minimize(
//   (params: number[]) => params[0] * params[1] + params[0] * params[2],
//   [1, 1, 1],
//   { perturbationSize: 0.01, learningRate: 0.1, maxIterations: 100, convergenceThreshold: 1e-6 }
// );

// This would minimize the objective function f(x) = x[0] * x[1] + x[0] * x[2] using the SPSA
// algorithm, starting with initial parameters [1, 1, 1].