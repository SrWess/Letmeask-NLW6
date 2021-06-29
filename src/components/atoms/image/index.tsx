import { ImgHTMLAttributes } from 'react';

import './style.scss';

type ImageProps = ImgHTMLAttributes<HTMLImageElement>

export function Image({ ...props }: ImageProps) {
  return (
    <img className={`image`} {...props} />
  );
}


