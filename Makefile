OUTPUT_FILENAME="yoga.js"

CC=emcc

all: clean cpp js

cpp: dir
	$(CC) yoga/yoga/*.cpp bindings/*.cc \
		--bind -Os --memory-init-file 0 --llvm-lto 1 \
		-Iyoga \
		-s WASM=1 \
		-s ERROR_ON_UNDEFINED_SYMBOLS=0 \
		-s MODULARIZE=1 \
		-s "DEFAULT_LIBRARY_FUNCS_TO_INCLUDE=['memcpy','memset','malloc','free','strlen']" \
		-o build/$(OUTPUT_FILENAME)

js: dir
	yarn webpack
	yarn webpack --config webpack.dev.js 

clean:
	rm -rf build static

dir:
	mkdir -p build
