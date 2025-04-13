import os
os.environ["STREAMLIT_WATCH_USE_POLLING"] = "true"

import streamlit as st
import openai
import os
import torch
import numpy as np
import sounddevice as sd
from scipy.io.wavfile import write
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline
from news_video import VideoGenerator
from dotenv import load_dotenv

# === SETUP ===
load_dotenv()
video_api_key = os.getenv("BEARER_TOKEN")
video_generator = VideoGenerator(video_api_key)

st.set_page_config(page_title="AI News Anchor", layout="wide")
st.title("AI AVATAR")
st.markdown('<style>h1{color: orange; text-align: center;}</style>', unsafe_allow_html=True)
st.subheader('AUTOMATED VIDEO GENERATION WITH AI AVATAR')
st.markdown('<style>h3{color: pink; text-align: center;}</style>', unsafe_allow_html=True)

user_image_url = st.text_input(
    "Enter public URL of your image (optional)",
    value="https://i.ibb.co/hYcxXTW/anchor.png"
)
image_url = user_image_url

# === LOAD WHISPER ===
@st.cache_resource
def load_whisper():
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
        model_kwargs={"language": "en"}
    )
    return pipe

pipe = load_whisper()

# === AUDIO RECORDING ===
def record_audio(duration=10, sample_rate=16000):
    st.info("Recording... Speak now!")
    audio = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=1, dtype='float32')
    sd.wait()
    st.success("Recording complete!")
    return np.squeeze(audio), sample_rate

# === UI ===
st.write("Click below to record your news script:")
if st.button("🎤 Record Audio and Generate News Video"):
    audio_array, sample_rate = record_audio()

    st.write("Transcribing your voice...")
    sample = {"array": audio_array, "sampling_rate": sample_rate}
    result = pipe(sample, return_timestamps=True)
    transcript = result["text"]
    st.success("Transcription Complete")
    st.write(f" **Transcribed Text:** {transcript}")

    final_text = f"""
        Hello World, I'm your AI Avatar.:
        {transcript}
        That's all for today. Thank you!
    """

    # === SHOW LAYOUT ===
    col1, col2 = st.columns([1, 2])
    with col1:
        st.info("Your AI Avatar")
        st.image(image_url, caption="Avatar Image", use_container_width=True)
    with col2:
        st.warning("Generating AI Avatar Video...")
        video_url = video_generator.generate_video(final_text, image_url)
        st.video(video_url)
