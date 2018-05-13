Python implementation of Kullback-Leibler divergences and kl-UCB indexes
========================================================================

This repository contains a small, simple and efficient module,
implementing various `Kullback-Leibler
divergences <https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence>`__
for parametric 1D or 2D distributions.

Different versions
------------------

The same module, with same functions and same specification, is
available in different forms:

1. A naive pure `Python <https://docs.python.org/3/>`__ implementation,
   valid for both `*old* Python 2 <https://pythonclock.org/>`__ and
   Python 3, see ```kullback_leibler.py`` <src/kullback_leibler.py>`__,
2. A pure Python implementation, using
   `numba <http://numba.pydata.org/>`__ for automatic speed-up,, see
   ```kullback_leibler_numba.py`` <src/kullback_leibler_numba.py>`__,
3. A Cython version, using code very-close-to Python and the
   `Cython <http://docs.cython.org/en/latest/>`__ compiler to
   automatically build a C version and compile it as a ``.so`` or
   ``.dll`` dynamically linked library to be imported as a module from
   Python, see
   ```kullback_leibler_cython.pyx`` <src/kullback_leibler_cython.pyx>`__,
4. A C version, using the `C API <https://docs.python.org/3/c-api/>`__
   of CPython, which produces the same thing as the Cython version but
   is harder to read and work on, see
   ```kullback_leibler_c.c`` <src/kullback_leibler_c.c>`__.

There is also a `Julia <http://julialang.org/>`__ version, on `this
repository <https://github.com/Naereen/KullbackLeibler.jl>`__.

References
----------

-  `Garivier & Cappé & Kaufmann,
   2012 <http://mloss.org/software/view/415/>`__, for the pymaBandits
   project on which this implementation is based,
-  `Besson, 2018 <https://github.com/SMPyBandits/SMPyBandits/>`__,
   SMPyBandits project for improvements on the initial implementation,
-  `Filippi & Cappé & Garivier,
   2011 <https://arxiv.org/pdf/1004.5229.pdf>`__,
-  `Garivier & Cappé, 2011 <https://arxiv.org/pdf/1102.2490.pdf>`__,
-  `Kullback & Leibler, 1951 <http://www.jstor.org/stable/2236703>`__
   for the first article introducing the so-called Kullback & Leibler
   divergences.

Examples
--------

Simple usage
~~~~~~~~~~~~

If the ```kullback_leibler.py`` <src/kullback_leibler.py>`__ file is
accessible in your PATH or in Python’s path:

.. code:: python

    >>> import kullback_leibler
    >>> p = 0.5; q = 0.01
    >>> kullback_leibler.klBern(p, q)
    1.614463...
    >>> kullback_leibler.klGauss(q, p)
    0.480199...
    >>> kullback_leibler.klPoisson(q, p)
    0.450879...
    >>> kullback_leibler.klExp(q, p)
    2.932023...

Vectorized version?
~~~~~~~~~~~~~~~~~~~

All functions are *not* vectorized, and assume only one value for each
argument. If you want vectorized function, use the wrapper
```numpy.vectorize`` <https://docs.scipy.org/doc/numpy/reference/generated/numpy.vectorize.html#numpy.vectorize>`__:

.. code:: python

    >>> import numpy as np
    >>> klBern_vect = np.vectorize(klBern)
    >>> klBern_vect([0.1, 0.5, 0.9], 0.2)
    array([0.036..., 0.223..., 1.145...])
    >>> klBern_vect(0.4, [0.2, 0.3, 0.4])
    array([0.104..., 0.022..., 0...])
    >>> klBern_vect([0.1, 0.5, 0.9], [0.2, 0.3, 0.4])
    array([0.036..., 0.087..., 0.550...])

For some functions, you would be better off writing a vectorized version
manually, for instance if you want to fix a value of some optional
parameters:

.. code:: python

    >>> # WARNING using np.vectorize gave weird result on klGauss
    >>> # klGauss_vect = np.vectorize(klGauss, excluded="y")
    >>> def klGauss_vect(xs, y, sig2x=0.25):  # vectorized for first input only
    ...    return np.array([klGauss(x, y, sig2x) for x in xs])
    >>> klGauss_vect([-1, 0, 1], 0.1)
    array([2.42, 0.02, 1.62])

Documentation
~~~~~~~~~~~~~

See `this
file <https://naereen.github.io/Kullback-Leibler-divergences-and-kl-UCB-indexes/doc/index.html>`__.

With the C extension
~~~~~~~~~~~~~~~~~~~~

