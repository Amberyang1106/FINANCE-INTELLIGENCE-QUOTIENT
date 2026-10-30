Add-Type -AssemblyName System.Speech
Add-Type -ReferencedAssemblies System.Speech -TypeDefinition @'
using System; using System.Collections.Generic; using System.Speech.Synthesis;
public class VoiceMark { public int Index; public int Count; public double Seconds; public string Text; }
public class TimedSpeech { public static List<VoiceMark> Render(string text,string path) { var marks=new List<VoiceMark>(); using(var synth=new SpeechSynthesizer()) { synth.SelectVoice("Microsoft Huihui Desktop"); synth.Rate=0; synth.Volume=100; synth.SpeakProgress += (sender,e) => {lock(marks) {marks.Add(new VoiceMark {Index=e.CharacterPosition,Count=e.CharacterCount,Seconds=e.AudioPosition.TotalSeconds,Text=e.Text});}}; synth.SetOutputToWaveFile(path); synth.Speak(text); } return marks; } }
'@
$manifest = Get-Content -LiteralPath 'C:/Users/yangtt16/OneDrive - Lenovo/小强创新/fpa-agent-demo/video/edit/manifest.json' -Encoding UTF8 -Raw | ConvertFrom-Json
foreach($shot in $manifest.shots) {
 $audioPath='C:/Users/yangtt16/OneDrive - Lenovo/小强创新/fpa-agent-demo/video/voice/S'+$shot.id+'.wav'
 $marks=[TimedSpeech]::Render($shot.voice,$audioPath)
 $marks | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath ('C:/Users/yangtt16/OneDrive - Lenovo/小强创新/fpa-agent-demo/video/voice/S'+$shot.id+'-timing.json') -Encoding UTF8
 Write-Output ($shot.id+': '+$marks.Count)
}
