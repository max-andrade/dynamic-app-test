import endpoints from '../../endpoints';
import itemTemplate from './NewsItemSummary';

const NewsPage = {
    config: {
        id: 'newsPage',
        type: 'scrollView',        
        dataSource: endpoints.news,
        allowRefresh: true,
        style: {},
        onTap: {
            scrollView: {},
        },
    },
    emptyTemplate: {},
    contentTemplate: itemTemplate,
};

export default NewsPage;