If the ```kullback_leibler_c.so`` <src/kullback_leibler_c.c>`__ or
```kullback_leibler_cython.so`` <src/kullback_leibler_cython.pyx>`__
file is accessible in your ``PATH`` or in Python’s path:

Small benchmark
~~~~~~~~~~~~~~~

Let’s compare quickly the 4 different implementations.

First, in an `ipython <https://ipython.org/>`__ console, import all of
them:

.. code:: python

    $ ipython
    ...
    >>> import kullback_leibler as kl
    >>> import kullback_leibler_numba as kl_n
    >>> import pyximport; _ = pyximport.install()
    >>> import kullback_leibler_cython as kl_cy
    >>> import kullback_leibler_c as kl_c
    >>> import numpy as np; r = np.random.rand

Then let’s compare a single computation of a KL divergence, for instance
of two Bernoulli distributions:

.. code:: python

    >>> %timeit (r(), r())   # don't neglect this "constant"!
    728 ns ± 34.7 ns per loop (mean ± std. dev. of 7 runs, 1000000 loops each)
    >>> %timeit kl.klBern(r(), r())
    2.42 µs ± 109 ns per loop (mean ± std. dev. of 7 runs, 100000 loops each)

    >>> %timeit kl_n.klBern(r(), r())
    1.26 µs ± 143 ns per loop (mean ± std. dev. of 7 runs, 1000000 loops each)
    >>> (2420 - 728) / (1260 - 728)  # compute speed-up factor
    3.18...

    >>> %timeit kl_cy.klBern(r(), r())
    933 ns ± 48.3 ns per loop (mean ± std. dev. of 7 runs, 1000000 loops each)
    >>> (2420 - 728) / (933 - 728)  # compute speed-up factor
    8.25

    >>> %timeit kl_c.klBern(r(), r())
    1.09 µs ± 127 ns per loop (mean ± std. dev. of 7 runs, 1000000 loops each)
    >>> (2420 - 728) / (1090 - 728)  # compute speed-up factor
    4.67

..

    This shows that the Numba version is about 3 times faster than the
    naive Python version, the Cython version is the fastest with a
    speed-up of about 8 and the C version is about 5 times faster.

And for kl-UCB indexes, for instance:

.. code:: python

    >>> %timeit (r(), r())   # don't neglect this "constant"!
    743 ns ± 37.9 ns per loop (mean ± std. dev. of 7 runs, 1000000 loops each)
    >>> %timeit kl.klucbBern(r(), r())
    28.9 µs ± 154 ns per loop (mean ± std. dev. of 7 runs, 10000 loops each)

    >>> %timeit kl_n.klucbBern(r(), r())
    75.8 µs ± 1.44 µs per loop (mean ± std. dev. of 7 runs, 10000 loops each)
    >>> (28900 - 743) / (75800 - 743)
    0.375...

    >>> %timeit kl_cy.klucbBern(r(), r())
    3.65 µs ± 42.5 ns per loop (mean ± std. dev. of 7 runs, 100000 loops each)
    >>> (28900 - 743) / (3650 - 743)
    9.68...

    >>> %timeit kl_c.klucbBern(r(), r(), 1e-6)  # needs precision
    2.23 µs ± 21.6 ns per loop (mean ± std. dev. of 7 runs, 100000 loops each)
    >>> (28900 - 743) / (2230 - 743)
    18.93...

..

    This shows that the Numba version is about 3 times *slower* than the
    naive Python version, the Cython version is about 10 times faster
    and the C version is the fastest with a speed-up of about 20.

Demo on a `Jupyter notebook <https://www.Jupyter.org/>`__
---------------------------------------------------------

See this notebook: `on
nbviewever <https://nbviewer.jupyter.org/github/Naereen/Kullback-Leibler-divergences-and-kl-UCB-indexes/blob/master/Kullback-Leibler_divergences_in_native_Python__Cython_and_Numba.ipynb>`__,
which also compares with the `Julia
version <https://github.com/Naereen/KullbackLeibler.jl>`__.

--------------

Install and build
-----------------

Manually ?
~~~~~~~~~~

Easy! If you don’t care for speed, then only use the pure python
version.

Otherwise, you will have to clone this repository, go in the folder,
compile, test, and if it works, install it.

.. code:: bash

    cd /tmp/
    git clone https://GitHub.com/Naereen/Kullback-Leibler-divergences-and-kl-UCB-indexes
    cd Kullback-Leibler-divergences-and-kl-UCB-indexes/src/
    make build
    make test     # should pass
    make install  # mv the build/lib*/*.so files where you need them

