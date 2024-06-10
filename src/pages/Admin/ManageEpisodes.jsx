// import React, { useState, useEffect } from 'react';
// import { getMovieDetail, addEpisode, deleteEpisode, updateEpisode, uploadEpisodeVideo } from '../../Utils/api';
// import { FaEdit, FaTrashAlt } from 'react-icons/fa';
// import { useParams } from 'react-router-dom';

// const ManageEpisodes = () => {
//   const { movieId } = useParams();
//   const [episodes, setEpisodes] = useState([]);
//   const [newEpisode, setNewEpisode] = useState({
//     name: '',
//     episode: '',
//     link:'',
//     season: '',
//     daySubmit: '',
//     movieId: movieId
//   });
//   const [editEpisode, setEditEpisode] = useState(null);
//   const [newVideo, setNewVideo] = useState(null);

//   useEffect(() => {
//     fetchEpisodes();
//   }, [movieId]);

//   const fetchEpisodes = async () => {
//     try {
//       const movieDetail = await getMovieDetail(movieId);
//       setEpisodes(movieDetail.episodeList);
//     } catch (error) {
//       console.error('Error fetching episodes:', error);
//     }
//   };

//   const handleAddEpisode = async () => {
//     try {
//       const addedEpisode = await addEpisode(newEpisode);
      
//       // Upload video to server if a video is selected
//       if (newVideo) {
//         await uploadVideo(addedEpisode.episodeId);
//       }

//       fetchEpisodes();
//       resetNewEpisode();
//     } catch (error) {
//       console.error('Error adding episode:', error);
//     }
//   };

//   const handleUpdateEpisode = async () => {
//     try {
//       if (editEpisode) {
//         await updateEpisode(editEpisode.episodeId, editEpisode);
//         if (newVideo) {
//           await uploadVideo(editEpisode.episodeId);
//         }
//         fetchEpisodes();
//         setEditEpisode(null);
//       } else {
//         console.error('No episode to update');
//       }
//     } catch (error) {
//       console.error('Error updating episode:', error);
//     }
//   };

//   const handleDeleteEpisode = async (id) => {
//     if (window.confirm('Bạn có chắc chắn muốn xoá tập này không?')) {
//       try {
//         await deleteEpisode(id);
//         fetchEpisodes();
//       } catch (error) {
//         console.error('Error deleting episode:', error);
//       }
//     }
//   };

//   const handleEditEpisode = (episode) => {
//     setEditEpisode(episode);
//   };

//   const resetNewEpisode = () => {
//     setNewEpisode({
//       name: '',
//       episode: '',
//       season: '',
      
//       daySubmit: '',
//       movieId: movieId
//     });
//     setNewVideo(null);
//   };

//   // Function to handle video upload
//   const uploadVideo = async (episodeId) => {
//     try {
//       const formData = new FormData();
//       formData.append('fileUpload', newVideo);
//       formData.append('id', episodeId);
      
//       await uploadEpisodeVideo(formData);

//       console.log('Video uploaded successfully');
//     } catch (error) {
//       console.error('Error uploading video:', error);
//     }
//   };

//   const handleSaveEdit = async () => {
//     try {
//       if (editEpisode) {
//         await updateEpisode(editEpisode.episodeId, editEpisode);
//         if (newVideo) {
//           await uploadVideo(editEpisode.episodeId);
//         }
//         fetchEpisodes();
//         setEditEpisode(null);
//       } else {
//         console.error('No episode to update');
//       }
//     } catch (error) {
//       console.error('Error updating episode:', error);
//     }
//   };

//   return (
//     <div className='main-content-epi'>

