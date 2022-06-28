import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    Alert
} from 'react-native';
import { IconButton, Checkbox } from 'react-native-paper';
import { connect, useDispatch, useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { Dimensions } from 'react-native';
import ImageViewerComponent from './ImageViewer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteImagesFromLineItem } from '../../Redux/Actions/LineItemReducerActions';
import { Theme } from '../../Styles/Theme';

var RNFS = require('react-native-fs');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GalleryScreen = (props) => {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        orientation: "PORTRAIT",
        screenWidth: windowWidth,
        activeImageIndex: 0,
        isImageViewerVisible: false,
        isSelectMode: false,
        imageArray: [],
        lineItem: props?.route?.params?.lineItemName || null,
        lineItems: useSelector((state) => state.LineItemReducer.lineItems)
    })

    useEffect(() => {
        Dimensions.addEventListener('change', ({ window: { width, height } }) => {
            setState({
                ...state,
                screenWidth: width
            })
            if (width < height) {
                setState({
                    ...state,
                    orientation: "PORTRAIT"
                })
            } else {
                setState({
                    ...state,
                    orientation: "LANDSCAPE"
                })
            }
        })
    }, [])

    // Updated the local imageArray if any changes occured on redux state
    useEffect(() => {
        setState({
            ...state,
            imageArray: state.lineItems[state.lineItem].capturedImages,
        })
    }, [state.lineItems[state.lineItem].capturedImages, state.orientation])

    /**
     * deleteImages(): Deleted the images from redux state
     * @param {*} index 
     */
    const deleteImages = (index) => {
        dispatch(deleteImagesFromLineItem(state.lineItem, index))
    }

    /**
     * RenderImages(): Renders the flatlist images UI
     * @param {*} item 
     * @param {*} index 
     * @returns 
     */
    const RenderImages = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => {
                    setState({
                        ...state,
                        activeImageIndex: index,
                        isImageViewerVisible: true
                    })
                }}
                    style={[styles.imageContainer,
                    state.isSelectMode ? styles.selectedImageContainer : null
                    ]}
                >
                    <Image
                        source={{ uri: item.uri }}
                        style={styles.previewImage}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <View style={styles.checkBoxContainer}>
                    {state.isSelectMode ?
                        <Checkbox
                            color={Theme.PRIMARY_COLOR}
                            status={item?.isSelected ? 'checked' : 'unchecked'}
                            onPress={() => {
                                let images = state.imageArray
                                images[index]['isSelected'] = item?.isSelected ? false : true
                                setState({
                                    ...state,
                                    imageArray: images

                                })
                            }}
                        />
                        : null}
                </View>
            </View>
        )
    }

    // Shows when there are no images
    const NoDataComponent = () => {
        return (
            <View style={styles.noDataContainer}>
                <Text style={{ fontSize: 22 }}>No images found!</Text>
            </View>
        )
    }

    /**
     * showConfirmationAlert(): Displays confirmation alert and actions
     */
    const showConfirmationAlert = () => {
        Alert.alert(
            "Delete images?",
            "Selected images will be deleted if you confirm.",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("---------- Canceled")
                },
                {
                    text: "Confirm",
                    onPress: async () => {
                        let indexArray = []
                        await state.imageArray.map((item, index) => {
                            if (item.isSelected) {
                                indexArray.push(index)
                            }
                        })
                        deleteImages(indexArray)
                    },
                    style: "cancel"
                }
            ],
            { cancelable: false }
        );
    }

    // Returns main UI
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.mainView}
            >
                <View style={styles.headerRow}>
                    <View style={styles.backButtonContainer}>
                        <IconButton
                            icon={"keyboard-backspace"}
                            size={36}
                            color='grey'
                            style={styles.backButton}
                            onPress={() => {
                                props.navigation.goBack()
                            }}
                        />
                    </View>

                    <Text style={styles.headingText}
                    >{state.lineItem}</Text>

                    <View style={styles.headerButtonRow}>
                        {state.isSelectMode && state.imageArray.length > 0 ?
                            <IconButton
                                disabled={!state.imageArray.some((item, index) => {
                                    return item.isSelected ? true : false
                                })}
                                icon={"delete"}
                                size={24}
                                color='red'
                                onPress={() => { showConfirmationAlert() }}
                            />
                            : null
                        }
                        <TouchableOpacity
                            disabled={state.imageArray.length > 0 ? false : true}
                            onPress={() => {
                                setState({
                                    ...state,
                                    isSelectMode: !state.isSelectMode
                                })
                            }}
                        >
                            <Text style={styles.selectText}>Select</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    key={(state.orientation === "LANDSCAPE" ? 'L' : 'P')}
                    style={styles.flatlist}
                    contentContainerStyle={styles.flatlistContainer}
                    data={state.imageArray}
                    renderItem={RenderImages}
                    numColumns={state.orientation === "LANDSCAPE" ? 6 : 3}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => Math.random(12) + item.path}
                    extraData={state.imageArray}
                />

                {!state.imageArray.length > 0 ?
                    <NoDataComponent />
                    : null
                }

                {state.isImageViewerVisible && state.imageArray.length > 0 ?
                    <ImageViewerComponent
                        images={state.imageArray}
                        activeImageIndex={state.activeImageIndex}
                        onswipeDown={() => setState({
                            ...state,
                            isImageViewerVisible: false
                        })}
                        onDelete={(imageIndex) => deleteImages([imageIndex])}
                    />
                    : null
                }
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        flexDirection: 'row'
    },
    mainView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cameraButton: {
        backgroundColor: Theme.PRIMARY_COLOR,
        height: 40,
        width: '45%',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cameraButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    backButton: {

    },
    imageContainer: {
        width: 100,
        aspectRatio: 1,
        height: undefined,
        margin: 5,
    },
    selectedImageContainer: {
        backgroundColor: 'black',
        opacity: 0.4
    },
    previewImage: {
        height: '100%',
        width: '100%'
    },
    checkBoxContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    noDataContainer: {
        position: 'absolute',
        top: '45%',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 60,
        alignItems: 'center'
    },
    backButtonContainer: {
        flex: 1,
    },
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'capitalize',
        flex: 1,
    },
    headerButtonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
    },
    selectText: {
        marginRight: 20
    },
    flatlist: {
        width: '94%',
    },
    flatlistContainer: {
        alignSelf: 'center'
    },
})

export default GalleryScreen