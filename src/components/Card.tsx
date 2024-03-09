import { Card, Typography } from '@mui/material'


interface ProductType {
    id: string,
    product: string,
    price: number,
    brand: string | null,
}
export default function Cardd({ product }: { product?: ProductType }) {
    if (product) {
        return (
            <Card variant="outlined" sx={{ width: '250px', height: '150px', marginTop: '30px' }}>
                <Typography>ID: {product.id}</Typography>
                <Typography>Name: {product.product}</Typography>
                <Typography>Price: {product.price}</Typography>
                <Typography>Brand: {product.brand}</Typography>
            </Card>
        );
    } else {
        return null;
    }
}