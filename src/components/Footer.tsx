import { Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';

import { useAppDispatch, useAppSelector } from '../app/hooks';

import { getPage } from '../app/reducer';



export default function Footer() {
    const selectPage = useAppSelector(state => state.test.page)
    const dispatch = useAppDispatch()
    
    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(getPage({page: value}))

      };

    return (
        <Box sx={{width: '100wh',height: '50px', backgroundColor: 'burlywood', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Pagination count={10} page={selectPage} onChange={handleChange} color="primary" />
        </Box>

    );
}