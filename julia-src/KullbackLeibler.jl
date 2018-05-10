#!/usr/bin/env julia
""" Kullback-Leibler divergence functions and klUCB utilities, in naive Julia code.

- How to use it? From Julia, it's easy:

```
    julia> using KullbackLeibler
    julia> KullbackLeibler.klBern(0.5, 0.5)
    0.0
    julia> KullbackLeibler.klBern(0.1, 0.9)
    1.757779...
    julia> KullbackLeibler.klBern(0.9, 0.1)  # And this KL is symmetric
    1.757779...
    julia> KullbackLeibler.klBern(0.4, 0.5)
    0.020135...
    julia> KullbackLeibler.klBern(0.01, 0.99)
    4.503217...
```

- Note: there is also a Python version, if you need.

- MIT Licensed, (C) 2018 Lilian Besson (Naereen)
  https://GitHub.com/Naereen/KullbackLeibler.jl

- Cf. https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence
- Reference: [Filippi, Cappé & Garivier - Allerton, 2011](https://arxiv.org/pdf/1004.5229.pdf) and [Garivier & Cappé, 2011](https://arxiv.org/pdf/1102.2490.pdf)
"""

__author__ = "Lilian Besson"
__version__ = "0.1"


# Name of module
module KullbackLeibler

# List of exported functions
export klBern, klBin, klPoisson, klExp, klGamma, klNegBin, klGauss, klucb, klucbBern, klucbGauss, klucbPoisson, klucbExp, klucbGamma


eps = 1e-15  #: Threshold value: everything in [0, 1] is truncated to [eps, 1 - eps]


# --- Simple Kullback-Leibler divergence for known distributions


doc"""
    function klBern(x, y)

Kullback-Leibler divergence for Bernoulli distributions. https://en.wikipedia.org/wiki/Bernoulli_distribution#Kullback.E2.80.93Leibler_divergence

$$\mathrm{KL}(\mathcal{B}(x), \mathcal{B}(y)) = x \log(\frac{x}{y}) + (1-x) \log(\frac{1-x}{1-y}).$$

```julia
    julia> klBern(0.5, 0.5)
    0.0
    julia> klBern(0.1, 0.9)
    1.757779...
    julia> klBern(0.9, 0.1)  # And this KL is symmetric
    1.757779...
    julia> klBern(0.4, 0.5)
    0.020135...
    julia> klBern(0.01, 0.99)
    4.503217...
```

- Special values:

```julia
    julia> klBern(0, 1)  # Should be +Inf, but 0 --> eps, 1 --> 1 - eps
    34.539575...
```
"""
function klBern(x, y)
    x = min(max(x, eps), 1 - eps)
    y = min(max(y, eps), 1 - eps)
    return x * log(x / y) + (1 - x) * log((1 - x) / (1 - y))
end


doc"""
    function klBin(x, y, n)

Kullback-Leibler divergence for Binomial distributions. https://math.stackexchange.com/questions/320399/kullback-leibner-divergence-of-binomial-distributions

- It is simply the n times `klBern` on x and y.

$$\mathrm{KL}(\mathrm{Bin}(x, n), \mathrm{Bin}(y, n)) = n \times \left(x \log(\frac{x}{y}) + (1-x) \log(\frac{1-x}{1-y}) \right).$$

- **Warning**: The two distributions must have the same parameter n, and x, y are p, q in (0, 1).

```julia
    julia> klBin(0.5, 0.5, 10)
    0.0
    julia> klBin(0.1, 0.9, 10)
    17.57779...
    julia> klBin(0.9, 0.1, 10)  # And this KL is symmetric
    17.57779...
    julia> klBin(0.4, 0.5, 10)
    0.20135...
    julia> klBin(0.01, 0.99, 10)
    45.03217...
```

- Special values:

```julia
    julia> klBin(0, 1, 10)  # Should be +Inf, but 0 --> eps, 1 --> 1 - eps
    345.39575...
```
"""
function klBin(x, y, n)
    x = min(max(x, eps), 1 - eps)
    y = min(max(y, eps), 1 - eps)
    return n * (x * log(x / y) + (1 - x) * log((1 - x) / (1 - y)))
end


