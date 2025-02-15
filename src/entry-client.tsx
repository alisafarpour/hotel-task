import {hydrateRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import theme from "./theme";
import {CacheProvider} from "@emotion/react";
import createCache from "@emotion/cache";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
const cache = createCache({key: "custom"});

hydrateRoot(
    document.getElementById("root")!,
    <QueryClientProvider client={queryClient}>
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <BrowserRouter>
                        <App/>
                </BrowserRouter>
            </ThemeProvider>
        </CacheProvider>
        <ReactQueryDevtools initialIsOpen={false} position="right" />
    </QueryClientProvider>
);
