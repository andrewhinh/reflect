# Arcane incantation to print all the other targets, from https://stackoverflow.com/a/26339924
help:
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST))

# Install exact Python and CUDA versions
conda-update:
	conda env update --prune -f environment.yml

# Compile and install exact pip packages
pip-tools:
	pip install pip-tools==7.1.0 setuptools==68.0.0
	pip-compile requirements/prod.in && pip-compile requirements/dev.in
	pip-sync requirements/prod.txt requirements/dev.txt

# Bump versions of transitive dependencies
pip-tools-upgrade:
	pip install pip-tools==7.1.0 setuptools==68.0.0
	pip-compile --upgrade requirements/prod.in && pip-compile --upgrade requirements/dev.in
	pip-sync requirements/prod.txt requirements/dev.txt

# Setup
setup:
	export PYTHONPATH=.
	echo "export PYTHONPATH=.:$PYTHONPATH" >> ~/.bashrc
	mkcert -install
	mkcert localhost 127.0.0.1 ::1

# Test
test:
	pytest tests

# Run app locally for development
dev:
	uvicorn app.main:app --reload
# --ssl-keyfile=./localhost+2-key.pem --ssl-certfile=./localhost+2.pem

# Deploy app
deploy:
	heroku git:remote -a aurora-api -r aurora-api
	git push aurora-api main