// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { getMovieDetail, updateMovie, uploadMovieImage, uploadEpisodeVideo, deleteEpisode } from '../../Utils/api';
// import './EditMovie.css';

// const EditMovie = () => {
//   const { movieId } = useParams();
//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [saveMessage, setSaveMessage] = useState('');
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [file, setFile] = useState(null);
//   const [episodeFiles, setEpisodeFiles] = useState({});

//   useEffect(() => {
//     const fetchMovieDetail = async () => {
//       try {
//         const movieDetail = await getMovieDetail(movieId);
//         setMovie(movieDetail);
//         setFormData({
//           name: movieDetail.name,
//           image: movieDetail.image,
//           episodes: movieDetail.episodes,
//           movieSchedule: movieDetail.movieSchedule,
//           country: movieDetail.country.name,
//           star: movieDetail.star,
//           price: movieDetail.price,
//           views: movieDetail.views,
//           categories: movieDetail.categories,
//           persons: movieDetail.persons,
//           episodeList: movieDetail.episodeList,
//           movieContent: movieDetail.movieContent
//         });
//         setLoading(false);
//       } catch (error) {
//         setError('Error fetching movie detail');
//         setLoading(false);
//       }
//     };

//     fetchMovieDetail();
//   }, [movieId]);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleEpisodeFileChange = (e, episodeId) => {
//     setEpisodeFiles({ ...episodeFiles, [episodeId]: e.target.files[0] });
//   };

//   const handleUploadMovieImage = async () => {
//     if (!file) {
//       alert('Please select a file.');
//       return;
//     }
//     try {
//       await uploadMovieImage(file, movieId);
//       const updatedMovie = await getMovieDetail(movieId);
//       setMovie(updatedMovie);
//       setFormData({
//         ...formData,
//         image: updatedMovie.image
//       });
//       alert('Movie image uploaded successfully!');
//     } catch (error) {
//       alert('Error uploading movie image');
//     }
//   };

//   const handleUploadEpisodeVideo = async (episodeId) => {
//     const episodeFile = episodeFiles[episodeId];
//     if (!episodeFile) {
//       alert('Please select a file.');
//       return;
//     }
//     try {
//       await uploadEpisodeVideo(episodeFile, episodeId);
//       const updatedMovie = await getMovieDetail(movieId);
//       setMovie(updatedMovie);
//       setFormData({
//         ...formData,
//         episodeList: updatedMovie.episodeList
//       });
//       alert('Episode video uploaded successfully!');
//     } catch (error) {
//       alert('Error uploading episode video');
//     }
//   };

//   const handleDeleteEpisode = async (episodeId) => {
//     try {
//       await deleteEpisode(episodeId);
//       const updatedMovie = await getMovieDetail(movieId);
//       setMovie(updatedMovie);
//       setFormData({
//         ...formData,
//         episodeList: updatedMovie.episodeList
//       });
//       alert('Episode deleted successfully!');
//     } catch (error) {
//       alert('Error deleting episode');
//     }
//   };

