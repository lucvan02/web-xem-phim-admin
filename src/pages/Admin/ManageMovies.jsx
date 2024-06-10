// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { getAllMovies, deleteMovie, addMovie, getAllCountries, getAllPersons, getAllCategories, uploadMovieImage } from '../../Utils/api';
// import Sidebar from './Sidebar';
// import './ManageMovie.css';
// import { FaEdit, FaTrashAlt } from 'react-icons/fa';

// const ManageMovies = () => {
//   const [movies, setMovies] = useState([]);
//   const [newMovie, setNewMovie] = useState({
//     name: '',
//     movieContent: '',
//     episodes: 1,
//     movieSchedule: 2024,
//     image: '',
//     countryId: 1,
//     star: 0,
//     price: 0,
//     views: 0,
//     status: 1,
//     episodeList: [],
//     categories: [],
//     persons: []
//   });
//   const [countries, setCountries] = useState([]);
//   const [persons, setPersons] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [newImage, setNewImage] = useState(null);

//   useEffect(() => {
//     fetchMovies();
//     fetchCountries();
//     fetchPersons();
//     fetchCategories();
//   }, []);

//   const fetchMovies = async () => {
//     try {
//       const data = await getAllMovies();
//       setMovies(data);
//     } catch (error) {
//       console.error('Error fetching movies:', error);
//     }
//   };

//   const fetchCountries = async () => {
//     try {
//       const countriesData = await getAllCountries();
//       setCountries(countriesData);
//     } catch (error) {
//       console.error('Error fetching countries:', error);
//     }
//   };

//   const fetchPersons = async () => {
//     try {
//       const personsData = await getAllPersons();
//       setPersons(personsData);
//     } catch (error) {
//       console.error('Error fetching persons:', error);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const categoriesData = await getAllCategories();
//       setCategories(categoriesData);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const handleDelete = async (movieId) => {
//     try {
//       await deleteMovie(movieId);
//       fetchMovies();
//     } catch (error) {
//       console.error('Error deleting movie:', error);
//     }
//   };

//   const handleAddMovie = async () => {
//     try {

//       const personIds = newMovie.persons.map(person => person.personId);
//       const categoryIds = newMovie.categories.map(category => category.categoryId);

//       const movieData = {
//         ...newMovie,
//         persons: personIds,
//         categories: categoryIds
//       };

//       const addedMovie =await addMovie(movieData);
//       // Upload image to server if an image is selected
//       if (newImage) {
//         await uploadImage(addedMovie.movieId);
//       }
//       fetchMovies();
//       resetNewMovie();
//       alert('Thêm phim thành công!');
//     } catch (error) {
//       console.error('Error adding movie:', error);
//       alert('Lỗi thêm phim, hãy thử lại sau!');
//     }
//   };

//   const resetNewMovie = () => {
//     setNewMovie({
//       name: '',
//       movieContent: '',
//       episodes: 0,
//       movieSchedule: 0,
//       image: '',
//       countryId: 1,
//       star: 0,
//       price: 0,
//       views: 0,
//       status: 1,
//       episodeList: [],
//       categories: [],
//       persons: []
//     });
//     setNewImage(null);
//   };

//   const handleImageChange = (e) => {
//     setNewImage(e.target.files[0]);
//   };

//   // Function to handle image upload
//   const uploadImage = async (movieId) => {
//     try {
//       const formData = new FormData();
//       formData.append('fileUpload', newImage);
//       formData.append('id', movieId);
      
//       await uploadMovieImage(formData);

//       console.log('Image uploaded successfully');
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };


