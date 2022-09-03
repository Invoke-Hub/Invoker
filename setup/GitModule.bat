:: Git Organization Command
@echo off
set /P O=Enter git option: 
:switch-case-option

    goto :switch-case-O-%O% 2>nul || (
        echo "Option not available, Available Options Are (init, push, pull)."
        exit
    )

    :switch-case-O-init
        git init .
        git remote add invoker https://github.com/Invoke-Hub/Invoker.git
        git pull invoker main
        git branch -M main
        exit

    :switch-case-O-push 
        set /P C=Enter commit message: 
        git add .
        git commit -m "%C%"
        git push -u invoker main
        ::rmdir .git /s /q
        exit

    :switch-case-O-pull
        ::rmdir .git /s /q
        git init .
        git branch -M main
        git remote add invoker https://github.com/Invoke-Hub/Invoker.git
        git pull invoker main
        ::rmdir .git /s /q
        exit