doc"""
    function klPoisson(x, y)

Kullback-Leibler divergence for Poison distributions. https://en.wikipedia.org/wiki/Poisson_distribution#Kullback.E2.80.93Leibler_divergence

$$\mathrm{KL}(\mathrm{Poisson}(x), \mathrm{Poisson}(y)) = y - x + x \times \log(\frac{x}{y}).$$

```julia
    julia> klPoisson(3, 3)
    0.0
    julia> klPoisson(2, 1)
    0.386294...
    julia> klPoisson(1, 2)  # And this KL is non-symmetric
    0.306852...
    julia> klPoisson(3, 6)
    0.920558...
    julia> klPoisson(6, 8)
    0.273907...
```

- Special values:

```julia
    julia> klPoisson(1, 0)  # Should be +Inf, but 0 --> eps, 1 --> 1 - eps
    33.538776...
    julia> klPoisson(0, 0)
    0.0
```
"""
function klPoisson(x, y)
    x = max(x, eps)
    y = max(y, eps)
    return y - x + x * log(x / y)
end


doc"""
    function klExp(x, y)

Kullback-Leibler divergence for exponential distributions. https://en.wikipedia.org/wiki/Exponential_distribution#Kullback.E2.80.93Leibler_divergence

.. math::

    \mathrm{KL}(\mathrm{Exp}(x), \mathrm{Exp}(y)) = \begin{cases}
    \frac{x}{y} - 1 - \log(\frac{x}{y}) & \text{if} x > 0, y > 0\\
    +\infty & \text{otherwise}
    \end{cases}

```julia
    julia> klExp(3, 3)
    0.0
    julia> klExp(3, 6)
    0.193147...
    julia> klExp(1, 2)  # Only the proportion between x and y is used
    0.193147...
    julia> klExp(2, 1)  # And this KL is non-symmetric
    0.306852...
    julia> klExp(4, 2)  # Only the proportion between x and y is used
    0.306852...
    julia> klExp(6, 8)
    0.037682...
```

- x, y have to be positive:

```julia
    julia> klExp(-3, 2)
    Inf
    julia> klExp(3, -2)
    Inf
    julia> klExp(-3, -2)
    Inf
```
"""
function klExp(x, y)
    if (x <= 0) || (y <= 0)
        return Inf
    else
        x = max(x, eps)
        y = max(y, eps)
        return x / y - 1 - log(x / y)
    end
end


doc"""
    function klGamma(x, y, a=1)

Kullback-Leibler divergence for gamma distributions. https://en.wikipedia.org/wiki/Gamma_distribution#Kullback.E2.80.93Leibler_divergence

- It is simply the a times `klExp` on x and y.

.. math::

    \mathrm{KL}(\Gamma(x, a), \Gamma(y, a)) = \begin{cases}
    a \times \left( \frac{x}{y} - 1 - \log(\frac{x}{y}) \right) & \text{if} x > 0, y > 0\\
    +\infty & \text{otherwise}
    \end{cases}

- **Warning**: The two distributions must have the same parameter a.

```julia
    julia> klGamma(3, 3)
    0.0
    julia> klGamma(3, 6)
    0.193147...
    julia> klGamma(1, 2)  # Only the proportion between x and y is used
    0.193147...
    julia> klGamma(2, 1)  # And this KL is non-symmetric
    0.306852...
    julia> klGamma(4, 2)  # Only the proportion between x and y is used
    0.306852...
    julia> klGamma(6, 8)
    0.037682...
```

- x, y have to be positive:

```julia
    julia> klGamma(-3, 2)
    Inf
    julia> klGamma(3, -2)
    Inf
    julia> klGamma(-3, -2)
    Inf
```
"""
function klGamma(x, y, a=1)
    if (x <= 0) || (y <= 0)
        return Inf
    else
        x = max(x, eps)
        y = max(y, eps)
        return a * (x / y - 1 - log(x / y))
    end
end


