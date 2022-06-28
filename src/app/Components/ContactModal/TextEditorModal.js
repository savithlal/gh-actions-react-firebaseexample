import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Theme} from '../../Styles/Theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import {Fonts} from '../../Styles/Font';
import PlainColorButton from '../Buttons/PlainColorButton';
import {
  actions,
  getContentCSS,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
//AUthor Charles
//This modal is used for popup inspector details

export const TextEditorModal = ({visibility, close, data}) => {
  const richText = React.createRef();
  return (
    <Modal
      isVisible={visibility}
      onSwipeComplete={close}
      swipeDirection={['down']}
      style={styles.modalLayout}
      onBackdropPress={close}>
      <View style={styles.modalContainer}>
        <View style={styles.drawer} />
        <View
          style={{borderWidth: 0.8, borderColor: Theme.DARK_GREY, margin: 10}}>
          <RichToolbar
            style={styles.richBar}
            flatContainerStyle={styles.flatStyle}
            editor={richText}
            iconSize={15}
            // iconGap={10}
            // disabled={disabled}
            selectedIconTint={Theme.BLACK}
            disabledIconTint={Theme.grey_3}
            onPressAddImage={() => onPressAddImage()}
            onInsertLink={() => setGetUrlVisible(true)}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.undo,
              actions.redo,
              // actions.insertVideo,
              //  actions.insertImage,
              actions.setStrikethrough,
              actions.checkboxList,
              actions.insertOrderedList,
              actions.blockquote,
              actions.alignLeft,
              actions.alignCenter,
              actions.alignRight,
              // actions.code,
              actions.line,
              actions.heading1,
              actions.heading2,
              actions.heading3,
              actions.heading4,
              // 'insertEmoji',
              // 'insertHTML',
              // 'fontSize',
            ]} // default defaultActions
            iconMap={{
              //insertEmoji: phizIcon,
              [actions.heading1]: ({tintColor}) => (
                <Text style={[styles.tib, {color: tintColor}]}>H1</Text>
              ),
              [actions.heading2]: ({tintColor}) => (
                <Text style={[styles.tib, {color: tintColor}]}>H2</Text>
              ),
              [actions.heading3]: ({tintColor}) => (
                <Text style={[styles.tib, {color: tintColor}]}>H3</Text>
              ),
              [actions.heading4]: ({tintColor}) => (
                <Text style={[styles.tib, {color: tintColor}]}>H4</Text>
              ),
              // insertHTML: htmlIcon,
            }}
          />
          <View
            style={{
              height: 0.8,
              width: '100%',
              backgroundColor: Theme.DARK_GREY,
            }}
          />
          <ScrollView keyboardDismissMode={'none'}>
            <RichEditor
              initialFocus={true}
              //disabled={disabled}
              // editorStyle={contentStyle} // default light style
              ref={richText}
              style={styles.rich}
              placeholder={' '}
              //initialContentHTML={initHTML}
              //editorInitializedCallback={that.editorInitializedCallback}
              //onChange={that.handleChange}
              //onHeightChange={that.handleHeightChange}
              //onPaste={that.handlePaste}
              //onKeyUp={that.handleKeyUp}
              // onKeyDown={that.handleKeyDown}
              // onMessage={that.handleMessage}
              // onFocus={that.handleFocus}
              //onBlur={that.handleBlur}
              //pasteAsPlainText={true}
              initialFocus={true}
            />
          </ScrollView>
        </View>
        <PlainColorButton
          name={'CALL'}
          customStyle={styles.button}
          icon={true}
          iconName="call"
        />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalLayout: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingBottom: 25,
    elevation: 15,
  },
  headTitle: {
    alignSelf: 'center',
    fontSize: 18,
    fontFamily: Fonts.SemiBold,
    color: Theme.BLACK,
    marginBottom: 10,
  },
  headDis: {
    alignSelf: 'center',
    fontSize: 18,
    fontFamily: Fonts.Regular,
    marginTop: 3,

    color: Theme.BLACK,
  },
  closeIcon: {alignSelf: 'flex-end', marginRight: 15, marginTop: 5},

  drawer: {
    backgroundColor: Theme.LIGHT_GREY,
    height: 4,
    width: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 8,
    borderRadius: 2,
  },
  button: {
    marginHorizontal: 17,
    marginVertical: 5,
  },
  centeredView: {
    //alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 4,
    // borderColor: 'rgba(0, 0, 0, 0.1)',
    flex: 1,
    //marginTop: Platform.OS === 'ios' ? 50 : 30,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'white',
    // backgroundColor: 'white',
  },
  modalView: {
    width: '96%',
    backgroundColor: 'white',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    padding: 15,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    // fontFamily: 'Montserrat-SemiBold',
    // color: colors.color_primary_1,
    fontSize: 16,
  },
  regulartext: {
    fontSize: 12,
    //fontFamily: 'Montserrat-Regular',
    // color: colors.grey_2,
  },
  buttonText: {
    fontSize: 12,
    // fontFamily: 'Montserrat-SemiBold',
    color: '#ffffff',
    margin: 10,
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  root: {
    flex: 1,

    backgroundColor: 'white',
  },
  editor: {
    flex: 1,
    padding: 0,
    borderColor: 'white',
    borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: 'white',
  },
  rich: {
    //minHeight: 300,
    flex: 1,
  },
  flatStyle: {
    paddingHorizontal: 12,
    backgroundColor: Theme.White,
  },
  HeaderStyle: {
    color: Theme.PRIMARY_GREEN,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    margin: 8,
  },
  tib: {
    textAlign: 'center',
    color: '#515156',
  },
  richBar: {
    borderColor: '#efefef',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
