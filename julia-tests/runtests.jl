#!/usr/bin/env julia
doc""" Script to test KullbackLeibler.jl

- FIXME write it!
- XXX Or do it automatically with jldoctest (https://juliadocs.github.io/Documenter.jl/latest/man/doctests/#Doctests-1).

- MIT Licensed, (C) 2018 Lilian Besson (Naereen)
  https://GitHub.com/Naereen/KullbackLeibler.jl
"""

__author__ = "Lilian Besson (Naereen)"
__version__ = "0.1"

include("../julia-src/KullbackLeibler.jl")
# include("KullbackLeibler.jl")
using KullbackLeibler
using Base.Test

# utility for the tests

tolerance = 1e-6

function isclose(x, y, tol=tolerance)
    return abs(x - y) <= tol
end

# write your own tests here

@test isclose(KullbackLeibler.klBern(0.5, 0.5), 0.0)
@test isclose(KullbackLeibler.klBern(0.1, 0.9), 1.757779)
# And this KL is symmetric
@test isclose(KullbackLeibler.klBern(0.9, 0.1), 1.757779)
@test isclose(KullbackLeibler.klBern(0.4, 0.5), 0.020135)
@test isclose(KullbackLeibler.klBern(0.01, 0.99), 4.503217)
