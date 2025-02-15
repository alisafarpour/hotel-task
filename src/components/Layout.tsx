import Grid from "@mui/material/Grid2";
import {Outlet} from "react-router-dom";

const Layout = () => {

    const navbarItems = [
        {
            title: "Home",
            href: "/",
        },
        {
            title: "Hotels Map",
            href: "/map",
        },
    ]

    return (
        <Grid container justifyContent={'center'} alignItems={"flex-start"} sx={{position: 'relative'}}>
            <Grid container columnGap={6} size={12} sx={{px: 8, py: 1, borderBottom:1}}>
                {navbarItems.map(navbarItems =>
                    <Grid key={navbarItems.title} size={'auto'} component={'a'} href={navbarItems.href}
                          sx={{
                              textDecoration: 'none',
                              p:1,
                              borderRadius:1,
                              color: '#000',
                              transition: '0.2s all ease-in-out',
                              '&:hover': {
                                  bgcolor: 'red',
                                  color:'white'
                              }
                          }}
                    >
                        {navbarItems.title}
                    </Grid>
                )}
            </Grid>
            <Grid component={'main'} container size={12} sx={{px: 8, mt: 2}}>
              <Outlet />
            </Grid>
        </Grid>
    )
}

export default Layout