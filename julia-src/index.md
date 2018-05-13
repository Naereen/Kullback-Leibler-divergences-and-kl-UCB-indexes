# Documentation

This repository contains a small, simple and efficient module, implementing various [Kullback-Leibler divergences](https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence) for parametric 1D continuous or discrete distributions.
For more information, see [the homepage on GitHub](https://github.com/Naereen/KullbackLeibler.jl/).

```@contents
```

---

## Index

```@index
```

## Kullback-Leibler divergences

- Generic interface for [`Distributions`](https://github.com/JuliaStats/Distributions.jl/) objects:
```@docs
KL(D1, D2)
```

- Specific functions:
```@docs
klBern(x, y)
```
```@docs
klBin(x, y, n)
```
```@docs
klPoisson(x, y)
```
```@docs
klExp(x, y)
```
```@docs
klGamma(x, y, a)
```
```@docs
klNegBin(x, y, r)
```
```@docs
klGauss(x, y, sig2x, sig2y)
```

## KL-UCB indexes functions

- Generic function:
```@docs
klucb(x, d, kl, upperbound, lowerbound, precision, max_iterations)
```

- Specific ones:
```@docs
klucbBern(x, d, precision)
```
```@docs
klucbGauss(x, d, sig2x, precision)
```
```@docs
klucbPoisson(x, d, precision)
```
```@docs
klucbExp(x, d, precision)
```
```@docs
klucbGamma(x, d, precision)
```