doc"""
    function klNegBin(x, y, r=1)

Kullback-Leibler divergence for negative binomial distributions. https://en.wikipedia.org/wiki/Negative_binomial_distribution

$$\mathrm{KL}(\mathrm{NegBin}(x, r), \mathrm{NegBin}(y, r)) = r \times \log((r + x) / (r + y)) - x \times \log(y \times (r + x) / (x \times (r + y))).$$

- **Warning**: The two distributions must have the same parameter r.

```julia
    julia> klNegBin(0.5, 0.5)
    0.0
    julia> klNegBin(0.1, 0.9)
    -0.711611...
    julia> klNegBin(0.9, 0.1)  # And this KL is non-symmetric
    2.0321564...
    julia> klNegBin(0.4, 0.5)
    -0.130653...
    julia> klNegBin(0.01, 0.99)
    -0.717353...
```

- Special values:

```julia
    julia> klBern(0, 1)  # Should be +Inf, but 0 --> eps, 1 --> 1 - eps
    34.539575...
```

- With other values for `r`:

```julia
    julia> klNegBin(0.5, 0.5, r=2)
    0.0
    julia> klNegBin(0.1, 0.9, r=2)
    -0.832991...
    julia> klNegBin(0.1, 0.9, r=4)
    -0.914890...
    julia> klNegBin(0.9, 0.1, r=2)  # And this KL is non-symmetric
    2.3325528...
    julia> klNegBin(0.4, 0.5, r=2)
    -0.154572...
    julia> klNegBin(0.01, 0.99, r=2)
    -0.836257...
```
"""
function klNegBin(x, y, r=1)
    x = max(x, eps)
    y = max(y, eps)
    return r * log((r + x) / (r + y)) - x * log(y * (r + x) / (x * (r + y)))
end


doc"""
    function klGauss(x, y, sig2x=0.25, sig2y=0.25)

Kullback-Leibler divergence for Gaussian distributions of means ``x`` and ``y`` and variances ``sig2x`` and ``sig2y``, $\nu_1 = \mathcal{N}(x, \sigma_x^2)$ and $\nu_2 = \mathcal{N}(y, \sigma_x^2)$:

$$\mathrm{KL}(\nu_1, \nu_2) = \frac{(x - y)^2}{2 \sigma_y^2} + \frac{1}{2}\left( \frac{\sigma_x^2}{\sigma_y^2} - 1 \log\left(\frac{\sigma_x^2}{\sigma_y^2}\right) \right).$$

See https://en.wikipedia.org/wiki/Normal_distribution#Other_properties

- By default, sig2y is assumed to be sig2x (same variance).

```julia
    julia> klGauss(3, 3)
    0.0
    julia> klGauss(3, 6)
    18.0
    julia> klGauss(1, 2)
    2.0
    julia> klGauss(2, 1)  # And this KL is symmetric
    2.0
    julia> klGauss(4, 2)
    8.0
    julia> klGauss(6, 8)
    8.0
```

- x, y can be negative:

```julia
    julia> klGauss(-3, 2)
    50.0
    julia> klGauss(3, -2)
    50.0
    julia> klGauss(-3, -2)
    2.0
    julia> klGauss(3, 2)
    2.0
```

- With other values for `sig2x`:

```julia
    julia> klGauss(3, 3, sig2x=10)
    0.0
    julia> klGauss(3, 6, sig2x=10)
    0.45
    julia> klGauss(1, 2, sig2x=10)
    0.05
    julia> klGauss(2, 1, sig2x=10)  # And this KL is symmetric
    0.05
    julia> klGauss(4, 2, sig2x=10)
    0.2
    julia> klGauss(6, 8, sig2x=10)
    0.2
```

- With different values for `sig2x` and `sig2y`:

```julia
    julia> klGauss(0, 0, sig2x=0.25, sig2y=0.5)
    -0.0284...
    julia> klGauss(0, 0, sig2x=0.25, sig2y=1.0)
    0.2243...
    julia> klGauss(0, 0, sig2x=0.5, sig2y=0.25)  # not symmetric here!
    1.1534...

    julia> klGauss(0, 1, sig2x=0.25, sig2y=0.5)
    0.9715...
    julia> klGauss(0, 1, sig2x=0.25, sig2y=1.0)
    0.7243...
    julia> klGauss(0, 1, sig2x=0.5, sig2y=0.25)  # not symmetric here!
    3.1534...

    julia> klGauss(1, 0, sig2x=0.25, sig2y=0.5)
    0.9715...
    julia> klGauss(1, 0, sig2x=0.25, sig2y=1.0)
    0.7243...
    julia> klGauss(1, 0, sig2x=0.5, sig2y=0.25)  # not symmetric here!
    3.1534...
```

- **Warning:** Using :class:`Policies.klUCB` (and variants) with `klGauss` is equivalent to use :class:`Policies.UCB`, so prefer the simpler version.
"""
function klGauss(x, y, sig2x=0.25, sig2y=0.25)
    if - eps < (sig2y - sig2x) < eps
        return (x - y) ^ 2 / (2.0 * sig2x)
    else
        return (x - y) ^ 2 / (2.0 * sig2y) + 0.5 * ((sig2x/sig2y)^2 - 1 - log(sig2x/sig2y))
    end