Be sure to include the dynamic library when you need it, or in a folder
accessible by your Python interpreter (somewhere in ``sys.path``). -
Cython version: the file is ``kullback_leibler_cython.so`` (for Python
2) or the ``kullback_leibler_cython.cpython-35m-x86_64-linux-gnu.so``
(for Python 3.5, or higher, adapt the name). - C version: the file is
``kullback_leibler_c.so`` (for Python 2) or the
``kullback_leibler_c.cpython-35m-x86_64-linux-gnu.so`` (for Python 3.5,
or higher, adapt the name).

With pip ?
----------

This project is hosted on `the Pypi package
repository <https://pypi.org/project/kullback_leibler/>`__.

.. code:: bash

    sudo pip install kullback_leibler
    # test it
    python -c "from kullback_leibler import klBern; print(round(klBern(0.1,0.5), 4) == 0.3681)"  # test

|kullback_leibler in pypi| |PyPI implementation| |PyPI pyversions|

--------------

Julia implementation ?
----------------------

`I was
curious <https://github.com/Naereen/Kullback-Leibler-divergences-and-kl-UCB-indexes/issues/1>`__
and wanted to write the same algorithm in
`Julia <http://julialang.org>`__. Here it is:
`KullbackLeibler.jl <https://github.com/Naereen/Kullback-Leibler-divergences-and-kl-UCB-indexes/blob/master/julia-src/KullbackLeibler.jl>`__.

The Julia package is published here:
`Naereen/KullbackLeibler.jl <https://github.com/Naereen/KullbackLeibler.jl>`__,
and see `here for its
documentation <https://naereen.github.io/KullbackLeibler.jl/doc/index.html>`__.

--------------

About
-----

Languages?
~~~~~~~~~~

Python v2.7+ or Python v3.4+.

-  `Numba <http://numba.pydata.org/>`__ *can* be used to speed up the
   pure Python version (in ``kullback_leibler_numba.py``). It is purely
   optional, and the speedup is not that much when using numba (see the
   notebook for the complete benchmark).
-  `Cython <http://cython.org/>`__ is *needed* to build the C extension
   (faster) (in ``kullback_leibler_cython.py``).
-  For both the Cython and the C versions, a working version of
   `gcc <https://gcc.gnu.org/>`__ is required (probably version >= 6.0).

:scroll: License ? |GitHub license|
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

`MIT Licensed <https://lbesson.mit-license.org/>`__ (file
`LICENSE <LICENSE>`__). © `Lilian
Besson <https://GitHub.com/Naereen>`__, 2018.

|Maintenance| |Ask Me Anything !| |Analytics|

|ForTheBadge uses-badges| |ForTheBadge uses-git|

|forthebadge made-with-python| |ForTheBadge built-with-science|

.. |kullback_leibler in pypi| image:: https://img.shields.io/pypi/v/kullback_leibler.svg
   :target: https://pypi.org/project/kullback_leibler/
.. |PyPI implementation| image:: https://img.shields.io/pypi/implementation/kullback_leibler.svg
.. |PyPI pyversions| image:: https://img.shields.io/pypi/pyversions/kullback_leibler.svg
.. |GitHub license| image:: https://img.shields.io/github/license/Naereen/Kullback-Leibler-divergences-and-kl-UCB-indexes.svg
   :target: https://github.com/Naereen/badges/blob/master/LICENSE
.. |Maintenance| image:: https://img.shields.io/badge/Maintained%3F-yes-green.svg
   :target: https://GitHub.com/Naereen/Kullback-Leibler-divergences-and-kl-UCB-indexes/graphs/commit-activity
.. |Ask Me Anything !| image:: https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg
   :target: https://GitHub.com/Naereen/ama
.. |Analytics| image:: https://ga-beacon.appspot.com/UA-38514290-17/github.com/Naereen/Kullback-Leibler-divergences-and-kl-UCB-indexes/README.md?pixel
   :target: https://GitHub.com/Naereen/Kullback-Leibler-divergences-and-kl-UCB-indexes/
.. |ForTheBadge uses-badges| image:: http://ForTheBadge.com/images/badges/uses-badges.svg
   :target: http://ForTheBadge.com
.. |ForTheBadge uses-git| image:: http://ForTheBadge.com/images/badges/uses-git.svg
   :target: https://GitHub.com/
.. |forthebadge made-with-python| image:: http://ForTheBadge.com/images/badges/made-with-python.svg
   :target: https://www.python.org/
.. |ForTheBadge built-with-science| image:: http://ForTheBadge.com/images/badges/built-with-science.svg
   :target: https://GitHub.com/Naereen/
