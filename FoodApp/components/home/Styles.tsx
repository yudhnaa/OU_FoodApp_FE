import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export const styles = StyleSheet.create({
    backGround: {
        backgroundColor: colors.Yellow_Base,
        flex: 1,
    },
    bodyPage: {
        backgroundColor: colors.Font_2,
        flex: 1, // Đủ để chiếm toàn bộ không gian
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,
    },
    categories: {
        marginVertical: 10,        
        marginHorizontal: 10,
      },
      categoryItem: {
        borderRadius: 10,
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10,
      },
      categoryIcon: {
        width: 40,
        height: 40,
        borderRadius: 25,
        // backgroundColor: '#F3E9B5',
      },
      categoryText: {
        marginTop: 5,
        fontSize: 12,
        fontWeight: 'bold',
      },
      section: {
        marginVertical: 10,
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 10,
      },
      productItem: {
        flex: 1,
        margin: 5,
        alignItems: 'center',
      },
      productImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
      },
      productPrice: {
        marginTop: 5,
        backgroundColor: 'orange',
        color: 'white',
        padding: 5,
        borderRadius: 5,
      },
      promotion: {
        backgroundColor: '#E95322',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
      },
      promotionText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      promotionDiscount: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
      },
      button: {
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.Orange_Base,
        padding: 10,
        paddingHorizontal: 20,
        margin: 20
      },
});
