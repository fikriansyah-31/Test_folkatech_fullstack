// MainStoreComponent.js
import React, { useState, useEffect } from 'react';
import StoreCard from './StoreCard';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';

function MainStoreComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  // State to store the list of products
  const [products, setProducts] = useState([]);

  // Fetch data when the component mounts
  useEffect(() => {
    // Replace with your API endpoint
    axios
      .get('http://localhost:4000/product', {
        headers: {
          Authorization: 'Bearer your_access_token', // Ganti dengan akses token yang sesuai
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='w-full flex flex-col pt-2'>
      <div className='flex w-full flex-col gap-y-[1rem] justify-between items-center lg:flex-row'>
        <div className='w-auto flex gap-x-[14px] font-gotham500 text-4 text-navicon items-center'>
          <div>Menampilkan</div>
          <div className='flex w-[48px]'>
            <select
              name='items'
              id='items'
              className='bg-[#f2f2f2] px-1 focus:outline-none py-2 rounded-[7px]'
            >
              <option value='12' selected>
                12
              </option>
              <option value='6'>6</option>
              <option value='3'>3</option>
            </select>
          </div>
          <div>dari {products.length}</div>
        </div>
        <div className='flex gap-x-3 font-gotham500 text-4 text-navicon items-center'>
          <div>Urutkan</div>
          <div className='flex'>
            <select
              name='items'
              id='items'
              className='bg-[#f2f2f2] px-4 focus:outline-none py-2 rounded-[7px]'
            >
              <option value='Nama' selected>
                Nama Produk
              </option>
              <option value='Terbaru'>Terbaru</option>
              <option value='Rating Tertinggi'>Rating Tertinggi</option>
            </select>
          </div>
        </div>
        <button
          type='button'
          onClick={onOpen}
          className='flex px-2 py-2 bg-theme w-[150px] font-gotham text-textWhite rounded-[7px] shadow-searchbox lg:hidden'
        >
          Opsi Pencarian
        </button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Opsi Pencarian</DrawerHeader>

            <DrawerBody>{/* Isi konten drawer di sini */}</DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
      <div className='w-full flex pt-[34px] flex-wrap gap-y-4 pb-8 justify-center lg:justify-between'>
        {products.map((product) => (
          <StoreCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default MainStoreComponent;
