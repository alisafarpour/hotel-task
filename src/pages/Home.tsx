import {ChangeEvent, useDeferredValue, useMemo, useState} from "react"
import {Link} from "react-router-dom"
import Grid from "@mui/material/Grid2"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import TextField from "@mui/material/TextField"
import {useGetData} from "@hooks/useGetData"
import Highlighted from "@components/Highlighted"
import type {hotel} from "@type/hotel.ts"

const Home = () => {

    const {data: hotels, isLoading} = useGetData<hotel[]>('hotels', 'GetHotelList');
    const [searchQuery, setSearchQuery] = useState<string>("");

    const deferredSearchQuery = useDeferredValue(searchQuery);

    const filteredHotels = useMemo(() =>
        hotels?.filter((hotel) => {
            const searchTerm = deferredSearchQuery.toLowerCase();
            return (
                hotel.name.toLowerCase().includes(searchTerm) ||
                hotel.description.toLowerCase().includes(searchTerm)
            );
        }), [hotels, deferredSearchQuery]
    );

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <Grid size={12} container>
            <TextField
                label="Search Hotels"
                variant="outlined"
                fullWidth
                onChange={handleSearchChange}
                aria-label="Search Hotels"
            />

            <Grid container size={12} spacing={4} sx={{p: 2}}>
                {filteredHotels && !isLoading ? filteredHotels.length > 0 ? (
                        filteredHotels?.map((hotel) => (
                            <Grid key={hotel.name} component={Link} to={`/hotel/${hotel.id}`}
                                  container
                                  size={{xs: 12, sm: 6, md: 4}} sx={{textDecoration: 'none', height: 100}}
                            >
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">
                                            <Highlighted highlight={searchQuery} text={hotel.name}/>
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            <Highlighted highlight={searchQuery} text={hotel.description}/>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="body1">No hotels found.</Typography>
                    ) :
                    <Typography variant="body1">Loading</Typography>}
            </Grid>
        </Grid>
    );
};

export default Home;
