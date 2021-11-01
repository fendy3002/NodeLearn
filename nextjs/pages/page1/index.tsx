import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

class Home extends React.Component {
    static async getInitialProps(ctx) {
        console.log("page1", ctx.req?.pathname);
        return {};
    }

    render() {
        return (
            <div>Page1</div>
        )
    }
}

export default Home
