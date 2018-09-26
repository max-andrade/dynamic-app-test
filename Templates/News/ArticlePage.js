
const ArticlePage = {
    config: {
        id: 'articlePage',
        type: 'scrollView',        
    },
    props: {
        contentContainerStyle: { flexDirection: 'row', flexWrap: 'wrap', padding: 10,  },
    },
    emptyTemplate: {},
    contentTemplate: [
        {
            image: {
                id: 'imageUrl',
                style: { width: 320, height: 200, marginBottom: 10, }
            },
        },
        {
            config: {
                type: 'view',                
            },
            props: {
                style: { flexDirection: 'row', flexWrap: 'wrap'},
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
                id: 'title',
                style: { fontSize: 18, fontWeight: 'bold', marginTop: 10, }
            },
        },        
        {
            text: {
                id: 'body',
                style: { marginTop: 10, textAlign: 'justify', }
            },
        },        
    ],
};

export default ArticlePage;