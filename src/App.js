import { request } from "./api/api.js";
import InputSection from "./components/InputSection.js";
import ResultSection from "./components/ResultSection.js";

const MAX_KEYWORD = 5;

export default class App {
    constructor($target) {
        const onSearch = async (keyword, pageNum) => {
            const response = await request(keyword, pageNum);

            let keywords = JSON.parse(localStorage.getItem("keywords"));
            if (!keywords) keywords = [];
            if (keywords.indexOf(keyword) !== -1)
                keywords.splice(keywords.indexOf(keyword), 1);
            if (keywords.length === MAX_KEYWORD) keywords.shift();
            keywords.push(keyword);
            localStorage.setItem("keywords", JSON.stringify(keywords));

            resultSection.setState({
                keyword,
                data: response.documents,
                pageNum: pageNum,
            });

            inputSection.setState(response.meta.is_end);
        };

        const inputSection = new InputSection($target, onSearch);
        const resultSection = new ResultSection($target);
    }
}
