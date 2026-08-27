import 'dotenv/config';
import express from 'express';
import OpenAI from 'openai';

const app = express();
const port = Number(process.env.PORT || 8787);

app.use(express.json({ limit: '100kb' }));

type IncomingHistoryMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const apiKey = process.env.OPENAI_API_KEY;
const openai = apiKey ? new OpenAI({ apiKey }) : null;

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    openaiConfigured: Boolean(openai),
  });
});

app.post('/api/chat', async (req, res) => {
  try {
    if (!openai) {
      return res.status(500).json({
        error: 'OpenAI API Key 尚未配置，请在服务端环境变量 OPENAI_API_KEY 中填写。',
      });
    }

    const message = typeof req.body?.message === 'string'
      ? req.body.message.trim()
      : '';

    if (!message) {
      return res.status(400).json({
        error: '消息不能为空。',
      });
    }

    const rawHistory = Array.isArray(req.body?.history)
      ? req.body.history
      : [];

    const history: IncomingHistoryMessage[] = rawHistory
      .filter((item: unknown): item is IncomingHistoryMessage => {
        if (!item || typeof item !== 'object') return false;
        const candidate = item as Partial<IncomingHistoryMessage>;
        return (
          (candidate.role === 'user' || candidate.role === 'assistant') &&
          typeof candidate.content === 'string' &&
          candidate.content.trim().length > 0
        );
      })
      .slice(-10)
      .map(item => ({
        role: item.role,
        content: item.content.trim().slice(0, 4000),
      }));

    const input = [
      {
        role: 'developer' as const,
        content:
          '你是巴涵笑个人作品集网站里的 AI 导览助手。请用自然、简洁、友好的中文回答，优先帮助访客理解作品集内容、设计经历、项目和联系方式。第一阶段不使用外部知识库；如果缺少事实依据，不要编造具体经历、公司、项目数据或联系方式。',
      },
      ...history.map(item => ({
        role: item.role,
        content: item.content,
      })),
      {
        role: 'user' as const,
        content: message.slice(0, 4000),
      },
    ];

    const response = await openai.responses.create({
      model: 'gpt-5.4-mini',
      input,
    });

    const reply = response.output_text?.trim();

    if (!reply) {
      return res.status(502).json({
        error: 'OpenAI 没有返回有效文本，请稍后重试。',
      });
    }

    return res.json({ reply });
  } catch (error) {
    console.error('OpenAI chat error:', error);

    return res.status(500).json({
      error: 'AI 服务暂时不可用，请稍后重试。',
    });
  }
});

app.listen(port, () => {
  console.log(`AI server listening on http://localhost:${port}`);

  if (!openai) {
    console.warn('OPENAI_API_KEY is not configured. /api/chat will return an error until it is set.');
  }
});
