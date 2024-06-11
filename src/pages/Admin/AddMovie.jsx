import React, { useState, useEffect } from 'react';
import { getAllCountries, getAllPersons, getAllCategories, addMovie, uploadMovieImage } from '../../Utils/api';
import './AddMovie.css';

const AddMovie = ({ fetchMovies }) => {
  const [newMovie, setNewMovie] = useState({
    name: '',
    movieContent: '',
    episodes: 1,
    movieSchedule: 2024,
    image: '',
    countryId: 2,
    star: 0,
    price: 0,
    views: 0,
    status: 1,
    episodeList: [],
    categories: [],
    persons: []
  });
  const [countries, setCountries] = useState([]);
  const [persons, setPersons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    fetchCountries();
    fetchPersons();
    fetchCategories();
  }, []);

  const fetchCountries = async () => {
    try {
      const countriesData = await getAllCountries();
      setCountries(countriesData);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchPersons = async () => {
    try {
      const personsData = await getAllPersons();
      setPersons(personsData);
    } catch (error) {
      console.error('Error fetching persons:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddMovie = async () => {
    try {
      const personIds = newMovie.persons.map(person => person.personId);
      const categoryIds = newMovie.categories.map(category => category.categoryId);

      const movieData = {
        ...newMovie,
        persons: personIds,
        categories: categoryIds
      };

      const addedMovie = await addMovie(movieData);

      if (newImage) {
        await uploadImage(addedMovie.movieId);
      }

      fetchMovies();
      resetNewMovie();
      alert('Thêm phim thành công!');
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Lỗi thêm phim, hãy thử lại sau!');
    }
  };

  const resetNewMovie = () => {
    setNewMovie({
      name: '',
      movieContent: '',
      episodes: 1,
      movieSchedule: 2024,
      image: '',
      countryId: 2,
      star: 0,
      price: 0,
      views: 0,
      status: 1,
      episodeList: [],
      categories: [],
      persons: []
    });
    setNewImage(null);
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const uploadImage = async (movieId) => {
    try {
      const formData = new FormData();
      formData.append('fileUpload', newImage);
      formData.append('id', movieId);
      
      await uploadMovieImage(formData);
      console.log('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="add-movie-container">
      <h2>Thêm phim mới</h2>
      <form className="add-movie-form">
        <div className="form-column">
          <div className="form-group">
            <label>Tên phim</label>
            <input
              type="text"
              placeholder="Tên phim"
              value={newMovie.name}
              onChange={(e) => setNewMovie({ ...newMovie, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Chọn ảnh</label>
            <input
              type="file"
              onChange={handleImageChange}
            />
          </div>
          <div className="form-group">
            <label>Nội dung phim</label>
            <textarea
              placeholder="Nội dung phim"
              value={newMovie.movieContent}
              onChange={(e) => setNewMovie({ ...newMovie, movieContent: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Số tập</label>
            <input
              type="number"
              placeholder="Số tập"
              value={newMovie.episodes}
              onChange={(e) => setNewMovie({ ...newMovie, episodes: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Lịch chiếu</label>
            <input
              type="number"
              placeholder="Lịch chiếu"
              value={newMovie.movieSchedule}
              onChange={(e) => setNewMovie({ ...newMovie, movieSchedule: e.target.value })}
            />
          </div>
        </div>
        <div className="form-column">
          <div className="form-group">
            <label>Quốc gia</label>
            <select
              value={newMovie.countryId}
              onChange={(e) => setNewMovie({ ...newMovie, countryId: e.target.value })}
            >
              {countries.map(country => (
                <option key={country.countryId} value={country.countryId}>{country.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Diễn viên</label>
            <select
              value={newMovie.persons}
              onChange={(e) => setNewMovie({ ...newMovie, persons: Array.from(e.target.selectedOptions, option => parseInt(option.value)) })}
              multiple={true}
            >
              {persons.map(person => (
                <option key={person.personId} value={person.personId}>{person.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Thể loại</label>
            <select
              value={newMovie.categories}
              onChange={(e) => setNewMovie({ ...newMovie, categories: Array.from(e.target.selectedOptions, option => parseInt(option.value)) })}
              multiple={true}
            >
              {categories.map(category => (
                <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Giá mua</label>
            <input
              type="number"
              placeholder="Lịch chiếu"
              value={newMovie.price}
              onChange={(e) => setNewMovie({ ...newMovie, price: e.target.value })}
            />
          </div>
          <button type="button" onClick={handleAddMovie}>Thêm</button>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
