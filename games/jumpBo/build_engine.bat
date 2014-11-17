@echo off
if exist error.txt  del error.txt /f /q
echo 正在編譯項目和引擎...[完成後自動關閉本窗口,若發錯誤,日誌將輸出到error.txt內]
egret build -e