//       <div>
//         <h2>Thêm tập phim</h2>
//         <input
//           type="text"
//           placeholder="Tên"
//           value={newEpisode.name}
//           onChange={(e) => setNewEpisode({ ...newEpisode, name: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Tập"
//           value={newEpisode.episode}
//           onChange={(e) => setNewEpisode({ ...newEpisode, episode: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Mùa"
//           value={newEpisode.season}
//           onChange={(e) => setNewEpisode({ ...newEpisode, season: e.target.value })}
//         />
//         <input
//           type="date"
//           placeholder="Ngày chỉnh sửa"
//           value={newEpisode.daySubmit}
//           onChange={(e) => setNewEpisode({ ...newEpisode, daySubmit: e.target.value })}
//         />
//         <input
//           type="file"
//           onChange={(e) => setNewVideo(e.target.files[0])} // Store the selected video in state
//         />
//         <button onClick={handleAddEpisode}>Thêm</button>
//       </div>
//       <div>
//         <h2>Danh sách tập phim</h2>
//         <table className='bangTapPhim'>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Tập</th>
//               <th>Tên</th>
//               <th>Link</th>              
//               <th>Mùa</th>
//               <th>Ngày chỉnh sửa</th>
//               <th>Hành động</th>
//             </tr>
//           </thead>
//           <tbody>
//             {episodes.map((episode) => (
//               <tr key={episode.episodeId}>
//                 <td>{episode.episodeId}</td> 
//                 <td>{episode.episode}</td>
//                 <td>{episode.name}</td>    
//                 <td>{episode.link}</td>           
//                 <td>{episode.season}</td>
//                 <td>{episode.daySubmit}</td>
//                 <td>
//                   <FaEdit onClick={() => handleEditEpisode(episode)} style={{ cursor: 'pointer' }} />
//                   <FaTrashAlt onClick={() => handleDeleteEpisode(episode.episodeId)} style={{ cursor: 'pointer', marginLeft: '10px', color: 'red' }} />
//                 </td>
//               </tr>
//             ))}
//             {editEpisode && (
//               <tr>
//                 <td colSpan="6">
//                   <div>
//                     <h2>Chỉnh sửa tập phim</h2>
//                     <input
//                       type="text"
//                       placeholder="Tên"
//                       value={editEpisode.name}
//                       onChange={(e) => setEditEpisode({ ...editEpisode, name: e.target.value })}
//                     />
//                     <input
//                       type="number"
//                       placeholder="Tập"
//                       value={editEpisode.episode}
//                       onChange={(e) => setEditEpisode({ ...editEpisode, episode: e.target.value })}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Mùa"
//                       value={editEpisode.season}
//                       onChange={(e) => setEditEpisode({ ...editEpisode, season: e.target.value })}
//                     />
//                     <input
//                       type="date"
//                       placeholder="Ngày phát hành"
//                       value={editEpisode.daySubmit}
//                       onChange={(e) => setEditEpisode({ ...editEpisode, daySubmit: e.target.value })}
//                     />
//                     <input
//                       type="file"
//                       onChange={(e) => setNewVideo(e.target.files[0])} // Store the selected video in state
//                     />
//                     <button onClick={handleSaveEdit}>Lưu</button>
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageEpisodes;
















// import React, { useState, useEffect } from 'react';
// import { getMovieDetail, addEpisode, deleteEpisode, updateEpisode, uploadEpisodeVideo } from '../../Utils/api';
// import { FaEdit, FaTrashAlt } from 'react-icons/fa';
// import { useParams } from 'react-router-dom';

// const ManageEpisodes = () => {
//   const { movieId } = useParams();
//   const [episodes, setEpisodes] = useState([]);
//   const [newEpisode, setNewEpisode] = useState({
//     name: '',
//     episode: '',
//     link: '',
//     season: '',
//     daySubmit: '',
//     movieId: movieId
//   });
//   const [editEpisode, setEditEpisode] = useState(null);
//   const [newVideo, setNewVideo] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     fetchEpisodes();
//   }, [movieId]);

//   const fetchEpisodes = async () => {
//     try {
//       const movieDetail = await getMovieDetail(movieId);
//       setEpisodes(movieDetail.episodeList);
//     } catch (error) {
//       console.error('Error fetching episodes:', error);
//     }
//   };

//   const handleAddEpisode = async () => {
//     try {
//       const addedEpisode = await addEpisode(newEpisode);
      
//       // Upload video to server if a video is selected
//       if (newVideo) {
//         await uploadVideo(addedEpisode.episodeId);
//       }

//       fetchEpisodes();
//       resetNewEpisode();
//       setMessage('Tập phim đã được thêm thành công!');
//     } catch (error) {
//       console.error('Error adding episode:', error);
//       setMessage('Có lỗi xảy ra khi thêm tập phim.');
//     }
//   };

