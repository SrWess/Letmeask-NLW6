import { ImgHTMLAttributes } from 'react';

import './style.scss';

type ImageProps = ImgHTMLAttributes<HTMLImageElement>

export function Icon({ ...props }: ImageProps) {
  return (
    <img className='icon' {...props} />
  );
}


