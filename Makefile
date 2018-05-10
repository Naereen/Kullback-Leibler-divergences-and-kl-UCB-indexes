# Makefile to convert Jupyter notebooks to HTML pages
SHELL=/usr/bin/env /bin/bash

all:	export send

send:	send_zamok
send_zamok:
	CP ./ ${Szam}publis/Kullback-Leibler-divergences-and-kl-UCB-indexes.git/


# For Python
.PHONY: python-doc python-tests

python-doc:
	pdoc --overwrite --html --html-dir ./python-doc/ ./src/kullback_leibler.py
	mv -vf ./python-doc/kullback_leibler.m.html ./python-doc/index.html
	# pdoc --overwrite --html --html-dir ./python-doc/ ./src/kullback_leibler_numba.py
	# mv -vf ./python-doc/kullback_leibler_numba.m.html ./python-doc/kullback_leibler_numba.html

python-tests:
	python ./src/kullback_leibler.py
	python ./src/kullback_leibler_numba.py


# For Julia
.PHONY: julia-doc julia-tests

julia-tests:
	julia ./julia-tests/runtest.jl

julia-doc:
	cd julia-genrate-docs ; julia ./main.jl


# Other rules

CONTENT_IPYNB=$(wildcard *.ipynb */*.ipynb)
CONTENT_HTML=$(CONTENT_IPYNB:.ipynb=.html)

list_nb:
	echo $(CONTENT_IPYNB)
list_html:
	echo $(CONTENT_HTML)

html_notebooks:	$(CONTENT_HTML)

%.html:	%.ipynb
	jupyter-nbconvert "$<" --to html
