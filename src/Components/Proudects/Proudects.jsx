
import { useQuery } from '@tanstack/react-query';
import Style from './Proudects.module.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProudectCart from '../ProudectCart/ProudectCart';
export default function Proudects() {

  async function AddProudect(pId) {
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
        {
          productId: pId
        },
        {
          headers: {
            token: localStorage.getItem("userToken")
          }
        }
      )
      console.log(data);

    } catch (error) {
      console.log(error);

    }
  }
  function getProudect() {

    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['Proudects'],
    queryFn: getProudect,
    staleTime: 3000,
  })

  if (isError) {
    return <> {JSON.stringify(error)}</>
  }
  function RendumProudect() {

    var Item = data?.data.data.map((proudect) => (
      <>

        <div className=' '>
          <ProudectCart proudect={proudect} />
        </div>

      </>
 
    ));
    return Item;

  }

  return (
    <div className="grid grid-cols-5 gap-5 mt-5"> {RendumProudect()} </div>
  )
}
