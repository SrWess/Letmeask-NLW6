import { ImgHTMLAttributes } from 'react';

import './style.scss';

type ImageProps = ImgHTMLAttributes<HTMLImageElement>

export function Avatar({ ...props }: ImageProps) {
  return (
    <img className='profile' {...props} />
  );
}


