// components/DynamicPage.tsx
import Head from 'next/head';
import {MAIN_APP_URL} from "@/config/config";

interface DynamicPageProps {
    title: string;
}

const DynamicPageTitle: React.FC<DynamicPageProps> = ({title}) => {
    return (
        <Head>
            {title ? <title>{title}</title> : <title>AskYourPDF: The Best PDF AI Chat App</title>}
        </Head>
    );
}

export default DynamicPageTitle;