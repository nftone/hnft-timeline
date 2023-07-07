const data = {
    timelineEvents: [
        {
            id: 1,
            name: "Namecoin creation",
            slug: "namecoin-creation",
            date: "2011-04-17T00:00:00.000Z",
            image: "namecoin.jpg",
            links: null,
            updated_at: "2022-11-21T16:06:50.000Z",
            created_at: "2022-11-21T16:06:50.000Z",
        },
        {
            id: 2,
            name: "Counterparty creation",
            slug: "counterparty-creation",
            date: "2014-01-13T00:00:00.000Z",
            image: "counterparty.jpg",
            links: null,
            updated_at: "2022-11-21T16:06:50.000Z",
            created_at: "2022-11-21T16:06:50.000Z",
        },
        {
            id: 3,
            name: "Ethereum creation",
            slug: "ethereum-creation",
            date: "2015-07-30T00:00:00.000Z",
            image: "ethereum.jpg",
            links: null,
            updated_at: "2022-11-21T16:06:50.000Z",
            created_at: "2022-11-21T16:06:50.000Z",
        },
        {
            id: 4,
            name: "Bitcoin creation",
            slug: "bitcoin-creation",
            date: "2009-01-03T00:00:00.000Z",
            image: "bitcoin.jpg",
            links: null,
            updated_at: "2022-11-21T16:06:50.000Z",
            created_at: "2022-11-21T16:06:50.000Z",
        },
        {
            id: 5,
            name: "Dogeparty creation",
            slug: "dogeparty-creation",
            date: "2014-08-13T00:00:00.000Z",
            image: "dogeparty.jpg",
            links: null,
            updated_at: "2022-11-21T16:06:50.000Z",
            created_at: "2022-11-21T16:06:50.000Z",
        },
        {
            id: 6,
            name: "Ethereum Classic fork",
            slug: "ethereum-classic-fork",
            date: "2016-07-20T00:00:00.000Z",
            image: "ethereum-classic.jpg",
            links: null,
            updated_at: "2022-11-21T16:06:50.000Z",
            created_at: "2022-11-21T16:06:50.000Z",
        },
        {
            id: 7,
            name: "1st ERC-721 token",
            slug: "1st-erc-721-token",
            date: "2018-03-19T00:00:00.000Z",
            image: "ethereum.jpg",
            links: null,
            updated_at: "2022-11-21T16:06:50.000Z",
            created_at: "2022-11-21T16:06:50.000Z",
        },
    ]
}

const { timelineEvents } = data;

const fs = require('fs')
const path = require('path')
const axios = require('axios')

async function downloadImage () {
    for (const event of timelineEvents) {
        const url = `https://api.explorer.hnft.wtf/images/${event.image}`;
        const directoryPath = path.resolve(
            __dirname,
            "../../data/events",
            getDirectoryName(event),

        )
        const fileName = path.join(directoryPath, "image.jpg");
        const writer = fs.createWriteStream(fileName)

        const response = await axios.get(url, {responseType: 'stream'})
        response.data.pipe(writer)

        await new Promise ((resolve, reject) => {
            writer.on('finish', resolve)
            writer.on('error', reject)
        });
    }
}

const getDirectoryName = ({ date, slug }) => `${date.substring(0, 10)}-${slug}`;

downloadImage()