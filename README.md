# iFase

## Intialization
```
# in case depedencies were previously installed globally
pip freeze | xargs pip uninstall -y
```

1. Setup Virtual Environment
```
python3 -m virtualenv venv
```
2. (Need this everytime before launching the backend) Enable the Virtual Environment
```
# if using bash/zsh
source venv/bin/activate

# OR (EECG UG) if using csh
source venv/bin/activate.csh
```
3. Install dependencies
```
pip install -r requirements.txt
```

