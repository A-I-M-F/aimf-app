package com.tawatconnect;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.BV.LinearGradient.LinearGradientPackage;
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
import com.reactnativecommunity.rnpermissions.RNPermissionsPackage;
import org.reactnative.camera.RNCameraPackage;
import com.horcrux.svg.SvgPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
import com.tron.ReactNativeWheelPickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.react.ReactInstanceManager;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.List;


public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
          new DefaultReactNativeHost(this) {
            @Override
            public boolean getUseDeveloperSupport() {
              return BuildConfig.DEBUG;
            }

            @Override
            protected List<ReactPackage> getPackages() {
            @SuppressWarnings("UnnecessaryLocalVariable")
            List<ReactPackage> packages = new PackageList(this).getPackages();
              return packages;
            }

            @Override
            protected String getJSMainModuleName() {
              return "index";
            }

            @Override
            protected boolean isNewArchEnabled() {
              return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
            }

            @Override
            protected Boolean isHermesEnabled() {
              return BuildConfig.IS_HERMES_ENABLED;
            }
          };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      DefaultNewArchitectureEntryPoint.load();
    }
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

    /**
     * Loads Flipper in React Native templates. Call this in the onCreate method with something like
     * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
     *
     * @param context
     * @param reactInstanceManager
     */
    private static void initializeFlipper(
            Context context, ReactInstanceManager reactInstanceManager) {
        if (BuildConfig.DEBUG) {
            try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
                Class<?> aClass = Class.forName("com.aimf.ReactNativeFlipper");
                aClass
                        .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
                        .invoke(null, context, reactInstanceManager);
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
    }
}
