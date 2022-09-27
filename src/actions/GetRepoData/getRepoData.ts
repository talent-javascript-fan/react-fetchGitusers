import axios from "axios";

const GetRepoData = async (repoUrl:string) => {
	try {
		const repoData = await axios.get(repoUrl);
		return (repoData.data)
	} catch (error) {
		console.log(error);
	}
};

export default GetRepoData;