//   const handleEditToggle = () => {
//     setEditMode(!editMode);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const updatedData = { ...formData };
//       await updateMovie(movieId, updatedData);
//       alert('Movie updated successfully!');
//       setEditMode(false);
//       const updatedMovie = await getMovieDetail(movieId);
//       setMovie(updatedMovie);
//     } catch (error) {
//       alert('Error updating movie');
//     }
//   };

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   if (error) {
//     return <div className="error">Error: {error}</div>;
//   }

//   if (!movie) {
//     return <div className="no-movie">No movie found</div>;
//   }

//   return (
//     <div className='mainBodyEditMovie'>
//       <div className="movie-detail">
//         <h2 className="title">{movie.name}</h2>
//         <div className="details">
//           <img src={`${process.env.REACT_APP_UPLOAD_URL}/${movie.image}`} alt={movie.name} className="poster" />
//           <div className="info">
//             <p className="episodes">Số tập: {movie.episodes}</p>
//             <p className="schedule">Năm phát hành: {movie.movieSchedule}</p>
//             <p className="country">Quốc gia: {movie.country.name}</p>
//             <p className="star">Đánh giá: {movie.star}/5</p>
//             <p className="price">Giá mua: {movie.price}</p>
//             <p className="views">Lượt xem: {movie.views}</p>
//             <div className="list_cate">
//               <p>Thể loại</p>
//               <div>
//                 {movie.categories.map(category => (
//                   <Link to={`/the-loai/${category.categoryId}`} key={category.categoryId}>
//                     {category.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//             <div className="list_episode ah-frame-bg">
//               <div className="heading flex flex-space-auto fw-700">
//                 <p>Danh sách tập</p>
//                 <span id="newest-ep-is-readed" className="fs-13"></span>
//               </div>
//               <div className="list-item-episode scroll-bar">
//                 {movie.episodeList.map(episode => (
//                   <div key={episode.episodeId} className="episode-item">
//                     <Link to={`/watch/${movieId}/${episode.episodeId}`} target="_blank">
//                       <span>{episode.name}</span>
//                     </Link>
//                     <input type="file" onChange={(e) => handleEpisodeFileChange(e, episode.episodeId)} />
//                     <button onClick={() => handleUploadEpisodeVideo(episode.episodeId)}>Upload Video</button>
//                     <button onClick={() => handleDeleteEpisode(episode.episodeId)}>Delete</button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//         <p className="content">Mô tả: {movie.movieContent}</p>
//         <div>
//           <p>Diễn viên:</p>
//           <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//             {movie.persons.map(person => (
//               <div key={person.personId} style={{ margin: '10px', textAlign: 'center' }}>
//                 <img src={`${process.env.REACT_APP_UPLOAD_URL}/${person.image}`} alt={person.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }} />
//                 <span style={{ display: 'block', marginTop: '5px' }}>{person.name}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//         <button onClick={handleEditToggle}>{editMode ? 'Huỷ' : 'Sửa'}</button>
//         {editMode && (
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="name">Name:</label>
//               <input type="text" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
//             </div>
//             <div className="form-group">
//               <label htmlFor="image">Ảnh:</label>
//               <input type="file" id="image" onChange={handleFileChange} />
//               <button type="button" onClick={handleUploadMovieImage}>Upload Movie Image</button>
//             </div>
//             <div className="form-group">
//               <label htmlFor="episodes">Số tập:</label>
//               <input type="number" id="episodes" value={formData.episodes} onChange={(e) => setFormData({ ...formData, episodes: e.target.value })} />
//             </div>
//             <div className="form-group">
//               <label htmlFor="movieSchedule">Năm:</label>
//               <input type="text" id="movieSchedule" value={formData.movieSchedule} onChange={(e) => setFormData({ ...formData, movieSchedule: e.target.value })} />
//             </div>
//             <div className="form-group">
//               <label htmlFor="country">Quốc gia:</label>
//               <input type="text" id="country" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
//             </div>

//             <div className="form-group">
//               <label htmlFor="price">Giá:</label>
//               <input type="number" id="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
//             </div>

//             <button type="submit">Lưu</button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EditMovie;






















import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetail, updateMovie, uploadMovieImage, uploadEpisodeVideo, deleteEpisode, addEpisode, updateEpisode } from '../../Utils/api';
import './EditMovie.css';
import Sidebar from './Sidebar';
import ManageEpisodes from './ManageEpisodes';

