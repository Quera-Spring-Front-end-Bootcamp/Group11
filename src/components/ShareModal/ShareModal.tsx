const ShareModal = ({setOpenModal}: {setOpenModal: React.Dispatch<React.SetStateAction<boolean>>}) => {
    return (
        <div>
            <h1>This is a modal</h1>
            <button onClick={() => setOpenModal(false)}>Close</button>
        </div>
    )
}
export default ShareModal