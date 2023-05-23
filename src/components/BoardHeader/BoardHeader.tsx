import { useState } from "react"
import { ShareModal } from "../ShareModal"

type BoardHeaderProps = {
    selectedProject: string
}

const BoardHeader = ({selectedProject}: BoardHeaderProps) => {
    const [openModal, setOpenModal] = useState(false)

    const handleOpenModal = () => {
        setOpenModal(true);
    }
    return (
        <>
            <h1>{selectedProject}</h1>

            <div onClick={handleOpenModal}>
                <p>اشتراک گذاری</p>
            </div>
            {openModal && <ShareModal setOpenModal={setOpenModal} />}
        </>
    )
}

export default BoardHeader