//   const handleUpdateEpisode = async () => {
//     try {
//       if (editEpisode) {
//         await updateEpisode(editEpisode.episodeId, editEpisode);
//         if (newVideo) {
//           await uploadVideo(editEpisode.episodeId);
//         }
//         fetchEpisodes();
//         setEditEpisode(null);
//         setMessage('Tập phim đã được cập nhật thành công!');
//       } else {
//         console.error('No episode to update');
//         setMessage('Không có tập phim nào để cập nhật.');
//       }
//     } catch (error) {
//       console.error('Error updating episode:', error);
//       setMessage('Có lỗi xảy ra khi cập nhật tập phim.');
//     }
//   };

//   const handleDeleteEpisode = async (id) => {
//     if (window.confirm('Bạn có chắc chắn muốn xoá tập này không?')) {
//       try {
//         await deleteEpisode(id);
//         fetchEpisodes();
//         setMessage('Tập phim đã được xoá thành công!');
//       } catch (error) {
//         console.error('Error deleting episode:', error);
//         setMessage('Có lỗi xảy ra khi xoá tập phim.');
//       }
//     }
//   };

//   const handleEditEpisode = (episode) => {
//     setEditEpisode(episode);
//   };

//   const resetNewEpisode = () => {
//     setNewEpisode({
//       name: '',
//       episode: '',
//       link: '',
//       season: '',
//       daySubmit: '',
//       movieId: movieId
//     });
//     setNewVideo(null);
//   };

//   // Function to handle video upload
//   const uploadVideo = async (episodeId) => {
//     try {
//       const formData = new FormData();
//       formData.append('fileUpload', newVideo);
//       formData.append('id', episodeId);

//       await uploadEpisodeVideo(formData, (event) => {
//         const progress = Math.round((event.loaded * 100) / event.total);
//         setUploadProgress(progress);
//       });

//       console.log('Video uploaded successfully');
//       setMessage('Video đã được upload thành công!');
//     } catch (error) {
//       console.error('Error uploading video:', error);
//       setMessage('Có lỗi xảy ra khi upload video.');
//     }
//   };

//   const handleSaveEdit = async () => {
//     try {
//       if (editEpisode) {
//         await updateEpisode(editEpisode.episodeId, editEpisode);
//         if (newVideo) {
//           await uploadVideo(editEpisode.episodeId);
//         }
//         fetchEpisodes();
//         setEditEpisode(null);
//         setMessage('Tập phim đã được lưu thành công!');
//       } else {
//         console.error('No episode to update');
//         setMessage('Không có tập phim nào để lưu.');
//       }
//     } catch (error) {
//       console.error('Error updating episode:', error);
//       setMessage('Có lỗi xảy ra khi lưu tập phim.');
//     }
//   };

