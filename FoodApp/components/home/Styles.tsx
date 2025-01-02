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
      // promotion: {
      //   backgroundColor: '#E95322',
      //   padding: 20,
      //   borderRadius: 10,
      //   alignItems: 'center',
      //   marginVertical: 10,
      // },
      // promotionText: {
      //   color: 'white',
      //   fontSize: 16,
      //   fontWeight: 'bold',
      // },
      // promotionDiscount: {
      //   color: 'white',
      //   fontSize: 24,
      //   fontWeight: 'bold',
      // },
      // ... existing styles ...
// promotionContainer: {
//   alignItems: 'center',
//   marginVertical: 20,
// },
// promotionSlide: {
//   width: 350,
//   height: 180,
//   borderRadius: 20,
//   overflow: 'hidden',
// },
// promotionContent: {
//   flexDirection: 'row',
//   backgroundColor: '#E95322',
//   padding: 20,
//   height: '100%',
// },
// promotionTextContainer: {
//   flex: 1,
//   justifyContent: 'center',
// },
// promotionText: {
//   color: 'white',
//   fontSize: 24,
//   fontWeight: 'bold',
//   marginBottom: 10,
// },
// promotionDiscount: {
//   color: 'white',
//   fontSize: 32,
//   fontWeight: 'bold',
// },
// promotionImage: {
//   width: 150,
//   height: 150,
//   resizeMode: 'cover',
//   borderRadius: 10,
// },
// pagination: {
//   flexDirection: 'row',
//   position: 'absolute',
//   bottom: 10,
//   alignSelf: 'center',
// },
// paginationDot: {
//   width: 8,
//   height: 8,
//   borderRadius: 4,
//   marginHorizontal: 4,
// },
// // ... existing styles ...

// ... existing styles ...
// ... existing styles ...
promotionContainer: {
  alignItems: 'center',
  marginVertical: 20,
  marginHorizontal: 20,
},
promotionSlide: {
  width: 350,
  height: 160,
  borderRadius: 15,
  overflow: 'hidden',
  backgroundColor: '#E95322',
},
promotionContent: {
  flexDirection: 'row',
  height: '100%',
},
promotionTextContainer: {
  width: '50%',  // chia đều 50-50
  justifyContent: 'center',
  paddingLeft: 20,
},
promotionText: {
  color: 'white',
  fontSize: 24,
  fontWeight: '600',
  marginBottom: 10,
  lineHeight: 30,
},
promotionDiscount: {
  color: 'white',
  fontSize: 36,
  fontWeight: 'bold',
},
promotionImage: {
  width: '50%',  // chia đều 50-50
  height: '100%',
  resizeMode: 'cover',
},
pagination: {
  flexDirection: 'row',
  marginTop: 15,  // tách pagination ra khỏi slide
  gap: 5,
},
paginationDot: {
  width: 8,
  height: 8,
  borderRadius: 4,
},
});
