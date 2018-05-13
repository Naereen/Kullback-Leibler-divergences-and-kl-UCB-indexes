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
    "text": "This repository contains a small, simple and efficient module, implementing various Kullback-Leibler divergences for parametric 1D continuous or discrete distributions. For more information, see the homepage on GitHub."
},

{
    "location": "index.html#Index-1",
    "page": "Documentation",
    "title": "Index",
    "category": "section",
    "text": ""
},

{
    "location": "index.html#KullbackLeibler.KL-Tuple{Any,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.KL",
    "category": "Method",
    "text": "function KL( D1, D2 )\n\nCommon function to compute the Kullback-Leibler for some continuous and discrete 1D parametric distributions (of module Distributions).\n\nSee doc for continuous distributions and doc for discrete distributions.\n\nCurrently supported: Bernoulli, Binomial, Poisson, NegativeBinomial (discrete) and Exponential, Gamma, Gaussian (continuous).\n\nExamples:\n\nBernoulli:\n\njulia> Bern1 = Distributions.Bernoulli(0.33)\nDistributions.Bernoulli{Float64}(p=0.33)\njulia> Bern2 = Distributions.Bernoulli(0.42)\nDistributions.Bernoulli{Float64}(p=0.42)\njulia> ex_kl_1 = KL( Bern1, Bern2 )  # Calc KL divergence for Bernoulli R.V\n0.017063...\njulia> klBern(0.33, 0.42)  # same!\n0.017063...\n\nBinomial:\n\njulia> Bin1 = Distributions.Binomial(13, 0.33)\nDistributions.Binomial{Float64}(n=13, p=0.33)\njulia> Bin2 = Distributions.Binomial(13, 0.42)   # must have same parameter n\nDistributions.Binomial{Float64}(n=13, p=0.42)\njulia> ex_kl_2 = KL( Bin1, Bin2 )  # Calc KL divergence for Binomial R.V\n0.221828...\n\nPoisson:\n\njulia> Pois1 = Distributions.Poisson(0.33)\nDistributions.Poisson{Float64}(λ=0.33)\njulia> Pois2 = Distributions.Poisson(0.92)\nDistributions.Poisson{Float64}(λ=0.92)\njulia> ex_kl_3 = KL( Pois1, Pois2 )  # Calc KL divergence for Poisson R.V\n0.251657\n\nExponential:\n\njulia> Exp1 = Distributions.Exponential( 0.33 )\nDistributions.Exponential{Float64}(θ=0.33)\njulia> Exp2 = Distributions.Exponential( 0.42 )\nDistributions.Exponential{Float64}(θ=0.42)\njulia> ex_kl_4 = KL( Exp1, Exp2 )  # Calc KL div for Exponential R.V\n0.0268763\n\nGamma:\n\njulia> Gam1 = Distributions.Gamma(0.5, 0.33)\nDistributions.Gamma{Float64}(α=0.5, θ=0.33)\njulia> Gam2 = Distributions.Gamma(0.5, 0.42)     # must have same parameter α\nDistributions.Gamma{Float64}(α=0.5, θ=0.42)\njulia> ex_kl_5 = KL( Gam1, Gam2 )  # Calc KL divergence for Gamma R.V\n0.0134381\n\nNegativeBinomial:\n\njulia> NegBin1 = Distributions.NegativeBinomial(40, 0.33)\nDistributions.NegativeBinomial{Float64}(r=40, p=0.33)\njulia> NegBin2 = Distributions.NegativeBinomial(40, 0.99)  # must have same parameter r\nDistributions.NegativeBinomial{Float64}(r=40, p=0.99)\njulia> ex_kl_6 = KL( NegBin1, NegBin2 )       # Calc KL divergence for NegativeBinomial R.V\n17.277824\n\nGaussian:\n\njulia> Gauss1 = Distributions.Gaussian(0.33, 1)\nDistributions.Normal{Float64}(μ=0.33, σ=1.0)\njulia> Gauss2 = Distributions.Gaussian(0.42, 1)      # can have same σ\nDistributions.Normal{Float64}(μ=0.42, σ=1.0)\njulia> ex_kl_7 = KL( Gauss1, Gauss2 )  # Calc KL divergence for Gaussian R.V\n0.0040499...\n\njulia> Gauss3 = Distributions.Gaussian(0.42, 10)     # but can also have a different σ\nDistributions.Normal{Float64}(μ=0.33, σ=10.0)\njulia> ex_kl_7 = KL( Gauss1, Gauss3 )  # Calc KL divergence for Gaussian R.V\n0.656697...\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klBern-Tuple{Any,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klBern",
    "category": "Method",
    "text": "function klBern(x, y)\n\nKullback-Leibler divergence for Bernoulli distributions. https://en.wikipedia.org/wiki/Bernoulli_distribution#Kullback.E2.80.93Leibler_divergence\n\nmathrmKL(mathcalB(x) mathcalB(y)) = x log(fracxy) + (1-x) log(frac1-x1-y)\n\njulia> klBern(0.5, 0.5)\n0.0\njulia> klBern(0.1, 0.9)\n1.757779...\njulia> klBern(0.9, 0.1)  # And this KL is symmetric\n1.757779...\njulia> klBern(0.4, 0.5)\n0.020135...\njulia> klBern(0.01, 0.99)\n4.503217...\n\nSpecial values:\n\njulia> klBern(0, 1)  # Should be +Inf, but 0 --> eps, 1 --> 1 - eps\n34.539575...\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klBin-Tuple{Any,Any,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klBin",
    "category": "Method",
    "text": "function klBin(x, y, n)\n\nKullback-Leibler divergence for Binomial distributions. https://math.stackexchange.com/questions/320399/kullback-leibner-divergence-of-binomial-distributions\n\nIt is simply the n times klBern on x and y.\n\nmathrmKL(mathrmBin(x n) mathrmBin(y n)) = n times left(x log(fracxy) + (1-x) log(frac1-x1-y) right)\n\nWarning: The two distributions must have the same parameter n, and x, y are p, q in (0, 1).\n\njulia> klBin(0.5, 0.5, 10)\n0.0\njulia> klBin(0.1, 0.9, 10)\n17.57779...\njulia> klBin(0.9, 0.1, 10)  # And this KL is symmetric\n17.57779...\njulia> klBin(0.4, 0.5, 10)\n0.20135...\njulia> klBin(0.01, 0.99, 10)\n45.03217...\n\nSpecial values:\n\njulia> klBin(0, 1, 10)  # Should be +Inf, but 0 --> eps, 1 --> 1 - eps\n345.39575...\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klPoisson-Tuple{Any,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klPoisson",
    "category": "Method",
    "text": "function klPoisson(x, y)\n\nKullback-Leibler divergence for Poison distributions. https://en.wikipedia.org/wiki/Poisson_distribution#Kullback.E2.80.93Leibler_divergence\n\nmathrmKL(mathrmPoisson(x) mathrmPoisson(y)) = y - x + x times log(fracxy)\n\njulia> klPoisson(3, 3)\n0.0\njulia> klPoisson(2, 1)\n0.386294...\njulia> klPoisson(1, 2)  # And this KL is non-symmetric\n0.306852...\njulia> klPoisson(3, 6)\n0.920558...\njulia> klPoisson(6, 8)\n0.273907...\n\nSpecial values:\n\njulia> klPoisson(1, 0)  # Should be +Inf, but 0 --> eps, 1 --> 1 - eps\n33.538776...\njulia> klPoisson(0, 0)\n0.0\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klExp-Tuple{Any,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klExp",
    "category": "Method",
    "text": "function klExp(x, y)\n\nKullback-Leibler divergence for exponential distributions. https://en.wikipedia.org/wiki/Exponential_distribution#Kullback.E2.80.93Leibler_divergence\n\nmathrmKL(mathrmExp(x) mathrmExp(y)) = begincases\nfracxy - 1 - log(fracxy)  textif x  0 y  0\n+infty  textotherwise\nendcases\n\njulia> klExp(3, 3)\n0.0\njulia> klExp(3, 6)\n0.193147...\njulia> klExp(1, 2)  # Only the proportion between x and y is used\n0.193147...\njulia> klExp(2, 1)  # And this KL is non-symmetric\n0.306852...\njulia> klExp(4, 2)  # Only the proportion between x and y is used\n0.306852...\njulia> klExp(6, 8)\n0.037682...\n\nx, y have to be positive:\n\njulia> klExp(-3, 2)\nInf\njulia> klExp(3, -2)\nInf\njulia> klExp(-3, -2)\nInf\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klGamma-Tuple{Any,Any,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klGamma",
    "category": "Method",
    "text": "function klGamma(x, y, a=1)\n\nKullback-Leibler divergence for gamma distributions. https://en.wikipedia.org/wiki/Gamma_distribution#Kullback.E2.80.93Leibler_divergence\n\nIt is simply the a times klExp on x and y.\n\n.. math::\n\n\\mathrm{KL}(\\Gamma(x, a), \\Gamma(y, a)) = \\begin{cases}\na \\times \\left( \\frac{x}{y} - 1 - \\log(\\frac{x}{y}) \\right) & \\text{if} x > 0, y > 0\\\\\n+\\infty & \\text{otherwise}\n\\end{cases}\n\nWarning: The two distributions must have the same parameter a.\n\njulia> klGamma(3, 3)\n0.0\njulia> klGamma(3, 6)\n0.193147...\njulia> klGamma(1, 2)  # Only the proportion between x and y is used\n0.193147...\njulia> klGamma(2, 1)  # And this KL is non-symmetric\n0.306852...\njulia> klGamma(4, 2)  # Only the proportion between x and y is used\n0.306852...\njulia> klGamma(6, 8)\n0.037682...\n\nx, y have to be positive:\n\njulia> klGamma(-3, 2)\nInf\njulia> klGamma(3, -2)\nInf\njulia> klGamma(-3, -2)\nInf\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klNegBin-Tuple{Any,Any,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klNegBin",
    "category": "Method",
    "text": "function klNegBin(x, y, r=1)\n\nKullback-Leibler divergence for negative binomial distributions. https://en.wikipedia.org/wiki/Negative_binomial_distribution\n\nmathrmKL(mathrmNegBin(x r) mathrmNegBin(y r)) = r times log((r + x)  (r + y)) - x times log(y times (r + x)  (x times (r + y)))\n\nWarning: The two distributions must have the same parameter r.\n\njulia> klNegBin(0.5, 0.5)\n0.0\njulia> klNegBin(0.1, 0.9)\n-0.711611...\njulia> klNegBin(0.9, 0.1)  # And this KL is non-symmetric\n2.0321564...\njulia> klNegBin(0.4, 0.5)\n-0.130653...\njulia> klNegBin(0.01, 0.99)\n-0.717353...\n\nSpecial values:\n\njulia> klBern(0, 1)  # Should be +Inf, but 0 --> eps, 1 --> 1 - eps\n    34.539575...\n\nWith other values for r:\n\njulia> klNegBin(0.5, 0.5, r=2)\n0.0\njulia> klNegBin(0.1, 0.9, r=2)\n-0.832991...\njulia> klNegBin(0.1, 0.9, r=4)\n-0.914890...\njulia> klNegBin(0.9, 0.1, r=2)  # And this KL is non-symmetric\n2.3325528...\njulia> klNegBin(0.4, 0.5, r=2)\n-0.154572...\njulia> klNegBin(0.01, 0.99, r=2)\n-0.836257...\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klGauss-NTuple{4,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klGauss",
    "category": "Method",
    "text": "function klGauss(x, y, sig2x=0.25, sig2y=0.25)\n\nKullback-Leibler divergence for Gaussian distributions of means x and y and variances sig2x and sig2y, nu_1 = mathcalN(x sigma_x^2) and nu_2 = mathcalN(y sigma_x^2):\n\nmathrmKL(nu_1 nu_2) = frac(x - y)^22 sigma_y^2 + frac12left( fracsigma_x^2sigma_y^2 - 1 logleft(fracsigma_x^2sigma_y^2right) right)\n\nSee https://en.wikipedia.org/wiki/Normal_distribution#Other_properties\n\nBy default, sig2y is assumed to be sig2x (same variance).\n\njulia> klGauss(3, 3)\n0.0\njulia> klGauss(3, 6)\n18.0\njulia> klGauss(1, 2)\n2.0\njulia> klGauss(2, 1)  # And this KL is symmetric\n2.0\njulia> klGauss(4, 2)\n8.0\njulia> klGauss(6, 8)\n8.0\n\nx, y can be negative:\n\njulia> klGauss(-3, 2)\n50.0\njulia> klGauss(3, -2)\n50.0\njulia> klGauss(-3, -2)\n2.0\njulia> klGauss(3, 2)\n2.0\n\nWith other values for sig2x:\n\njulia> klGauss(3, 3, sig2x=10)\n0.0\njulia> klGauss(3, 6, sig2x=10)\n0.45\njulia> klGauss(1, 2, sig2x=10)\n0.05\njulia> klGauss(2, 1, sig2x=10)  # And this KL is symmetric\n0.05\njulia> klGauss(4, 2, sig2x=10)\n0.2\njulia> klGauss(6, 8, sig2x=10)\n0.2\n\nWith different values for sig2x and sig2y:\n\njulia> klGauss(0, 0, sig2x=0.25, sig2y=0.5)\n-0.0284...\njulia> klGauss(0, 0, sig2x=0.25, sig2y=1.0)\n0.2243...\njulia> klGauss(0, 0, sig2x=0.5, sig2y=0.25)  # not symmetric here!\n1.1534...\n\njulia> klGauss(0, 1, sig2x=0.25, sig2y=0.5)\n0.9715...\njulia> klGauss(0, 1, sig2x=0.25, sig2y=1.0)\n0.7243...\njulia> klGauss(0, 1, sig2x=0.5, sig2y=0.25)  # not symmetric here!\n3.1534...\n\njulia> klGauss(1, 0, sig2x=0.25, sig2y=0.5)\n0.9715...\njulia> klGauss(1, 0, sig2x=0.25, sig2y=1.0)\n0.7243...\njulia> klGauss(1, 0, sig2x=0.5, sig2y=0.25)  # not symmetric here!\n3.1534...\n\nWarning: Using Policies.klUCB (and variants) with klGauss is equivalent to use Policies.UCB, so prefer the simpler version. (this is only for the Python version)\n\n\n\n"
},

