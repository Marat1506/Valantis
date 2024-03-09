import { Box } from '@mui/material';
import Cardd from './Card';
import { useEffect } from 'react';
import { getIds, getItems } from '../api/request/request';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getProducts, stateId } from '../app/reducer';

export default function CardList() {
    const selector = useAppSelector(state => state.test.products)
    const page = useAppSelector(state => state.test.page)
    const stateID = useAppSelector(state => state.test.id)
    const filtr = useAppSelector(state => state.test.filtr)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchData = async () => {
            
            console.log("filtr = ", filtr)
            if (!filtr) {
                const data = await getIds(page)
                dispatch(stateId({ id: data }))
            }

        }
        fetchData()
    }, [page, filtr])

    useEffect(() => {
        const fetchData = async () => {
            if (stateID) {
                let startIndex = 0;
                let endIndex = 50;
                if (stateID.length > 50) {
                    startIndex = (page - 1) * 50;
                    endIndex = page * 50;
                }
                const uniqueIDs = [...new Set(stateID.slice(startIndex, endIndex))];
                console.log("SORTID = ", stateID)
                console.log("UniqueIDS = ", uniqueIDs)
                const data2 = await getItems(uniqueIDs);
                dispatch(getProducts({ products: data2 }))
            }
        }
        fetchData()
    }, [stateID, page])
    console.log("selector = ", selector)

    if (selector.length !== 0) {
        return (
            <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {selector.map(product => (
                    <Cardd product={product} key={product.id + Math.random()} />

                ))}
            </Box>
        );
    } else {
        return null;
    }
}