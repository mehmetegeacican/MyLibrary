import { Dialog, DialogTitle, DialogContent, DialogActions, Stack, Rating } from '@mui/material'
import { Button, Flex, Typography } from 'antd';
import { IBook } from '../../interfaces/DataInterfaces';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useAuthContext } from "../../hooks/contextHooks/useAuthContext";
import { useEffect } from 'react';

interface RatingModalInterface {
    open: boolean;
    handleClose: () => void;
    book: IBook;
}

export default function RatingModal({
    open,
    handleClose,
    book
}: RatingModalInterface) {

    const { plan } = useAuthContext();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Rating
            </DialogTitle>
            <DialogContent>
                <Flex vertical justify='space-between' gap={5}>
                    <Stack direction={'row'} spacing={2}>
                        <Typography>Liked</Typography>
                        <Rating
                            name="liked"
                            value={parseInt(book.liked ?? "0")}
                            readOnly
                            size="medium"
                            icon={<FavoriteIcon fontSize="inherit" />}
                            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                            style={{
                                color: 'red'
                            }}
                        />
                    </Stack>

                    {plan === 'pro' &&
                        <Stack direction={'row'} spacing={2}>
                            <Typography>Influence</Typography>
                            <Rating
                                name="influence"
                                value={parseInt(book.influence ?? "0")}
                                readOnly
                                size="medium"
                                style={{
                                    color: 'skyblue'
                                }}
                            />
                        </Stack>
                    }
                </Flex>


            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}
