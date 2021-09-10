import React from 'react';
import PropTypes from 'prop-types';
// import { Helmet } from "react-helmet";
import Head from "next/head";
import { useRouter } from 'next/router'
import { homepage } from './BaseUrl';


const MetaDecorator = ({ title, description, keywords, ogTitle, ogUrl, ogDescription, ogImage }) => {
    const router = useRouter()

    return (
        <Head>
            <title>{title}</title>
           {description ? <meta name='description' content={description} /> : null}
           {keywords ? <meta name='keywords' content={keywords} /> : null}
            {ogTitle ? <meta property="og:title" content={ogTitle}/> : null}
            <meta property="og:site_name" content="Knitter's Pride"/>
            {router.asPath ? <meta property="og:url" content={homepage + router.asPath}/> : null}
            {ogDescription ? <meta property="og:description" content={ogDescription}/> : null}
            <meta property="og:type" content="website"/>
            {ogImage ? <meta property="og:image" content={ogImage}/> : null}
            <meta property="og:image:width" content="500" />
            <meta property="og:image:height" content="500" />
            <link rel="canonical" href={homepage + router.asPath} />            
        </Head>
    )
}

MetaDecorator.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    keywords: PropTypes.string.isRequired,
    ogTitle: PropTypes.string.isRequired,
    ogUrl: PropTypes.string,
    ogDescription: PropTypes.string.isRequired,
    ogImage: PropTypes.string.isRequired,
}

export default MetaDecorator;
