var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Documentation",
    "title": "Documentation",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#Documentation-1",
    "page": "Documentation",
    "title": "Documentation",
    "category": "section",
    "text": ""
},

{
    "location": "index.html#KullbackLeibler.klBern-Tuple{Any,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klBern",
    "category": "Method",
    "text": "function klBern(x, y)\n\nKullback-Leibler divergence for Bernoulli distributions. https://en.wikipedia.org/wiki/Bernoulli_distribution#Kullback.E2.80.93Leibler_divergence\n\nmathrmKL(mathcalB(x) mathcalB(y)) = x log(fracxy) + (1-x) log(frac1-x1-y)\n\n    julia> klBern(0.5, 0.5)\n    0.0\n    julia> klBern(0.1, 0.9)\n    1.757779...\n    julia> klBern(0.9, 0.1)  # And this KL is symmetric\n    1.757779...\n    julia> klBern(0.4, 0.5)\n    0.020135...\n    julia> klBern(0.01, 0.99)\n    4.503217...\n\nSpecial values:\n\n    julia> klBern(0, 1)  # Should be +Inf, but 0 --> eps, 1 --> 1 - eps\n    34.539575...\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klBin-Tuple{Any,Any,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klBin",
    "category": "Method",
    "text": "function klBin(x, y, n)\n\nKullback-Leibler divergence for Binomial distributions. https://math.stackexchange.com/questions/320399/kullback-leibner-divergence-of-binomial-distributions\n\nIt is simply the n times klBern on x and y.\n\nmathrmKL(mathrmBin(x n) mathrmBin(y n)) = n times left(x log(fracxy) + (1-x) log(frac1-x1-y) right)\n\nWarning: The two distributions must have the same parameter n, and x, y are p, q in (0, 1).\n\n    julia> klBin(0.5, 0.5, 10)\n    0.0\n    julia> klBin(0.1, 0.9, 10)\n    17.57779...\n    julia> klBin(0.9, 0.1, 10)  # And this KL is symmetric\n    17.57779...\n    julia> klBin(0.4, 0.5, 10)\n    0.20135...\n    julia> klBin(0.01, 0.99, 10)\n    45.03217...\n\nSpecial values:\n\n    julia> klBin(0, 1, 10)  # Should be +Inf, but 0 --> eps, 1 --> 1 - eps\n    345.39575...\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klPoisson-Tuple{Any,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klPoisson",
    "category": "Method",
    "text": "function klPoisson(x, y)\n\nKullback-Leibler divergence for Poison distributions. https://en.wikipedia.org/wiki/Poisson_distribution#Kullback.E2.80.93Leibler_divergence\n\nmathrmKL(mathrmPoisson(x) mathrmPoisson(y)) = y - x + x times log(fracxy)\n\n    julia> klPoisson(3, 3)\n    0.0\n    julia> klPoisson(2, 1)\n    0.386294...\n    julia> klPoisson(1, 2)  # And this KL is non-symmetric\n    0.306852...\n    julia> klPoisson(3, 6)\n    0.920558...\n    julia> klPoisson(6, 8)\n    0.273907...\n\nSpecial values:\n\n    julia> klPoisson(1, 0)  # Should be +Inf, but 0 --> eps, 1 --> 1 - eps\n    33.538776...\n    julia> klPoisson(0, 0)\n    0.0\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klExp-Tuple{Any,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klExp",
    "category": "Method",
    "text": "function klExp(x, y)\n\nKullback-Leibler divergence for exponential distributions. https://en.wikipedia.org/wiki/Exponential_distribution#Kullback.E2.80.93Leibler_divergence\n\n.. math::\n\n\\mathrm{KL}(\\mathrm{Exp}(x), \\mathrm{Exp}(y)) = \\begin{cases}\n\\frac{x}{y} - 1 - \\log(\\frac{x}{y}) & \\text{if} x > 0, y > 0\\\\\n+\\infty & \\text{otherwise}\n\\end{cases}\n\n    julia> klExp(3, 3)\n    0.0\n    julia> klExp(3, 6)\n    0.193147...\n    julia> klExp(1, 2)  # Only the proportion between x and y is used\n    0.193147...\n    julia> klExp(2, 1)  # And this KL is non-symmetric\n    0.306852...\n    julia> klExp(4, 2)  # Only the proportion between x and y is used\n    0.306852...\n    julia> klExp(6, 8)\n    0.037682...\n\nx, y have to be positive:\n\n    julia> klExp(-3, 2)\n    Inf\n    julia> klExp(3, -2)\n    Inf\n    julia> klExp(-3, -2)\n    Inf\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klGamma-Tuple{Any,Any,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klGamma",
    "category": "Method",
    "text": "function klGamma(x, y, a=1)\n\nKullback-Leibler divergence for gamma distributions. https://en.wikipedia.org/wiki/Gamma_distribution#Kullback.E2.80.93Leibler_divergence\n\nIt is simply the a times klExp on x and y.\n\n.. math::\n\n\\mathrm{KL}(\\Gamma(x, a), \\Gamma(y, a)) = \\begin{cases}\na \\times \\left( \\frac{x}{y} - 1 - \\log(\\frac{x}{y}) \\right) & \\text{if} x > 0, y > 0\\\\\n+\\infty & \\text{otherwise}\n\\end{cases}\n\nWarning: The two distributions must have the same parameter a.\n\n    julia> klGamma(3, 3)\n    0.0\n    julia> klGamma(3, 6)\n    0.193147...\n    julia> klGamma(1, 2)  # Only the proportion between x and y is used\n    0.193147...\n    julia> klGamma(2, 1)  # And this KL is non-symmetric\n    0.306852...\n    julia> klGamma(4, 2)  # Only the proportion between x and y is used\n    0.306852...\n    julia> klGamma(6, 8)\n    0.037682...\n\nx, y have to be positive:\n\n    julia> klGamma(-3, 2)\n    Inf\n    julia> klGamma(3, -2)\n    Inf\n    julia> klGamma(-3, -2)\n    Inf\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klNegBin-Tuple{Any,Any,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klNegBin",
    "category": "Method",
    "text": "function klNegBin(x, y, r=1)\n\nKullback-Leibler divergence for negative binomial distributions. https://en.wikipedia.org/wiki/Negative_binomial_distribution\n\nmathrmKL(mathrmNegBin(x r) mathrmNegBin(y r)) = r times log((r + x)  (r + y)) - x times log(y times (r + x)  (x times (r + y)))\n\nWarning: The two distributions must have the same parameter r.\n\n    julia> klNegBin(0.5, 0.5)\n    0.0\n    julia> klNegBin(0.1, 0.9)\n    -0.711611...\n    julia> klNegBin(0.9, 0.1)  # And this KL is non-symmetric\n    2.0321564...\n    julia> klNegBin(0.4, 0.5)\n    -0.130653...\n    julia> klNegBin(0.01, 0.99)\n    -0.717353...\n\nSpecial values:\n\n    julia> klBern(0, 1)  # Should be +Inf, but 0 --> eps, 1 --> 1 - eps\n    34.539575...\n\nWith other values for r:\n\n    julia> klNegBin(0.5, 0.5, r=2)\n    0.0\n    julia> klNegBin(0.1, 0.9, r=2)\n    -0.832991...\n    julia> klNegBin(0.1, 0.9, r=4)\n    -0.914890...\n    julia> klNegBin(0.9, 0.1, r=2)  # And this KL is non-symmetric\n    2.3325528...\n    julia> klNegBin(0.4, 0.5, r=2)\n    -0.154572...\n    julia> klNegBin(0.01, 0.99, r=2)\n    -0.836257...\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klGauss-NTuple{4,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klGauss",
    "category": "Method",
    "text": "function klGauss(x, y, sig2x=0.25, sig2y=0.25)\n\nKullback-Leibler divergence for Gaussian distributions of means x and y and variances sig2x and sig2y, nu_1 = mathcalN(x sigma_x^2) and nu_2 = mathcalN(y sigma_x^2):\n\nmathrmKL(nu_1 nu_2) = frac(x - y)^22 sigma_y^2 + frac12left( fracsigma_x^2sigma_y^2 - 1 logleft(fracsigma_x^2sigma_y^2right) right)\n\nSee https://en.wikipedia.org/wiki/Normal_distribution#Other_properties\n\nBy default, sig2y is assumed to be sig2x (same variance).\n\n    julia> klGauss(3, 3)\n    0.0\n    julia> klGauss(3, 6)\n    18.0\n    julia> klGauss(1, 2)\n    2.0\n    julia> klGauss(2, 1)  # And this KL is symmetric\n    2.0\n    julia> klGauss(4, 2)\n    8.0\n    julia> klGauss(6, 8)\n    8.0\n\nx, y can be negative:\n\n    julia> klGauss(-3, 2)\n    50.0\n    julia> klGauss(3, -2)\n    50.0\n    julia> klGauss(-3, -2)\n    2.0\n    julia> klGauss(3, 2)\n    2.0\n\nWith other values for sig2x:\n\n    julia> klGauss(3, 3, sig2x=10)\n    0.0\n    julia> klGauss(3, 6, sig2x=10)\n    0.45\n    julia> klGauss(1, 2, sig2x=10)\n    0.05\n    julia> klGauss(2, 1, sig2x=10)  # And this KL is symmetric\n    0.05\n    julia> klGauss(4, 2, sig2x=10)\n    0.2\n    julia> klGauss(6, 8, sig2x=10)\n    0.2\n\nWith different values for sig2x and sig2y:\n\n    julia> klGauss(0, 0, sig2x=0.25, sig2y=0.5)\n    -0.0284...\n    julia> klGauss(0, 0, sig2x=0.25, sig2y=1.0)\n    0.2243...\n    julia> klGauss(0, 0, sig2x=0.5, sig2y=0.25)  # not symmetric here!\n    1.1534...\n\n    julia> klGauss(0, 1, sig2x=0.25, sig2y=0.5)\n    0.9715...\n    julia> klGauss(0, 1, sig2x=0.25, sig2y=1.0)\n    0.7243...\n    julia> klGauss(0, 1, sig2x=0.5, sig2y=0.25)  # not symmetric here!\n    3.1534...\n\n    julia> klGauss(1, 0, sig2x=0.25, sig2y=0.5)\n    0.9715...\n    julia> klGauss(1, 0, sig2x=0.25, sig2y=1.0)\n    0.7243...\n    julia> klGauss(1, 0, sig2x=0.5, sig2y=0.25)  # not symmetric here!\n    3.1534...\n\nWarning: Using :class:Policies.klUCB (and variants) with klGauss is equivalent to use :class:Policies.UCB, so prefer the simpler version.\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klucb-NTuple{7,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klucb",
    "category": "Method",
    "text": "function klucb(x, d, kl, upperbound, lowerbound=-Inf, precision=1e-6, max_iterations=50)\n\nThe generic KL-UCB index computation.\n\nx: value of the cum reward,\nd: upper bound on the divergence,\nkl: the KL divergence to be used (klBern, klGauss, etc),\nupperbound, lowerbound=-Inf: the known bound of the values x,\nprecision=1e-6: the threshold from where to stop the research,\nmax_iterations: max number of iterations of the loop (safer to bound it to reduce time complexity).\nNote: It uses a bisection search, and one call to kl for each step of the bisection search.\n\nFor example, for klucbBern, the two steps are to first compute an upperbound (as precise as possible) and the compute the kl-UCB index:\n\n    julia> x, d = 0.9, 0.2   # mean x, exploration term d\n    julia> upperbound = min(1.0, klucbGauss(x, d, sig2x=0.25))  # variance 1/4 for [0,1] bounded distributions\n    julia> upperbound\n    1.0\n    julia> klucb(x, d, klBern, upperbound, lowerbound=0, precision=1e-3, max_iterations=10)\n    0.9941...\n    julia> klucb(x, d, klBern, upperbound, lowerbound=0, precision=1e-6, max_iterations=10)\n    0.994482...\n    julia> klucb(x, d, klBern, upperbound, lowerbound=0, precision=1e-3, max_iterations=50)\n    0.9941...\n    julia> klucb(x, d, klBern, upperbound, lowerbound=0, precision=1e-6, max_iterations=100)  # more and more precise!\n    0.994489...\n\nNote: See below for more examples for different KL divergence functions.\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klucbBern-Tuple{Any,Any,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klucbBern",
    "category": "Method",
    "text": "function klucbBern(x, d, precision=1e-6)\n\nKL-UCB index computation for Bernoulli distributions, using klucb.\n\nInfluence of x:\n\n    julia> klucbBern(0.1, 0.2)\n    0.378391...\n    julia> klucbBern(0.5, 0.2)\n    0.787088...\n    julia> klucbBern(0.9, 0.2)\n    0.994489...\n\nInfluence of d:\n\n    julia> klucbBern(0.1, 0.4)\n    0.519475...\n    julia> klucbBern(0.1, 0.9)\n    0.734714...\n\n    julia> klucbBern(0.5, 0.4)\n    0.871035...\n    julia> klucbBern(0.5, 0.9)\n    0.956809...\n\n    julia> klucbBern(0.9, 0.4)\n    0.999285...\n    julia> klucbBern(0.9, 0.9)\n    0.999995...\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klucbGauss-NTuple{4,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klucbGauss",
    "category": "Method",
    "text": "function klucbGauss(x, d, sig2x=0.25, precision=0.0)\n\nKL-UCB index computation for Gaussian distributions.\n\nNote: it does not require any search.\nWarning: it works only if the good variance constant is given.\nInfluence of x:\n\n    julia> klucbGauss(0.1, 0.2)\n    0.416227...\n    julia> klucbGauss(0.5, 0.2)\n    0.816227...\n    julia> klucbGauss(0.9, 0.2)\n    1.216227...\n\n- Influence of d:\n\n\njulia     julia> klucbGauss(0.1, 0.4)     0.547213...     julia> klucbGauss(0.1, 0.9)     0.770820...\n\njulia> klucbGauss(0.5, 0.4)\n0.947213...\njulia> klucbGauss(0.5, 0.9)\n1.170820...\n\njulia> klucbGauss(0.9, 0.4)\n1.347213...\njulia> klucbGauss(0.9, 0.9)\n1.570820...\n\n```\n\nWarning: Using :class:Policies.klUCB (and variants) with klucbGauss is equivalent to use :class:Policies.UCB, so prefer the simpler version.\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klucbPoisson-Tuple{Any,Any,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klucbPoisson",
    "category": "Method",
    "text": "function klucbPoisson(x, d, precision=1e-6)\n\nKL-UCB index computation for Poisson distributions, using klucb.\n\nInfluence of x:\n\n    julia> klucbPoisson(0.1, 0.2)\n    0.450523...\n    julia> klucbPoisson(0.5, 0.2)\n    1.089376...\n    julia> klucbPoisson(0.9, 0.2)\n    1.640112...\n\nInfluence of d:\n\n    julia> klucbPoisson(0.1, 0.4)\n    0.693684...\n    julia> klucbPoisson(0.1, 0.9)\n    1.252796...\n\n    julia> klucbPoisson(0.5, 0.4)\n    1.422933...\n    julia> klucbPoisson(0.5, 0.9)\n    2.122985...\n\n    julia> klucbPoisson(0.9, 0.4)\n    2.033691...\n    julia> klucbPoisson(0.9, 0.9)\n    2.831573...\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klucbExp-Tuple{Any,Any,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klucbExp",
    "category": "Method",
    "text": "function klucbExp(x, d, precision=1e-6)\n\nKL-UCB index computation for exponential distributions, using klucb.\n\nInfluence of x:\n\n    julia> klucbExp(0.1, 0.2)\n    0.202741...\n    julia> klucbExp(0.5, 0.2)\n    1.013706...\n    julia> klucbExp(0.9, 0.2)\n    1.824671...\n\nInfluence of d:\n\n    julia> klucbExp(0.1, 0.4)\n    0.285792...\n    julia> klucbExp(0.1, 0.9)\n    0.559088...\n\n    julia> klucbExp(0.5, 0.4)\n    1.428962...\n    julia> klucbExp(0.5, 0.9)\n    2.795442...\n\n    julia> klucbExp(0.9, 0.4)\n    2.572132...\n    julia> klucbExp(0.9, 0.9)\n    5.031795...\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klucbGamma-Tuple{Any,Any,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klucbGamma",
    "category": "Method",
    "text": "function klucbGamma(x, d, precision=1e-6)\n\nKL-UCB index computation for Gamma distributions, using klucb.\n\nInfluence of x:\n\n    julia> klucbGamma(0.1, 0.2)\n    0.202...\n    julia> klucbGamma(0.5, 0.2)\n    1.013...\n    julia> klucbGamma(0.9, 0.2)\n    1.824...\n\nInfluence of d:\n\n    julia> klucbGamma(0.1, 0.4)\n    0.285...\n    julia> klucbGamma(0.1, 0.9)\n    0.559...\n\n    julia> klucbGamma(0.5, 0.4)\n    1.428...\n    julia> klucbGamma(0.5, 0.9)\n    2.795...\n\n    julia> klucbGamma(0.9, 0.4)\n    2.572...\n    julia> klucbGamma(0.9, 0.9)\n    5.031...\n\n\n\n"
},

{
    "location": "index.html#Functions-1",
    "page": "Documentation",
    "title": "Functions",
    "category": "section",
    "text": "klBern(x, y)klBin(x, y, n)klPoisson(x, y)klExp(x, y)klGamma(x, y, a)klNegBin(x, y, r)klGauss(x, y, sig2x, sig2y)klucb(x, d, kl, upperbound, lowerbound, precision, max_iterations)klucbBern(x, d, precision)klucbGauss(x, d, sig2x, precision)klucbPoisson(x, d, precision)klucbExp(x, d, precision)klucbGamma(x, d, precision)"
},

{
    "location": "index.html#Index-1",
    "page": "Documentation",
    "title": "Index",
    "category": "section",
    "text": ""
},

]}
