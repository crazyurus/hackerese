/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable node/prefer-global/text-decoder */
import type { RequestOption } from '@modern-js/runtime/server';

export async function post(context: RequestOption<never, { text: string }>) {
  const { text } = context.data;

  const response = await fetch('https://api.coze.cn/v3/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.COZE_API_KEY}`,
    },
    body: JSON.stringify({
      bot_id: '7400050699922767910',
      user_id: 'anonymous',
      auto_save_history: false,
      stream: true,
      additional_messages: [
        {
          role: 'user',
          content: text,
          content_type: 'text',
        },
      ],
    }),
  });
  const reader = response.body?.getReader()!;
  let result = '';

  while (true) {
    const { value, done } = await reader.read();
    const textDecoder = new TextDecoder();
    const chunk = textDecoder.decode(value);
    const lines = chunk.split('\n');
    const event = lines[0];

    if (event === 'event:conversation.message.completed' || done) {
      break;
    }

    if (event === 'event:conversation.message.delta') {
      const json = JSON.parse(lines[1].slice(5));

      result += json.content;
    }
  }

  return {
    result: result.trim(),
  };
}