//   return (
//     <div className='main-content-epi'>
//       {message && <div className="message">{message}</div>}
//       {uploadProgress > 0 && <div className="progress-bar"><div style={{ width: `${uploadProgress}%` }}></div></div>}
//       <div>
//         <h2>Thêm tập phim</h2>
//         <input
//           type="text"
//           placeholder="Tên"
//           value={newEpisode.name}
//           onChange={(e) => setNewEpisode({ ...newEpisode, name: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Tập"
//           value={newEpisode.episode}
//           onChange={(e) => setNewEpisode({ ...newEpisode, episode: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Link"
//           value={newEpisode.link}
//           onChange={(e) => setNewEpisode({ ...newEpisode, link: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Mùa"
//           value={newEpisode.season}
//           onChange={(e) => setNewEpisode({ ...newEpisode, season: e.target.value })}
//         />
//         <input
//           type="date"
//           placeholder="Ngày chỉnh sửa"
//           value={newEpisode.daySubmit}
//           onChange={(e) => setNewEpisode({ ...newEpisode, daySubmit: e.target.value })}
//         />
//         <input
//           type="file"
//           onChange={(e) => setNewVideo(e.target.files[0])} // Store the selected video in state
//         />
//         <button onClick={handleAddEpisode}>Thêm</button>
//       </div>
//       <div>
//         <h2>Danh sách tập phim</h2>
//         <table className='bangTapPhim'>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Tập</th>
//               <th>Tên</th>
//               <th>Link</th>
//               <th>Mùa</th>
//               <th>Ngày chỉnh sửa</th>
//               <th>Hành động</th>
//             </tr>
//           </thead>
//           <tbody>
//             {episodes.map((episode) => (
//               <tr key={episode.episodeId}>
//                 <td>{episode.episodeId}</td>
//                 <td>{episode.episode}</td>
//                 <td>{episode.name}</td>
//                 <td>{episode.link}</td>
//                 <td>{episode.season}</td>
//                 <td>{episode.daySubmit}</td>
//                 <td>
//                   <FaEdit onClick={() => handleEditEpisode(episode)} style={{ cursor: 'pointer' }} />
//                   <FaTrashAlt onClick={() => handleDeleteEpisode(episode.episodeId)} style={{ cursor: 'pointer', marginLeft: '10px', color: 'red' }} />
//                 </td>
//               </tr>
//             ))}
//             {editEpisode && (
//               <tr>
//                 <td colSpan="7">
//                   <div>
//                     <h2>Chỉnh sửa tập phim</h2>
//                     <input
//                       type="text"
//                       placeholder="Tên"
//                       value={editEpisode.name}
//                       onChange={(e) => setEditEpisode({ ...editEpisode, name: e.target.value })}
//                     />
//                     <input
//                       type="number"
//                       placeholder="Tập"
//                       value={editEpisode.episode}
//                       onChange={(e) => setEditEpisode({ ...editEpisode, episode: e.target.value })}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Link"
//                       value={editEpisode.link}
//                       onChange={(e) => setEditEpisode({ ...editEpisode, link: e.target.value })}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Mùa"
//                       value={editEpisode.season}
//                       onChange={(e) => setEditEpisode({ ...editEpisode, season: e.target.value })}
//                     />
//                     <input
//                       type="date"
//                       placeholder="Ngày phát hành"
//                       value={editEpisode.daySubmit}
//                       onChange={(e) => setEditEpisode({ ...editEpisode, daySubmit: e.target.value })}
//                     />
//                     <input
//                       type="file"
//                       onChange={(e) => setNewVideo(e.target.files[0])} // Store the selected video in state
//                     />
//                     <button onClick={handleSaveEdit}>Lưu</button>
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageEpisodes;




























// import React, { useState, useEffect } from 'react';
// import { getMovieDetail, addEpisode, deleteEpisode, updateEpisode, uploadEpisodeVideo } from '../../Utils/api';
// import { FaEdit, FaTrashAlt } from 'react-icons/fa';
// import { useParams } from 'react-router-dom';

// const ManageEpisodes = () => {
//   const { movieId } = useParams();
//   const [episodes, setEpisodes] = useState([]);
//   const [newEpisode, setNewEpisode] = useState({
//     name: '',
//     episode: '',
//     link: '',
//     season: '',
//     daySubmit: '',
//     movieId: movieId
//   });
//   const [editEpisode, setEditEpisode] = useState(null);
//   const [newVideo, setNewVideo] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     fetchEpisodes();
//   }, [movieId]);

//   const fetchEpisodes = async () => {
//     try {
//       const movieDetail = await getMovieDetail(movieId);
//       setEpisodes(movieDetail.episodeList);
//     } catch (error) {
//       console.error('Error fetching episodes:', error);
//     }
//   };

//   const handleAddEpisode = async () => {
//     try {
//       const addedEpisode = await addEpisode(newEpisode);
      
//       // Upload video to server if a video is selected
//       if (newVideo) {
//         await uploadVideo(addedEpisode.episodeId);
//       }

//       fetchEpisodes();
//       resetNewEpisode();
//       setMessage('Tập phim đã được thêm thành công!');
//     } catch (error) {
//       console.error('Error adding episode:', error);
//       setMessage('Có lỗi xảy ra khi thêm tập phim.');
//     }
//   };

//   const handleUpdateEpisode = async () => {
//     try {
//       if (editEpisode && editEpisode.episodeId) {
//         await updateEpisode(editEpisode.episodeId, editEpisode);
//         if (newVideo) {
//           await uploadVideo(editEpisode.episodeId);
//         }
//         fetchEpisodes();
//         setEditEpisode(null);
//         setMessage('Tập phim đã được cập nhật thành công!');
//       } else {
//         console.error('No episode to update or episode ID is null');
//         setMessage('Không có tập phim nào để cập nhật hoặc ID của tập phim là null.');
//       }
//     } catch (error) {
//       console.error('Error updating episode:', error);
//       setMessage('Có lỗi xảy ra khi cập nhật tập phim.');
//     }
//   };

