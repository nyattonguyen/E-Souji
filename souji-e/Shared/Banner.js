import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from "react-native";
import Swiper from "react-native-swiper/src";
import Colors from "../color";

var { width } = Dimensions.get("window");

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    setBannerData([
      "../assets/image/bn1.jpg",
      "https://vesinhcongnghiephcm.com.vn/quy-trinh-ve-sinh-van-phong-hang-ngay-cua-mot-nhan-vien-tap-vu.html",
      "../assets/image/bn1.jpg",
    ]);

    return () => {
      setBannerData([]);
    };
  }, []);

  return (
    <ScrollView >
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            style={{ height: width / 2, width: 400 }}
            showButtons={false}
            autoplay={true}
            autoplayTimeout={2}
          >
            {bannerData.map((item) => {
              return (
                <Image
                  key={item}
                  style={styles.imageBanner}
                  resizeMode="contain"
                  source={require("../assets/image/bn1.jpg")}
                />
              );
            })}
          </Swiper>
          <View style={{ height: 20 }}></View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 380,
    backgroundColor: Colors.black,
  },
  swiper: {
    width: 425,
    alignItems: "center",
    marginTop: 10,
    backgroundColor: Colors.deepGray,
    marginLeft:-10,
    marginRight:10,
  },
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius:5,
    
  },
});

export default Banner;
