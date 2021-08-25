import { request } from "./api/api.js";
import InputSection from "./components/InputSection.js";
import ResultSection from "./components/ResultSection.js";

export default class App {
    constructor($target) {
        const onSearch = async (keyword, pageNum) => {
            const response = await request(keyword, pageNum);
            resultSection.setState({
                keyword,
                data: response.documents,
            });
            inputSection.setState(response.meta.is_end);
        };

        const inputSection = new InputSection($target, onSearch);
        const resultSection = new ResultSection($target);
    }
}
