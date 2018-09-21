import * as React from 'react';
import { Text, View, ScrollView, StyleSheet, Image } from 'react-native';
import { Constants } from 'expo';
import { Card } from 'react-native-elements'; 
import moment from 'moment';
import { Icons } from './icons';

let ctx = {};

const endpoints = {
  news: {
    type: 'object',
    load: (/*{
      page = 0,
      pageSize = null,
      filter = null,
      partialCallback = null,
    }*/) => {
      return [
        {
          id: 1,
          title: 'First article xxxx',
          author: 'John Doe',
          startDate: new Date(),
          content: 'bla, bla, bla...',
          imageUrl: 'https://i.ytimg.com/vi/qtV9ohLO0kA/maxresdefault.jpg',
        },
        {
          id: 2,
          title: 'Second article',
          author: 'Bob Marley',
          startDate: new Date(),
          content: 'bla, bla, bla...',
          imageUrl:
            'https://images.template.net/wp-content/uploads/2016/02/23044509/PPT-Format-Newspaper-Template-Free-Download.jpg',
        },
      ];
    },
  },
};

const newsItemTemplate = {
  card: {
    verticalStack: {
      config: {},
      contentTemplate: [
        {
          text: {
            id: 'title',
            style: { fontSize: 18, fontWeight: 'bold', marginBottom: 10}
          },
        },
        {
          image: {
            id: 'imageUrl',
            style: { width: 300, height: 200, marginBottom: 10}
          },
        },
        {
          horizontalStack: {
            config: {},
            contentTemplate: [
              { icon: 'calendar' },
              {
                date: {
                  id: 'startDate',
                },
              },              
              { icon: 'user' },
              {
                text: {
                  id: 'author',
                },
              },
            ],
          },
        },
        {
          multiline: {
            id: 'content',
            style: { marginTop: 10}
          },
        },
      ],
    },
  },
};

const newsPageTemplate = {
  verticalStack: {
    config: {
      id: 'newsPage',
      style: {},
      dataSource: endpoints.news,
      allowRefresh: true,
      onTap: {
        verticalStack: {},
      },
    },
    emptyTemplate: {},
    contentTemplate: newsItemTemplate,
  },
};

const app = newsPageTemplate;

export default class App extends React.Component {
  state = { ctx: app };

  fillTemplate = (template, item) => {
    const bkpCtx = ctx;
    ctx = item;

    let content = [];

    if (template.contentTemplate && Array.isArray(template.contentTemplate)) {
      for (const x of template.contentTemplate)
        content.push(this.fillTemplate(x, item));
    } else {
      if (template.card) content.push(this.fillCard(template.card, item));
      if (template.text) content.push(this.fillText(template.text));
      if (template.date) content.push(this.fillDate(template.date));
      if (template.image) content.push(this.fillImage(template.image));
      if (template.icon) content.push(this.fillIcon(template.icon));
      if (template.multiline)
        content.push(this.fillMultiline(template.multiline));
      if (template.verticalStack || template.horizontalStack)
        content.push(
          this.fillTemplate(
            template.verticalStack || template.horizontalStack,
            item
          )
        );
    }

    ctx = bkpCtx;
    return content.length === 1 ? content[0] : content;
  };

  fillCard = (template, item) => {
    const bkpCtx = ctx;
    ctx = item;

    const content = [];

    if (template.verticalStack || template.horizontalStack)
      content.push(
        this.fillTemplate(
          template.verticalStack || template.horizontalStack,
          item
        )
      );

    ctx = bkpCtx;

    return <Card key={item.id}>{content}</Card>;
  };

  fillText = template => {
    return <Text key={template.id} style={ template.style }>{ctx[template.id]}</Text>;
  };

  fillDate= template => {
    return <Text key={template.id} style={ template.style }>{moment(ctx[template.id]).format('DD/MM/YYYY')}</Text>;
  };


  fillMultiline = template => {
    return <Text key={template.id} style={ template.style }>{ctx[template.id]}</Text>;
  };

  fillImage = template => {
    return (
      <Image
        key={template.id}
        style={ template.style }
        source={{ uri: ctx[template.id] }}
      />
    );
  };

  fillIcon = id => {
    return Icons[id]();
  };

  render = () => {
    if (this.state.ctx.verticalStack) {
      ctx = this.state.ctx.verticalStack;
      const data = ctx.config.dataSource.load();
      if (data.length > 0) {
        const content = [];
        for (const item of data) {
          content.push(this.fillTemplate(ctx.contentTemplate, item));
        }
        return <ScrollView style={styles.container}>{content}</ScrollView>;
      } else {
        return null;
      }
    }

    return (
      <View style={styles.container}>
        <Text>Shouldn't be here....</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
