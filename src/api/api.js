import { APP_KEY } from "../config.js";

const API_ENDPOINT = "https://dapi.kakao.com";

export const request = async (keyword, pageNum) => {
    let response;
    try {
        response = await fetch(
            `${API_ENDPOINT}/v3/search/book?query=${keyword}&page=${pageNum}`,
            {
                headers: { Authorization: `KakaoAK ${APP_KEY}` },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data, ":::data");
                return data;
            });
    } catch (error) {
        response = {
            error,
        };
    } finally {
        return response;
    }
};
