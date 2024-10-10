const API = {
    fetchData: async (url) => {
        const data = await fetch(url);
        return await data.json();
    }
}

export default API;