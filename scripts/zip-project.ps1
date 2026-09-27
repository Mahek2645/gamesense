$src = Resolve-Path "$PSScriptRoot\.."
$zipPath = "$HOME\Downloads\front_gamesense.zip"
$folderDst = "$HOME\Downloads\front_gamesense"

Write-Host "Updating $folderDst..."
robocopy $src $folderDst /E /XD .next node_modules .git /XF *.log | Out-Null

Write-Host "Creating fresh zip archive at $zipPath..."
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
$files = Get-ChildItem -Path $src -Exclude "node_modules",".next",".git"
Compress-Archive -Path $files.FullName -DestinationPath $zipPath -Force

Write-Host "Done! Zip updated at $zipPath"
