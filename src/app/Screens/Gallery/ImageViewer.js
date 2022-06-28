import React, { useEffect, useState } from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import ImageView from "react-native-image-viewing";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PESDK, PhotoEditorModal, Configuration, TintMode } from 'react-native-photoeditorsdk';

const configuration: Configuration = {
    sticker: {
        personalStickers: true,
        categories: [{
            identifier: "shapes_outline_stickers", name: "Shapes2",
            thumbnailURI: require("../../Assets/Images/circle.png"),
            items: [{
                identifier: "shapes_arrow_outline", name: "Arrow",
                stickerURI: require("../../Assets/Images/arrow.png"),
                tintMode: TintMode.SOLID
            },
            {
                identifier: "shapes_circle_outline", name: "Circle",
                stickerURI: require("../../Assets/Images/circle.png"),
                tintMode: TintMode.SOLID
            },
            {
                identifier: "shapes_ellipse_outline", name: "Ellipse",
                stickerURI: require("../../Assets/Images/ellipse.png"),
                tintMode: TintMode.SOLID
            },
            {
                identifier: "shapes_rectangle_outline", name: "Rectangle",
                stickerURI: require("../../Assets/Images/rectangle.png"),
                tintMode: TintMode.SOLID
            },
            {
                identifier: "shapes_square_outline", name: "Square",
                stickerURI: require("../../Assets/Images/square.png"),
                tintMode: TintMode.SOLID
            },
            {
                identifier: "shapes_triangle_outline", name: "Triangle",
                stickerURI: require("../../Assets/Images/triangle.png"),
                tintMode: TintMode.SOLID
            }]
        },
        // // Use existing sticker category
        // {
        //     identifier: 'imgly_sticker_category_emoticons',
        //     items: [ 
        //     ],
        // },
        // // Modify existing sticker category
        // {
        //     identifier: 'imgly_sticker_category_shapes',
        //     items: [ ],
        // },

        ]
    }
}

/**
 * ImageHeader(): Returns the imageHeader UI
 * @param {*} image 
 * @returns 
 */
const ImageHeader = ({ image }) => {
    return (
        <View style={styles.headerButtons}>
            <Icon name="pencil" size={24} color="white" onPress={() => {
                PESDK.openEditor(image.uri,configuration).then((result) => {
                    console.log("----------- result ", result);
                }).catch((error) => {
                    console.log("------------- error ", error);
                })
            }} />
        </View>
    )
}
/**
 * ImageFooter(): Returns the image position(index) indicator UI
 * @param {*} currentIndex 
 * @param {*} allSize 
 * @returns 
 */
const ImageFooter = ({ currentIndex, allSize }) => {
    return (
        <View style={styles.positionIndicator}>
            <Text style={{ color: 'white' }}>{currentIndex} / {allSize}</Text>
        </View>
    )
}

/**
 * ImageViewerComponent(): Shows the selected image in full screen
 * @param {*} images 
 * @param {*} activeImageIndex 
 * @param {*} onswipeDown() 
 * @returns 
 */
const ImageViewerComponent = ({ images, activeImageIndex, onswipeDown }) => {
    return (
        <ImageView
            images={images}
            imageIndex={activeImageIndex}
            visible={true}
            onRequestClose={() => onswipeDown()}
            swipeToCloseEnabled={false}
            animationType={"slide"}
            presentationStyle="overFullScreen"
            doubleTapToZoomEnabled
            HeaderComponent={() => (
                <ImageHeader image={images[activeImageIndex]} />
            )}
            FooterComponent={({ imageIndex }) => (
                <ImageFooter currentIndex={imageIndex + 1} allSize={images.length} />
            )}
        />
    )
}

const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        right: 5
    },
    imageHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        backgroundColor: 'red'
    },
    positionIndicator: {
        position: 'absolute',
        bottom: 75,
        backgroundColor: 'grey',
        alignSelf: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    imageFooter: {
        backgroundColor: '#1d1d1d',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imageFooterContainer: {
        width: '100%',
        position: "absolute",
        bottom: 0,
        zIndex: 9999,
    },
    headerButtons: {
        position: 'absolute',
        top: 10,
        right: 20
    }
})

export default ImageViewerComponent