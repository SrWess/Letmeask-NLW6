import { HTMLAttributes } from 'react';

import './style.scss';

type TextProps = HTMLAttributes<HTMLParagraphElement>

export function Text({ className, ...props }: TextProps) {
  return (
    <p className={`${className ? className : 'text'}`} {...props}>{props.children}</p>
  );
}


