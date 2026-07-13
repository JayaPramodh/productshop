import axios from "axios";

export const userLogin = async (mail, pwd) => {
    const URL = "https://api.escuelajs.co/api/v1/auth/login";

    try {
        const {data} = await axios.post(URL, {
            email: mail,
            password: pwd
        })
        console.log(data);
        return data;
    } catch (error) {
        return error;
    }
}