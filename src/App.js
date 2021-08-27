import { request } from "./api/api.js";
import InputSection from "./components/InputSection.js";
import ResultSection from "./components/ResultSection.js";
import Header from "./components/Header.js";

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

            inputSection.setState({
                keywords,
                isEnd: response.meta.is_end,
                keyword,
            });
        };

        const header = new Header($target);
        const inputSection = new InputSection($target, onSearch);
        const resultSection = new ResultSection($target);

        (() => {
            // 저장된 키워드
            let keywords = JSON.parse(localStorage.getItem("keywords"));
            if (keywords && keywords.length >= 1)
                onSearch(keywords[keywords.length - 1], 1);

            // 저장된 다크모드 (default: "light")
            let darkmode = localStorage.getItem("darkmode");
            !darkmode || darkmode === "light"
                ? header.setState({ darkmode: "light" })
                : header.setState({ darkmode: "dark" });
        })();
    }
}
