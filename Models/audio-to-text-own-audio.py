import torch
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline
import sounddevice as sd
from scipy.io.wavfile import write
import numpy as np

# === RECORD AUDIO ===
duration = 5  
sample_rate = 16000  
print("Recording... Speak now!")
audio = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=1, dtype='float32')
sd.wait()
print("Recording complete!")

# Convert to array format for Whisper
audio_array = np.squeeze(audio)

# === LOAD WHISPER ===
device = "cuda:0" if torch.cuda.is_available() else "cpu"
torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32

model_id = "openai/whisper-tiny"

model = AutoModelForSpeechSeq2Seq.from_pretrained(
    model_id, torch_dtype=torch_dtype, low_cpu_mem_usage=True, use_safetensors=True
).to(device)

processor = AutoProcessor.from_pretrained(model_id)

pipe = pipeline(
    "automatic-speech-recognition",
    model=model,
    tokenizer=processor.tokenizer,
    feature_extractor=processor.feature_extractor,
    torch_dtype=torch_dtype,
    device=0 if torch.cuda.is_available() else -1,
)

# === TRANSCRIBE ===
sample = {"array": audio_array, "sampling_rate": sample_rate}
result = pipe(sample, return_timestamps=True)
print("Transcription:", result["text"])

