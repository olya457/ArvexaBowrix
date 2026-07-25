import React, {useState} from 'react';
import {Image, Pressable, ScrollView, Share, StyleSheet, Text, View} from 'react-native';
import {ScreenHeader} from '../components/layout/ScreenHeader';
import {ScreenScroll} from '../components/layout/ScreenScroll';
import {articles} from '../data/articles';
import {colors} from '../theme/colors';
import type {Article} from '../types';

const shareArticle = (article: Article) =>
  Share.share({title: article.title, message: `${article.title}\n\n${article.text}`});

export function ArticlesScreen() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  if (selectedArticle) {
    return (
      <View style={styles.screen}>
        <View style={styles.top}>
          <View style={styles.navigation}>
            <Pressable onPress={() => setSelectedArticle(null)}>
              <Text style={styles.back}>Back to Articles</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              style={styles.secondaryButton}
              onPress={() => shareArticle(selectedArticle)}>
              <Text style={styles.secondaryText}>Share</Text>
            </Pressable>
          </View>
          <View style={styles.detailHeading}>
            <ScreenHeader label="Learn" title={selectedArticle.title} />
          </View>
        </View>
        <ScrollView
          style={styles.screen}
          contentContainerStyle={styles.detailContent}
          showsVerticalScrollIndicator={false}>
          <Image
            source={selectedArticle.image}
            style={styles.detailImage}
            resizeMode="contain"
          />
          <Text style={styles.body}>{selectedArticle.text}</Text>
        </ScrollView>
      </View>
    );
  }

  return (
    <ScreenScroll>
      <ScreenHeader label="Learn" title="Bow Articles" />
      {articles.map(article => (
        <View key={article.title} style={styles.card}>
          <Image
            source={article.image}
            resizeMode="contain"
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{article.title}</Text>
            <Text style={styles.preview} numberOfLines={3}>
              {article.text}
            </Text>
            <View style={styles.actions}>
              <Pressable
                style={styles.openButton}
                onPress={() => setSelectedArticle(article)}>
                <Text style={styles.openText}>Open Article</Text>
              </Pressable>
              <Pressable
                style={styles.secondaryButton}
                onPress={() => shareArticle(article)}>
                <Text style={styles.secondaryText}>Share</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ))}
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1},
  top: {backgroundColor: colors.navy},
  navigation: {
    minHeight: 48,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  back: {color: colors.orange, fontSize: 15, fontWeight: '700'},
  detailHeading: {paddingHorizontal: 18, marginTop: -4},
  detailContent: {paddingBottom: 30},
  detailImage: {width: '100%', height: 300, backgroundColor: '#186B96'},
  body: {
    color: colors.white,
    fontSize: 15,
    lineHeight: 22,
    padding: 18,
    backgroundColor: '#168DC6',
  },
  card: {
    overflow: 'hidden',
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.line,
  },
  cardImage: {height: 190, width: '100%', backgroundColor: '#186B96'},
  cardContent: {padding: 15},
  cardTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 10,
  },
  preview: {color: colors.muted, fontSize: 14, lineHeight: 21},
  actions: {flexDirection: 'row', alignItems: 'center', marginTop: 13, gap: 10},
  openButton: {
    minHeight: 48,
    flex: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.orange,
  },
  openText: {color: colors.deep, fontSize: 15, fontWeight: '800'},
  secondaryButton: {
    height: 42,
    paddingHorizontal: 14,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {color: colors.muted, fontWeight: '700'},
});
