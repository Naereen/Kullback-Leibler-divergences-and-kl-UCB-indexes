# -*- coding: utf-8 -*-
""" Utility for building the C library for Python 3."""

__author__ = "Olivier Cappé, Aurélien Garivier"
__version__ = "$Revision: 1.3 $"

from distutils.core import setup, Extension

module1 = Extension('kullback_leibler_c', sources=['kullback_leibler_c_py3.c'])


setup(name='Kullback-Leibler utilities',
      version='1.0',
      description='Computes various KL divergences (Python 3)',
      ext_modules=[module1]
      )
