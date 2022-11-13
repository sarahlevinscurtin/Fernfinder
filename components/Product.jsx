import React from 'react';
import Link from 'next/link';
import Fade from 'react-reveal/Fade';

import { urlFor } from '../lib/client';

function Product({ product: { image, name, slug, price } }) {
  return (
    <Fade bottom distance="20%" duration="800">
    <div>
      <Link href={`/product/${slug.current}`}>
      <div className='product-card'>
      <img src={urlFor(image && image[0])}
      width={250}
      height={250}
      className="product-image"
      alt="" />
      <p className='product-name'>{name}</p>
      <p className='product-price'>${price}</p>
      </div>
      </Link>
    </div>
    </Fade>
  )
}

export default Product