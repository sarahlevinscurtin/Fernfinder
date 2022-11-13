import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }) => {
    const { image, name, details, light, water, care, price } = product;
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd} = useStateContext();

  return (
    <div>
      
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img src={urlFor(image && image[index])} className="product-detail-image"/>
                </div>
                <div className='small-image-container'>
                  {image?.map((item, i) => (
                    <img
                    key={i}
                    src={urlFor(item)}
                      className={i == index ? 'small-image selected-image' 
                    : 'small-image'}
                      onMouseEnter={() => setIndex(i)}
                      />
                  ))}
                </div>
            </div>

            <div className='product-detail-desc'>
              <h1>{name}</h1><p className='price'>${price}</p>
              {/* <div className='reviews'>
                <div>
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                </div>
                <p>(20)</p>
              </div> */}
              <h4 className='details-h4'>Details:</h4>
              <p className='details'>{details}</p>


              <div className='stats_holder'>
                <div className="stats">
                  <img src="/images/light.png" alt="image" className="" />
                  <span>{light}</span>
                </div>
                
                <div className="stats">
                  <img src="/images/water.png" alt="image" className="" />
                  <span>{water}</span>
                </div>

                <div className="stats">
                  <img src="/images/care.png" alt="image" className="" />
                  <span>{care}</span>
                </div>
              </div>
              <div className='quantity'>
                <h3>Quantity:</h3>
                <p className='quantity-desc'>
                  <span className='minus' onClick={decQty}><AiOutlineMinus>
                    </AiOutlineMinus></span>
                  <span className='num'>{qty}</span>
                  <span className='plus' onClick={incQty}><AiOutlinePlus>
                    </AiOutlinePlus></span>
                </p>
              </div>
              <div className='buttons'>
                <button type="button" className='add-to-cart'
                onClick={() => onAdd(product, qty)}>Add to Cart</button>
                {/* <button type="button" className='buy-now' onClick="">Buy Now</button> */}
                <a className='buy-now' href="/auth/login">Buy Now</a>
              </div>
            </div>
        </div>

        <div className='maylike-products-wrapper'>
          <h2>You may also like</h2>
          <div className='dot'></div>
          <div className='marquee'>
            <div className='maylike-products-container track'>
              {products.map((item) => (
                <Product key={item._id}
                product={item}/>
              ))}
            </div>
          </div>
        </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

    const products = await client.fetch(query);

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug }}) => { //pre-render page during build time
    //use when data on page is available at build time ahead of users request
    //headless CMS
    //homepage, user chooses a product, data is instantly populated through magic
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    console.log(product);

    return {
      props: { products, product }
    }
}

export default ProductDetails