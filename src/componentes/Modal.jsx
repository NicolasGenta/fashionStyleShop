import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export const ModalContainer = ({children, open, handleClose}) => {
    return (
        <Modal
                    open={open}
                    onClose={handleClose}
                    >
                        <Box width='100%' height='100%'>
                            <div className='flex justify-center align-center' style={{height: '100%'}}>
                                {children}
                            </div>
                        </Box>
                    </Modal>
    )
}