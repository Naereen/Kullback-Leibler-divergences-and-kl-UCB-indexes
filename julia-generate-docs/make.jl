#!/usr/bin/env julia
doc""" Script to build the documentation of KullbackLeibler.jl.

- MIT Licensed, (C) 2018 Lilian Besson (Naereen)
  https://GitHub.com/Naereen/KullbackLeibler.jl
"""

__author__ = "Lilian Besson (Naereen)"
__version__ = "0.1"

# https://juliadocs.github.io/Documenter.jl/latest/
using Documenter

include("../julia-src/KullbackLeibler.jl")
# include("KullbackLeibler.jl")
using KullbackLeibler

makedocs(
    format = :html,
    sitename = "KullbackLeibler.jl",
    pages = [
        "index.md",
        # "About" => "README.md"
    ],
    # WARNING maybe I need more options right here?
)