const EditMovie = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [episodeFiles, setEpisodeFiles] = useState({});
  const [newEpisode, setNewEpisode] = useState({ name: '', file: null });
  const [editingEpisode, setEditingEpisode] = useState({ episodeId: null, name: '', file: null });

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
          episodeList: movieDetail.episodeList,
          movieContent: movieDetail.movieContent
        });
        setLoading(false);
      } catch (error) {
        setError('Error fetching movie detail');
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEpisodeFileChange = (e, episodeId) => {
    setEpisodeFiles({ ...episodeFiles, [episodeId]: e.target.files[0] });
  };

  const handleUploadMovieImage = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }
    try {
      await uploadMovieImage(file, movieId);
      const updatedMovie = await getMovieDetail(movieId);
      setMovie(updatedMovie);
      setFormData({
        ...formData,
        image: updatedMovie.image
      });
      alert('Movie image uploaded successfully!');
    } catch (error) {
      alert('Error uploading movie image');
    }
  };

  const handleUploadEpisodeVideo = async (episodeId) => {
    const episodeFile = episodeFiles[episodeId];
    if (!episodeFile) {
      alert('Please select a file.');
      return;
    }
    try {
      await uploadEpisodeVideo(episodeFile, episodeId);
      const updatedMovie = await getMovieDetail(movieId);
      setMovie(updatedMovie);
      setFormData({
        ...formData,
        episodeList: updatedMovie.episodeList
      });
      alert('Episode video uploaded successfully!');
    } catch (error) {
      alert('Error uploading episode video');
    }
  };

  const handleDeleteEpisode = async (episodeId) => {
    try {
      await deleteEpisode(episodeId);
      const updatedMovie = await getMovieDetail(movieId);
      setMovie(updatedMovie);
      setFormData({
        ...formData,
        episodeList: updatedMovie.episodeList
      });
      alert('Episode deleted successfully!');
    } catch (error) {
      alert('Error deleting episode');
    }
  };

  const handleAddEpisode = async () => {
    if (!newEpisode.name || !newEpisode.file) {
      alert('Please provide episode name and video file.');
      return;
    }
    try {
      const episodeData = { name: newEpisode.name, movieId };
      const newEpisodeResponse = await addEpisode(episodeData);
      await uploadEpisodeVideo(newEpisodeResponse.episodeId);
      const updatedMovie = await getMovieDetail(movieId);
      setMovie(updatedMovie);
      setFormData({
        ...formData,
        episodeList: updatedMovie.episodeList
      });
      setNewEpisode({ name: '', file: null });
      alert('Episode added successfully!');
    } catch (error) {
      alert('Error adding episode');
    }
  };

  const handleEditEpisode = (episodeId, name) => {
    setEditingEpisode({ episodeId, name, file: null });
  };

  const handleUpdateEpisode = async () => {
    // if (!editingEpisode.name || !editingEpisode.file) {
    //   alert('Please provide episode name and video file.');
    //   return;
    // }
    try {
      const newData = { name: editingEpisode.name };
      await updateEpisode(editingEpisode.episodeId, newData);
      await uploadEpisodeVideo(editingEpisode.episodeId);
      const updatedMovie = await getMovieDetail(movieId);
      setMovie(updatedMovie);
      setFormData({
        ...formData,
        episodeList: updatedMovie.episodeList
      });
      setEditingEpisode({ episodeId: null, name: '', file: null });
      alert('Episode updated successfully!');
    } catch (error) {
      alert('Error updating episode');
    }
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        name: formData.name,
        episodes: formData.episodes,
        movieSchedule: formData.movieSchedule,
        country: formData.country,
        star: formData.star,
        price: formData.price,
        views: formData.views,
        movieContent: formData.movieContent
      };
      await updateMovie(movieId, updatedData);
      alert('Movie updated successfully!');
      setEditMode(false);
      const updatedMovie = await getMovieDetail(movieId);
      setMovie(updatedMovie);
    } catch (error) {
      alert('Error updating movie');
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
      <Sidebar />
      <div className="movie-detail">
        <h2 className="title">{movie.name}</h2>
        <div className="details">
          <img src={`${process.env.REACT_APP_UPLOAD_URL}/${movie.image}`} alt={movie.name} className="poster" />
          <div className="info">
            <p className="episodes">Số tập: {movie.episodes}</p>
            <p className="schedule">Năm phát hành: {movie.movieSchedule}</p>
            <p className="country">Quốc gia: {movie.country.name}</p>
            <p className="star">Đánh giá: {movie.star}/5</p>
            <p className="price">Giá mua: {movie.price}</p>
            <p className="views">Lượt xem: {movie.views}</p>
            <div className="list_cate">
              <p>Thể loại</p>
              <div>
                {movie.categories.map(category => (
                  <Link key={category.categoryId}>
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="list_episode ah-frame-bg">
          <div>             

              </div>
              <div className="heading flex flex-space-auto fw-700">
                <p>Danh sách tập</p>
                <span id="newest-ep-is-readed" className="fs-13"></span>
              </div>
              <div className="list-item-episode scroll-bar">
                {movie.episodeList.map(episode => (
                  <div key={episode.episodeId} className="episode-item">
                    <Link to={`/admin/watch/${movieId}/${episode.episodeId}`} target="_blank">
                      <span>{episode.episode}</span>
                    </Link>
                  </div>
                ))}
              </div>
              
            </div>

          </div>
        </div>
        <p className="content">Mô tả: {movie.movieContent}</p>
        <div>
          <p>Diễn viên:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {movie.persons.map(person => (
              <div key={person.personId} style={{ margin: '10px', textAlign: 'center' }}>
                <img src={`${process.env.REACT_APP_UPLOAD_URL}/${person.image}`} alt={person.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }} />
                <span style={{ display: 'block', marginTop: '5px' }}>{person.name}</span>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleEditToggle}>{editMode ? 'Huỷ' : 'Sửa'}</button>
        {editMode && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="image">Ảnh:</label>
              <input type="file" id="image" onChange={handleFileChange} />
              <button type="button" onClick={handleUploadMovieImage}>Upload Movie Image</button>
            </div>
            <div className="form-group">
              <label htmlFor="episodes">Số tập:</label>
              <input type="number" id="episodes" value={formData.episodes} onChange={(e) => setFormData({ ...formData, episodes: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="movieSchedule">Năm:</label>
              <input type="text" id="movieSchedule" value={formData.movieSchedule} onChange={(e) => setFormData({ ...formData, movieSchedule: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="country">Quốc gia:</label>
              <input type="text" id="country" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="price">Giá:</label>
              <input type="number" id="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
            </div>
            <button type="submit">Lưu</button>
          </form>
        )}


        {/* <div className="list_episode ah-frame-bg">
          <div>             

              </div>
              <div className="heading flex flex-space-auto fw-700">
                <p>Danh sách tập</p><Link to={`/admin/movie/${movieId}`} target="_blank"> <button>Quản lý tập</button></Link>
                <span id="newest-ep-is-readed" className="fs-13"></span>
              </div>
              <div className="list-item-episode scroll-bar">
                {movie.episodeList.map(episode => (
                  <div key={episode.episodeId} className="episode-item">
                    <Link to={`/watch/${movieId}/${episode.episodeId}`} target="_blank">
                      <span>{episode.episode}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div> */}

          <ManageEpisodes/>

      </div>
    </div>
  );
};

export default EditMovie;
