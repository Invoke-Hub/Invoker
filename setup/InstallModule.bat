:: Module Installer
@echo off
forfiles /s /m SetupModule.bat /c "cmd /c call @path"

for /D %%i in (*) do move /Y "%%~fi" "../src/modules/"
pause