# Python implementation of Kullback-Leibler divergences and kl-UCB indexes

This repository contains a small, simple and efficient module, implementing various [Kullback-Leibler divergences](https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence) for parametric 1D or 2D distributions.

## Different versions
The same module, with same functions and same specification, is available in different forms:

1. A naive pure [Python](https://docs.python.org/3/) implementation, valid for both [*old* Python 2](https://pythonclock.org/) and Python 3, see [`kullback_leibler.py`](src/kullback_leibler.py),
2. A pure Python implementation, using [numba](http://numba.pydata.org/) for automatic speed-up,, see [`kullback_leibler_numba.py`](src/kullback_leibler_numba.py),
3. A Cython version, using code very-close-to Python and the [Cython](http://docs.cython.org/en/latest/) compiler to automatically build a C version and compile it as a `.so` or `.dll` dynamically linked library to be imported as a module from Python, see [`kullback_leibler_cython.pyx`](src/kullback_leibler_cython.pyx),
4. A C version, using the [C API](https://docs.python.org/3/c-api/) of CPython, which produces the same thing as the Cython version but is harder to read and work on, see [`kullback_leibler_c.c`](src/kullback_leibler_c.c).

FIXME There is also a [Julia](http://julialang.org/) version, on [this repository](https://github.com/Naereen/KullbackLeibler.jl).

## References
- [Garivier & Cappé & Kaufmann, 2012](http://mloss.org/software/view/415/), for the pymaBandits project on which this implementation is based,
- [Besson, 2018](https://github.com/SMPyBandits/SMPyBandits/), SMPyBandits project for improvements on the initial implementation,
- [Filippi & Cappé & Garivier, 2011](https://arxiv.org/pdf/1004.5229.pdf),
- [Garivier & Cappé, 2011](https://arxiv.org/pdf/1102.2490.pdf),
- [Kullback & Leibler, XXX](XXX) for the first article introducing the so-called Kullback & Leibler divergences.

## Examples
### Simple usage
If the [`kullback_leibler.py`](src/kullback_leibler.py) file is accessible in your PATH or in Python's path:

```python
>>> import kullback_leibler
>>> p = 0.5; q = 0.01
>>> kullback_leibler.klBern(p, q)
XXX
>>> kullback_leibler.klGauss(q, p)
XXX
>>> kullback_leibler.klPoisson(q, p)
XXX
>>> kullback_leibler.klExp(q, p)
XXX
```

### Vectorized version?
All functions are *not* vectorized, and assume only one value for each argument.
If you want vectorized function, use the wrapper [`numpy.vectorize`](https://docs.scipy.org/doc/numpy/reference/generated/numpy.vectorize.html#numpy.vectorize):

```python
>>> import numpy as np
>>> klBern_vect = np.vectorize(klBern)
>>> klBern_vect([0.1, 0.5, 0.9], 0.2)
array([0.036..., 0.223..., 1.145...])
>>> klBern_vect(0.4, [0.2, 0.3, 0.4])
array([0.104..., 0.022..., 0...])
>>> klBern_vect([0.1, 0.5, 0.9], [0.2, 0.3, 0.4])
array([0.036..., 0.087..., 0.550...])
```

For some functions, you would be better off writing a vectorized version manually, for instance if you want to fix a value of some optional parameters:

```python
>>> # WARNING using np.vectorize gave weird result on klGauss
>>> # klGauss_vect = np.vectorize(klGauss, excluded="y")
>>> def klGauss_vect(xs, y, sig2x=0.25):  # vectorized for first input only
...    return np.array([klGauss(x, y, sig2x) for x in xs])
>>> klGauss_vect([-1, 0, 1], 0.1)
array([2.42, 0.02, 1.62])
```

### Documentation
See [this file](https://naereen.github.io/Kullback-Leibler_divergences_and_kl-UCB_indexes/doc/index.html).

FIXME

### With the C extension
If the [`kullback_leibler_c.so`](src/kullback_leibler_c.c) or  [`kullback_leibler_cython.so`](src/kullback_leibler_cython.pyx) file is accessible in your `PATH` or in Python's path:

### Small benchmark
Let's compare quickly the 4 different implementations.

First, in an [ipython](https://ipython.org/) console, import all of them:
```python
$ ipython
...
>>> import kullback_leibler as kl
>>> import kullback_leibler_numba as kl_n
>>> import kullback_leibler_cython as kl_cy
>>> import kullback_leibler_c as kl_c
>>> import numpy as np; r = np.random.rand
```

Then let's compare a single computation of a KL divergence, for instance of two Bernoulli distributions:

FIXME include the real times

```python
>>> %timeit (r(), r())   # don't neglect this "constant"!
>>> %timeit kl.klBern(r(), r())
132 ns ± 2.55 ns per loop (mean ± std. dev. of 7 runs, 10000000 loops each)
>>> %timeit kl_n.klBern(r(), r())
132 ns ± 2.55 ns per loop (mean ± std. dev. of 7 runs, 10000000 loops each)
>>> %timeit kl_cy.klBern(r(), r())
132 ns ± 2.55 ns per loop (mean ± std. dev. of 7 runs, 10000000 loops each)
>>> %timeit kl_c.klBern(r(), r())
132 ns ± 2.55 ns per loop (mean ± std. dev. of 7 runs, 10000000 loops each)
```

And for kl-UCB indexes, for instance:

```python
>>> %timeit kl.klucbBern(r(), r())
132 ns ± 2.55 ns per loop (mean ± std. dev. of 7 runs, 10000000 loops each)
>>> %timeit kl_n.klucbBern(r(), r())
132 ns ± 2.55 ns per loop (mean ± std. dev. of 7 runs, 10000000 loops each)
>>> %timeit kl_cy.klucbBern(r(), r())
132 ns ± 2.55 ns per loop (mean ± std. dev. of 7 runs, 10000000 loops each)
>>> %timeit kl_c.klucbBern(r(), r())
132 ns ± 2.55 ns per loop (mean ± std. dev. of 7 runs, 10000000 loops each)
```

The speedup is typically between ×50 and ×100.

## Demo on a [Jupyter notebook](https://www.Jupyter.org/)
See this notebook: [on nbviewever](https://nbviewer.jupyter.org/github/Naereen/Kullback-Leibler_divergences_and_kl-UCB_indexes/blob/master/Kullback-Leibler_divergences_in_native_Python__Cython_and_Numba.ipynb), which also compares with the [Julia version](https://github.com/Naereen/KullbackLeibler.jl).

FIXME write the julia version!

----

## Install and build
### Manually ?
Easy! If you don't care for speed, then only use the pure python version.

Otherwise, you will have to clone this repository, go in the folder, compile, test, and if it works, install it.

```bash
cd /tmp/
git clone https://GitHub.com/Naereen/Kullback-Leibler_divergences_and_kl-UCB_indexes
cd Kullback-Leibler_divergences_and_kl-UCB_indexes/src/
make build
make test     # should pass
make install  # mv the build/lib*/*.so files where you need them
```

Be sure to include the dynamic library when you need it, or in a folder accessible by your Python interpreter (somewhere in `sys.path`).
- Cython version: the file is `kullback_leibler_cython.so` (for Python 2) or the `kullback_leibler_cython.cpython-35m-x86_64-linux-gnu.so` (for Python 3.5, or higher, adapt the name).
- C version: the file is `kullback_leibler_c.so` (for Python 2) or the `kullback_leibler_c.cpython-35m-x86_64-linux-gnu.so` (for Python 3.5, or higher, adapt the name).

## With pip ?
This project is hosted on [the Pypi package repository](https://pypi.org/project/kullback_leibler/).

```bash
sudo pip install kullback_leibler
# test it
python -c "from kullback_leibler import klBern; print(round(klBern(0.1,0.5), 4) == 0.3681)"  # test
```

[![kullback_leibler in pypi](https://img.shields.io/pypi/v/kullback_leibler.svg)](https://pypi.org/project/kullback_leibler/)
![PyPI implementation](https://img.shields.io/pypi/implementation/kullback_leibler.svg)
![PyPI pyversions](https://img.shields.io/pypi/pyversions/kullback_leibler.svg)

----

## Julia implementation ?
[I was curious](https://github.com/Naereen/Kullback-Leibler_divergences_and_kl-UCB_indexes/issues/1) and wanted to write the same algorithm in [Julia](http://julialang.org).
Here it is: [kullback_leibler.jl](https://github.com/Naereen/Kullback-Leibler_divergences_and_kl-UCB_indexes/blob/master/src/kullback_leibler.jl).

The Julia package is published here: [Naereen/LempelZiv.jl](https://github.com/Naereen/LempelZiv.jl),
and see [here for its documentation](https://naereen.github.io/LempelZiv.jl/doc/index.html).

----

## About
### Languages?
Python v2.7+ or Python v3.4+.

- [Numba](http://numba.pydata.org/) *can* be used to speed up the pure Python version (in `kullback_leibler_numba.py`). It is purely optional, and the speedup is not that much when using numba (see the notebook for the complete benchmark).
- [Cython](http://cython.org/) is *needed* to build the C extension (faster) (in `kullback_leibler_cython.py`).
- For both the Cython and the C versions, a working version of [gcc](https://gcc.gnu.org/) is required (probably version >= 6.0).

### :scroll: License ? [![GitHub license](https://img.shields.io/github/license/Naereen/Kullback-Leibler_divergences_and_kl-UCB_indexes.svg)](https://github.com/Naereen/badges/blob/master/LICENSE)
[MIT Licensed](https://lbesson.mit-license.org/) (file [LICENSE](LICENSE)).
© [Lilian Besson](https://GitHub.com/Naereen), 2018.

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/Kullback-Leibler_divergences_and_kl-UCB_indexes/graphs/commit-activity)
[![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://GitHub.com/Naereen/ama)
[![Analytics](https://ga-beacon.appspot.com/UA-38514290-17/github.com/Naereen/Kullback-Leibler_divergences_and_kl-UCB_indexes/README.md?pixel)](https://GitHub.com/Naereen/Kullback-Leibler_divergences_and_kl-UCB_indexes/)

[![ForTheBadge uses-badges](http://ForTheBadge.com/images/badges/uses-badges.svg)](http://ForTheBadge.com)
[![ForTheBadge uses-git](http://ForTheBadge.com/images/badges/uses-git.svg)](https://GitHub.com/)

[![forthebadge made-with-python](http://ForTheBadge.com/images/badges/made-with-python.svg)](https://www.python.org/)
[![ForTheBadge built-with-science](http://ForTheBadge.com/images/badges/built-with-science.svg)](https://GitHub.com/Naereen/)
