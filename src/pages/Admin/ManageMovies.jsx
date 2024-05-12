// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { getAllMovies, deleteMovie, addMovie, updateMovie, getAllCountries, getAllPersons, getAllCategories } from '../../Utils/api';
// import Sidebar from './Sidebar';
// import './ManageMovie.css';

// const ManageMovies = () => {
//   const [movies, setMovies] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [newMovie, setNewMovie] = useState({
//     name: '',
//     movieContent: 'Đây là nội dung phim',
//     episodes: 1,
//     movieSchedule: 2024,
//     image: 'https://m.media-amazon.com/images/I/61KYVvWl-LL._AC_UF894,1000_QL80_.jpg',
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

//   const handleEdit = (movie) => {
//     setSelectedMovie(movie);
//   };

//   const handleDelete = async (movieId) => {
//     try {
//       await deleteMovie(movieId);
//       fetchMovies();
//     } catch (error) {
//       console.error('Error deleting movie:', error);
//     }
//   };

//   // const handleAddMovie = async () => {
//   //   try {
//   //     await addMovie(newMovie);
//   //     fetchMovies();
//   //     resetNewMovie();
//   //   } catch (error) {
//   //     console.error('Error adding movie:', error);
//   //   }
//   // };

//   const handleAddMovie = async () => {
//     try {
//       // Trích xuất mảng ID của persons và categories từ newMovie
//       const personIds = newMovie.persons.map(person => person.personId);
//       const categoryIds = newMovie.categories.map(category => category.categoryId);
  
//       // Tạo một bản sao của newMovie với persons và categories được thay thế bằng mảng ID
//       const movieData = {
//         ...newMovie,
//         persons: personIds,
//         categories: categoryIds
//       };
  
//       // Gửi yêu cầu API với dữ liệu đã chỉnh sửa
//       await addMovie(movieData);
//       fetchMovies();
//       resetNewMovie();
//       alert('Movie created successfully!');
//     } catch (error) {
//       console.error('Error adding movie:', error);
//       alert('Failed to create movie. Please try again later.');
//     }
//   };
  

//   const handleUpdateMovie = async () => {
//     try {
//       await updateMovie(selectedMovie.movieId, selectedMovie);
//       fetchMovies();
//       setSelectedMovie(null);
//     } catch (error) {
//       console.error('Error updating movie:', error);
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
//   };

//   return (
//     <div className='main-content'>
//         <Sidebar/>
//       <div>
//         <h3><strong>Thêm phim mới</strong></h3>
//         <p>Tên phim</p>
//         <input
//           type="text"
//           placeholder="Tên phim"
//           value={newMovie.name}
//           onChange={(e) => setNewMovie({ ...newMovie, name: e.target.value })}
//         />
//         <p>Link hình ảnh</p>
//         <input
//           type="text"
//           placeholder="Url hình ảnh"
//           value={newMovie.image}
//           onChange={(e) => setNewMovie({ ...newMovie, image: e.target.value })}
//         />
//         <p>Nội dung phim</p>
//         <input
//           type="text"
//           placeholder="Nội dung phim"
//           value={newMovie.movieContent}
//           onChange={(e) => setNewMovie({ ...newMovie, movieContent: e.target.value })}
//         />
//         <p>Số tập</p>
//         <input
//           type="number"
//           placeholder="Số tập"
//           value={newMovie.episodes}
//           onChange={(e) => setNewMovie({ ...newMovie, episodes: e.target.value })}
//         />
//         <p>Lịch chiếu</p>
//         <input
//           type="number"
//           placeholder="Lịch chiếu"
//           value={newMovie.movieSchedule}
//           onChange={(e) => setNewMovie({ ...newMovie, movieSchedule: e.target.value })}
//         />
//         <p>Quốc gia</p>
//         <select
//           value={newMovie.countryId}
//           onChange={(e) => setNewMovie({ ...newMovie, countryId: e.target.value })}
//         >
//           {countries.map(country => (
//             <option key={country.countryId} value={country.countryId}>{country.name}</option>
//           ))}
//         </select>

//           <p>Diễn viên</p>
//           <select
//             value={newMovie.persons}
//             onChange={(e) => setNewMovie({ ...newMovie, persons: Array.from(e.target.selectedOptions, option => parseInt(option.value)) })}
//             multiple={true}
//           >
//             {persons.map(person => (
//               <option key={person.personId} value={person.personId}>{person.name}</option>
//             ))}
//           </select>
//           <p>Thể loại</p>
//           <select
//             value={newMovie.categories}
//             onChange={(e) => setNewMovie({ ...newMovie, categories: Array.from(e.target.selectedOptions, option => parseInt(option.value)) })}
//             multiple={true}
//           >
//             {categories.map(category => (
//               <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
//             ))}
//           </select>

//         <button onClick={handleAddMovie}>Thêm</button>
//         </div>

        
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th></th>
//             <th>Tên phim</th>
//             {/* <th>Nội dung phim</th> */}
//             <th>Số tập</th>
//             <th>Lịch chiếu</th>
//             <th>Quốc gia</th>
//             <th>Số sao</th>
//             <th>Giá</th>
//             <th>Lượt xem</th>
//             {/* <th>Trạng thái</th> */}
//             <th>Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {movies.map(movie => (
//             <tr key={movie.movieId}>
              
//               <td>{movie.movieId}</td>
//               <td>
//                 <img
//                   src={movie.image}
//                   alt="image"
//                   style={{ width: '33px', height: 'auto' }}
//                 />
//               </td>

