import axios from "axios";

const GetUserData = async (username:string) => {
	try {
		const rootUrl = `https://api.github.com/users/${username}`
		const userData = await axios.get(rootUrl);
		return (userData.data)

	} catch (error) {
		console.log(error)
	}
};

export default GetUserData;
