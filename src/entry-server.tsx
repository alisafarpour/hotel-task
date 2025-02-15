import {renderToString} from "react-dom/server";
import {StaticRouter} from "react-router-dom";
import App from "./App";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import theme from "./theme";
import {CacheProvider} from "@emotion/react";
import createCache from "@emotion/cache";

export function render(url: string) {
    const queryClient = new QueryClient();
    const cache = createCache({key: "css"});

    const html = renderToString(
        <QueryClientProvider client={queryClient}>
            <CacheProvider value={cache}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <StaticRouter location={url}>
                        <App/>
                    </StaticRouter>
                </ThemeProvider>
            </CacheProvider>
        </QueryClientProvider>
    );
    return {html}

}