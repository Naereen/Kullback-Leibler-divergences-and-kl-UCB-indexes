# GNU Make makefile to build the kullback_leibler_cython.pyx C extension
#
# MIT Licensed, (C) 2018 Lilian Besson (Naereen)
# https://GitHub.com/Naereen/Naereen/Kullback-Leibler-divergences-and-kl-UCB-indexes
#

all: clean tests build install clean

tests:	test2 test3
test2:
	python2 kullback_leibler.py
test3:
	python3 kullback_leibler.py

build:	cython_extensions3
# build: ccode build2 build3 buildpyx

cython_extensions:	cython_extensions3
cython_extensions3:
	python3 setup.py build_ext --inplace
	-cp -vf src/*.so ./
	-chmod -x ./*.so
	-chmod g-w ./*.so
	-chmod o-w ./*.so
	-ls -larth ./*.so
	-mv -vf ./build ./*.c /tmp/
	# -mv -vf ./src /tmp/

cython_extensions2:
	python2 setup.py build_ext --inplace
	-cp -vf src/*.so ./
	-chmod -x ./*.so
	-chmod g-w ./*.so
	-chmod o-w ./*.so
	-ls -larth ./*.so
	-mv -vf ./build ./*.c /tmp/
	# -mv -vf ./src /tmp/

# --- old

buildpyx:	buildpyx3

buildpyx2:	kullback_leibler_cython.pyx setup_cython.py
	python2 setup_cython.py build_ext --inplace

buildpyx3: kullback_leibler_cython.pyx setup_cython.py
	python3 setup_cython.py build_ext --inplace

# ccode:
# 	cython -v -3 kullback_leibler_cython.pyx

# build2: kullback_leibler_cython.c setup_with_c.py
# 	python2 setup_with_c.py build

# build3: kullback_leibler_cython.c setup_with_c.py3
# 	python3 setup_with_c.py3 build

install: install3
install2:
	python2 setup_cython.py install

install3:
	python3 setup_cython.py install

clean:
	# -python2 setup_with_c.py  clean
	# -python3 setup_with_c.py3 clean
	-python3 setup_cython.py  clean
	rm -vf kullback_leibler_cython.c

cleancache:
	rm -rfv __pycache__ *.pyc

cleanall: clean cleancache
	rm -rvf /tmp/Kullback-Leibler-divergences-and-kl-UCB-indexes/build/
	mv -vf build /tmp/Kullback-Leibler-divergences-and-kl-UCB-indexes/

open:
	mime-open https://github.com/Naereen/Naereen/Kullback-Leibler-divergences-and-kl-UCB-indexesy

cow:
	cowsay "Go to https://github.com/Naereen/Kullback-Leibler-divergences-and-kl-UCB-indexes for more fun stuff"

# copyso:
# 	-\cp build/lib*/kullback_leibler_cython*.* ../
# 	-\cp build/lib*/*/kullback_leibler_cython*.* ../
# 	-\cp build/lib*/*/*/kullback_leibler_cython*.* ../