//   const handleDeleteEpisode = async (id) => {
//     if (window.confirm('Bạn có chắc chắn muốn xoá tập này không?')) {
//       try {
//         await deleteEpisode(id);
//         fetchEpisodes();
//         setMessage('Tập phim đã được xoá thành công!');
//       } catch (error) {
//         console.error('Error deleting episode:', error);
//         setMessage('Có lỗi xảy ra khi xoá tập phim.');
//       }
//     }
//   };

//   const handleEditEpisode = (episode) => {
//     setEditEpisode(episode);
//   };

//   const resetNewEpisode = () => {
//     setNewEpisode({
//       name: '',
//       episode: '',
//       link: '',
//       season: '',
//       daySubmit: '',
//       movieId: movieId
//     });
//     setNewVideo(null);
//   };

//   // Function to handle video upload
//   const uploadVideo = async (episodeId) => {
//     try {
//       const formData = new FormData();
//       formData.append('fileUpload', newVideo);
//       formData.append('id', episodeId);

//       await uploadEpisodeVideo(formData, (event) => {
//         const progress = Math.round((event.loaded * 100) / event.total);
//         setUploadProgress(progress);
//       });

//       console.log('Video uploaded successfully');
//       setMessage('Video đã được upload thành công!');
//     } catch (error) {
//       console.error('Error uploading video:', error);
//       setMessage('Có lỗi xảy ra khi upload video.');
//     }
//   };

//   const handleSaveEdit = async () => {
//     try {
//       if (editEpisode && editEpisode.episodeId) {
//         await updateEpisode(editEpisode.episodeId, editEpisode);
//         if (newVideo) {
//           await uploadVideo(editEpisode.episodeId);
//         }
//         fetchEpisodes();
//         setEditEpisode(null);
//         setMessage('Tập phim đã được lưu thành công!');
//       } else {
//         console.error('No episode to update or episode ID is null');
//         setMessage('Không có tập phim nào để lưu hoặc ID của tập phim là null.');
//       }
//     } catch (error) {
//       console.error('Error updating episode:', error);
//       setMessage('Có lỗi xảy ra khi lưu tập phim.');
//     }
//   };

//   return (
//     <div className='main-content-epi'>
//       {message && <div className="message">{message}</div>}
//       {uploadProgress > 0 && <div className="progress-bar"><div style={{ width: `${uploadProgress}%` }}></div></div>}
//       <div>
//         <h2>Thêm tập phim</h2>
//         <input
//           type="text"
//           placeholder="Tên"
//           value={newEpisode.name}
//           onChange={(e) => setNewEpisode({ ...newEpisode, name: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Tập"
//           value={newEpisode.episode}
//           onChange={(e) => setNewEpisode({ ...newEpisode, episode: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Link"
//           value={newEpisode.link}
//           onChange={(e) => setNewEpisode({ ...newEpisode, link: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Mùa"
//           value={newEpisode.season}
//           onChange={(e) => setNewEpisode({ ...newEpisode, season: e.target.value })}
//         />
//         <input
//           type="date"
//           placeholder="Ngày chỉnh sửa"
//           value={newEpisode.daySubmit}
//           onChange={(e) => setNewEpisode({ ...newEpisode, daySubmit: e.target.value })}
//         />
//         <input
//           type="file"
//           onChange={(e) => setNewVideo(e.target.files[0])} // Store the selected video in state
//         />
//         <button onClick={handleAddEpisode}>Thêm</button>
//       </div>
//       <div>
//         <h2>Danh sách tập phim</h2>
//         <table className='bangTapPhim'>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Tập</th>
//               <th>Tên</th>
//               <th>Link</th>
//               <th>Mùa</th>
//               <th>Ngày chỉnh sửa</th>
//               <th>Hành động</th>
//             </tr>
//           </thead>
//           <tbody>
//             {episodes.map((episode) => (
//               <tr key={episode.episodeId}>
//                 <td>{episode.episodeId}</td>
//                 <td>{episode.episode}</td>
//                 <td>{episode.name}</td>
//                 <td>{episode.link}</td>
//                 <td>{episode.season}</td>
//                 <td>{episode.daySubmit}</td>
//                 <td>
//                   <FaEdit onClick={() => handleEditEpisode(episode)} style={{ cursor: 'pointer' }} />
//                   <FaTrashAlt onClick={() => handleDeleteEpisode(episode.episodeId)} style={{ cursor: 'pointer', marginLeft: '10px', color: 'red' }} />
//                 </td>
//               </tr>
//             ))}
//             {editEpisode && (
//               <tr>
//                 <td colSpan="7">
//                   <div>
//                     <h2>Chỉnh sửa tập phim</h2>
//                     <input
//                       type="text"
//                       placeholder="Tên"
//                       value={editEpisode.name}
//                       onChange={(e) => setEditEpisode({ ...editEpisode, name: e.target.value })}
//                     />
//                     <input
//                       type="number"
//                       placeholder="Tập"
//                       value={editEpisode.episode}
//                       onChange={(e) => setEditEpisode({ ...editEpisode, episode: e.target.value })}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Link"
//                       value={editEpisode.link}
//                       onChange={(e) => setEditEpisode({ ...editEpisode, link: e.target.value })}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Mùa"
//                       value={editEpisode.season}
//                       onChange={(e) => setEditEpisode({ ...editEpisode, season: e.target.value })}
//                     />
//                     <input
//                       type="date"
//                       placeholder="Ngày chỉnh sửa"
//                       value={editEpisode.daySubmit}
//                       onChange={(e) => setEditEpisode({ ...editEpisode, daySubmit: e.target.value })}
//                     />
//                     <input
//                       type="file"
//                       onChange={(e) => setNewVideo(e.target.files[0])} // Store the selected video in state
//                     />
//                     <button onClick={handleSaveEdit}>Lưu</button>
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageEpisodes;


















