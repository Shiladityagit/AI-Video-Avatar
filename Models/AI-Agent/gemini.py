import asyncio
import os

from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from pydantic import SecretStr

from browser_use import Agent, BrowserConfig
from browser_use.browser.browser import Browser
from browser_use.browser.context import BrowserContextConfig

load_dotenv()
api_key = os.getenv('GEMINI_API_KEY')
if not api_key:
	raise ValueError('GEMINI_API_KEY is not set')

llm = ChatGoogleGenerativeAI(model='gemini-2.0-flash-exp', api_key=SecretStr(api_key))

browser = Browser(
	config=BrowserConfig(
		new_context_config=BrowserContextConfig(
			viewport_expansion=0,
		)
	)
)


async def run_search():
	agent = Agent(
		#task='Go to https://krushisaathi.vercel.app/landing, then login as Farmer with Username: 1234567890 and Paassward: 123456, Agree the terms and conditions and click Login, then Click ok to the drop down box. Then go to Soil Analysis.',
		#task='Go to https://krushisaathi-891779892886.us-central1.run.app/landing, then click on Get Started, then on Farm Solutions, then login as Farmer with Username: 1234567890 and Paassward: 123456, Agree the terms and conditions and click Login, then Click ok to the drop down box. Then go to Soil Analysis.',
		task='',
		llm=llm,
		max_actions_per_step=4,
		browser=browser,
	)

	await agent.run(max_steps=25)


if __name__ == '__main__':
	asyncio.run(run_search())
