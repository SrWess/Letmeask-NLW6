import { HTMLAttributes } from 'react';

import './style.scss';

type SubtitleProps = HTMLAttributes<HTMLParagraphElement>

export function Subtitle({ ...props }: SubtitleProps) {
  return (
    <p className={`subtitle `} {...props}>{props.children}</p>
  );
}


