// components/DynamicPage.tsx
import Head from 'next/head';
import {MAIN_APP_URL} from "@/config/config";

interface DynamicPageProps {
    description: string;
    canonicalUrl?: string;
}

const DynamicDescription: React.FC<DynamicPageProps> = ({description, canonicalUrl}) => {
    return (
        <Head>
            <meta name="description" content={description}/>
            {canonicalUrl ? <meta name="og:url" content={canonicalUrl}/> : <meta name="og:url" content={MAIN_APP_URL}/>}
            <meta property="og:description" content={description}/>
            {canonicalUrl ? <link rel="canonical" href={canonicalUrl}/> : <link rel="canonical" href={MAIN_APP_URL}/>}
        </Head>
    );
}

export default DynamicDescription;
