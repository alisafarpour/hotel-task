import { useParams } from "react-router-dom"
import Grid2 from "@mui/material/Grid2"
import {useGetData} from "@hooks/useGetData.ts"
import type {hotel} from "@type/hotel.ts"

const HotelDetails = () => {
    const { id } = useParams();
    const { data: hotel, isLoading } = useGetData<hotel>(`hotels/${id}`,'GetHotelDetails', id ? [id] : []);

    if (isLoading) return <p>Loading...</p>;
    if (!hotel) return <p>Hotel not found</p>;

    return (
        <Grid2 container spacing={2} >
            <h1>{hotel.name}</h1>
            <p>{hotel.description}</p>
        </Grid2>
    );
};

export default HotelDetails;