{
    "location": "index.html#Kullback-Leibler-divergences-1",
    "page": "Documentation",
    "title": "Kullback-Leibler divergences",
    "category": "section",
    "text": "Generic interface for Distributions objects:KL(D1, D2)Specific functions:klBern(x, y)klBin(x, y, n)klPoisson(x, y)klExp(x, y)klGamma(x, y, a)klNegBin(x, y, r)klGauss(x, y, sig2x, sig2y)"
},

{
    "location": "index.html#KullbackLeibler.klucb-NTuple{7,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klucb",
    "category": "Method",
    "text": "function klucb(x, d, kl, upperbound, lowerbound=-Inf, precision=1e-6, max_iterations=50)\n\nThe generic kl-UCB index computation.\n\nx: value of the cum reward,\nd: upper bound on the divergence,\nkl: the KL divergence to be used (klBern, klGauss, etc),\nupperbound, lowerbound=-Inf: the known bound of the values x,\nprecision=1e-6: the threshold from where to stop the research,\nmax_iterations: max number of iterations of the loop (safer to bound it to reduce time complexity).\nNote: It uses a bisection search, and one call to kl for each step of the bisection search.\n\nFor example, for klucbBern, the two steps are to first compute an upperbound (as precise as possible) and the compute the kl-UCB index:\n\njulia> x, d = 0.9, 0.2   # mean x, exploration term d\njulia> upperbound = min(1.0, klucbGauss(x, d, sig2x=0.25))  # variance 1/4 for [0,1] bounded distributions\njulia> upperbound\n1.0\njulia> klucb(x, d, klBern, upperbound, lowerbound=0, precision=1e-3, max_iterations=10)\n0.9941...\njulia> klucb(x, d, klBern, upperbound, lowerbound=0, precision=1e-6, max_iterations=10)\n0.994482...\njulia> klucb(x, d, klBern, upperbound, lowerbound=0, precision=1e-3, max_iterations=50)\n0.9941...\njulia> klucb(x, d, klBern, upperbound, lowerbound=0, precision=1e-6, max_iterations=100)  # more and more precise!\n0.994489...\n\nNote: See below for more examples for different KL divergence functions.\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klucbBern-Tuple{Any,Any,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klucbBern",
    "category": "Method",
    "text": "function klucbBern(x, d, precision=1e-6)\n\nkl-UCB index computation for Bernoulli distributions, using klucb.\n\nInfluence of x:\n\njulia> klucbBern(0.1, 0.2)\n0.378391...\njulia> klucbBern(0.5, 0.2)\n0.787088...\njulia> klucbBern(0.9, 0.2)\n0.994489...\n\nInfluence of d:\n\njulia> klucbBern(0.1, 0.4)\n0.519475...\njulia> klucbBern(0.1, 0.9)\n0.734714...\n\njulia> klucbBern(0.5, 0.4)\n0.871035...\njulia> klucbBern(0.5, 0.9)\n0.956809...\n\njulia> klucbBern(0.9, 0.4)\n0.999285...\njulia> klucbBern(0.9, 0.9)\n0.999995...\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klucbGauss-NTuple{4,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klucbGauss",
    "category": "Method",
    "text": "function klucbGauss(x, d, sig2x=0.25, precision=0.0)\n\nkl-UCB index computation for Gaussian distributions.\n\nNote: it does not require any search.\nWarning: it works only if the good variance constant is given.\nInfluence of x:\n\njulia> klucbGauss(0.1, 0.2)\n0.416227...\njulia> klucbGauss(0.5, 0.2)\n0.816227...\njulia> klucbGauss(0.9, 0.2)\n1.216227...\n\n- Influence of d:\n\n\njulia julia> klucbGauss(0.1, 0.4) 0.547213... julia> klucbGauss(0.1, 0.9) 0.770820...\n\njulia> klucbGauss(0.5, 0.4) 0.947213... julia> klucbGauss(0.5, 0.9) 1.170820...\n\njulia> klucbGauss(0.9, 0.4) 1.347213... julia> klucbGauss(0.9, 0.9) 1.570820... ```\n\nWarning: Using Policies.klUCB (and variants) with klucbGauss is equivalent to use Policies.UCB, so prefer the simpler version (this is only for the Python version).\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klucbPoisson-Tuple{Any,Any,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klucbPoisson",
    "category": "Method",
    "text": "function klucbPoisson(x, d, precision=1e-6)\n\nkl-UCB index computation for Poisson distributions, using klucb.\n\nInfluence of x:\n\njulia> klucbPoisson(0.1, 0.2)\n0.450523...\njulia> klucbPoisson(0.5, 0.2)\n1.089376...\njulia> klucbPoisson(0.9, 0.2)\n1.640112...\n\nInfluence of d:\n\njulia> klucbPoisson(0.1, 0.4)\n0.693684...\njulia> klucbPoisson(0.1, 0.9)\n1.252796...\n\njulia> klucbPoisson(0.5, 0.4)\n1.422933...\njulia> klucbPoisson(0.5, 0.9)\n2.122985...\n\njulia> klucbPoisson(0.9, 0.4)\n2.033691...\njulia> klucbPoisson(0.9, 0.9)\n2.831573...\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klucbExp-Tuple{Any,Any,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klucbExp",
    "category": "Method",
    "text": "function klucbExp(x, d, precision=1e-6)\n\nkl-UCB index computation for exponential distributions, using klucb.\n\nInfluence of x:\n\njulia> klucbExp(0.1, 0.2)\n0.202741...\njulia> klucbExp(0.5, 0.2)\n1.013706...\njulia> klucbExp(0.9, 0.2)\n1.824671...\n\nInfluence of d:\n\njulia> klucbExp(0.1, 0.4)\n0.285792...\njulia> klucbExp(0.1, 0.9)\n0.559088...\n\njulia> klucbExp(0.5, 0.4)\n1.428962...\njulia> klucbExp(0.5, 0.9)\n2.795442...\n\njulia> klucbExp(0.9, 0.4)\n2.572132...\njulia> klucbExp(0.9, 0.9)\n5.031795...\n\n\n\n"
},

