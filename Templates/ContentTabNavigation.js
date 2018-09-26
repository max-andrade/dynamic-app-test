import newsPage from './News/NewsPage';
import articlePage from './News/ArticlePage';

const ContentTabNavigation = {
    config: {
        id: 'contentTabNavigation',
        type: 'TabNavigator',  
        dataSource: [
            {
                config: {
                    title: 'News',
                    icon: 'News',
                },
                props: {},
                contentTemplate: {
                    config: {
                        id: 'newsStackNavigation',
                        type: 'StackNavigator',                        
                    },
                    contentTemplate: [
                        newsPage,
                        articlePage,
                    ]
                }
            },
            {
                config: {
                    title: 'Alerts',
                    icon: 'Info',
                },
                props: {},
                contentTemplate: {}
            }            
        ]     
    },
    props: {},
    emptyTemplate: {},
    contentTemplate: newsPage,
};

export default ContentTabNavigation;