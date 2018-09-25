import endpoints from '../../endpoints';
import itemTemplate from './NewsItemSummary';

const NewsPage = {
    config: {
        id: 'newsPage',
        type: 'scrollView',        
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
    contentTemplate: itemTemplate,
};

export default NewsPage;