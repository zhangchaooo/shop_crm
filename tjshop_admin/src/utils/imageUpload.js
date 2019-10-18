import { Fetch } from "./index";
import { message } from "antd";
import image from "@/services/image";

export default ({ file, onSuccess, is_save }) => {
    const reader = new FileReader();
    reader.onload = async (a) => {
        const dataURL = a.target.result;
        const e = await image.add({
            image: dataURL,
            is_save
        });
        if (e.code === 0) {
            onSuccess(e.result);
        } else {
            message.warning(e.message);
        }
    };
    reader.readAsDataURL(file);
}
