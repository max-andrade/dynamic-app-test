import * as React from 'react';
import { Text, View, ScrollView, StyleSheet, Image, ActivityIndicator, Button } from 'react-native';
import { Constants } from 'expo';
import { Card } from 'react-native-elements';
import moment from 'moment';
import { Icons } from './icons';
import StatusBarUnderlay from './StatusBarUnderlay';
import NewsPageTemplate from './Templates/News/NewsPage';

export default class App extends React.Component {
  state = { };

  renderText = (template, item) => (
    <Text key={template.id} style={template.style}>{item[template.id]}</Text>
  );

  renderDate = (template, item) => (
    <Text key={template.id} style={template.style}>{moment(item[template.id]).format('DD/MM/YYYY')}</Text>
  );

  renderImage = (template, item) => (
    <Image
      key={template.id}
      style={template.style}
      source={{ uri: item[template.id] }}
    />
  );

  renderIcon = (template, item) => Icons[template.id](template);

  renderCard(template, props, item, content) {
    const image = (template.config.image && { uri: item[template.config.image] }) || null;
    const title = (template.config.title && item[template.config.title]) || null;
    return <Card {...props} image={image} title={title}>{content}</Card>;
  }

  fillTemplate = (template, item) => {
    const content = [];    
    template.config = template.config || {};

    if (template.contentTemplate && Array.isArray(template.contentTemplate)) {
      for (const component of template.contentTemplate)
        content.push(this.fillTemplate(component, item));
    } else {
      template.text
        ? content.push(this.renderText(template.text, item))
        : template.date
          ? content.push(this.renderDate(template.date, item))
          : template.image
            ? content.push(this.renderImage(template.image, item))
            : template.icon 
              ? content.push(this.renderIcon(template.icon, item))
              : content.push(this.fillTemplate(template.contentTemplate, item));
    }

    const type = template.config.type || 'View';
    const props = {
      ...template.props,
      key: `${template.id || template.config.id || 'n/a'} - ${item.id || 'n/a'}`,
    };

    return type.match(/ScrollView/i)
      ? <ScrollView {...props}>{content}</ScrollView>
      : type.match(/Card/i)
        ? this.renderCard(template, props, item, content)
        : <View {...props}>{content}</View>;
  };

  render = () => {
    var content = [];
   
    NewsPageTemplate.config = NewsPageTemplate.config || {};
    NewsPageTemplate.config.dataSource = NewsPageTemplate.config.dataSource || {};

    if (NewsPageTemplate.config.dataSource.isLoaded) {
      const data = NewsPageTemplate.config.dataSource.data;
      if (data.length > 0) {
        for (const item of data) {
          content.push(this.fillTemplate(NewsPageTemplate.contentTemplate || NewsPageTemplate, item));
        }
      } else {
        NewsPageTemplate.emptyTemplate && content.push(NewsPageTemplate.emptyTemplate);
      }        
    } else {
      content.push(<ActivityIndicator key="loading" size="large" style={{marginTop: 20}} />);
      NewsPageTemplate.config.dataSource.load && NewsPageTemplate.config.dataSource.load().then(data => {
        NewsPageTemplate.config.dataSource.isLoaded = true;
        NewsPageTemplate.config.dataSource.data = data || [];
        this.setState({refresh: new Date()});
      });        
    }

    if (content.length === 0) content.push(<Text id='empty'>No content found...</Text>);

    const container = NewsPageTemplate.config.type.match(/ScrollView/i)
      ? <ScrollView {...NewsPageTemplate.props}>{content}</ScrollView>
      : <View {...NewsPageTemplate.props}>{content}</View>;

    return (<View style={styles.container}>
      <StatusBarUnderlay />
      {container}
      <Button onPress={() => {
        NewsPageTemplate.config.dataSource.isLoaded = false;
        NewsPageTemplate.config.dataSource.data = null;
        this.setState({ refresh: new Date() });
      }} title="reset"/>      
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
