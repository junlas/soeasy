@echo off
if exist error.txt  del error.txt /f /q
echo 正在啟動瀏覽器...[若發錯誤,日誌將輸出到error.txt內]
egret startserver -printError