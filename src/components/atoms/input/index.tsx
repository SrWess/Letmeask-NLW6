import { InputHTMLAttributes } from 'react';

import './style.scss';

type ButtonProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ ...props }: ButtonProps) {
  return (
    <input {...props} />
  );
}


