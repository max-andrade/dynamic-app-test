import { Dimensions } from 'react-native';

const endpoints = {
    news: {
        type: 'object',
        async: true,
        load: async ({
            page = 0,
            pageSize = null,
            filter = null,
            partialCallback = null,
        } = {}) => {
            const sampleData = [
                {
                    id: 1,
                    title: 'First article',
                    author: 'John Doe',
                    startDate: '2018-01-01',
                    body: 'Our team of experienced consultants will help you implement a solution that meets your immediate needs, and can give you advice and guidance on how to get the most out of this important investment.',
                    imageUrl: 'https://i.ytimg.com/vi/qtV9ohLO0kA/maxresdefault.jpg',
                },
                {
                    id: 2,
                    title: 'Second article',
                    author: 'Bob Marley',
                    startDate: '2018-01-02',
                    body: 'Research indicates it costs ten times more to acquire a new customer than service an existing one. Customer Relationship Management (CRM) systems were designed to help organisations manage these interactions across a business, ensuring everyone is aware of the status of a customer and their relationship with the organisation.',
                    imageUrl: 'https://images.template.net/wp-content/uploads/2016/02/23044509/PPT-Format-Newspaper-Template-Free-Download.jpg',
                },
                {
                    id: 3,
                    title: 'Third article',
                    author: 'Clark Kent',
                    startDate: '2018-01-03',
                    body: 'Managing customers is a key requirement for most organisations, who need help to manage sales, drive effective marketing, and ensure successful customer service.',
                    imageUrl: 'https://www.empired.com/Global/Images/Homepage%20images/Cohesion-slider.jpg',
                },
            ];            
            return new Promise(resolve => window.setTimeout(() => resolve(sampleData), 3000));
        },
    },
};

const ArticlePage = {
    config: {
        id: 'articlePage',
        type: 'ScrollView',        
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
                type: 'View',                
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

const NewsSummary = {
    config: {
        id: 'articleSummary',
        type: 'Card',
        image: 'imageUrl',
        //title: 'title',         
    },
    props: {       
        containerStyle: { flexGrow: 1, width: Dimensions.get('screen').width / 3, margin: 8, },
    },
    contentTemplate: [
        /*{
            image: {
                id: 'imageUrl',
                style: { width: 320, height: 200, marginBottom: 10, }
            },
        },*/
        {
            config: {
                type: 'View',                
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

const NewsPage = {
    config: {
        id: 'newsPage',
        type: 'ScrollView',        
        dataSource: endpoints.news,
        allowRefresh: true,
        onTap: {
            scrollView: {},
        },
    },
    props: {
        contentContainerStyle: { flexDirection: 'row', flexWrap: 'wrap', padding: 10,  },
    },
    emptyTemplate: {},
    contentTemplate: NewsSummary,
};

const ContentTabNavigation = {
    config: {
        id: 'contentTabNavigation',
        type: 'TabNavigator',  
        dataSource: [
            {
                config: {
                    id: 'news',
                    title: 'News',
                    icon: 'news',
                },
                props: {},
                contentTemplate: [
                    NewsPage,
                    ArticlePage,
                ],
            },
            {
                config: {
                    id: 'alerts',
                    title: 'Alerts',
                    icon: 'info',
                },
                props: {},
                contentTemplate: {
                    config: {
                        id: 'blankPage',
                        type: 'View',        
                    },
                    props: {},
                    emptyTemplate: {},
                    contentTemplate: {},
                },
            }            
        ]     
    },
    props: {},
};

const MainNavigation = {
    config: {
        id: 'mainNavigation',
        type: 'DrawerNavigator',  
        dataSource: [
            {
                config: {
                    title: 'Content',
                    icon: 'documents',
                },
                props: {},
                contentTemplate: ContentTabNavigation,
            },
            {
                config: {
                    title: 'Logoff',
                    icon: 'signOut',
                },
                props: {},                
            }            
        ]     
    },
    props: {},
};

export default MainNavigation;