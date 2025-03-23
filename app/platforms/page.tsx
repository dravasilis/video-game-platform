'use client'
import { fetchPlatforms, selectPlatforms } from '@/redux/features/platforms/platformsSlice';
import { AppDispatch } from '@/redux/store';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MainNav from '../components/main-nav/main-nav';
import MainCard from '../components/shared/main-card/main-card';
import { Loader } from 'lucide-react';
import Pagination from '../components/shared/pagination/pagination';
import Banner from '../components/landing-page/banner/banner';

const Platforms = () => {
    const dispatch = useDispatch<AppDispatch>();
	
    // Dispatch the action only once on component mount
    useEffect(() => {
        dispatch(fetchPlatforms());
    }, [dispatch]); // Empty dependency array means this will only run once when the component mounts

    const platforms = useSelector(selectPlatforms);
    console.log(platforms);

return (
    <>
        <MainNav header='Platforms' results={platforms?.count}>
				<Banner banner="gamesbg5.jpg" customBrightness={true} />
                <div className="flex flex-col gap-8  px-20 max-lg:px-10 max-sm:px-4 py-6 z-10">
                {platforms?.results ? (
                    <div className="grid grid-cols-5 max-[1700px]:grid-cols-5 max-2xl:grid-cols-4 max-lg:grid-cols-3  max-md:!grid-cols-2  gap-y-8 w-full justify-center ">
                        {platforms.results.map((platform) => (
                            <MainCard key={platform.id} data={platform} />
                        ))}
                    </div>
                ) : (
                    <Loader />
                )}
                {platforms && (
                    <Pagination
                        count={platforms?.count ?? 0}
                        length={platforms?.results.length ?? 0}
                        dispatch={dispatch} // Pass dispatch
                        fetchAction={fetchPlatforms} // Pass fetch action for games
                    />
                )}
            </div>
        </MainNav>
    </>
);
}

export default Platforms
