import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetail, updateMovie, uploadMovieImage, uploadEpisodeVideo } from '../../Utils/api';
// import './EditMovie.css';
import './ManageMovie.css';
import Sidebar from './Sidebar';

const EditMovie = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    episodes: 0,
    movieSchedule: '',
    country: '',
    star: 0,
    price: 0,
    views: 0,
    categories: [],
    persons: [],
    episodeList: []
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const movieDetail = await getMovieDetail(movieId);
        setMovie(movieDetail);
        setFormData({
          name: movieDetail.name,
          image: movieDetail.image,
          episodes: movieDetail.episodes,
          movieSchedule: movieDetail.movieSchedule,
          country: movieDetail.country.name,
          star: movieDetail.star,
          price: movieDetail.price,
          views: movieDetail.views,
          categories: movieDetail.categories,
          persons: movieDetail.persons,
          episodeList: movieDetail.episodeList
        });
        setLoading(false);
      } catch (error) {
        setError('Error fetching movie detail');
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  const handleFileChange = (file) => {
    setFile(file);
  };

  const handleUploadMovieImage = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }
    try {
      await uploadMovieImage(file, movieId);
      // Cập nhật lại thông tin phim sau khi upload ảnh
      const updatedMovie = await getMovieDetail(movieId);
      setMovie(updatedMovie);
      setFormData({
        ...formData,
        image: updatedMovie.image
      });
      alert('Movie image uploaded successfully!');
    } catch (error) {
      // Handle error
    }
  };

  const handleUploadEpisodeVideo = async (episodeId) => {
    if (!file) {
      alert('Please select a file.');
      return;
    }
    try {
      await uploadEpisodeVideo(file, episodeId);
      // Cập nhật lại thông tin tập phim sau khi upload video
      const updatedMovie = await getMovieDetail(movieId);
      setMovie(updatedMovie);
      setFormData({
        ...formData,
        episodeList: updatedMovie.episodeList
      });
      alert('Episode video uploaded successfully!');
    } catch (error) {
      // Handle error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { ...formData };
      // Gọi API để cập nhật thông tin phim
      await updateMovie(movieId, updatedData);
      alert('Movie updated successfully!');
    } catch (error) {
      // Handle error
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!movie) {
    return <div className="no-movie">No movie found</div>;
  }

  return (
    <div className='main-content'>
      <Sidebar/>
      <div >
        <h2>Edit Movie: {formData.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input type="file" id="image" onChange={(e) => handleFileChange(e.target.files[0])} />
            <button type="button" onClick={handleUploadMovieImage}>Upload Movie Image</button>
            <img src={`${process.env.REACT_APP_UPLOAD_URL}/${formData.image}`} alt={formData.name} className="poster" />
          </div>
          <div className="form-group">
            <label htmlFor="episodes">Episodes:</label>
            <input type="number" id="episodes" value={formData.episodes} onChange={(e) => setFormData({ ...formData, episodes: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="movieSchedule">Release Year:</label>
            <input type="text" id="movieSchedule" value={formData.movieSchedule} onChange={(e) => setFormData({ ...formData, movieSchedule: e.target.value })} />
          </div>
          <div>
            <label htmlFor="country">Country:</label>
            <input type="text" id="country" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
          </div>
          <div>
            <label htmlFor="star">Rating:</label>
            <input type="number" id="star" value={formData.star} onChange={(e) => setFormData({ ...formData, star: e.target.value })} />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="views">Views:</label>
            <input type="number" id="views" value={formData.views} onChange={(e) => setFormData({ ...formData, views: e.target.value })} />
          </div>
          <div className="form-group">
            <label >Categories:</label>
            {formData.categories.map(category => (
              <span key={category.categoryId}>{category.name}</span>
            ))}
          </div>
          <div className="form-group">
            <label>Persons:</label>
            {formData.persons.map(person => (
              <div key={person.personId}>
                <img src={person.image} alt={person.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }} />
                <span>{person.name}</span>
              </div>
            ))}
          </div>
          <div>
            <label>Episode List:</label>
            {formData.episodeList.map(episode => (
              <div key={episode.episodeId}>
                <span>{episode.name}</span>
                <input type="file" onChange={(e) => handleFileChange(e.target.files[0])} />
                <button type="button" onClick={() => handleUploadEpisodeVideo(episode.episodeId)}>Upload Video</button>
              </div>
            ))}
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditMovie;
