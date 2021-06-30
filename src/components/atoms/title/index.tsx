import { HTMLAttributes } from 'react';

import './style.scss';

type TitleProps = HTMLAttributes<HTMLHeadingElement>

export function Title({ ...props }: TitleProps) {
  return (
    <h1 className='title' {...props}>{props.children}</h1>
  );
}


