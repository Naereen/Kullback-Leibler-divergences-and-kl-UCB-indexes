# -*- coding: utf-8 -*-
""" Kullback-Leibler module :

- :mod:`kullback_leibler` is the pure Python code,
- :mod:`kullback_leibler_numba` is the same Python code, with Numba to (try to) speed it up,
- :download:`kullback_leibler_cython.pyx` implements it in Cython (C-extension for Python).
- :download:`C/kullback_leibler_py3.c` implements it in C (C-extension for Python).

- MIT Licensed, (C) 2018 Lilian Besson (Naereen)
  https://GitHub.com/Naereen/Kullback-Leibler-divergences-and-kl-UCB-indexes
"""

__author__ = "Lilian Besson"
__version__ = "0.1"

try:
    from .kullback_leibler import kullback_leibler
except ImportError
    try:
        from kullback_leibler import kullback_leibler
    except ImportError as e:
        print("Error: the module 'kullback_leibler' could not be imported...\nPlease fill a bug to https://github.com/Naereen/Kullback-Leibler-divergences-and-kl-UCB-indexes/issues/new and I will try to help. Thanks!")
try:
    from .kullback_leibler_numba import kullback_leibler_numba
except ImportError
    try:
        from kullback_leibler_numba import kullback_leibler_numba
    except ImportError as e:
        print("Error: the module 'kullback_leibler_numba' could not be imported...\nPlease fill a bug to https://github.com/Naereen/Kullback-Leibler-divergences-and-kl-UCB-indexes/issues/new and I will try to help. Thanks!")

try:
    from .kullback_leibler_cython import kullback_leibler_cython
except ImportError
    try:
        from kullback_leibler_cython import kullback_leibler_cython
    except ImportError as e:
        print("Error: the module 'kullback_leibler_cython' could not be imported...\nPlease fill a bug to https://github.com/Naereen/Kullback-Leibler-divergences-and-kl-UCB-indexes/issues/new and I will try to help. Thanks!")
try:
    from .kullback_leibler_c import kullback_leibler_c
except ImportError
    try:
        from kullback_leibler_c import kullback_leibler_c
    except ImportError as e:
        print("Error: the module 'kullback_leibler_c' could not be imported...\nPlease fill a bug to https://github.com/Naereen/Kullback-Leibler-divergences-and-kl-UCB-indexes/issues/new and I will try to help. Thanks!")
