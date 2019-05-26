import * as _        from 'lodash';
import * as syllable from 'syllable';
import {seedList}    from './seedList';

const capitalize = (string: string) => _.startCase(_.camelCase(string));

export const random = (list: any[]) => list[Math.floor(Math.random() * list.length)];

const searchBestDatamuse = (suggestions: any, names: any) => {
  _.map(suggestions, (suggestion: any) => suggestion.score = syllable(suggestion.word));
  _.map(suggestions, (suggestion: any) => {
    if ((suggestion.score + names.first.syllables) % 2 === 0 && capitalize(suggestion.word.substring(0, 2)) === names.first.twoLetters) {
      return suggestion.top = true;
    } else if ((suggestion.score + names.first.syllables) % 2 === 0) {
      return suggestion.bottom = true;
    } else {
      return false;
    }
  });
  const best = _.filter(suggestions, (suggestion: any) => suggestion.top === true);
  const mediocre = _.filter(suggestions, (suggestion: any) => suggestion.bottom === true);
  if (best.length > 0) {
    console.log('Best: ' + capitalize(random(best).word));
    return capitalize(random(best).word);
  } else if (mediocre.length > 0) {
    console.log('Mediocre: ' + capitalize(random(mediocre).word));
    return capitalize(random(mediocre).word);
  } else if (suggestions.length === 0) {
    console.log('Special: ');
    return 'Special';
  } else {
    console.log('Fail: ' + capitalize(random(suggestions).word));
    return capitalize(random(suggestions).word);
  }
};

export const arrangeInput = (name: string) => {
  const stringList = name.trim().split(/\s+/);
  const namesList = _.map(stringList, (name: string) => capitalize(name));
  const namesInput: any = {first: {name: namesList[0], letter: namesList[0].charAt(0), twoLetters: namesList[0].substring(0, 2)}};
  if (namesList.length > 1) {
    namesInput.second = {name: namesList.slice(-1)[0], letter: namesList.slice(-1)[0].charAt(0), twoLetters: namesList.slice(-1)[0].substring(0, 2)}
  }
  return namesInput;
};

export const arrangeCadence = (names: any) => {
  names.syllables = syllable(names.name);
  return names;
};

export const datamuseRequest = async (names: any, seed: string, count: number) => {
  const initResponse = await fetch(`https://api.datamuse.com/words?rel_jjb=${seed}&sp=${names.first.letter}*`);
  const response = await initResponse.json();
  if (Object.keys(response).length === 0) {
    count++;
    if (count <= 25) {
      await datamuseRequest(names, random(seedList), 0);
    } else {
      return 'Special ' + names['first']['name'];
    }
  } else {
    return await searchBestDatamuse(response, names) + ' ' + names.first.name;
  }
};

// const urbanDictRequest = () => {
//  includes running new words through syllable thingy
//  pick the first two words that fit the syllable pattern
//  randomly return one or the other within the name
// }:
