all:
	@echo "no default"

.PHONY: example/proof
example/proof:
	@(cd example && node merkle.js)
