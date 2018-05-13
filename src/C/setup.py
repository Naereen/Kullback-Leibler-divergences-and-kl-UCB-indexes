# -*- coding: utf-8 -*-
""" Utility for building the C library for Python 2."""

__author__ = "Olivier Cappé, Aurélien Garivier"
__version__ = "$Revision: 1.3 $"

from distutils.core import setup, Extension

module1 = Extension('kullback_leibler_c', sources=['kullback_leibler_c.c'])


setup(name='Kullback-Leibler utilities',
      version='1.0',
      description='Computes various KL divergences (Python 2)',
      ext_modules=[module1]
      )
