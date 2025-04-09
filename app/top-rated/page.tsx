'use client'
import { fetchTopRatedGames, selectTopRatedGames } from '@/redux/features/games/gamesSlice'
import { AppDispatch } from '@/redux/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainNav from '../components/main-nav/main-nav'
import Banner from '../components/landing-page/banner/banner'
import Link from 'next/link'
import MainCard from '../components/shared/main-card/main-card'
import Loader from '../components/shared/loader/loader'
import Pagination from '../components/shared/pagination/pagination'

const TopRated = () => {
    const dispatch = useDispatch<AppDispatch>()
    const topRatedGames = useSelector(selectTopRatedGames) 
    useEffect(() => {
      if(!topRatedGames){
       dispatch(fetchTopRatedGames()) 
      }
      
    },[])
    return (
    <div>
        <MainNav header="Top Rated" results={topRatedGames?.count ?? 0}>
        <Banner banner="gamesbg2.jpg" customBrightness={true} />
        <div className="flex flex-col gap-8  px-20 max-lg:px-8 max-sm:px-0  z-10">
        {topRatedGames ? (
            <div className="grid justify-items-center  grid-cols-5 max-[1700px]:grid-cols-5 max-2xl:grid-cols-4 max-lg:grid-cols-3  max-md:!grid-cols-2 min-[1700px]:gap-x-12  gap-y-8 w-full ">
              {(topRatedGames.count ?? 0) > 0 ? (
                topRatedGames.results.map((game) => (
                  <Link href={`/games/${game.id}`} key={game.id}>
                    <MainCard data={game} />
                  </Link>
                ))
              ) : (
                <div>Something went wrong</div>
              )}
            </div>
          ) : (
            <Loader />
          )}
          <Pagination
       count={topRatedGames?.count ?? 0}
       length={topRatedGames?.results?.length ?? 0}
       dispatch={dispatch} // Pass dispatch
       fetchAction={fetchTopRatedGames} // Pass fetch action for games
     />
            </div>
            </MainNav>
    </div>
  )
}

export default TopRated
