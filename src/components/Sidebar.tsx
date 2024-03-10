import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { FormEvent, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { priceSort, stateFiltr, stateId } from '../app/reducer';
import { SortBrand, SortName, SortPrice } from '../api/request/request';



export default function Sidebar() {
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)
    const [price, setPrice] = useState<number>(0)
    const [name, setName] = useState<string>('')
    const [brand, setBrand] = useState<string>('')


    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const handleSearchPrice = async (e: FormEvent) => {
        e.preventDefault()
        setName('');
        setBrand('');
        dispatch(priceSort({ price: price }))
        const data = await SortPrice(price)
        dispatch(stateId({ id: data }))
        dispatch(stateFiltr({ stateFiltr: true }))
    }
    const handleSearchName = async (e: FormEvent) => {
        e.preventDefault()
        setPrice(0);
        setBrand('');
        const data = await SortName(name)
        dispatch(stateId({ id: data }))
        dispatch(stateFiltr({ stateFiltr: true }))
    }
    const handleSearchBrand = async (e: FormEvent) => {
        e.preventDefault()
        setPrice(0);
        setName('');
        const data = await SortBrand(brand)
        dispatch(stateId({ id: data }))
        dispatch(stateFiltr({ stateFiltr: true }))
    }

    const resetFilters = () => {
        setPrice(0);
        setName('');
        setBrand('');
        dispatch(stateFiltr({ stateFiltr: false }))
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>Фильтры</Typography>
                <Button onClick={toggleDrawer(false)}>X</Button>
            </Box>

            <Typography>Поиск по цене</Typography>
            <form onSubmit={handleSearchPrice} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                <TextField sx={{ width: '200px' }} value={price} onChange={e => setPrice(Number(e.target.value))} />
                <Button type='submit'>
                    <Search />
                </Button>

            </form>

            <Typography sx={{ marginTop: '30px' }}>Поиск по названию</Typography>
            <form onSubmit={handleSearchName} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                <TextField sx={{ width: '200px' }} value={name} onChange={e => setName(e.target.value)} />
                <Button type='submit'>
                    <Search />
                </Button>

            </form>
            <Typography sx={{ marginTop: '30px' }}>Поиск по бренду</Typography>
            <form onSubmit={handleSearchBrand} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                <TextField sx={{ width: '200px' }} value={brand} onChange={e => setBrand(e.target.value)} />
                <Button type='submit'>
                    <Search />
                </Button>

            </form>
            <Button sx={{ marginTop: '30px' }} onClick={resetFilters}>Сбросить фильтры</Button>
        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>Фильтры</Button>
            <Drawer open={open} >
                {DrawerList}
            </Drawer>
        </div>
    );
}