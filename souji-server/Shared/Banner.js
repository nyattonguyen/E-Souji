import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from "react-native";
import Swiper from "react-native-swiper/src";
import { Colors } from "../color";

var { width } = Dimensions.get("window");

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    setBannerData([
      "https://vesinhnhahcm.com/wp-content/uploads/2019/08/dich-vu-nha-o-dinh-ky.jpg",
      "https://top10uytin.net/wp-content/uploads/2021/06/top-cong-ty-dich-vu-ve-sinh.jpg",
      "https://www.truongxanhdana.com/upload/images/kem-mun-hoa-dao-thao-duoc.jpg",
    ]);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            style={{ height: width / 2, width: width - 20 }}
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
                  source={{ uri: item }}
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
    width: width,
  },
  swiper: {
    width: width + 10,
    paddingTop: 10,
    alignItems: "center",
    backgroundColor: Colors.deepGray,
    marginLeft: -15,
    marginRight: 10,
  },
  imageBanner: {
    height: width / 2,
    width: width,
    borderRadius: 10,
    borderBottomLeftRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
  },
});

export default Banner;
