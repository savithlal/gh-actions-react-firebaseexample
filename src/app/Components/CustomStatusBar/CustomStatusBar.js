import { View, Text, SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { connect, useSelector } from 'react-redux';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

CustomStatusBar = (props) => {

    // const [state, setState] = useState({
    //     backgroundColor: useSelector(state => state.SharedReducer.statusbarColor),
    //     barStyle: useSelector(state => state.SharedReducer.statusbarStyle),
    // });

    return (
        <View style={[styles.statusBar, { backgroundColor: props.backgroundColor }]}>
            <SafeAreaView>
                <StatusBar translucent backgroundColor={props.backgroundColor} barStyle={props.barStyle} />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
});

const mapStateToProps = (state) => ({
        backgroundColor: state.SharedReducer.statusbarColor,
        barStyle: state.SharedReducer.statusbarStyle,
    })
export default connect(mapStateToProps, null)(CustomStatusBar)