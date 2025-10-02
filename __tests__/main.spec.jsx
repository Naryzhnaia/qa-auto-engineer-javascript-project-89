import '@hexlet/chatbot-v2/styles';
import Widget from '@hexlet/chatbot-v2';
import steps from '@hexlet/chatbot-v2/example-steps';
import '@hexlet/chatbot-v2/styles';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

test('Check start button', () => {
  render(Widget(steps))
  
  const openChatButton = screen.getByRole('button', { name: /Открыть Чат/i });
  expect(openChatButton).toBeVisible();
});
