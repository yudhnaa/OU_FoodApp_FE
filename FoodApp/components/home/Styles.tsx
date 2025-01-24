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
    fontFamily: 'Spartan_700Bold',
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Spartan_700Bold',
    marginBottom: 5,
    marginLeft: 10,
  },
  productItem: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
    // width: '95%',
    // height: 200,
    // borderRadius: 10,
    // resizeMode: 'cover',
    alignSelf: 'center'
  },
  productPrice: {
    marginTop: 5,
    backgroundColor: 'orange',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    fontFamily: 'Spartan_300Light',
  },
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
    fontSize: 20,
    fontFamily: 'Spartan_600SemiBold',
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
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: colors.Font_2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 8,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortButtonText: {
    color: '#E95322',
    fontWeight: '500',
  },
  menuList: {
    padding: 16,
    gap: 16,
    backgroundColor: colors.Font_2,
  },
  menuItem: {
    // backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    // elevation: 2,
  },
  menuImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  menuContent: {
    padding: 16,
    gap: 8,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuName: {
    // fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Spartan_700Bold',
    fontSize: 24,
    lineHeight: 26,
  },
  menuPrice: {
    fontSize: 16,
    color: '#E95322',
    fontFamily: 'Spartan_400Regular',
  },
  menuDescription: {
    color: '#666666',
    fontSize: 14,
    fontFamily: 'Spartan_300Light',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    backgroundColor: colors.Orange_Base,
    padding: 3,
    borderRadius: 12,
    height: 25,
    width: 45,
  },
  ratingText: {
    color: 'white',
    fontWeight: '500',
    fontFamily: 'Spartan_500Medium',
    fontSize: 12,
  },
  seperateLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.Orange_Base,
    marginVertical: 10,
  },
  txt: {
    fontSize: 15,
    fontFamily: "Spartan_700Bold",
    color: colors.Orange_Base,
    textAlign: 'center',
  },
  txtContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20
  },
});
