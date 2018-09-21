import * as React from 'react';
import { Text, View, ScrollView, StyleSheet, Image } from 'react-native';
import { Constants } from 'expo';
import { Card } from 'react-native-elements'; 
import moment from 'moment';
import { Icons } from './icons';
import StatusBarUnderlay from './StatusBarUnderlay';
import NewsPageTemplate from './Templates/News/NewsPage';

let ctx = {};

export default class App extends React.Component {
  state = { ctx: NewsPageTemplate };

  fillText = template => {
    return <Text key={template.id} style={ template.style }>{ctx[template.id]}</Text>;
  };

  fillDate= template => {
    return <Text key={template.id} style={ template.style }>{moment(ctx[template.id]).format('DD/MM/YYYY')}</Text>;
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

  fillIcon = template => {
    return Icons[template.id](template);
  };

  
  fillTemplate = (template, item) => {
    const bkpCtx = ctx;
    ctx = item;

    const content = [];

    if (template.contentTemplate && Array.isArray(template.contentTemplate)) {
      for (const component of template.contentTemplate)
        content.push(this.fillTemplate(component, item));
    } else {
      template.text
        ? content.push(this.fillText(template.text))
        : template.date
          ? content.push(this.fillDate(template.date))
            : template.image
              ? content.push(this.fillImage(template.image))
              : template.icon && content.push(this.fillIcon(template.icon));
    }

    ctx = bkpCtx;

    const type = (container.config && container.config.type) || 'View';
    const style = (template.config || {}).style;
    const key = template.id || (template.config || {}).id || 'n/a';
    return type.match(/ScrollView/i)
      ? <ScrollView key={key} style={style}>{contents}</ScrollView>
      : type.match(/Card/i)
        ? <Card key={key} style={style}>{contents}</Card>
        : <View key={key} style={style}>{contents}</View>;
  };

  render = () => {
    var content = [];

    if (this.state.ctx) {
      ctx = this.state.ctx;
      const data = (ctx.config && ctx.config.dataSource && ctx.config.dataSource.load && ctx.config.dataSource.load()) || [];
      if (data.length > 0) {
        for (const item of data) {
          content.push(this.fillTemplate(ctx.contentTemplate || ctx, item));
        } 
      } else {
        ctx.emptyTemplate && content.push(ctx.emptyTemplate);
      }
    }

    if (content.length === 0) content.push(<Text id='empty'>No content found...</Text>);

    return (<View style={styles.container}>
      <StatusBarUnderlay />
      <ScrollView>{content}</ScrollView>
    </View>);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});
