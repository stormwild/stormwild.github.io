export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export type Meta = {
    title: String!;
    author: String;
}

export type Props = {
    meta?: Meta;
    children?: ReactNode;
};
