import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Home from '../pages/Home/Home';
import MovieCategory from '../pages/MovieByCategory/MovieByCategory';
import MovieDetail from '../pages/MovieDetail/MovieDetail';
import CategoryMovies from '../pages/CategoryMovie/CategoryMovie';
import MovieNew from '../pages/MovieNew/MovieNew';

import WatchMovie from '../pages/WatchMovie/WatchMovie';
import MovieList from '../components/Movie/MovieList';

import ManageCountriesPage from '../pages/Admin/ManageCountriesPage';
import ManageCategories from '../pages/Admin/ManageCategories';
import ManagePersons from '../pages/Admin/ManagePersons';
import ManageMovies from '../pages/Admin/ManageMovies';
import Sidebar from '../pages/Admin/Sidebar';
import ActorListSidebar from '../components/Sidebar/ActorListSidebar';
import RandomMovieSidebar from '../components/Sidebar/RandomMovieSidebar';

import CountryMovies from '../pages/CountryMovie/CountryMovie';

import ManageEpisodes from '../pages/Admin/ManageEpisodes';
import EditMovie from '../pages/Admin/EditMovie';
import ProfilePage from '../pages/Profile';
import AddEpisode from '../pages/Admin/ManageEpisodes';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/phim-moi" element={<MovieNew />} />
      <Route path="/phim-le" element={<MovieCategory categoryId={1} />} />
      <Route path="/phim-bo" element={<MovieCategory categoryId={2} />} />
      
      <Route path="/the-loai/:categoryId" element={<CategoryMovies/>} />
      <Route path="/quoc-gia/:countryId" element={<CountryMovies/>} />

      <Route path="/actor" element={<ActorListSidebar />} />
      <Route path="/random" element={<RandomMovieSidebar />} />
      {/* <Route path='/profile' element={<ProfilePage />} /> */}

      <Route path="/movie/:movieId" element={<MovieDetail />} />
      <Route path="/watch/:movieId/:episodeId" element={<WatchMovie/>} />

      
      <Route path="admin" element={<Sidebar/>} />
      <Route path="admin/manage-movies" element={<ManageMovies/>} />
      <Route path="admin/manage-categories" element={<ManageCategories/>} />
      <Route path="admin/manage-countries" element={<ManageCountriesPage/>} />
      <Route path="admin/manage-actors" element={<ManagePersons/>} />
      <Route path="admin/edit-movie/:movieId" element={<EditMovie/>} />
      <Route path="admin/movie/:movieId" element={<ManageEpisodes/>} />
      {/* <Route path="admin/movie/add-episode" element={<AddEpisode/>}/> */}
    </Routes>
  );
};

export default AppRoutes;