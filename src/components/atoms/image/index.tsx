import { ImgHTMLAttributes } from 'react';

import './style.scss';

type ImageProps = ImgHTMLAttributes<HTMLImageElement>

export function Image({ className ,...props }: ImageProps) {
  return (
    <img className={`${className ? className : 'image'}`} {...props} />
  );
}


