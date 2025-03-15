import React from 'react'
import { CarouselUI } from '../carousel/CardsCarousel'

interface Props{
    games:any,
    title:string
}

const FeatureShowcase = ({games,title}:Props) => {
  return (
   <div className="flex flex-col justify-center items-center gap-8 py-24">
                    <span className="text-5xl  w-full ">{title}</span>
                    <div className="w-full h-1 rounded-lg bg-primary-100 box-shadow"></div>
                        <CarouselUI games={games}/>
                </div>
  )
}

export default FeatureShowcase
