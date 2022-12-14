import axios from "axios";

export const fetchImages = async (searchedData, page) => {
    try {
        const response = await axios.get(`https://pixabay.com/api/?key=32082637-f508372ba6f369ac7a5d43e0b&q=${searchedData}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