import React, { useState, useEffect } from 'react';
import { getMovieDetail, addEpisode, deleteEpisode, updateEpisode, uploadEpisodeVideo } from '../../Utils/api';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import './ManageEpisodes.css';

const ManageEpisodes = () => {
  const { movieId } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [newEpisode, setNewEpisode] = useState({
    name: '',
    episode: '',
    link: '',
    season: '',
    daySubmit: '',
    movieId: movieId
  });
  const [editEpisode, setEditEpisode] = useState(null);
  const [newVideo, setNewVideo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchEpisodes();
  }, [movieId]);

  const fetchEpisodes = async () => {
    try {
      const movieDetail = await getMovieDetail(movieId);
      setEpisodes(movieDetail.episodeList);
    } catch (error) {
      console.error('Error fetching episodes:', error);
    }
  };

  const handleAddEpisode = async () => {
    try {
      const addedEpisode = await addEpisode(newEpisode);

      if (newVideo) {
        await uploadVideo(addedEpisode.episodeId);
      }

      fetchEpisodes();
      resetNewEpisode();
      setMessage('Tập phim đã được thêm thành công!');
    } catch (error) {
      console.error('Error adding episode:', error);
      setMessage('Có lỗi xảy ra khi thêm tập phim.');
    }
  };

  const handleUpdateEpisode = async () => {
    try {
      if (editEpisode && editEpisode.episodeId) {
        await updateEpisode(editEpisode.episodeId, editEpisode);
        if (newVideo) {
          await uploadVideo(editEpisode.episodeId);
        }
        fetchEpisodes();
        setEditEpisode(null);
        setMessage('Tập phim đã được cập nhật thành công!');
      } else {
        console.error('No episode to update or episode ID is null');
        setMessage('Không có tập phim nào để cập nhật hoặc ID của tập phim là null.');
      }
    } catch (error) {
      console.error('Error updating episode:', error);
      setMessage('Có lỗi xảy ra khi cập nhật tập phim.');
    }
  };

  const handleDeleteEpisode = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá tập này không?')) {
      try {
        await deleteEpisode(id);
        fetchEpisodes();
        setMessage('Tập phim đã được xoá thành công!');
      } catch (error) {
        console.error('Error deleting episode:', error);
        setMessage('Có lỗi xảy ra khi xoá tập phim.');
      }
    }
  };

  const handleEditEpisode = (episode) => {
    setEditEpisode(episode);
  };

  const resetNewEpisode = () => {
    setNewEpisode({
      name: '',
      episode: '',
      link: '',
      season: '',
      daySubmit: '',
      movieId: movieId
    });
    setNewVideo(null);
  };

  const uploadVideo = async (episodeId) => {
    try {
      const formData = new FormData();
      formData.append('fileUpload', newVideo);
      formData.append('id', episodeId);

      await uploadEpisodeVideo(formData, (event) => {
        const progress = Math.round((event.loaded * 100) / event.total);
        setUploadProgress(progress);
      });

      console.log('Video uploaded successfully');
      setMessage('Video đã được upload thành công!');
    } catch (error) {
      console.error('Error uploading video:', error);
      setMessage('Có lỗi xảy ra khi upload video.');
    }
  };

  const handleSaveEdit = async () => {
    try {
      if (editEpisode && editEpisode.episodeId) {
        await updateEpisode(editEpisode.episodeId, editEpisode);
        if (newVideo) {
          await uploadVideo(editEpisode.episodeId);
        }
        fetchEpisodes();
        setEditEpisode(null);
        setMessage('Tập phim đã được lưu thành công!');
      } else {
        console.error('No episode to update or episode ID is null');
        setMessage('Không có tập phim nào để lưu hoặc ID của tập phim là null.');
      }
    } catch (error) {
      console.error('Error updating episode:', error);
      setMessage('Có lỗi xảy ra khi lưu tập phim.');
    }
  };

  return (
    <div className='main-content-epi'>
      {message && <div className="message">{message}</div>}
      {uploadProgress > 0 && <div className="progress-bar"><div style={{ width: `${uploadProgress}%` }}></div></div>}
      <div className="form-container">
        <h2>Thêm tập phim</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Tên"
            value={newEpisode.name}
            onChange={(e) => setNewEpisode({ ...newEpisode, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Tập"
            value={newEpisode.episode}
            onChange={(e) => setNewEpisode({ ...newEpisode, episode: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Link"
            value={newEpisode.link}
            onChange={(e) => setNewEpisode({ ...newEpisode, link: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Mùa"
            value={newEpisode.season}
            onChange={(e) => setNewEpisode({ ...newEpisode, season: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            placeholder="Ngày chỉnh sửa"
            value={newEpisode.daySubmit}
            onChange={(e) => setNewEpisode({ ...newEpisode, daySubmit: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="file"
            onChange={(e) => setNewVideo(e.target.files[0])}
          />
        </div>
        <button onClick={handleAddEpisode}>Thêm</button>
      </div>
      <div className="episodes-list">
        <h2>Danh sách tập phim</h2>
        <table className='bangTapPhim'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tập</th>
              <th>Tên</th>
              <th>Link</th>
              <th>Mùa</th>
              <th>Ngày chỉnh sửa</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((episode) => (
              <tr key={episode.episodeId}>
                <td>{episode.episodeId}</td>
                <td>{episode.episode}</td>
                <td>{episode.name}</td>
                <td>{episode.link}</td>
                <td>{episode.season}</td>
                <td>{episode.daySubmit}</td>
                <td>
                  <FaEdit onClick={() => handleEditEpisode(episode)} style={{ cursor: 'pointer' }} />
                  <FaTrashAlt onClick={() => handleDeleteEpisode(episode.episodeId)} style={{ cursor: 'pointer', marginLeft: '10px', color: 'red' }} />
                </td>
              </tr>
            ))}
            {editEpisode && (
              <tr>
                <td colSpan="7">
                  <div className="form-container">
                    <h2>Chỉnh sửa tập phim</h2>
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Tên"
                        value={editEpisode.name}
                        onChange={(e) => setEditEpisode({ ...editEpisode, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="number"
                        placeholder="Tập"
                        value={editEpisode.episode}
                        onChange={(e) => setEditEpisode({ ...editEpisode, episode: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Link"
                        value={editEpisode.link}
                        onChange={(e) => setEditEpisode({ ...editEpisode, link: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Mùa"
                        value={editEpisode.season}
                        onChange={(e) => setEditEpisode({ ...editEpisode, season: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="date"
                        placeholder="Ngày chỉnh sửa"
                        value={editEpisode.daySubmit}
                        onChange={(e) => setEditEpisode({ ...editEpisode, daySubmit: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="file"
                        onChange={(e) => setNewVideo(e.target.files[0])}
                      />
                    </div>
                    <button onClick={handleSaveEdit}>Lưu</button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEpisodes;
