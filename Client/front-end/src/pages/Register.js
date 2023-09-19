import React, { useState } from 'react';
import Card from './components/Card';
import AuthHeader from './components/AuthHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [isReplaced, setIsReplaced] = useState(false);
  const [formData, setFormData] = useState({
    namaDepan: '',
    namaBelakang: '',
    email: '',
    nomorTelepon: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const getValue = (e) => {
    e.preventDefault();
    setIsReplaced(!isReplaced);
  };

  const previous = (e) => {
    e.preventDefault();
    setIsReplaced(!isReplaced);
  };

  const navigateToLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Kirim permintaan registrasi ke backend
    try {
      const response = await axios.post('http://localhost:4000/register', formData);

      // Tampilkan pesan sukses atau lakukan navigasi ke halaman login
      console.log(response.data); // Pesan sukses dari backend

      // Lakukan navigasi ke halaman login
      navigate('/login');
    } catch (error) {
      // Tangani kesalahan, misalnya tampilkan pesan kesalahan
      console.error(error);
    }
  };

  return (
    <div className='flex w-screen min-h-screen flex-col justify-center items-center'>
      <div className='flex w-full h-full justify-center py-4 px-4'>
        <Card>
          <div className={`w-full flex-col ${isReplaced ? 'hidden' : 'flex'}`}>
            <AuthHeader text={'Daftar Sekarang'} />
            <form className='flex w-full pt-9 flex-col'>
              <div className='flex flex-col w-full pb-[25px]'>
                <input
                  type='text'
                  name='namaDepan'
                  placeholder='Nama Depan'
                  value={formData.namaDepan}
                  onChange={handleInputChange}
                  className='bg-white rounded-[7px] shadow-authform py-5 px-[18px] focus:outline-none font-gotham text-authformtext text-4'
                />
              </div>
              <div className='flex flex-col w-full pb-[25px]'>
                <input
                  type='text'
                  name='namaBelakang'
                  placeholder='Nama Belakang'
                  value={formData.namaBelakang}
                  onChange={handleInputChange}
                  className='bg-white rounded-[7px] shadow-authform py-5 px-[18px] focus:outline-none font-gotham text-authformtext text-4'
                />
              </div>
              <div className='relative flex flex-col w-full pb-5'>
                <input
                  type='text'
                  name='email'
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className='bg-white rounded-[7px] shadow-authform py-5 px-[18px] focus:outline-none font-gotham text-authformtext text-4'
                />
              </div>
              <div className='flex w-full pb-10'>
                <button onClick={getValue} className='w-full bg-theme text-textWhite font-gotham text-[18px] py-[21px] rounded-[7px] shadow-authbutton'>
                  SELANJUTNYA
                </button>
              </div>
            </form>
          </div>
          <div className={`w-full flex flex-col ${isReplaced ? 'flex' : 'hidden'}`}>
            <button onClick={previous} className='flex text-dark font-gotham500 text-[22px]'>
              &#x2190; Kembali
            </button>
            <form className='flex w-full pt-9 flex-col'>
              <div className='flex flex-col w-full pb-[25px]'>
                <input
                  type='number'
                  name='nomorTelepon'
                  placeholder='Nomor Telepon'
                  value={formData.nomorTelepon}
                  onChange={handleInputChange}
                  className='bg-white rounded-[7px] shadow-authform py-5 px-[18px] focus:outline-none font-gotham text-authformtext'
                />
              </div>
              <div className='relative flex flex-col w-full pb-5'>
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleInputChange}
                  className='bg-white rounded-[7px] shadow-authform py-5 px-[18px] focus:outline-none font-gotham text-authformtext'
                />
                <div className='text-dark font-gotham text-[14px] absolute right-0 bottom-[50%] flex items-center px-4 md:text-[16px]'>
                  Show
                </div>
              </div>
              <div className='relative flex flex-col w-full pb-5'>
                <input
                  type='password'
                  name='confirmPassword'
                  placeholder='Konfirmasi Password'
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className='bg-white rounded-[7px] shadow-authform py-5 px-[18px] focus:outline-none font-gotham text-authformtext'
                />
                <div className='text-dark font-gotham text-[14px] absolute right-0 bottom-[50%] flex items-center px-4 md:text-[16px]'>
                  Show
                </div>
              </div>
              <div className='flex w-full pb-10'>
                <button onClick={handleRegister} className='w-full bg-theme text-textWhite font-gotham text-[18px] py-[21px] rounded-[7px] shadow-authbutton'>
                  SELANJUTNYA
                </button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Register;
