const NewsItemSummary = {
    config: {
        type: 'card',
    },
    contentTemplate: [
        {
            text: {
                id: 'title',
                style: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, }
            },
        },
        {
            image: {
                id: 'imageUrl',
                style: { width: 320, height: 200, marginBottom: 10, }
            },
        },
        {
            config: {
                type: 'view',
                style: { flexDirection: 'row', },
            },
            contentTemplate: [
                {
                    icon: {
                        id: 'calendar',
                        size: 16,
                    },
                },
                {
                    date: {
                        id: 'startDate',
                        style: { marginLeft: 10, marginRight: 10, }
                    },
                },
                {
                    icon: {
                        id: 'user',
                        size: 16,
                    },
                },
                {
                    text: {
                        id: 'author',
                        style: { marginLeft: 10, marginRight: 10, }
                    },
                },
            ],
        },
        {
            text: {
                id: 'body',
                style: { marginTop: 10, textAlign: 'justify', }
            },
        },
    ],
};

export default NewsItemSummary