import { message } from "antd";
import { MESSAGE_TYPES } from "../../enums/enums";

export function useUtils() {
    const [messageApi, contextHolder] = message.useMessage();


    const renderMessage = (type: MESSAGE_TYPES, message: string) => {
        messageApi.open({
            type: type,
            content: message,
        });
    }

    return {
        renderMessage,
        contextHolder
    }
} 