//               <td>{movie.name}</td>
//               {/* <td>{movie.movieContent}</td> */}
//               <td>{movie.episodes}</td>
//               <td>{movie.movieSchedule}</td>
//               <td>{movie.country.name}</td>
//               <td>{movie.star}</td>
//               <td>{movie.price}</td>
//               <td>{movie.views}</td>
//               {/* <td>{movie.status === 1 ? 'Active' : 'Inactive'}</td> */}
//               <td>
//                 <button onClick={() => handleEdit(movie)}>Sửa</button>
//                 <button onClick={() => handleDelete(movie.movieId)}>Xoá</button>
//                 <Link to={`/admin/edit-movie/${movie.movieId}`} target="_blank"><button>Chi tiết</button></Link> {/* Link đến trang chi tiết của phim */}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Modal for editing */}
//       {selectedMovie && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={() => setSelectedMovie(null)}>&times;</span>
//             <h2>Edit Movie</h2>
//             <input
//               type="text"
//               placeholder="Tên phim"
//               value={selectedMovie.name}
//               onChange={(e) => setSelectedMovie({ ...selectedMovie, name: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Nội dung phim"
//               value={selectedMovie.movieContent}
//               onChange={(e) => setSelectedMovie({ ...selectedMovie, movieContent: e.target.value })}
//             />
//              <input
//               type="text"
//               placeholder="Link hình ảnh"
//               value={selectedMovie.image}
//               onChange={(e) => setSelectedMovie({ ...selectedMovie, image: e.target.value })}
//             />
//             <input
//           type="number"
//           placeholder="Số tập"
//           value={selectedMovie.episodes}
//           onChange={(e) => setNewMovie({ ...selectedMovie, episodes: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Lịch chiếu"
//           value={selectedMovie.movieSchedule}
//           onChange={(e) => setNewMovie({ ...selectedMovie, movieSchedule: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Quốc gia"
//           value={selectedMovie.countryId}
//           onChange={(e) => setNewMovie({ ...newMovie, countryId: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Số sao" 
//           value={selectedMovie.star}
//           onChange={(e) => setNewMovie({ ...selectedMovie, star: e.target.value })}
//         />

//             {/* Add more input fields for other movie attributes */}
//             <button onClick={handleUpdateMovie}>Cập nhật</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageMovies;











import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllMovies, deleteMovie, addMovie, getAllCountries, getAllPersons, getAllCategories, uploadMovieImage } from '../../Utils/api';
import Sidebar from './Sidebar';
import './ManageMovie.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const ManageMovies = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    name: '',
    movieContent: '',
    episodes: 1,
    movieSchedule: 2024,
    image: '',
    countryId: 1,
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
    fetchMovies();
    fetchCountries();
    fetchPersons();
    fetchCategories();
  }, []);

  const fetchMovies = async () => {
    try {
      const data = await getAllMovies();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

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

  const handleDelete = async (movieId) => {
    try {
      await deleteMovie(movieId);
      fetchMovies();
    } catch (error) {
      console.error('Error deleting movie:', error);
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

      const addedMovie =await addMovie(movieData);
      // Upload image to server if an image is selected
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
      episodes: 0,
      movieSchedule: 0,
      image: '',
      countryId: 1,
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

  // Function to handle image upload
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
    <div className='main-content'>
      <Sidebar />
      <div>
        <h2>Thêm phim mới</h2>
        <input
          type="text"
          placeholder="Tên phim"
          value={newMovie.name}
          onChange={(e) => setNewMovie({ ...newMovie, name: e.target.value })}
        />
        <input
          type="file"
          onChange={handleImageChange}
        />
        <input
          type="text"
          placeholder="Nội dung phim"
          value={newMovie.movieContent}
          onChange={(e) => setNewMovie({ ...newMovie, movieContent: e.target.value })}
        />
        <input
          type="number"
          placeholder="Số tập"
          value={newMovie.episodes}
          onChange={(e) => setNewMovie({ ...newMovie, episodes: e.target.value })}
        />
        <input
          type="number"
          placeholder="Lịch chiếu"
          value={newMovie.movieSchedule}
          onChange={(e) => setNewMovie({ ...newMovie, movieSchedule: e.target.value })}
        />
        <select
          value={newMovie.countryId}
          onChange={(e) => setNewMovie({ ...newMovie, countryId: e.target.value })}
        >
          {countries.map(country => (
            <option key={country.countryId} value={country.countryId}>{country.name}</option>
          ))}
        </select>
        <select
          value={newMovie.persons}
          onChange={(e) => setNewMovie({ ...newMovie, persons: Array.from(e.target.selectedOptions, option => parseInt(option.value)) })}
          multiple={true}
        >
          {persons.map(person => (
            <option key={person.personId} value={person.personId}>{person.name}</option>
          ))}
        </select>
        <select
          value={newMovie.categories}
          onChange={(e) => setNewMovie({ ...newMovie, categories: Array.from(e.target.selectedOptions, option => parseInt(option.value)) })}
          multiple={true}
        >
          {categories.map(category => (
            <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
          ))}
        </select>
        <button onClick={handleAddMovie}>Thêm</button>
      </div>

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
                  src={movie.image}
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
                {/* <button onClick={() => handleDelete(movie.movieId)}>Xoá</button>              
                <Link to={`/admin/edit-movie/${movie.movieId}`} target="_blank"><button>Chi tiết</button></Link> */}

                <Link to={`/admin/edit-movie/${movie.movieId}`} target="_blank"> <FaEdit style={{ cursor: 'pointer' }} /></Link>                             
                <FaTrashAlt onClick={() => handleDelete(movie.movieId)} style={{ cursor: 'pointer', marginLeft: '10px', color: 'red' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageMovies;
