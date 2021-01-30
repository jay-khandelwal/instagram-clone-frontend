import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      margin:'3px',
      border:'3px solid white'
    },
    avatarborder:{
        border: '1px solid white',
        borderRadius: '50%',
        backgroundImage: 'linear-gradient(to right, #833ab4, #b123a4, #d3008c, #eb0070, #f90051, #fe2941, #ff412f, #fe5618, #fe711b, #fd8825, #fd9d33, #fcb045)',
    }
  }),
);



const MyAvatar = () => {
    const classes = useStyles();
    return( 
        <div style={{margin:'auto 0.4rem'}} >
         <div className={classes.avatarborder}>
          <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPEqHqH79TDbD5nimV_an_-cyDr51fUpgPLg&usqp=CAU" className={classes.large} />
        </div>
          <Typography variant='caption' > 
            hritik 
          </Typography>
        </div>
        );
}

export default MyAvatar;