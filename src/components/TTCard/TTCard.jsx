import Tok from "../Tok/Tok";

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import clappertot from "../../assets/clappertot.png";
import styles from "./TTCard.module.css"


const TTCard = ({ ttreview }) => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
    <Button onClick={handleOpen}><div className={styles.tcard}>
     {ttreview.staticImg ? (
      
        <img
          style={{
            // display: "flex",
            // flexDirection: "row",
            width: "90px",
            height: "160px",
          }}
          src={ttreview.staticImg}
          alt="ttimg"
        />
      ) : (
        <img
          style={{ width: "90px", height: "160px" }}
          src={clappertot}
          alt="clappertot"
        />
      )}
    </div>
    </Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Tok ttreview={ttreview}/>
        </Typography>
      </Box>
    </Modal>
  </div>
  );
};

export default TTCard;
