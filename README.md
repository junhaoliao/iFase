# iFase
## Environment
1. Git
2. Node.js: https://nodejs.org/en/
2. Python (3.10 or above): https://python.org
3. Any IDE that works with Python (PyCharm or VS Code)
4. [Mac] brew: https://brew.sh
   [Windows] Visual Studio 2022: C++ Toolchain
   [Linux] buildessentials

## Intialization

```
# in case depedencies were previously installed globally
pip freeze | xargs pip uninstall -y
```

1. Clone the repo

2. Setup Virtual Environment
```
python3 -m virtualenv venv
```
3. (Need this everytime before launching the backend) Enable the Virtual Environment
```
# if using bash/zsh
source venv/bin/activate

# OR (EECG UG) if using csh
source venv/bin/activate.csh
```
4. Install dependencies
```
pip install -r requirements.txt
```

## FAQ
1. If the Python backend complains about not being able to store faces, make a directory named "faces" in the project root directory. 

