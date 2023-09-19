import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './components/Layout';
import { BsChevronDoubleRight, BsCheck2Square } from 'react-icons/bs';
import Counter from './components/Counter';
import ProductPicturesContainer from './components/ProductPicturesContainer';
import StoreCard from './components/StoreCard';

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [descActive, setDescActive] = useState(true);
  const [infoActive, setInfoActive] = useState(false);
  const star = require('../../src/public/images/star.png');
  const like = require('../public/icons/likes.png');

  

  useEffect(() => {
    // Ganti URL API sesuai kebutuhan Anda
    fetch(`http://localhost:4000/product/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }


  
  const focusDesc = () => {
    setDescActive(true);
    setInfoActive(false);
  }

  const focusInfo = () => {
    setDescActive(false);
    setInfoActive(true);
  }

  return (
    <Layout>
      <div className='flex w-full flex-row justify-start items-center gap-x-[18px] pt-6 pb-7 text-navicon'>
        <div className='font-ghotam text-[14px]'>Home</div>
        <BsChevronDoubleRight className='w-[13px] h-[13px]' />
        <div className='font-ghotam text-[14px] text-theme'>{product.title}</div>
      </div>
      <div className='flex w-full px-4 flex-col justify-center items-center py-[60px] max-w-[1440px] xl:px-20'>
        <div className='flex w-full flex-col md:flex-row items-start justify-between gap-x-[60px] pb-[23px] xl:justify-center xl:gap-x-[60px]'>
          <div className='flex flex-col gap-y-[24px]'>
            <div className='flex w-full border border-solid border-[#D8D8D8] lg:max-w-[400px]'>
              <div className='flex w-full items-center justify-center p-2'>
                <img src={product.imagesUrl} alt='Alat pembuat kopi' />
              </div>
            </div>
            <div className='flex w-full flex-row items-center justify-between gap-x-[5px] pb-[96px]'>
              {product.Images.map((image, index) => (
                <ProductPicturesContainer key={index} src={image.imgUrl} />
              ))}
            </div>
          </div>
          <div className='flex flex-col w-full lg:max-w-[500px]'>
            <div className='flex font-gotham700 md:text-[20px] lg:text-[24px] text-navicon tracking-[5px] pb-5'>{product.title}</div>
            <div className='flex font-gotham md:text-[18px] lg:text-[22px] text-navicon pb-2'>{product.namaProduct}</div>
            <div className='flex w-full gap-x-[2px] justify-start h-[10px] items-center pb-5'>
              {Array.from({ length: product.rating }, (_, index) => (
                <div key={index} className='flex w-[18px]'>
                <img src={star} alt='rating' />
                </div>
              ))}
              <div className='flex font-gotham text-[18px] text-authformtext w-[18px]'>{`(${product.rating})`}</div>
            </div>
            <div className='flex w-full justify-between pb-5'>
              <div className='flex w-full font-gotham600 text-left md:text-[18px] lg:text-[22px] text-theme leading-[21.5px]'>{`Rp. ${product.harga}`}</div>
              <div className='flex w-full font-gotham text-[12px] text-[#6F8EFF] leading-[11.48px] items-center justify-end'>
                <div>
                  <BsCheck2Square />
                </div>
                <div>Tersedia</div>
              </div>
            </div>
            <div className='flex w-full flex-col gap-y-4 lg:flex-row justify-start items-center md:items-start lg:items-center gap-x-4 pb-5'>
              <Counter />
              <button type='button' className='flex w-full lg:w-[251px] h-[53px] justify-center items-center bg-theme font-gotham500 text-textWhite px-2 tracking-[2px]'>
                TAMBAH KE KERANJANG
              </button>
              <button><img src={like} alt='like' /></button>
            </div>
            <div className='flex w-full max-w-[500px] font-gotham md:text-[16px] lg:text-[18px] text-navicon leading-[24px] flex-wrap'>
              {product.description}
            </div>
          </div>
        </div>
        <div className='flex w-full flex-row items-center justify-center gap-x-6 pb-[45px]'>
          <button type='button' onClick={focusDesc} className={`flex px-[39px] items-center justify-center font-gotham700 md:text-[18px] lg:text-[22px] ${descActive ? 'text-theme border-b-[3px] border-theme' : 'text-[#BEBEBE] border-0'}`}>DESKRIPSI</button>
          <button type='button' onClick={focusInfo} className={`flex px-[39px] items-center justify-center font-gotham700 md:text-[18px] lg:text-[22px] ${infoActive ? 'text-theme border-b-[3px] border-theme' : 'text-[#BEBEBE] border-0'}`}>INFORMASI</button>
        </div>
        <div className='flex w-full font-gotham leading-[20px] md:text-[16px] lg:text-[18px] text-navicon pb-4'>
          {descActive ? product.description : ''}
        </div>
        <div className='flex w-full font-gotham leading-[20px] md:text-[16px] lg:text-[18px] text-navicon pb-12'>
          {infoActive ? product.spesifikasi : ''}
        </div>
        <div className='flex w-full flex-col items-center justify-center font-gotham700 md:text-[18px] lg:text-[22px] text-navicon gap-y-[17px] pb-4'>
          REKOMENDASI UNTUK ANDA
          <hr className='w-[131px] h-[4px] bg-theme border-0' />
        </div>
        <div className='flex w-full flex-col gap-y-4 md:flex-row items-center justify-center font-gotham700 text-[22px] text-navicon gap-x-4'>
        <StoreCard key={product.id} product={product} />
        <StoreCard product={product} />
        <StoreCard product={product} />
        </div>
      </div>
    </Layout>
  );
}

export default Product;