end


# --- KL functions, for the KL-UCB policy

doc"""
    function klucb(x, d, kl, upperbound, lowerbound=-Inf, precision=1e-6, max_iterations=50)

The generic KL-UCB index computation.

- x: value of the cum reward,
- d: upper bound on the divergence,
- kl: the KL divergence to be used (`klBern`, `klGauss`, etc),
- upperbound, lowerbound=-Inf: the known bound of the values x,
- precision=1e-6: the threshold from where to stop the research,
- max_iterations: max number of iterations of the loop (safer to bound it to reduce time complexity).

- **Note**: It uses a **bisection search**, and one call to ``kl`` for each step of the bisection search.

For example, for `klucbBern`, the two steps are to first compute an upperbound (as precise as possible) and the compute the kl-UCB index:

```julia
    julia> x, d = 0.9, 0.2   # mean x, exploration term d
    julia> upperbound = min(1.0, klucbGauss(x, d, sig2x=0.25))  # variance 1/4 for [0,1] bounded distributions
    julia> upperbound
    1.0
    julia> klucb(x, d, klBern, upperbound, lowerbound=0, precision=1e-3, max_iterations=10)
    0.9941...
    julia> klucb(x, d, klBern, upperbound, lowerbound=0, precision=1e-6, max_iterations=10)
    0.994482...
    julia> klucb(x, d, klBern, upperbound, lowerbound=0, precision=1e-3, max_iterations=50)
    0.9941...
    julia> klucb(x, d, klBern, upperbound, lowerbound=0, precision=1e-6, max_iterations=100)  # more and more precise!
    0.994489...
```

- **Note**: See below for more examples for different KL divergence functions.
"""
function klucb(x, d, kl, upperbound, lowerbound=-Inf, precision=1e-6, max_iterations=50)
    value = max(x, lowerbound)
    u = upperbound
    _count_iteration = 0
    while (_count_iteration < max_iterations) && (u - value > precision)
        _count_iteration += 1
        m = (value + u) / 2.0
        if kl(x, m) > d
            u = m
        else
            value = m
        end
    end
    return (value + u) / 2.0
end


doc"""
    function klucbBern(x, d, precision=1e-6)

KL-UCB index computation for Bernoulli distributions, using `klucb`.

- Influence of x:

```julia
    julia> klucbBern(0.1, 0.2)
    0.378391...
    julia> klucbBern(0.5, 0.2)
    0.787088...
    julia> klucbBern(0.9, 0.2)
    0.994489...
```

- Influence of d:

```julia
    julia> klucbBern(0.1, 0.4)
    0.519475...
    julia> klucbBern(0.1, 0.9)
    0.734714...

    julia> klucbBern(0.5, 0.4)
    0.871035...
    julia> klucbBern(0.5, 0.9)
    0.956809...

    julia> klucbBern(0.9, 0.4)
    0.999285...
    julia> klucbBern(0.9, 0.9)
    0.999995...
```
"""
function klucbBern(x, d, precision=1e-6)
    upperbound = min(1.0, klucbGauss(x, d, sig2x=0.25))  # variance 1/4 for [0,1] bounded distributions
    # upperbound = min(1.0, klucbPoisson(x, d))  # also safe, and better ?
    return klucb(x, d, klBern, upperbound, precision)
end


doc"""
    function klucbGauss(x, d, sig2x=0.25, precision=0.0)

KL-UCB index computation for Gaussian distributions.

- **Note**: it does not require any search.

- **Warning**: it works only if the good variance constant is given.

- Influence of x:

```julia
    julia> klucbGauss(0.1, 0.2)
    0.416227...
    julia> klucbGauss(0.5, 0.2)
    0.816227...
    julia> klucbGauss(0.9, 0.2)
    1.216227...

- Influence of d:

```julia
    julia> klucbGauss(0.1, 0.4)
    0.547213...
    julia> klucbGauss(0.1, 0.9)
    0.770820...

    julia> klucbGauss(0.5, 0.4)
    0.947213...
    julia> klucbGauss(0.5, 0.9)
    1.170820...

    julia> klucbGauss(0.9, 0.4)
    1.347213...
    julia> klucbGauss(0.9, 0.9)
    1.570820...
```

- **Warning**: Using :class:`Policies.klUCB` (and variants) with `klucbGauss` is equivalent to use :class:`Policies.UCB`, so prefer the simpler version.
"""
function klucbGauss(x, d, sig2x=0.25, precision=0.0)
    return x + sqrt(2 * sig2x * d)
