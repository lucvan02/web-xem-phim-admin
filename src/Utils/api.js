import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


//instance
export const getAuthToken = () => window.localStorage.getItem('token');

export const setAuthHeader = (token) => {
    if (token !== null) {
        window.localStorage.setItem("token", token);
    } else {
        window.localStorage.removeItem("token");
    }
};

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const createAxiosRequest = async (method, url, data = null) => {
    try {
        const headers = getAuthToken() ? { 'Authorization': `Bearer ${getAuthToken()}` } : {};
        const response = await axios({ method, url, headers, data });
        return response.data.data;
    } catch (error) {
        console.error(`API Request Error for ${url}:`, error);
        throw error;
    }
};


//dang nhap
export const login = async (username, password, email) => {
    try {
        const response = await axios.post('/api/login/signin', { username, password, email });
        const responseData = response.data;

        if (responseData.success) {
            const token = responseData.data;
            setAuthHeader(token);

            const decodedToken = jwtDecode(token);
            const expiration = decodedToken.exp;
            localStorage.setItem('tokenExpiration', expiration);

            return responseData;
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
};

export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decodedToken = jwtDecode(token);
    const tokenExpiration = decodedToken.exp * 1000;
    const currentTime = Date.now();
    
    return currentTime <= tokenExpiration;
};


//get phim
export const getAllMovies = async () => createAxiosRequest('GET', '/api/admin/movie/get-all');
export const getMovieDetail = async (movieId) => createAxiosRequest('GET', `/api/admin/movie/${movieId}`);
export const getAllMoviesByCategory = async (categoryId) => createAxiosRequest('GET', `/api/admin/movie/get-all-by-category?category_id=${categoryId}`);
export const getAllMoviesByCountry = async (countryId) => createAxiosRequest('GET', `/api/admin/movie/get-all-by-country?country_id=${countryId}`);
export const getNewMovies = async (top) => createAxiosRequest('GET', `/api/admin/movie/get-new-movies?top=${top}`);
export const getMoviesRandom = async (top) => createAxiosRequest('GET', `/api/admin/movie/get-random?top=${top}`);
export const getMoviesForHomePage = async (loaiPhim) => {
    try {
        const response = await createAxiosRequest('GET', `/api/admin/movie/get-phim-trang-chu/${loaiPhim}`);
        return response;
    } catch (error) {
        console.error('Error fetching movies for homepage:', error);
        throw error;
    }
};

//quoc gia
export const getAllCountries = async () => createAxiosRequest('GET', '/api/admin/country/get-all');
export const getCountryDetail = async (countryId) => createAxiosRequest('GET', `/api/admin/country/${countryId}`);
export const getAllCategories = async () => createAxiosRequest('GET', '/api/admin/category/get-all');


//dien vien
export const getAllPersons = async () => createAxiosRequest('GET', '/api/admin/person/get-all');
export const getPersonDetail = async (personId) => createAxiosRequest('GET', `/api/admin/person/${personId}`);
export const addPerson = async (personData) => createAxiosRequest('POST', '/api/admin/person/create', personData);
export const updatePerson = async (personId, newData) => createAxiosRequest('PUT', `/api/admin/person/update?id=${personId}`, newData);
export const deletePerson = async (personId) => createAxiosRequest('DELETE', `/api/admin/person/delete?id=${personId}`);
export const uploadPersonImage = async (formData) => {
    try {
        const response = await axios.post(`/api/admin/person/upload`, formData, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
};



//phim
export const addMovie = async (movieData) => createAxiosRequest('POST', '/api/admin/movie/create', movieData);
export const uploadMovieImage = async (formData) => {
    try {
      const response = await axios.post(`/api/admin/movie/upload`, formData, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'multipart/form-data'
        }
      });
  
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };
// export const uploadMovieImage = async (file, id) => {
//     try {
//       const formData = new FormData();
//       formData.append('fileUpload', file);
//       formData.append('id', id);
  
//       const response = await axios.post(`/api/admin/movie/upload`, formData, {
//         headers: {
//           'Authorization': `Bearer ${getAuthToken()}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       });
  
//       return response.data.data;
//     } catch (error) {
//       throw error;
//     }
//   };

export const updateMovie = async (movieId, newData) => createAxiosRequest('PUT', `/api/admin/movie/update?id=${movieId}`, newData);
export const deleteMovie = async (movieId) => createAxiosRequest('DELETE', `/api/admin/movie/delete?id=${movieId}`);


//tap phim
export const addEpisode = async (episodeData) => createAxiosRequest('POST', '/api/admin/episode/create', episodeData);
export const updateEpisode = async (episodeId, newData) => createAxiosRequest('PUT', `/api/admin/episode/update?id=${episodeId}`, newData);
export const deleteEpisode = async (episodeId) => createAxiosRequest('DELETE', `/api/admin/episode/delete?id=${episodeId}`);
export const uploadEpisode = async (file, id) => {
    const formData = new FormData();
    formData.append('fileUpload', file);
    formData.append('id', id);
    return createAxiosRequest('POST', '/api/admin/episode/upload', formData);
};
export const uploadEpisodeVideo = async (file, id) => {
    const formData = new FormData();
    formData.append('fileUpload', file);
    formData.append('id', id);
    return createAxiosRequest('POST', '/api/admin/episode/upload', formData);
};

// export const uploadEpisode = async (file, id) => {
//     try {
//         const formData = new FormData();
//         formData.append('fileUpload', file);
//         formData.append('id', id);

//         const response = await axios.post(`/api/episode/upload`, formData, {
//             headers: {
//                 'Authorization': `Bearer ${getAuthToken()}`,
//                 'Content-Type': 'multipart/form-data'
//             }
//         });

//         return response.data.data;
//     } catch (error) {
//         throw error;
//     }
// };

// // Thêm hàm API để upload video cho tập phim
// export const uploadEpisodeVideo = async (file, id) => {
//     try {
//       const formData = new FormData();
//       formData.append('fileUpload', file);
//       formData.append('id', id);
  
//       const response = await axios.post(`/api/episode/upload`, formData, {
//         headers: {
//           'Authorization': `Bearer ${getAuthToken()}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       });
  
//       return response.data.data;
//     } catch (error) {
//       throw error;
//     }
//   };


//the loai
export const getCategoryNameById = async (categoryId) => {
    const category = await createAxiosRequest('GET', `/api/admin/category/${categoryId}`);
    return category.name;
};

export const addCategory = async (categoryData) => createAxiosRequest('POST', '/api/admin/category/create', categoryData);
export const updateCategory = async (categoryId, newData) => createAxiosRequest('PUT', `/api/admin/category/update?id=${categoryId}`, newData);
export const deleteCategory = async (categoryId) => createAxiosRequest('DELETE', `/api/admin/category/delete?id=${categoryId}`);


//quoc gia
export const getCountryNameById = async (countryId) => {
    const country = await createAxiosRequest('GET', `/api/admin/country/${countryId}`);
    return country.name;
};

export const addCountry = async (countryData) => createAxiosRequest('POST', '/api/admin/country/create', countryData);
export const updateCountry = async (countryId, newData) => createAxiosRequest('PUT', `/api/admin/country/update?id=${countryId}`, newData);
export const deleteCountry = async (countryId) => createAxiosRequest('DELETE', `/api/admin/country/delete?id=${countryId}`);