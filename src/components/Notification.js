import { notification } from "antd"


function useNotification() {
    const [api, contextHolder] = notification.useNotification()
    const openNotification = (type, message, description) => {
        api[type]({
            message: message,
            description: description,
            placement: "topRight",
            duration: 3,
        })
    }
    return {contextHolder, openNotification}
}
  

export default useNotification