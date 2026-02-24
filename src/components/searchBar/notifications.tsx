import { FaRegTimesCircle } from "react-icons/fa"

export const Notifications = (props: {
    notifications: string[],
    setNotifications: React.Dispatch<React.SetStateAction<string[]>>
}) => {

    return <>
        {
            props.notifications.length
                ? <div className="absolute w-[250px] right-[5px] bottom-[60px] bg-white overflow-hidden">
                    <FaRegTimesCircle
                        className="aboslute top-[0px] right-[3px] size-[15px] text-blue-500 cursor-pointer"
                        title="Effacer notifications"
                        onClick={() => props.setNotifications([])}
                    />
                    <div className="flex flex-col gap-[5px] p-[8px] max-h-[300px] overflow-y-auto"
                        style={{ scrollbarWidth: 'thin', scrollbarColor: '#eee #fff' }}>
                        {
                            props.notifications.map(notif =>
                                <div
                                    key={notif}
                                    style={{ fontSize: '10px' }}
                                    className="bg-gray-100 rounded-md text-blue-700 border-0 border-blue-100 p-[10px] text-gray-500"
                                >
                                    <span className="font-[500] text-blue-500">{notif}</span> modifiée ou ajoutée.
                                </div>
                            )
                        }
                    </div>
                </div>
                : null
        }
    </>
}