{
    "location": "index.html#KullbackLeibler.klucbGamma-Tuple{Any,Any,Any}",
    "page": "Documentation",
    "title": "KullbackLeibler.klucbGamma",
    "category": "Method",
    "text": "function klucbGamma(x, d, precision=1e-6)\n\nkl-UCB index computation for Gamma distributions, using klucb.\n\nInfluence of x:\n\njulia> klucbGamma(0.1, 0.2)\n0.202...\njulia> klucbGamma(0.5, 0.2)\n1.013...\njulia> klucbGamma(0.9, 0.2)\n1.824...\n\nInfluence of d:\n\njulia> klucbGamma(0.1, 0.4)\n0.285...\njulia> klucbGamma(0.1, 0.9)\n0.559...\n\njulia> klucbGamma(0.5, 0.4)\n1.428...\njulia> klucbGamma(0.5, 0.9)\n2.795...\n\njulia> klucbGamma(0.9, 0.4)\n2.572...\njulia> klucbGamma(0.9, 0.9)\n5.031...\n\n\n\n"
},

{
    "location": "index.html#KL-UCB-indexes-functions-1",
    "page": "Documentation",
    "title": "KL-UCB indexes functions",
    "category": "section",
    "text": "Generic function:klucb(x, d, kl, upperbound, lowerbound, precision, max_iterations)Specific ones:klucbBern(x, d, precision)klucbGauss(x, d, sig2x, precision)klucbPoisson(x, d, precision)klucbExp(x, d, precision)klucbGamma(x, d, precision)"
},

]}
