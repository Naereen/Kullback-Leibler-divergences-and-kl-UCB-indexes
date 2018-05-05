#!/usr/bin/env python3
# -*- coding: utf-8 -*-
""" Utility for uploading the package to PyPi.

- MIT Licensed, (C) 2018 Lilian Besson (Naereen)
  https://GitHub.com/Naereen/Kullback-Leibler_divergences_and_kl-UCB_indexes
"""

__author__ = "Lilian Besson (Naereen)"
__version__ = "0.1"

try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup

# To use a consistent encoding
from codecs import open
from os import path

here = path.abspath(path.dirname(__file__))

# Get the long description from the README file
with open(path.join(here, '..', 'README.rst'), encoding='utf-8') as f:
    long_description = f.read()


setup(name='kullback_leibler',
    version=__version__,
    author=__author__,
    author_email="naereen" + "@" + "crans.org",
    description='Fast implementation of various Kullback-Leibler divergences for 1D and 2D parametric distributions. Also provides optimized code for kl-UCB indexes',
    long_description=long_description,
    license='OSI Approved :: MIT License',
    url="https://github.com/Naereen/Kullback-Leibler_divergences_and_kl-UCB_indexes"
    classifiers=[
        'Intended Audience :: Science/Research',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: Implementation :: CPython',
        'Topic :: Scientific/Engineering :: Information Analysis ',
        'Topic :: Scientific/Engineering :: Mathematics',
        'Development Status :: 4 - Beta',
        'Natural Language :: English',
    ]
)