//   return (
//     <div className='main-content'>
//       <Sidebar />
//       <div>
//         <h2>Thêm phim mới</h2>
//         <input
//           type="text"
//           placeholder="Tên phim"
//           value={newMovie.name}
//           onChange={(e) => setNewMovie({ ...newMovie, name: e.target.value })}
//         />
//         <input
//           type="file"
//           onChange={handleImageChange}
//         />
//         <input
//           type="text"
//           placeholder="Nội dung phim"
//           value={newMovie.movieContent}
//           onChange={(e) => setNewMovie({ ...newMovie, movieContent: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Số tập"
//           value={newMovie.episodes}
//           onChange={(e) => setNewMovie({ ...newMovie, episodes: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Lịch chiếu"
//           value={newMovie.movieSchedule}
//           onChange={(e) => setNewMovie({ ...newMovie, movieSchedule: e.target.value })}
//         />
//         <select
//           value={newMovie.countryId}
//           onChange={(e) => setNewMovie({ ...newMovie, countryId: e.target.value })}
//         >
//           {countries.map(country => (
//             <option key={country.countryId} value={country.countryId}>{country.name}</option>
//           ))}
//         </select>
//         <select
//           value={newMovie.persons}
//           onChange={(e) => setNewMovie({ ...newMovie, persons: Array.from(e.target.selectedOptions, option => parseInt(option.value)) })}
//           multiple={true}
//         >
//           {persons.map(person => (
//             <option key={person.personId} value={person.personId}>{person.name}</option>
//           ))}
//         </select>
//         <select
//           value={newMovie.categories}
//           onChange={(e) => setNewMovie({ ...newMovie, categories: Array.from(e.target.selectedOptions, option => parseInt(option.value)) })}
//           multiple={true}
//         >
//           {categories.map(category => (
//             <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
//           ))}
//         </select>
//         <button onClick={handleAddMovie}>Thêm</button>
//       </div>
  
//       <div className='table-container'>
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th></th>
//               <th>Tên phim</th>
//               <th>Số tập</th>
//               <th>Lịch chiếu</th>
//               <th>Quốc gia</th>
//               <th>Số sao</th>
//               <th>Giá</th>
//               <th>Lượt xem</th>
//               <th>Hành động</th>
//             </tr>
//           </thead>
//           <tbody>
//             {movies.map(movie => (
//               <tr key={movie.movieId}>
//                 <td>{movie.movieId}</td>
//                 <td>
//                   <img
//                     src={`${process.env.REACT_APP_UPLOAD_URL}/${movie.image}`}
//                     alt="image"
//                     style={{ width: '33px', height: 'auto' }}
//                   />
//                 </td>
//                 <td>{movie.name}</td>
//                 <td>{movie.episodes}</td>
//                 <td>{movie.movieSchedule}</td>
//                 <td>{movie.country.name}</td>
//                 <td>{movie.star}</td>
//                 <td>{movie.price}</td>
//                 <td>{movie.views}</td>
//                 <td>
//                   <Link to={`/admin/edit-movie/${movie.movieId}`} target="_blank"> <FaEdit style={{ cursor: 'pointer' }} /></Link>                             
//                   <FaTrashAlt onClick={() => handleDelete(movie.movieId)} style={{ cursor: 'pointer', marginLeft: '10px', color: 'red' }} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
  

// };

// export default ManageMovies;




























import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllMovies, deleteMovie } from '../../Utils/api';
import Sidebar from './Sidebar';
import './ManageMovie.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import AddMovie from './AddMovie';

const ManageMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const data = await getAllMovies();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleDelete = async (movieId) => {
    try {
      await deleteMovie(movieId);
      fetchMovies();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <div className='main-content'>
      <Sidebar />
      <AddMovie fetchMovies={fetchMovies} />
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th></th>
              <th>Tên phim</th>
              <th>Số tập</th>
              <th>Lịch chiếu</th>
              <th>Quốc gia</th>
              <th>Số sao</th>
              <th>Giá</th>
              <th>Lượt xem</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr key={movie.movieId}>
                <td>{movie.movieId}</td>
                <td>
                  <img
                    src={`${process.env.REACT_APP_UPLOAD_URL}/${movie.image}`}
                    alt="image"
                    style={{ width: '33px', height: 'auto' }}
                  />
                </td>
                <td>{movie.name}</td>
                <td>{movie.episodes}</td>
                <td>{movie.movieSchedule}</td>
                <td>{movie.country.name}</td>
                <td>{movie.star}</td>
                <td>{movie.price}</td>
                <td>{movie.views}</td>
                <td>
                  <Link to={`/admin/edit-movie/${movie.movieId}`} target="_blank">
                    <FaEdit style={{ cursor: 'pointer' }} />
                  </Link>
                  <FaTrashAlt
                    onClick={() => handleDelete(movie.movieId)}
                    style={{ cursor: 'pointer', marginLeft: '10px', color: 'red' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMovies;





