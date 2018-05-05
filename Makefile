# Makefile to convert Jupyter notebooks to HTML pages
SHELL=/usr/bin/env /bin/bash

all:	export send

send:	send_zamok
send_zamok:
	CP ./ ${Szam}publis/Kullback-Leibler_divergences_and_kl-UCB_indexes.git/

doc:
	pdoc --overwrite --html --html-dir ./doc/ ./src/kullback_leibler.py
	mv ./doc/kullback_leibler.m.html ./doc/index.html

CONTENT_IPYNB=$(wildcard *.ipynb */*.ipynb)
CONTENT_HTML=$(CONTENT_IPYNB:.ipynb=.html)

list_nb:
	echo $(CONTENT_IPYNB)
list_html:
	echo $(CONTENT_HTML)

html_notebooks:	$(CONTENT_HTML)

%.html:	%.ipynb
	jupyter-nbconvert "$<" --to html
