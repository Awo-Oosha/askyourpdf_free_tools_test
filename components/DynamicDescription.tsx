import Head from 'next/head';
import {MAIN_APP_URL, OG_IMAGE_URL} from "@/config/config";

interface DynamicPageProps {
    description: string;
    canonicalUrl?: string;
    imageUrl?: string;
}

const DynamicDescription: React.FC<DynamicPageProps> = ({description, canonicalUrl, imageUrl}) => {
    return (
        <Head>
            <meta name="description" content={description}/>
            {canonicalUrl ? <meta name="og:url" content={canonicalUrl}/> : <meta name="og:url" content={MAIN_APP_URL}/>}
            <meta property="og:description" content={description}/>
            {canonicalUrl ? <link rel="canonical" href={canonicalUrl}/> : <link rel="canonical" href={MAIN_APP_URL}/>}
            {imageUrl ? <meta property="og:image" content={`${OG_IMAGE_URL}${imageUrl}`}/> :
                <meta property="og:image" content="https://askyourpdf.com/logo512.png"/>}
        </Head>
    );
}

export default DynamicDescription;
