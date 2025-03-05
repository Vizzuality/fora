import { TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  theme?: 'dark' | 'light' | 'transparent';
  input?: Record<string, unknown>;
  meta?: Record<string, unknown>;
}
