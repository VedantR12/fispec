import os
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def run_groq(prompt: str) -> str:

    response = client.chat.completions.create(
        model="qwen/qwen3.8-27b",
        temperature=0,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content