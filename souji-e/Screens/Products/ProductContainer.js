import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Box, Container } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import { Colors } from "../../color";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

import ProductList from "./ProductList";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

import clientAxios from "../../apis";

const { height, width } = Dimensions.get("window");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategory] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFocus(false);
    setActive(-1);
    //products
    clientAxios
      .get("/products")
      .then((res) => {
        setProducts(res.data);
        setProductsCtg(res.data);
        setInitialState(res.data);
      })
      .catch((error) => {
        console.log("Api call error products:", error);
      });
    //categories
    clientAxios
      .get("/categories")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((error) => {
        console.log("Api call error category:", error);
      });

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setCategory([]);
      setActive();
      setInitialState();
    };
  }, []);

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };
  // Categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {loading === true ? (
        <Container width={width}>
          <ScrollView>
            <View style={{ width: width }}>
              <View>
                <Banner />
              </View>
              <View>
                <CategoryFilter
                  categories={categories}
                  categoryFilter={changeCtg}
                  productsCtg={productsCtg}
                  active={active}
                  setActive={setActive}
                />
              </View>

              {/* test  */}

              {productsCtg.length > 0 ? (
                <View style={styles.listContainer}>
                  {productsCtg.map((item) => {
                    return (
                      <ProductList
                        navigation={props.navigation}
                        key={item.name}
                        item={item}
                      />
                    );
                  })}
                </View>
              ) : (
                <View style={styles.center}>
                  <Text>Không tìm thấy dịch vụ</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </Container>
      ) : (
        <Container style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
          <ActivityIndicator size="large" color={Colors.black} />
        </Container>
      )}
    </SafeAreaView>
  );
};
export default ProductContainer;

const styles = StyleSheet.create({
  container: {
    width: width + 100,
    marginTop: -35,
  },
  listContainer: {
    height: height,
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "column",
    backgroundColor: "gainsboro",
  },
  center: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
