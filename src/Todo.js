import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import { useState } from 'react';
import firebase from 'firebase/compat/app'
import { collection, getDocs } from "firebase/firestore";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { createTheme, makeStyles, Theme, ThemeProvider } from "@mui/material/styles"
import { Fade } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { db } from './firebase'

function Todo(props) {

    const [modalState, setModalState] = useState(false);
    const [input, setInput] = useState(props.text);
    const [labelState, setLabelState] = useState({});

    React.useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(db, "statuses"));

            const snapshot = [];

            querySnapshot.forEach((doc) => {
                snapshot[doc.id] = doc.data();
            });

            setLabelState(
                {
                    color: snapshot[props.status].color,
                    text: snapshot[props.status].label
                }
            );
        })()

        console.log(labelState);
    });

    const theme = createTheme({
        palette: {
            secondary: {
                light: '#ff7961',
                main: '#f44336',
                dark: '#ba000d',
                contrastText: '#000',
            },
            white: {
                main: '#ffffff'
            }
        },
    });

    const openModal = () => {
        setModalState(true)
    }

    const closeModal = () => {
        setModalState(false)
    }

    const updateTodo = () => {
        db.collection('todos').doc(props.id).set({
            text: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true })

        setModalState(false)
    }

    return (
        <ThemeProvider theme={theme}>
            <Dialog open={modalState} onClose={closeModal}>
                <DialogTitle>Edit todo</DialogTitle>
                <DialogContent sx={{ minWidth: '400px' }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={input}
                        onChange={input => {
                            setInput(input.target.value)
                        }}
                        defaultValue={props.text}
                        label="Edit an todo.."
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={closeModal}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={updateTodo}>Update</Button>
                </DialogActions>
            </Dialog>

            <Fade in={true} unmountOnExit={true}>
                <ListItem sx={{
                    my: 2,
                    p: 0,
                    width: '100%',
                }}>

                    <Card
                        variant="outlined"
                        bgcolor="primary"
                        row
                        sx={{
                            minWidth: '320px',
                            borderRadius: 3,
                            flexGrow: 1,
                            py: 2,
                            px: 2,
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
                                <Typography level="h2" sx={{ color: '#FFFFFF', display: 'inline-block', m: 0 }} align="left" fontSize="lg" id="card-description">
                                    {props.text}
                                </Typography>
                                {props.status &&

                                    <Chip
                                        color={labelState.color ? labelState.color : 'primary'}
                                        size="small"
                                        sx={{
                                            pointerEvents: 'none',
                                            fontWeight: 'bold',
                                            fontSize: 10,
                                            ml: 1,
                                            px: 1,
                                            py: 0.2,
                                        }}
                                        label={labelState.text ? labelState.text : ''}
                                    />
                                }
                            </Box>
                        </Box>

                        <IconButton
                            aria-label="edit"
                            variant="plain"
                            size="small"
                            color="secondary"

                            sx={{
                                position: 'absolute',
                                opacity: '1',
                                top: '0.5rem',
                                right: '2rem',
                                '&:hover': {
                                    opacity: 1,
                                    backgroundColor: 'transparent'
                                },
                            }}

                            onClick={openModal} >

                            <EditIcon fontSize="small" sx={{ '&:hover': { opacity: 1, backgroundColor: 'transparent' } }} />
                        </IconButton>

                        <IconButton
                            aria-label="close"
                            variant="plain"
                            size="small"
                            color="white"

                            sx={{
                                position: 'absolute',
                                opacity: '.8',
                                top: '0.5rem',
                                right: '0.5rem',
                                '&:hover': { opacity: 1, backgroundColor: 'transparent' },
                            }}

                            onClick={(event) => {
                                event.preventDefault();
                                db.collection('todos').doc(props.id).delete()
                            }} >

                            <CloseIcon fontSize="small" sx={{ '&:hover': { opacity: 1, backgroundColor: 'transparent' } }} />
                        </IconButton>
                    </Card>
                </ListItem >
            </Fade >

        </ThemeProvider>
    )
}

export default Todo