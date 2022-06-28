import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

export function IsEmpty(text) {
  var result = false;
  if (text === '' || text === undefined) {
    result = true;
  }
  return result;
}

export function IsEmptyArray(text) {
  var result = false;
  if (text.length === 0) {
    result = true;
  }
  return result;
}

export function IsValidEmail(email) {
  var re = /^(([^<>()\[\]\\,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
export function IsValidNumber(text) {
  var re = /^\d{10}$/g;

  return re.test(text);
}
export function IsYouTubeUrl(url) {
  var re = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return re.test(url);
}

export function isURL(str) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  if (str.indexOf('http://') === 0 || str.indexOf('https://') === 0) {
    return !pattern.test(str);
  } else {
    return true;
  }
}

export const useInitialRender = () => {
  const [isInitialRender, setIsInitialRender] = useState(false);

  if (!isInitialRender) {
    setTimeout(() => setIsInitialRender(true), 1);
    return true;
  }
  return false;
};
