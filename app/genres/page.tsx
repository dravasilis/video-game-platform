'use client'
import { fetchGenres, selectGenres } from '@/redux/features/genres/genresSlice';
import { AppDispatch } from '@/redux/store';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MainNav from '../components/main-nav/main-nav';
import MainCard from '../components/shared/main-card/main-card';
import Loader from '../components/shared/loader/loader';
import Pagination from '../components/shared/pagination/pagination';
import Banner from '../components/landing-page/banner/banner';

const Genres = () => {
    const dispatch = useDispatch<AppDispatch>();
	const genresState = useSelector(selectGenres);
	
		// Dispatch the action only once on component mount
		useEffect(() => {
		!genresState.genres &&	dispatch(fetchGenres());
		}, [dispatch]); // Empty dependency array means this will only run once when the component mounts
	

	return (
		<>
			<MainNav header='Genres' results={genresState.genres?.count}>
			<Banner banner="gamesbg3.jpg" customBrightness={true}/>
			<div className="flex flex-col gap-8  px-20 max-lg:px-8 max-sm:px-0  z-10">
					{!genresState.loading ? (
						<div className="grid justify-items-center  grid-cols-5 max-[1700px]:grid-cols-5 max-2xl:grid-cols-4 max-lg:grid-cols-3  max-md:!grid-cols-2 min-[1700px]:gap-x-12  gap-y-8 w-full">
							{genresState.genres?.results.map((genre) => (
								<MainCard key={genre.id} data={genre} />
							))}
						</div>
					) : (
						<Loader />
					)}
					{genresState.genres && (
						<Pagination
							count={genresState.genres?.count ?? 0}
							length={genresState.genres?.results.length ?? 0}
							dispatch={dispatch} // Pass dispatch
							fetchAction={fetchGenres} // Pass fetch action for games
						/>
					)}
				</div>
			</MainNav>
		</>
	);
}

export default Genres
