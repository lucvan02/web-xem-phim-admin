// import React, { useState } from 'react';
// import { addEpisode, updateEpisode, deleteEpisode, uploadEpisode } from '../../Utils/api';

// const ManageEpisodes = () => {
//   const [episodeData, setEpisodeData] = useState({
//     id: null,
//     name: '',
//     episode: 1,
//     season: '',
//     link: '',
//     daySubmit: ''
//   });
//   const [videoFile, setVideoFile] = useState(null);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setEpisodeData({ ...episodeData, [name]: value });
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setVideoFile(file);
//   };

//   const handleAddEpisode = async (event) => {
//     event.preventDefault();

//     try {
//       const newEpisode = await addEpisode(episodeData);
//       if (videoFile) {
//         await uploadEpisode(videoFile, newEpisode.id);
//       }
//       alert('Episode added successfully!');
//     } catch (error) {
//       console.error('Error adding episode:', error);
//       alert('Failed to add episode. Please try again later.');
//     }
//   };

//   const handleUpdateEpisode = async (event) => {
//     event.preventDefault();

//     try {
//       await updateEpisode(episodeData.id, episodeData);
//       if (videoFile) {
//         await uploadEpisode(videoFile, episodeData.id);
//       }
//       alert('Episode updated successfully!');
//     } catch (error) {
//       console.error('Error updating episode:', error);
//       alert('Failed to update episode. Please try again later.');
//     }
//   };

//   const handleDeleteEpisode = async () => {
//     if (window.confirm('Are you sure you want to delete this episode?')) {
//       try {
//         await deleteEpisode(episodeData.id);
//         alert('Episode deleted successfully!');
//         setEpisodeData({
//           id: null,
//           name: '',
//           episode: 1,
//           season: '',
//           link: '',
//           daySubmit: ''
//         });
//       } catch (error) {
//         console.error('Error deleting episode:', error);
//         alert('Failed to delete episode. Please try again later.');
//       }
//     }
//   };

//   return (
//     <div>
//       <h1>Manage Episodes</h1>
//       <form onSubmit={episodeData.id ? handleUpdateEpisode : handleAddEpisode}>
//         <label>
//           Name:
//           <input type="text" name="name" value={episodeData.name} onChange={handleChange} />
//         </label>
//         <br />
//         <label>
//           Episode:
//           <input type="number" name="episode" value={episodeData.episode} onChange={handleChange} />
//         </label>
//         <br />
//         <label>
//           Season:
//           <input type="text" name="season" value={episodeData.season} onChange={handleChange} />
//         </label>
//         <br />
//         <label>
//           Video File:
//           <input type="file" name="videoFile" onChange={handleFileChange} />
//         </label>
//         <br />
//         <label>
//           Day Submit:
//           <input type="date" name="daySubmit" value={episodeData.daySubmit} onChange={handleChange} />
//         </label>
//         <br />
//         <button type="submit">{episodeData.id ? 'Update Episode' : 'Add Episode'}</button>
//         {episodeData.id && (
//           <button type="button" onClick={handleDeleteEpisode}>Delete Episode</button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default ManageEpisodes;









import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEpisode } from '../../Utils/api';

const AddEpisode = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        episode: '',
        season: '',
        link: '',
        daySubmit: '',
        movieId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addEpisode(formData);
            navigate('/episodes'); // Chuyển hướng sau khi thêm tập thành công
        } catch (error) {
            console.error('Error adding episode:', error);
            // Xử lý lỗi tại đây nếu cần thiết
        }
    };

    return (
        <div>
            <h2>Add New Episode</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Episode:</label>
                    <input
                        type="number"
                        name="episode"
                        value={formData.episode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Season:</label>
                    <input
                        type="text"
                        name="season"
                        value={formData.season}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Link:</label>
                    <input
                        type="text"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Day Submit:</label>
                    <input
                        type="date"
                        name="daySubmit"
                        value={formData.daySubmit}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Movie ID:</label>
                    <input
                        type="number"
                        name="movieId"
                        value={formData.movieId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Episode</button>
            </form>
        </div>
    );
};

export default AddEpisode;