end


doc"""
    function klucbPoisson(x, d, precision=1e-6)

KL-UCB index computation for Poisson distributions, using `klucb`.

- Influence of x:

```julia
    julia> klucbPoisson(0.1, 0.2)
    0.450523...
    julia> klucbPoisson(0.5, 0.2)
    1.089376...
    julia> klucbPoisson(0.9, 0.2)
    1.640112...
```

- Influence of d:

```julia
    julia> klucbPoisson(0.1, 0.4)
    0.693684...
    julia> klucbPoisson(0.1, 0.9)
    1.252796...

    julia> klucbPoisson(0.5, 0.4)
    1.422933...
    julia> klucbPoisson(0.5, 0.9)
    2.122985...

    julia> klucbPoisson(0.9, 0.4)
    2.033691...
    julia> klucbPoisson(0.9, 0.9)
    2.831573...
```
"""
function klucbPoisson(x, d, precision=1e-6)
    upperbound = x + d + sqrt(d * d + 2 * x * d)  # looks safe, to check: left (Gaussian) tail of Poisson dev
    return klucb(x, d, klPoisson, upperbound, precision)
end


doc"""
    function klucbExp(x, d, precision=1e-6)

KL-UCB index computation for exponential distributions, using `klucb`.

- Influence of x:

```julia
    julia> klucbExp(0.1, 0.2)
    0.202741...
    julia> klucbExp(0.5, 0.2)
    1.013706...
    julia> klucbExp(0.9, 0.2)
    1.824671...
```

- Influence of d:

```julia
    julia> klucbExp(0.1, 0.4)
    0.285792...
    julia> klucbExp(0.1, 0.9)
    0.559088...

    julia> klucbExp(0.5, 0.4)
    1.428962...
    julia> klucbExp(0.5, 0.9)
    2.795442...

    julia> klucbExp(0.9, 0.4)
    2.572132...
    julia> klucbExp(0.9, 0.9)
    5.031795...
```
"""
function klucbExp(x, d, precision=1e-6)
    if d < 0.77
        # XXX where does this value come from?
        upperbound = x / (1 + 2.0 / 3 * d - sqrt(4.0 / 9 * d * d + 2 * d))
        # safe, klexp(x,y) >= e^2/(2*(1-2e/3)) if x=y(1-e)
    else
        upperbound = x * exp(d + 1)
    end
    if d > 1.61
        # XXX where does this value come from?
        lowerbound = x * exp(d)
    else
        lowerbound = x / (1 + d - sqrt(d * d + 2 * d))
    end
    return klucb(x, d, klGamma, upperbound, lowerbound, precision)
end


doc"""
    function klucbGamma(x, d, precision=1e-6)

KL-UCB index computation for Gamma distributions, using `klucb`.

- Influence of x:

```julia
    julia> klucbGamma(0.1, 0.2)
    0.202...
    julia> klucbGamma(0.5, 0.2)
    1.013...
    julia> klucbGamma(0.9, 0.2)
    1.824...
```

- Influence of d:

```julia
    julia> klucbGamma(0.1, 0.4)
    0.285...
    julia> klucbGamma(0.1, 0.9)
    0.559...

    julia> klucbGamma(0.5, 0.4)
    1.428...
    julia> klucbGamma(0.5, 0.9)
    2.795...

    julia> klucbGamma(0.9, 0.4)
    2.572...
    julia> klucbGamma(0.9, 0.9)
    5.031...
```
"""# FIXME this one is wrong!
function klucbGamma(x, d, precision=1e-6)
    if d < 0.77
        # XXX where does this value come from?
        upperbound = x / (1 + 2.0 / 3 * d - sqrt(4.0 / 9 * d * d + 2 * d))
        # safe, klexp(x,y) >= e^2/(2*(1-2e/3)) if x=y(1-e)
    else
        upperbound = x * exp(d + 1)
    end
    if d > 1.61
        # XXX where does this value come from
        lowerbound = x * exp(d)
    else
        lowerbound = x / (1 + d - sqrt(d * d + 2 * d))
    end
    # FIXME specify the value for a !
    return klucb(x, d, klGamma, max(upperbound, 1e2), min(-1e2, lowerbound), precision)
end

end

# --- Debugging

if "test" in ARGS
    # Code for debugging purposes.
    println("FIXME write these tests!")
    println("\nDone for tests of 'kullback_leibler.jl' ...")
end
