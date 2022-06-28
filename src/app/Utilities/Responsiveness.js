import { Dimensions, PixelRatio } from 'react-native';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

/**
 * widthPercentageToDP(): Converts provided width percentage to independent pixel (dp)
 * @param {*} widthPercent - The percentage of screen's width that UI element should cover in '%'
 * @returns {number} - The calculated dp depending on current device's screen width.
 * @author Vivek PS
 */
const widthPercentageToDP = widthPercent => {
    const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
};

/**
 * heightPercentageToDP(): Converts provided height percentage to independent pixel (dp)
 * @param {*} heightPercent - The percentage of screen's height that UI element should cover in '%'
 * @returns {number} - The calculated dp depending on current device's screen height
 * @author Vivek PS
 */
const heightPercentageToDP = heightPercent => {
    const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
};

/**
 * listenOrientationChange(): Detects orientation change (every time it occurs) and triggers 
 * screen rerendering. It does that, by changing the state of the screen where the function is
 * called. State changing occurs for a new state variable with the name 'orientation' that will
 * always hold the current value of the orientation after the 1st orientation change.
 * Invoke it inside the screen's constructor or in componentDidMount lifecycle method.
 * @param {object} that - Screen's class component this variable. The function needs it to
 *                        invoke setState method and trigger screen rerender (this.setState())
 * @author Vive PS
 */
const listenOrientationChange = that => {
    Dimensions.addEventListener('change', newDimensions => {
        screenWidth = newDimensions.window.width;
        screenHeight = newDimensions.window.height;

        // Trigger screen's rerender with a state update of the orientation variable
        that.setState({
            orientation: screenWidth < screenHeight ? 'portrait' : 'landscape'
        });
    });
};

/**
 * removeOrientationListener(): Removes orientation change listener and should be invoked in
 * useEffect-retun or componentWillUnmount lifecycle method of every UI screen that
 * listenOrientationChange function has been invoked. This should be done in order to
 * avoid adding new listeners every time the same component is re-mounted.
 * @author Vivek PS
 */
const removeOrientationListener = () => {
    Dimensions.removeEventListener('change', () => { });
};

export {
    widthPercentageToDP,
    heightPercentageToDP,
    listenOrientationChange,
    removeOrientationListener
};