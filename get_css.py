import subprocess
import os

repo_path = r'c:\NSCHOOL\PRIDE OF COWS'
file_path = 'src/AdminPanel/Users/AddUser.css'
commit = '174786d'

try:
    result = subprocess.run(['git', 'show', f'{commit}:{file_path}'], 
                           cwd=repo_path, 
                           capture_output=True, 
                           text=True, 
                           encoding='utf-8')
    if result.returncode == 0:
        print(result.stdout)
    else:
        print(f"Error: {result.stderr}")
except Exception as e:
    print(f"Exception: {str(e)}")
