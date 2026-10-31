param([string]$ProductionRoot=$PSScriptRoot)
Add-Type -AssemblyName System.Speech
Add-Type -ReferencedAssemblies System.Speech -TypeDefinition @'
using System; using System.Collections.Generic; using System.Speech.Synthesis;
public class FilmWord { public int Index; public int Count; public double Seconds; public string Text; }
public class FilmSpeech { public static List<FilmWord> Render(string text,string path) { var words=new List<FilmWord>(); using(var synth=new SpeechSynthesizer()) { synth.SelectVoice("Microsoft Zira Desktop"); synth.Rate=0; synth.SpeakProgress += (sender,e) => words.Add(new FilmWord {Index=e.CharacterPosition,Count=e.CharacterCount,Seconds=e.AudioPosition.TotalSeconds,Text=e.Text}); synth.SetOutputToWaveFile(path, new System.Speech.AudioFormat.SpeechAudioFormatInfo(16000,System.Speech.AudioFormat.AudioBitsPerSample.Sixteen,System.Speech.AudioFormat.AudioChannel.Mono)); synth.Speak(text); } return words; } }
'@
$shots=Get-Content -LiteralPath (Join-Path $ProductionRoot 'narration-cues.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$audio=Join-Path $ProductionRoot 'assets/audio'
New-Item -ItemType Directory -Force -Path $audio | Out-Null
foreach($shot in ($shots | Where-Object { $_.id -in @('02','09','15','18','25','33') })) {
 $text=$shot.text.Replace('GP','G P').Replace('GA','G A').Replace('LE','L E')
 $marks=[FilmSpeech]::Render($text,(Join-Path $audio ('voice'+$shot.id+'.wav')))
 $marks | ConvertTo-Json -Depth 6 | Set-Content -Encoding UTF8 -LiteralPath (Join-Path $audio ('voice'+$shot.id+'-timing.json'))
 Write-Output ($shot.id+': '+$marks.Count+' words')
}
