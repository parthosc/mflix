import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";
import { AppProps } from "next/app";

function App(
    props: AppProps
) {
    const { Component } = props;
    const pageProps = props.pageProps;
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}

export default App;