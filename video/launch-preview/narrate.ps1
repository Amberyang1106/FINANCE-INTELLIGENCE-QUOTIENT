Add-Type -AssemblyName System.Speech
Add-Type -ReferencedAssemblies System.Speech -TypeDefinition @'
using System; using System.Collections.Generic; using System.Speech.Synthesis;
public class PreviewMark { public int Index; public int Count; public double Seconds; public string Text; }
public class PreviewSpeech { public static List<PreviewMark> Render(string text,string path) { var marks=new List<PreviewMark>(); using(var synth=new SpeechSynthesizer()) { synth.SelectVoice("Microsoft Zira Desktop"); synth.Rate=0; synth.SpeakProgress += (sender,e) => {lock(marks) {marks.Add(new PreviewMark {Index=e.CharacterPosition,Count=e.CharacterCount,Seconds=e.AudioPosition.TotalSeconds,Text=e.Text});}}; synth.SetOutputToWaveFile(path); synth.Speak(text); } return marks; } }
'@
$shots = Get-Content -LiteralPath 'C:/Users/yangtt16/OneDrive - Lenovo/小强创新/fpa-agent-demo/video/launch-preview/voice.json' -Encoding UTF8 -Raw | ConvertFrom-Json
foreach($shot in $shots) {
 $marks=[PreviewSpeech]::Render($shot.text,'C:/Users/yangtt16/OneDrive - Lenovo/小强创新/fpa-agent-demo/video/launch-preview/public/voice'+$shot.id+'.wav')
 $marks | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath ('C:/Users/yangtt16/OneDrive - Lenovo/小强创新/fpa-agent-demo/video/launch-preview/public/voice'+$shot.id+'-timing.json') -Encoding UTF8
 Write-Output ($shot.id+': '+$marks.Count)
}