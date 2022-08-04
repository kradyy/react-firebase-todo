import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import { useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import Box from '@mui/joy/Box';
import { Fade } from '@mui/material';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import ListItem from '@mui/joy/ListItem';
import CloseIcon from '@mui/icons-material/Close';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { db } from './firebase'

function Todo(props) {

    const [statuses, setStatuses] = useState([]);

    React.useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(db, "statuses"));

            const snapshot = [];

            querySnapshot.forEach((doc) => {
                snapshot[doc.id] = doc.data();
            });

            setStatuses(snapshot)
        })()
    });

    return (

        <Fade in={true} unmountOnExit={true}>
            <ListItem sx={{
                my: 2,
                width: '100%',
            }}>

                <Card
                    variant="outlined"
                    bgcolor="primary"
                    row
                    sx={{
                        minWidth: '320px',
                        borderRadius: 5,
                        flexGrow: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        borderColor: 'rgba(0, 0, 0, .7)',
                        boxShadow: 0,
                        gap: 2,
                        '&:hover': {
                            borderColor: 'primary',
                            boxShadow: '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)',
                        },
                    }}
                >
                    <Box>
                        <Box sx={{ align: 'left', display: 'flex' }}>
                            <Typography level="h2" sx={{ color: 'white', display: 'inline-block', m: 0 }} align="left" fontSize="lg" id="card-description">
                                {props.text}
                            </Typography>

                            {props.status &&
                                <Chip
                                    color={
                                        typeof statuses[props.status] !== 'undefined' ?
                                            (statuses[props.status].color ?? 'primary') : ''}
                                    size="small"
                                    sx={{
                                        pointerEvents: 'none',
                                        fontWeight: 'bold',
                                        fontSize: 10,
                                        ml: 1,
                                        px: 1,
                                        py: 0.2,
                                    }}
                                >
                                    {
                                        typeof statuses[props.status] !== 'undefined' ?
                                            (statuses[props.status].label ?? '') : ''}
                                </Chip>
                            }
                        </Box>
                    </Box>

                    <IconButton
                        aria-label="close"
                        variant="plain"
                        color="neutral"
                        size="small"

                        sx={{
                            position: 'absolute',
                            opacity: '.5',
                            top: '0.5rem',
                            right: '0.5rem',
                            '&:hover': { opacity: 1, backgroundColor: 'transparent' },
                        }}

                        onClick={(event) => {
                            event.preventDefault();
                            db.collection('todos').doc(props.id).delete()
                        }} >

                        <CloseIcon fontSize="small" sx={{ color: 'white', '&:hover': { opacity: 1, backgroundColor: 'transparent' } }} />
                    </IconButton>
                </Card>
            </ListItem >
        </Fade >

    )
}

export default Todo