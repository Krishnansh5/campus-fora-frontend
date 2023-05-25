import React from 'react';
import Head from 'next/head';

function Meta({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
    </div>
  );
}

Meta.defaultProps = {
  title: 'Campus Fora',
  description: ''
};

export default Meta;
