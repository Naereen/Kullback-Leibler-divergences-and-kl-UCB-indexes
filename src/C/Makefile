# GNU Make makefile to build the kullback_leibler C extension
all: clean build install clean

build: build2 build3

build2: kullback_leibler_c.c setup.py
	python2 setup.py build

build3: kullback_leibler_c_py3.c setup.py3
	python3 setup.py3 build

install:
	\cp -v build/lib*/kullback_leibler_c.* ../

clean: setup.py
	python2 setup.py clean
	python3 setup.py3 clean
	#rm -rvf build/*
