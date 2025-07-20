import { randomUUID } from 'node:crypto';
import { Message, Participant, Transcript, Utterance } from './models';

if (!process.env.GEMINI_API_KEY) throw new Error('gemini api key unset');
if (!process.env.GEMINI_MODEL_URL) throw new Error('gemini url unset');

export const promptLLM = async (text: string) => {
  const res = await fetch(process.env.GEMINI_MODEL_URL || '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-goog-api-key': process.env.GEMINI_API_KEY || '',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text,
            },
          ],
        },
      ],
    }),
  });
  const json = await res.json();
  return json.candidates[0].content.parts
    .map((part: { text: string }) => part.text)
    .reduce((acc: string, val: string) => acc + '\n' + val, '')
    .trim();
};

const getDefaultTranscript = () => [
  {
    text: 'Hello! How can I help you?',
    participant: Participant.BOT,
    timestamp: Date.now() + 1,
    uuid: randomUUID(),
  },
];

const db: Record<string, Transcript> = {};

export const json = (message: Message) => JSON.stringify(message);

export const getSessionId = async () => {
  return randomUUID();
};

export const getTranscript = async (uuid: string): Promise<Transcript> => {
  // transcript does not need to be sorted
  console.log('uuid: ', uuid);
  console.log('transcript fetched: ', db[uuid]);
  if (!db[uuid]) {
    db[uuid] = getDefaultTranscript();
  }
  console.log('transcript updated: ', db[uuid]);
  return db[uuid];
};

export const addUtteranceToTranscript = async (
  uuid: string,
  utterance: Utterance
): Promise<Transcript> => {
  const transcript = await getTranscript(uuid);
  transcript.push(utterance);
  db[uuid] = transcript;
  return transcript;
};

// export const getResponse = async (utterance: Utterance): Promise<Utterance> => {
//   return {
//     text: "I'm sorry. I don't understand.",
//     participant: Participant.BOT,
//     timestamp: Date.now(),
//     uuid: randomUUID(),
//   };
// };
