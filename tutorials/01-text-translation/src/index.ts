import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatGroq } from '@langchain/groq';
import dotenv from 'dotenv';

dotenv.config();

async function translateToAfrikaans() {
  const model = new ChatGroq({
    model: 'mixtral-8x7b-32768',
    temperature: 0,
  });

  const parser = new StringOutputParser();

  const systemTemplate = 'Translate the following into {language}:';

  const promptTemplate = ChatPromptTemplate.fromMessages([
    ['system', systemTemplate],
    ['human', '{text}'],
  ]);

  const llmChain = promptTemplate.pipe(model).pipe(parser);

  const result = await llmChain.invoke({
    language: 'Afrikaans',
    text: 'Hi, how are you doing today?',
  });

  console.log(result);
}

// Call the async function
translateToAfrikaans();
