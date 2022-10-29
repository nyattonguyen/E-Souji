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

// import baseURL from "../../assets/common/baseUrl";
import axios from "axios";

import ProductList from "./ProductList";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";
import Header from "../../Shared/Header";
import Colors from "../../color";

var { height, width } = Dimensions.get("window");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategory] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseURL = "http://localhost:3333/api/v1";

  useEffect(() => {
    setFocus(false);
    setActive(-1);

    axios
      .get(`${baseURL}/products`)
      .then((res) => {
        setProducts(res.data);
        setProductsFiltered(res.data);
        setProductsCtg(res.data);
        setInitialState(res.data);
      })
      .catch((error) => {
        console.log("Api call error:", error);
      });
    //categories
    axios
      .get(`${baseURL}/categories`)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((error) => {
        console.log("Api call error:", error);
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
    <>
      {loading == true ? (
        <Container>
          <ScrollView>
            <View>
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

              {productsCtg.length > 0 ? (
                <View style={styles.listContainer}>
                  {productsCtg.map((item) => {
                    return (
                      <ProductList
                        navigation={props.navigation}
                        key={item._id.$oid}
                        item={item}
                      />
                    );
                  })}
                </View>
              ) : (
                <View style={styles.center}>
                  <Text>No products found</Text>
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
    </>
  );
};
export default ProductContainer;

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  listContainer: {
    height: height,
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "column",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
