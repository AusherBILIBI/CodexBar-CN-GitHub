@echo off
set "HTTP_PROXY=http://127.0.0.1:10809"
set "HTTPS_PROXY=http://127.0.0.1:10809"
set "ALL_PROXY=http://127.0.0.1:10809"
start "" "%~dp0CodexBar-CN.exe"
