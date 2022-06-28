import { PermissionsAndroid } from 'react-native';
import { Camera } from 'react-native-vision-camera';

/**
 * checkCameraPermissions(): Check for the camera permission status
 * @returns
 */
const checkCameraPermissions = async () => {
  return new Promise(async (resolve, reject) => {
    let cameraPermission = await Camera.getCameraPermissionStatus();
    const microphonePermission = await Camera.getMicrophonePermissionStatus();
    if (cameraPermission != 'authorized') {
      cameraPermission = await Camera.requestCameraPermission();
    }
    if (microphonePermission != 'authorized') {
      microphonePermission = await Camera.requestMicrophonePermission();
    }
    cameraPermission === 'denied'
      ? reject('denied')
      : resolve(cameraPermission);

    microphonePermission === 'denied'
      ? reject('denied')
      : resolve(microphonePermission);
  });
};

/**
 * checkAndroidStoragePermission(): Check for storage permission on android devices
 * @returns
 */
const checkAndroidStoragePermission = async () => {
  return new Promise(async (resolve, reject) => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      resolve(true);
    }
    const status = await PermissionsAndroid.request(permission);
    const permissionStatus = await PermissionsAndroid.check(permission);
    permissionStatus ? resolve('granted') : reject('denied');
  });
};

export { checkCameraPermissions, checkAndroidStoragePermission };
