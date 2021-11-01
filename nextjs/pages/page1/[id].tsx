import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

class Home extends React.Component {

    render() {
        return (
            <div>Page1</div>
        )
    }
}

export const getServerSideProps = async (ctx) => {
    console.log("page1/[id]", ctx.query);
    return {
        props: {}
    };
};

export default Home
